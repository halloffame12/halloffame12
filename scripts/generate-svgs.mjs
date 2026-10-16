#!/usr/bin/env node
/**
 * generate-svgs.mjs — builds the pixel-art profile SVGs for halloffame12.
 *
 * Data comes from the GitHub API (REST + GraphQL). When no token is available
 * or the API is unreachable, the script falls back to the checked-in snapshot
 * at the bottom of this file so it never writes a broken/empty asset.
 *
 * Usage:  GITHUB_TOKEN=<token> node scripts/generate-svgs.mjs
 *
 * Everything is emitted as plain SVG (CSS keyframes only + one SMIL clip for
 * the typewriter reveal). No JS, no external fonts, no external requests.
 * Every asset carries its own solid panel so it is readable on GitHub light
 * AND dark themes.
 */
import { writeFileSync, readFileSync, mkdirSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = join(__dirname, "..", "assets");
const SNAPSHOT_FILE = join(__dirname, "data.snapshot.json");
const USER = process.env.PROFILE_USER || "halloffame12";
const TOKEN = process.env.GITHUB_TOKEN || process.env.GH_TOKEN || "";

/* ------------------------------------------------------------------ *
 * 1. DATA
 * ------------------------------------------------------------------ */

/** Hard fallback if there is no token AND no checked-in snapshot. */
const HARD_FALLBACK = {
  repos: 68,
  followers: 5,
  stars: 1,
  contributions: 667,
  languages: [
    ["TypeScript", 24],
    ["HTML / CSS", 8],
    ["Python", 8],
    ["JavaScript", 3],
    ["C++", 2],
    ["Dart / Flutter", 2],
    ["Rust", 2],
  ],
  calendar: null,
};

/** Last good API response, committed so the build is reproducible offline. */
function readSnapshot() {
  try {
    if (existsSync(SNAPSHOT_FILE)) return JSON.parse(readFileSync(SNAPSHOT_FILE, "utf8"));
  } catch (e) {
    console.log(`! could not read snapshot (${e.message})`);
  }
  return {};
}

const FALLBACK = { ...HARD_FALLBACK, ...readSnapshot() };

async function api(path, headers = {}) {
  const res = await fetch(`https://api.github.com${path}`, {
    headers: {
      Accept: "application/vnd.github+json",
      "User-Agent": "halloffame12-profile-readme",
      ...(TOKEN ? { Authorization: `Bearer ${TOKEN}` } : {}),
      ...headers,
    },
  });
  if (!res.ok) throw new Error(`${path} -> ${res.status}`);
  return res.json();
}

/** Merge the raw primaryLanguage values into the 7 buckets shown on the card. */
const BUCKET = {
  TypeScript: "TypeScript",
  TSX: "TypeScript",
  Python: "Python",
  HTML: "HTML / CSS",
  CSS: "HTML / CSS",
  JavaScript: "JavaScript",
  Dart: "Dart / Flutter",
  Rust: "Rust",
  "C++": "C++",
};

async function collect() {
  if (!TOKEN) {
    console.log("! no GITHUB_TOKEN — using checked-in snapshot");
    return { ...FALLBACK };
  }
  const out = { ...FALLBACK, languages: [], calendar: null };
  try {
    const user = await api(`/users/${USER}`);
    out.repos = user.public_repos ?? out.repos;
    out.followers = user.followers ?? out.followers;

    const repos = await api(`/users/${USER}/repos?per_page=100&type=owner`);
    const counts = new Map();
    let stars = 0;
    for (const r of repos) {
      stars += r.stargazers_count || 0;
      const lang = r.language;
      if (!lang) continue;
      const bucket = BUCKET[lang] || lang;
      counts.set(bucket, (counts.get(bucket) || 0) + 1);
    }
    out.stars = stars;
    out.languages = [...counts.entries()]
      .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
      .slice(0, 7);
  } catch (e) {
    console.log(`! REST fetch failed (${e.message}) — keeping what we have`);
  }

  // Contributions need GraphQL (POST).
  try {
    const res = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        "Content-Type": "application/json",
        "User-Agent": "halloffame12-profile-readme",
      },
      body: JSON.stringify({
        query: `query($login:String!){user(login:$login){contributionsCollection{contributionCalendar{totalContributions months{name firstDay} weeks{contributionDays{date weekday contributionCount}}}}}}`,
        variables: { login: USER },
      }),
    });
    const json = await res.json();
    const cal = json?.data?.user?.contributionsCollection?.contributionCalendar;
    if (cal) {
      out.contributions = cal.totalContributions ?? out.contributions;
      out.calendar = cal;
    }
  } catch (e) {
    console.log(`! GraphQL fetch failed (${e.message})`);
  }

  if (!out.languages.length) out.languages = FALLBACK.languages;
  return out;
}

/* ------------------------------------------------------------------ *
 * 2. PALETTES (WCAG AA checked — see scripts/check-contrast.mjs)
 * ------------------------------------------------------------------ */

const THEMES = {
  dark: {
    key: "dark",
    pageBg: "#0d1117",
    panel: "#0b0f1e", // game-screen background
    panel2: "#121a33",
    panel3: "#1b2547",
    inchip: "#0e1530",
    border: "#00ff99",
    border2: "#2a3a6e",
    ink: "#eafff6", // primary text
    inkDim: "#a9c9bf", // secondary text
    green: "#00ff99",
    textYellow: "#ffe95c",
    textRed: "#ff7b7b",
    textCyan: "#63e6ff",
    gold: "#ffd54f",
    orange: "#ffa726",
    magenta: "#ff5fd2",
    blue: "#6aa8ff",
    sky: ["#0b0f1e", "#131c38", "#1c2a52"],
    mountain: "#1a2650",
    mountainFar: "#141d3c",
    building: "#101a3a",
    buildingEdge: "#232f5e",
    ground: "#070b16",
    star: "#ffffff",
    cloud: "#e8f4ff",
    sunMoon: "#fff7c2",
    sunMoonShade: "#e6dc9a",
    hillNear: "#1f7a52",
    hillFar: "#14603f",
    barTrack: "#1a2244",
    contrib: ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"],
    rays: "#ffe9a3",
  },
  light: {
    key: "light",
    pageBg: "#ffffff",
    panel: "#f2f8ff",
    panel2: "#e3f0ff",
    panel3: "#d2e8ff",
    inchip: "#ffffff",
    border: "#0b1b3a",
    border2: "#9db4d0",
    ink: "#0b1b3a",
    inkDim: "#33507a",
    green: "#00694a",
    textYellow: "#7a4f00",
    textRed: "#a8251d",
    textCyan: "#0b4fa8",
    gold: "#9c6200",
    orange: "#a33d00",
    magenta: "#a3005f",
    blue: "#0b4fa8",
    sky: ["#eaf5ff", "#d8ecff", "#c4e1ff"],
    mountain: "#a7d8b8",
    mountainFar: "#bcdfff",
    building: "#fdf7e8",
    buildingEdge: "#d8cdb4",
    ground: "#e7dcbf",
    star: "#ffffff",
    cloud: "#ffffff",
    sunMoon: "#ffb300",
    sunMoonShade: "#e07b00",
    hillNear: "#79c98f",
    hillFar: "#a3dcb4",
    barTrack: "#c6dcf5",
    contrib: ["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"],
    rays: "#ffd166",
  },
};

/* ------------------------------------------------------------------ *
 * 3. PIXEL HELPERS
 * ------------------------------------------------------------------ */

/** Convert an ASCII mask into merged <rect> runs (keeps files small). */
function mask(rows, colors, scale, ox, oy, extra = "") {
  let out = "";
  for (let y = 0; y < rows.length; y++) {
    const row = rows[y];
    let x = 0;
    while (x < row.length) {
      const ch = row[x];
      if (ch === "." || ch === " ") {
        x++;
        continue;
      }
      let w = 1;
      while (x + w < row.length && row[x + w] === ch) w++;
      out += `<rect x="${ox + x * scale}" y="${oy + y * scale}" width="${w * scale}" height="${scale}" fill="${colors[ch]}"${extra}/>`;
      x += w;
    }
  }
  return out;
}

const r = (x, y, w, h, fill, extra = "") =>
  `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${fill}"${extra}/>`;

const rnd = (seed) => {
  let s = seed;
  return () => {
    s = (s * 1103515245 + 12345) & 0x7fffffff;
    return s / 0x7fffffff;
  };
};

/** A drifting field of stars/clouds. 1600 units wide so the loop is seamless. */
function driftLayer(count, seed, fill, size, cls, t) {
  const rand = rnd(seed);
  let out = "";
  for (let i = 0; i < count; i++) {
    const x = Math.round(rand() * 1600);
    const y = Math.round(20 + rand() * (t === "dark" ? 190 : 130));
    const s = size + (rand() > 0.7 ? 2 : 0);
    const delay = -(rand() * 3).toFixed(2);
    out += `<rect x="${x}" y="${y}" width="${s}" height="${s}" fill="${fill}" class="${cls}" style="animation-delay:${delay}s"/>`;
  }
  return out;
}

/** Pixel hearts used for the player-card HP row. */
const HEART = ["..##.##..", ".#######.", "#########", "#########", ".#######.", "..#####..", "...###...", "....#...."];

function moon(px, py, s) {
  // crescent
  const rows = [
    "..####..",
    ".######.",
    "########",
    "########",
    "########",
    "########",
    ".######.",
    "..####..",
  ];
  return mask(rows, { "#": "#fff7c2" }, s, px, py) + mask(rows, { "#": "#fff7c2" }, s, px + s * 3, py - s * 2);
}

function sun(px, py, s, t) {
  const rows = [
    "..####..",
    ".######.",
    "########",
    "########",
    "########",
    "########",
    ".######.",
    "..####..",
  ];
  let out = "";
  for (let i = 0; i < 8; i++) {
    const a = (i * Math.PI) / 4;
    const cx = px + s * 3.5 + Math.cos(a) * s * 6;
    const cy = py + s * 3.5 + Math.sin(a) * s * 6;
    out += r(Math.round(cx), Math.round(cy), s, s, t.rays, ' class="tw"');
  }
  return out + mask(rows, { "#": t.sunMoon }, s, px, py);
}

function cloudRow(px, py, s, fill, dots, cls) {
  const rows = [
    "....####....",
    "..########..",
    ".##########.",
    "############",
    "############",
    "..####..####",
  ];
  return mask(rows, { "#": fill }, s, px, py, ` class="${cls}" style="animation-delay:${dots}s"`);
}

/* ------------------------------------------------------------------ *
 * 4. SHARED STYLE BLOCK
 * ------------------------------------------------------------------ */

function style(extra = "") {
  return `<style>
.rm-show{display:none}
.tw{animation:tw 2.4s steps(2) infinite}
.win{animation:win 3.2s steps(2) infinite}
.bob{animation:bob .7s steps(2) infinite}
.bl{animation:bl 1.1s steps(2) infinite}
.coin{animation:coin 1.3s steps(4) infinite;transform-box:fill-box;transform-origin:center}
.steam{animation:steam 1.7s steps(4) infinite}
.drift1{animation:drift1 46s linear infinite}
.drift2{animation:drift2 28s linear infinite}
.fly{animation:fly 12s steps(24,end) infinite}
.snk{animation:snk 15s steps(30,end) infinite}
.gh{animation:gh 13s steps(26,end) infinite}
.pac{animation:pac 7s linear infinite}
.gst{animation:gst 7s linear infinite}
.shoot{animation:shoot 9s linear infinite}
.shoot2{animation:shoot2 11s linear infinite}
.dash{animation:dash 1s linear infinite}
.dash2{animation:dash 2s linear infinite}
.tscr{animation:tscr 1.6s steps(2) infinite}
.grow{transform-box:fill-box;transform-origin:left;animation:grow 9s steps(10,end) infinite}
.hb{animation:hb .9s steps(2) infinite}
.cyc{animation:cyc 16s steps(1,end) infinite}
@keyframes tw{50%{opacity:.18}}
@keyframes win{50%{opacity:.22}}
@keyframes bob{50%{transform:translateY(-4px)}}
@keyframes bl{50%{opacity:0}}
@keyframes coin{50%{transform:scaleX(.18)}}
@keyframes steam{from{transform:translateY(0);opacity:1}to{transform:translateY(-9px);opacity:0}}
@keyframes drift1{from{transform:translateX(0)}to{transform:translateX(-800px)}}
@keyframes drift2{from{transform:translateX(0)}to{transform:translateX(-800px)}}
@keyframes fly{from{transform:translate(-90px,232px)}to{transform:translate(900px,204px)}}
@keyframes snk{from{transform:translateX(-150px)}to{transform:translateX(900px)}}
@keyframes gh{from{transform:translateX(830px)}to{transform:translateX(-60px)}}
@keyframes pac{from{transform:translateX(-60px)}to{transform:translateX(880px)}}
@keyframes gst{from{transform:translateX(880px)}to{transform:translateX(-60px)}}
@keyframes shoot{0%{transform:translate(0,0);opacity:0}6%{opacity:1}18%{transform:translate(150px,26px);opacity:0}100%{transform:translate(150px,26px);opacity:0}}
@keyframes shoot2{0%{transform:translate(0,0);opacity:0}5%{opacity:1}16%{transform:translate(-170px,22px);opacity:0}100%{transform:translate(-170px,22px);opacity:0}}
@keyframes dash{to{stroke-dashoffset:-32}}
@keyframes tscr{50%{opacity:.15}}
@keyframes grow{0%{transform:scaleX(0)}26%{transform:scaleX(1)}92%{transform:scaleX(1)}100%{transform:scaleX(0)}}
@keyframes hb{50%{opacity:.45}}
@keyframes cyc{0%{opacity:1}28%{opacity:1}30%{opacity:0}100%{opacity:0}}
${extra}
@media (prefers-reduced-motion: reduce){
  .tw,.win,.bob,.bl,.coin,.steam,.drift1,.drift2,.fly,.snk,.gh,.shoot,.shoot2,.dash,.dash2,.tscr,.grow,.hb,.cyc,.pac,.gst{animation:none!important}
  .rm-hide{display:none}
  .rm-show{display:inline}
  .mouth{display:none}
}
</style>`;
}

/* ------------------------------------------------------------------ *
 * 5. HERO
 * ------------------------------------------------------------------ */

function hero(t, d, opts = {}) {
  const mobile = !!opts.mobile;
  const W = mobile ? 420 : 820;
  const H = mobile ? 360 : 340;
  const title = "SUMIT CHAUHAN";
  const taglines = [
    "Open Source Engineer · AI Automation & Dev Tooling",
    "Maintainer of ctx · MCP code intelligence (Rust + TS)",
    "Founder @ Versz · NASA Space Apps 2025 · Top 4",
  ];

  const parts = [];
  // panel + border
  parts.push(`<rect x="0" y="0" width="${W}" height="${H}" rx="14" fill="${t.panel}"/>`);
  // sky bands
  parts.push(r(4, 46, W - 8, 150, t.sky[0]));
  parts.push(r(4, 196, W - 8, 66, t.sky[1]));

  // ---- starfield / clouds (parallax) ----
  parts.push(`<g class="drift1">${driftLayer(46, 7, t.key === "dark" ? t.star : t.cloud, 2, "tw", t.key)}</g>`);
  parts.push(`<g class="drift2">${driftLayer(30, 19, t.key === "dark" ? t.star : t.cloud, 3, "tw", t.key)}</g>`);
  if (t.key === "light") {
    parts.push(`<g class="drift2">${cloudRow(120, 96, 4, t.cloud, "-1.2", "tw")}${cloudRow(430, 70, 3, t.cloud, "-2.1", "tw")}${cloudRow(700, 112, 4, t.cloud, "-0.4", "tw")}</g>`);
  }

  // ---- sun / moon ----
  parts.push(t.key === "dark" ? moon(W - 118, 58, 5) : sun(W - 116, 56, 5, t));

  // ---- shooting stars (dark sky only) ----
  if (t.key === "dark") {
    parts.push(`<g class="shoot"><g transform="translate(60,58)"><rect x="0" y="0" width="26" height="3" fill="${t.star}"/><rect x="-10" y="6" width="14" height="3" fill="${t.star}" opacity=".55"/><rect x="-26" y="12" width="8" height="3" fill="${t.star}" opacity=".3"/></g></g>`);
    parts.push(`<g class="shoot2"><g transform="translate(${W - 140},56)"><rect x="0" y="0" width="22" height="3" fill="${t.textCyan}"/><rect x="10" y="6" width="12" height="3" fill="${t.textCyan}" opacity=".5"/><rect x="24" y="12" width="8" height="3" fill="${t.textCyan}" opacity=".3"/></g></g>`);
  }

  // ---- mountains / hills ----
  if (mobile) {
    parts.push(`<path d="M4 262V236H60V214H108V236H150V210H196V232H240V206H288V228H334V212H380V234H416V262Z" fill="${t.mountain}"/>`);
  } else {
    parts.push(`<path d="M4 262V228H60V206H108V228H164V200H212V224H268V204H316V226H372V198H420V222H476V206H524V228H580V202H628V224H684V206H732V230H780V262H816Z" fill="${t.mountainFar}"/>`);
    parts.push(`<path d="M4 262V244H72V222H128V244H186V214H240V238H300V216H356V240H412V220H470V242H528V218H584V240H646V220H704V244H770V224H816V262Z" fill="${t.mountain}"/>`);
  }

  // ---- skyline with blinking windows ----
  if (!mobile) {
    const rand = rnd(31);
    const buildings = [
      [232, 208, 42], [278, 178, 30], [312, 220, 38], [560, 198, 38],
      [602, 168, 32], [638, 212, 42], [700, 190, 34], [744, 216, 38],
    ];
    let win = "";
    for (const [bx, by, bw] of buildings) {
      parts.push(r(bx, by, bw, 262 - by, t.building));
      for (let wy = by + 8; wy < 254; wy += 14) {
        for (let wx = bx + 6; wx < bx + bw - 6; wx += 10) {
          win += `<rect x="${wx}" y="${wy}" width="4" height="6" fill="${t.gold}" class="win" style="animation-delay:-${(rand() * 3).toFixed(2)}s"/>`;
        }
      }
    }
    parts.push(win);
  }

  // ---- ground ----
  parts.push(r(4, 262, W - 8, H - 266, t.ground));
  parts.push(r(4, 262, W - 8, 4, t.green));
  if (mobile) {
    parts.push(`<path d="M8 300H${W - 8}" stroke="${t.green}" stroke-opacity=".5" stroke-width="3" stroke-dasharray="14 14" class="dash"/>`);
  } else {
    parts.push(`<path d="M8 292H812" stroke="${t.green}" stroke-opacity=".45" stroke-width="3" stroke-dasharray="16 16" class="dash"/>`);
    parts.push(`<path d="M8 316H812" stroke="${t.green}" stroke-opacity=".18" stroke-width="3" stroke-dasharray="30 30" class="dash2"/>`);
  }

  // ---- coins ----
  const coinY = mobile ? 268 : 266;
  const coinX = mobile ? 286 : 430;
  parts.push(`<g class="bob">${r(coinX, coinY, 12, 12, t.gold, ' class="coin"')}${r(coinX + 40, coinY - 12, 12, 12, t.gold, ` class="coin" style="animation-delay:.3s"`)}${r(coinX + 80, coinY, 12, 12, t.gold, ` class="coin" style="animation-delay:.6s"`)}</g>`);

  // ---- ghost ----
  const ghost = mask(
    ["..####..", ".######.", "########", "##.##.##", "########", "########", "########", "#.##..#."],
    { "#": t.magenta },
    4, 0, 0
  );
  const ghostY = mobile ? 236 : 242;
  parts.push(`<g class="gh"><g transform="translate(0,${ghostY})"><g class="bob">${ghost}${r(8, 12, 8, 8, "#ffffff")}${r(20, 12, 8, 8, "#ffffff")}${r(11, 15, 4, 4, "#1b2547")}${r(23, 15, 4, 4, "#1b2547")}</g></g></g>`);

  // ---- snake ----
  let snake = "";
  for (let i = 0; i < 9; i++) {
    const cx = i * 11;
    const cy = i % 2 === 0 ? 0 : 4;
    snake += r(cx, cy, 9, 9, i === 0 ? t.green : i % 2 === 0 ? t.green : t.key === "dark" ? "#00cc77" : "#0d8a5f", ` class="bob" style="animation-delay:${(-i * 0.1).toFixed(2)}s"`);
  }
  snake += r(19, 10, 3, 3, "#0b1b3a") + r(40, 2, 7, 2, t.textRed, ' class="bl"');
  const snakeY = mobile ? 318 : 320;
  parts.push(`<g class="snk"><g transform="translate(0,${snakeY})">${snake}</g></g>`);

  // ---- rocket ----
  const rocket =
    `<g transform="translate(-14,14)"><rect x="-6" y="2" width="10" height="6" fill="${t.orange}"/><rect x="-14" y="4" width="8" height="3" fill="${t.gold}"/></g>` +
    r(0, 6, 34, 14, t.key === "dark" ? "#eceff1" : "#fdfdff") +
    r(34, 8, 7, 10, t.textRed) +
    r(13, 10, 7, 7, t.textCyan) +
    r(7, 0, 10, 7, t.textRed) +
    r(7, 19, 10, 7, t.textRed) +
    r(0, 11, 5, 4, t.key === "dark" ? "#b0bec5" : "#8aa0b4");
  parts.push(`<g class="fly"><g class="bob">${rocket}</g></g>`);

  // ---- developer at a laptop (dark: neon screen / light: navy screen) ----
  const scr = t.key === "dark" ? "#0b0f1e" : "#0b1b3a";
  const code1 = t.green;
  const devX = mobile ? 14 : 30;
  const devY = mobile ? 258 : 258;
  parts.push(`<g transform="translate(${devX},${devY})">
    ${r(0, 0, 116, 6, t.key === "dark" ? "#6d4c41" : "#a9744f")}
    ${r(4, 6, 6, 12, t.key === "dark" ? "#4e342e" : "#8a5a3c")}
    ${r(106, 6, 6, 12, t.key === "dark" ? "#4e342e" : "#8a5a3c")}
    ${mask(["..####..", ".######.", "########", "##.##.##", "########", "########"], { "#": "#ffcc80" }, 2, 12, -34)}
    ${r(14, -18, 2, 2, "#0b1b3a")}${r(22, -18, 2, 2, "#0b1b3a")}
    ${r(10, -8, 20, 10, t.green)}
    <g class="bob">${r(30, -4, 14, 5, t.green)}${r(44, -4, 5, 5, "#ffcc80")}</g>
    ${r(34, 0, 44, 4, t.key === "dark" ? "#90a4ae" : "#9aa7b4")}
    ${r(38, -30, 36, 30, "#263238")}
    ${r(42, -26, 28, 22, scr)}
    ${r(46, -22, 14, 2, code1, ' class="tscr"')}
    ${r(46, -17, 22, 2, t.textCyan)}
    ${r(46, -12, 10, 2, t.textYellow, ' class="tscr" style="animation-delay:.4s"')}
    ${r(58, -12, 5, 4, t.green, ' class="bl"')}
    ${r(78, -10, 8, 10, t.key === "dark" ? "#ffffff" : "#c8d3de")}
    ${r(80, -20, 2, 4, t.key === "dark" ? "#c9d3dd" : "#8aa0b4", ' class="steam"')}
    ${r(80, -26, 2, 4, t.key === "dark" ? "#c9d3dd" : "#8aa0b4", ' class="steam" style="animation-delay:.5s"')}
  </g>`);

  // ---- HUD strip (assembled here, pushed after the frame so mobile can swap it) ----
  const cx = W / 2;
  const xp = Math.min(d.contributions, 1000);
  const bw = 150;
  let hud;
  if (mobile) {
    hud =
      r(8, 8, W - 16, 50, t.panel2, ` stroke="${t.border2}" stroke-width="2"`) +
      `<text x="14" y="28" font-size="14" font-weight="bold" fill="${t.green}">1UP</text>` +
      `<text x="52" y="28" font-size="14" fill="${t.ink}">IIT PATNA</text>` +
      `<text x="${W - 14}" y="28" font-size="14" text-anchor="end" fill="${t.textYellow}">11 MCP TOOLS</text>` +
      `<text x="${cx}" y="50" font-size="14" text-anchor="middle" fill="${t.inkDim}">REPOS ${d.repos} · FOLLOWERS ${d.followers} · COMMITS ${d.contributions}</text>`;
  } else {
    hud =
      r(8, 8, W - 16, 50, t.panel2, ` stroke="${t.border2}" stroke-width="2"`) +
      `<text x="22" y="30" font-size="15" font-weight="bold" fill="${t.green}">1UP</text>` +
      `<text x="58" y="30" font-size="15" fill="${t.ink}">IIT PATNA</text>` +
      `<text x="${W - 22}" y="30" font-size="15" text-anchor="end" fill="${t.textYellow}">HI-SCORE</text>` +
      `<text x="${W - 104}" y="30" font-size="15" text-anchor="end" fill="${t.ink}">11 MCP TOOLS</text>` +
      r(cx - bw / 2, 38, bw, 12, t.inchip, ` stroke="${t.border2}" stroke-width="1"`) +
      r(cx - bw / 2 + 1, 39, ((bw - 2) * xp) / 1000, 10, t.green) +
      `<text x="${cx + bw / 2 + 8}" y="48" font-size="14" fill="${t.inkDim}">XP ${d.contributions}</text>` +
      `<text x="22" y="48" font-size="14" fill="${t.inkDim}">REPOS ${d.repos} · FOLLOWERS ${d.followers} · COMMITS ${d.contributions}</text>`;
  }

  // ---- title (typewriter) ----
  const fs = mobile ? 34 : 46;
  const tlen = mobile ? 336 : 430;
  const ty = mobile ? 122 : 140;
  const steps = [];
  for (let i = 1; i <= 13; i++) steps.push(Math.round((tlen / 13) * i));
  const vals = [0, ...steps, steps[12], steps[12], 0].join(";");
  const kt = [];
  const total = vals.split(";").length;
  for (let i = 0; i < total; i++) kt.push((i / (total - 1)).toFixed(3));

  parts.push(`<defs><clipPath id="twc"><rect x="${cx - tlen / 2 - 4}" y="${ty - fs}" width="0" height="${fs + 12}"><animate attributeName="width" dur="9s" repeatCount="indefinite" calcMode="discrete" values="${vals}" keyTimes="${kt.join(";")}"/></rect></clipPath></defs>`);

  const titleEl = (fill) => `<text x="${cx}" y="${ty}" font-size="${fs}" font-weight="bold" text-anchor="middle" textLength="${tlen}" lengthAdjust="spacing" fill="${fill}">${title}</text>`;
  parts.push(`<g class="rm-hide" clip-path="url(#twc)">${titleEl(t.key === "dark" ? "#00b36b" : "#8fb6d9")}${titleEl(t.key === "dark" ? t.green : t.ink)}</g>`);
  parts.push(`<g class="rm-hide"><rect x="${cx + tlen / 2 + 4}" y="${ty - fs + 4}" width="6" height="${fs - 8}" fill="${t.textYellow}" class="bl"/></g>`);
  parts.push(`<g class="rm-show">${titleEl(t.key === "dark" ? "#00b36b" : "#8fb6d9")}${titleEl(t.key === "dark" ? t.green : t.ink)}</g>`);

  // ---- taglines ----
  const tyy = ty + (mobile ? 34 : 36);
  taglines.forEach((tl, i) => {
    const text = mobile && tl.length > 46 ? tl.slice(0, 44).trim() + "…" : tl;
    parts.push(
      `<text class="cyc" x="${cx}" y="${tyy}" font-size="${mobile ? 15 : 19}" text-anchor="middle" fill="${t.ink}" style="animation-delay:-${(i * 16) / 3}s;opacity:${i === 0 ? 1 : 0}">${esc(text)}</text>`
    );
  });

  // ---- press start ----
  parts.push(`<text class="bl" x="${cx}" y="${tyy + (mobile ? 30 : 34)}" font-size="${mobile ? 16 : 18}" text-anchor="middle" fill="${t.textYellow}">&gt; PRESS START &lt;</text>`);

  // ---- frame + HUD ----
  parts.push(`<rect x="2" y="2" width="${W - 4}" height="${H - 4}" rx="12" fill="none" stroke="${t.border}" stroke-width="3"/>`);
  parts.push(r(8, mobile ? 66 : 64, 4, 4, t.border));
  parts.push(r(W - 12, mobile ? 66 : 64, 4, 4, t.border));
  parts.push(r(8, H - 12, 4, 4, t.border));
  parts.push(r(W - 12, H - 12, 4, 4, t.border));
  parts.push(hud);

  return svgDoc(W, H, `${t.key}-hero`, "Sumit Chauhan — pixel-art arcade hero", "Animated retro hero: night sky or sunny day, rocket, snake, ghost, coins, a developer at a laptop and a typed headline.", style(), parts.join(""));
}

const esc = (s) =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/* ------------------------------------------------------------------ *
 * 6. PLAYER CARD
 * ------------------------------------------------------------------ */

const ACHIEVEMENTS = [
  ["NASA Space Apps '25", "Top 4 · DTC regional", "trophy"],
  ["ctx maintainer", "11 MCP tools · Rust + TS", "star"],
  ["Versz founder", "live at versz.app", "heart"],
  ["IIT Patna", "CS & Data Science · CGPA 8.4", "shield"],
];

function achIcon(kind, t) {
  if (kind === "trophy")
    return r(4, 0, 8, 8, t.gold) + r(2, 0, 2, 4, t.gold) + r(12, 0, 2, 4, t.gold) + r(7, 8, 2, 4, t.gold) + r(4, 12, 8, 3, t.orange);
  if (kind === "star")
    return r(6, 0, 4, 16, t.green) + r(0, 6, 16, 4, t.green) + r(3, 3, 10, 10, t.green);
  if (kind === "heart")
    return mask(HEART, { "#": t.textRed }, 2, 0, 0);
  return mask(["..####..", ".#....#.", ".#....#.", ".#....#.", "..####..", "..####..", "..####.."], { "#": t.blue }, 2, 0, 0);
}

function card(t, d, opts = {}) {
  const mobile = !!opts.mobile;
  const W = mobile ? 440 : 820;
  const H = mobile ? 680 : 352;
  const parts = [];
  parts.push(`<rect x="0" y="0" width="${W}" height="${H}" rx="14" fill="${t.panel}"/>`);

  const max = Math.max(...d.languages.map((l) => l[1]), 1);
  const bars = d.languages.slice(0, 7).map(([name, count]) => {
    const level = Math.min(99, 30 + Math.round((69 * count) / max));
    return { name, count, level, width: Math.round(level * 2.6) };
  });

  const bx = mobile ? 150 : 186; // bar x
  const bwid = mobile ? 240 : 260; // track width
  const barH = 15;
  const barTop = mobile ? 92 : 76;
  const step = mobile ? 31 : 30;

  if (mobile) {
    parts.push(`<text x="20" y="34" font-size="20" font-weight="bold" fill="${t.green}">PLAYER 1</text>`);
    parts.push(`<text x="${W - 20}" y="34" font-size="14" text-anchor="end" fill="${t.textYellow}">LV ${bars[0].level} MAX</text>`);
    parts.push(`<text x="20" y="58" font-size="15" fill="${t.ink}">SUMIT CHAUHAN · OPEN SOURCE ENGINEER</text>`);
    parts.push(`<text x="20" y="84" font-size="14" fill="${t.textRed}">HP</text>`);
    for (let i = 0; i < 4; i++) parts.push(`<g class="hb" transform="translate(${56 + i * 26},${66})" style="animation-delay:${(i * 0.15).toFixed(2)}s">${mask(HEART, { "#": t.textRed }, 2, 0, 0)}</g>`);
  } else {
    parts.push(`<text x="22" y="36" font-size="20" font-weight="bold" fill="${t.green}">PLAYER 1 · SUMIT CHAUHAN</text>`);
    parts.push(`<text x="${W - 22}" y="36" font-size="14" text-anchor="end" fill="${t.textYellow}">LV ${bars[0].level} MAX</text>`);
    parts.push(`<text x="486" y="36" font-size="14" fill="${t.textRed}">HP</text>`);
    for (let i = 0; i < 4; i++) parts.push(`<g class="hb" transform="translate(${520 + i * 26},${20})" style="animation-delay:${(i * 0.15).toFixed(2)}s">${mask(HEART, { "#": t.textRed }, 2, 0, 0)}</g>`);
  }

  bars.forEach((b, i) => {
    const y = barTop + i * step;
    parts.push(`<text x="20" y="${y + barH - 3}" font-size="14" fill="${t.ink}">${esc(b.name)}</text>`);
    parts.push(r(bx, y, bwid, barH, t.barTrack));
    parts.push(r(bx, y, Math.min(b.width, bwid), barH, t.green, ` class="grow" style="animation-delay:-${(i * 0.45).toFixed(2)}s"`));
    // segment overlay for the arcade look
    let segs = "";
    for (let sx = bx + 10; sx < bx + bwid; sx += 10) segs += r(sx, y, 2, barH, t.panel);
    parts.push(segs);
    parts.push(`<text x="${bx + bwid + 8}" y="${y + barH - 3}" font-size="14" fill="${t.inkDim}">${b.level}</text>`);
  });

  // achievements panel
  if (mobile) {
    const stackY = barTop + 7 * step + 12;
    parts.push(`<text x="20" y="${stackY}" font-size="14" fill="${t.inkDim}">STACK: React · Node + Socket.IO</text>`);
    parts.push(`<text x="20" y="${stackY + 20}" font-size="14" fill="${t.inkDim}">Flutter · MCP · tree-sitter · SQLite</text>`);
    parts.push(`<text x="20" y="${stackY + 40}" font-size="14" fill="${t.inkDim}">Bars = repo languages · bar = level x 2.6</text>`);

    const y0 = stackY + 64;
    parts.push(`<text x="20" y="${y0}" font-size="14" font-weight="bold" fill="${t.textYellow}">ACHIEVEMENTS UNLOCKED</text>`);
    ACHIEVEMENTS.forEach(([title, sub, icon], i) => {
      const y = y0 + 10 + i * 60;
      parts.push(r(20, y, W - 40, 52, t.panel2, ` stroke="${t.border2}" stroke-width="2"`));
      parts.push(`<g transform="translate(32,${y + 18})"><g class="bob" style="animation-delay:-${(i * 0.15).toFixed(2)}s">${achIcon(icon, t)}</g></g>`);
      parts.push(`<text x="72" y="${y + 24}" font-size="14" font-weight="bold" fill="${t.ink}">${esc(title)}</text>`);
      parts.push(`<text x="72" y="${y + 43}" font-size="14" fill="${t.inkDim}">${esc(sub)}</text>`);
    });
    const fy = y0 + 10 + ACHIEVEMENTS.length * 60 + 8;
    parts.push(`<text class="bl" x="20" y="${fy}" font-size="14" fill="${t.textYellow}">&gt; INSERT COIN TO COLLABORATE &lt;</text>`);
  } else {
    const stackY = barTop + 7 * step + 8;
    parts.push(`<text x="20" y="${stackY}" font-size="14" fill="${t.inkDim}">STACK: React · Node + Socket.IO · Flutter · MCP · SQLite</text>`);
    parts.push(`<text x="20" y="${stackY + 18}" font-size="14" fill="${t.inkDim}">Bars = repo languages · bar = level x 2.6</text>`);

    const px = 506;
    const pw = W - px - 22;
    parts.push(`<text x="${px}" y="76" font-size="14" font-weight="bold" fill="${t.textYellow}">ACHIEVEMENTS UNLOCKED</text>`);
    ACHIEVEMENTS.forEach(([title, sub, icon], i) => {
      const y = 86 + i * 58;
      parts.push(r(px, y, pw, 50, t.panel2, ` stroke="${t.border2}" stroke-width="2"`));
      parts.push(`<g transform="translate(${px + 14},${y + 17})"><g class="bob" style="animation-delay:-${(i * 0.15).toFixed(2)}s">${achIcon(icon, t)}</g></g>`);
      parts.push(`<text x="${px + 46}" y="${y + 22}" font-size="14" font-weight="bold" fill="${t.ink}">${esc(title)}</text>`);
      parts.push(`<text x="${px + 46}" y="${y + 40}" font-size="14" fill="${t.inkDim}">${esc(sub)}</text>`);
    });
    parts.push(`<text class="bl" x="22" y="${H - 16}" font-size="14" fill="${t.textYellow}">&gt; INSERT COIN TO COLLABORATE &lt;</text>`);
    parts.push(`<text x="${W - 22}" y="${H - 16}" font-size="14" text-anchor="end" fill="${t.inkDim}">REPOS ${d.repos} · FOLLOWERS ${d.followers} · COMMITS ${d.contributions}</text>`);
  }

  parts.push(`<rect x="2" y="2" width="${W - 4}" height="${H - 4}" rx="12" fill="none" stroke="${t.border}" stroke-width="3"/>`);
  return svgDoc(W, H, `${t.key}-card`, "Sumit Chauhan — player stat card", "Retro RPG player card: skill bars driven by real repository languages, HP hearts and unlocked achievements.", style(), parts.join(""));
}

/* ------------------------------------------------------------------ *
 * 7. DIVIDER (Pac-Man)
 * ------------------------------------------------------------------ */

function divider(t, mobile = false) {
  const W = mobile ? 420 : 820;
  const H = 48;
  const parts = [];
  parts.push(`<rect x="0" y="0" width="${W}" height="${H}" rx="10" fill="${t.panel}"/>`);
  let dots = "";
  for (let x = 46; x < W - 24; x += 40) dots += r(x, 21, 6, 6, t.gold);
  parts.push(dots);
  // Pac-Man: body + a step-based mouth swap (SMIL) that is hidden for reduced motion
  const pac = `<g transform="translate(0,9)"><rect x="0" y="6" width="30" height="18" fill="${t.gold}"/><rect x="2" y="2" width="26" height="26" fill="${t.gold}"/><rect x="4" y="4" width="22" height="22" fill="${t.gold}"/><rect x="15" y="6" width="4" height="4" fill="${t.ink}"/><polygon class="mouth" fill="${t.panel}" points="16,15 34,15 34,15"><animate attributeName="points" dur=".5s" repeatCount="indefinite" calcMode="discrete" values="16,15 34,15 34,15;16,15 34,6 34,24;16,15 34,15 34,15;16,15 34,6 34,24"/></polygon></g>`;
  parts.push(`<g class="pac">${pac}</g>`);
  const ghost = `<g transform="translate(0,11)">${mask(["..####..", ".######.", "########", "##.##.##", "########", "########"], { "#": t.magenta }, 3, 0, 0)}${r(6, 9, 6, 6, "#ffffff")}${r(15, 9, 6, 6, "#ffffff")}${r(8, 11, 3, 3, "#1b2547")}${r(17, 11, 3, 3, "#1b2547")}</g>`;
  parts.push(`<g class="gst">${ghost}</g>`);
  parts.push(`<rect x="2" y="2" width="${W - 4}" height="${H - 4}" rx="8" fill="none" stroke="${t.border2}" stroke-width="2"/>`);
  return svgDoc(W, H, `${t.key}-divider`, "Pixel divider", "Pac-Man eating pellets with a ghost in pursuit.", style(), parts.join(""));
}

/* ------------------------------------------------------------------ *
 * 8. CONTRIBUTION TELEMETRY
 * ------------------------------------------------------------------ */

function contributions(t, d) {
  const cal = d.calendar;
  const W = 820;
  const H = 212;
  const parts = [];
  parts.push(`<rect x="0" y="0" width="${W}" height="${H}" rx="14" fill="${t.panel}"/>`);
  parts.push(`<text x="20" y="30" font-size="15" font-weight="bold" fill="${t.green}">CONTRIBUTION TELEMETRY</text>`);
  parts.push(`<text x="${W - 20}" y="30" font-size="14" text-anchor="end" fill="${t.textYellow}">${d.contributions} COMMITS IN 365 DAYS</text>`);

  const gridX = 40;
  const gridY = 72;
  const cell = 11;
  const gap = 3;
  if (cal) {
    const weeks = cal.weeks;
    let monthLabels = "";
    const seen = new Set();
    weeks.forEach((w, wi) => {
      w.contributionDays.forEach((day, di) => {
        const c = day.contributionCount;
        const lvl = c === 0 ? 0 : c <= 2 ? 1 : c <= 5 ? 2 : c <= 9 ? 3 : 4;
        parts.push(r(gridX + wi * (cell + gap), gridY + di * (cell + gap), cell, cell, t.contrib[lvl], ` class="win" style="animation-delay:-${(((wi * 7 + di) % 24) * 0.13).toFixed(2)}s"`));
      });
      // month label when a week starts a new month
      const first = w.contributionDays[0];
      if (first.weekday === 0) {
        const label = new Date(first.date + "T00:00:00Z").toLocaleString("en-US", { month: "short", timeZone: "UTC" });
        if (!seen.has(label)) {
          seen.add(label);
          monthLabels += `<text x="${gridX + wi * (cell + gap)}" y="${gridY - 10}" font-size="14" fill="${t.inkDim}">${label}</text>`;
        }
      }
    });
    parts.push(monthLabels);
  } else {
    parts.push(`<text x="${W / 2}" y="${H / 2}" font-size="14" text-anchor="middle" fill="${t.inkDim}">Contribution data unavailable — run scripts/generate-svgs.mjs with a token</text>`);
  }

  // legend
  const ly = H - 22;
  const lx = W - 196;
  parts.push(`<text x="${lx - 12}" y="${ly + 10}" font-size="14" text-anchor="end" fill="${t.inkDim}">LESS</text>`);
  for (let i = 0; i < 5; i++) parts.push(r(lx + i * 16, ly, 12, 12, t.contrib[i]));
  parts.push(`<text x="${lx + 90}" y="${ly + 10}" font-size="14" fill="${t.inkDim}">MORE</text>`);
  parts.push(`<text x="20" y="${ly + 10}" font-size="14" fill="${t.inkDim}">PIXEL HEATMAP · data from the GitHub contributions API</text>`);

  parts.push(`<rect x="2" y="2" width="${W - 4}" height="${H - 4}" rx="12" fill="none" stroke="${t.border2}" stroke-width="2"/>`);
  return svgDoc(W, H, `${t.key}-contrib`, "Contribution telemetry", "Pixel heatmap of the last 365 days of GitHub contributions.", style(), parts.join(""));
}

/* ------------------------------------------------------------------ *
 * 9. DOC WRAPPER
 * ------------------------------------------------------------------ */

function svgDoc(w, h, id, title, desc, css, body) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" preserveAspectRatio="xMidYMid meet" shape-rendering="crispEdges" font-family="'Courier New',Consolas,monospace" role="img" aria-labelledby="t-${id}">
<title id="t-${id}">${esc(title)}</title>
<desc>${esc(desc)}</desc>
${css}
${body}
</svg>
`;
}

/* ------------------------------------------------------------------ *
 * 10. MAIN
 * ------------------------------------------------------------------ */

const data = await collect();
console.log(
  `data: repos=${data.repos} followers=${data.followers} stars=${data.stars} commits=${data.contributions} langs=${data.languages.map((l) => l[0] + ":" + l[1]).join(",")}`
);

// Persist the last good response so offline runs stay truthful.
if (data.calendar) {
  writeFileSync(SNAPSHOT_FILE, JSON.stringify(data, null, 2) + "\n", "utf8");
  console.log(`  snapshot -> ${SNAPSHOT_FILE}`);
}

if (!existsSync(OUT)) mkdirSync(OUT, { recursive: true });

const files = [];
const push = (name, content) => files.push([name, content]);

for (const key of ["dark", "light"]) {
  const t = THEMES[key];
  push(`hero-${key}.v2.svg`, hero(t, data));
  push(`hero-${key}.mobile.v2.svg`, hero(t, data, { mobile: true }));
  push(`card-${key}.v2.svg`, card(t, data));
  push(`card-${key}.mobile.v2.svg`, card(t, data, { mobile: true }));
  push(`divider-${key}.v2.svg`, divider(t));
  push(`divider-${key}.mobile.v2.svg`, divider(t, true));
  push(`contributions-${key}.v2.svg`, contributions(t, data));
}

for (const [name, content] of files) {
  writeFileSync(join(OUT, name), content, "utf8");
  const kb = (Buffer.byteLength(content) / 1024).toFixed(1);
  console.log(`  ${name.padEnd(30)} ${kb.padStart(6)} KB`);
}
