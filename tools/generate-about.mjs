import { writeFileSync } from 'node:fs';

const W = 720;
const H = 580;

const P = {
  dark: {
    bg: '#0d1117', border: '#30363d', title: '#161b22', titleText: '#8b949e',
    prompt: '#58a6ff', head: '#8b949e', key: '#8b949e', value: '#e6edf3',
    blue: '#58a6ff', purple: '#a371f7', green: '#39d353', orange: '#f0883e',
    muted: '#484f58',
  },
  light: {
    bg: '#ffffff', border: '#d0d7de', title: '#f6f8fa', titleText: '#57606a',
    prompt: '#0550ae', head: '#57606a', key: '#57606a', value: '#24292f',
    blue: '#0969da', purple: '#8250df', green: '#1a7f37', orange: '#bc4c00',
    muted: '#afb8c1',
  },
};

function row(out, c, { y, key, value, begin, accent }) {
  out.push(`  <g opacity="0"><animate attributeName="opacity" from="0" to="1" dur="0.35s" begin="${begin}s" fill="freeze"/>`);
  out.push(`    <text x="48" y="${y}" font-size="13" fill="${c.key}">${key}</text>`);
  out.push(`    <text x="${168}" y="${y}" font-size="13" fill="${accent}">·</text>`);
  out.push(`    <text x="180" y="${y}" font-size="13" font-weight="bold" fill="${c.value}">${value}</text>`);
  out.push(`  </g>`);
}

function head(out, c, { y, label, accent, begin }) {
  out.push(`  <g opacity="0"><animate attributeName="opacity" from="0" to="1" dur="0.3s" begin="${begin}s" fill="freeze"/>`);
  out.push(`    <rect x="32" y="${y - 10}" width="3" height="14" rx="1.5" fill="${accent}"><animate attributeName="width" from="0" to="3" dur="0.25s" begin="${(begin + 0.15).toFixed(2)}s" fill="freeze"/></rect>`);
  out.push(`    <text x="44" y="${y + 1}" font-size="11" fill="${c.head}">${label}</text>`);
  out.push(`  </g>`);
}

function bullet(out, c, { y, text, begin, accent, cursor }) {
  const sw = text.length * 8;
  out.push(`  <g opacity="0"><animate attributeName="opacity" from="0" to="1" dur="0.35s" begin="${begin}s" fill="freeze"/>`);
  out.push(`    <text x="48" y="${y + 2}" font-size="13" fill="${accent}">\u2192</text>`);
  out.push(`    <text x="74" y="${y}" font-size="13" fill="${c.value}">${text}</text>`);
  if (cursor) {
    out.push(`    <rect x="${74 + sw + 6}" y="${y - 12}" width="9" height="16" fill="${c.blue}"><animate attributeName="opacity" values="1;0;1" dur="0.9s" repeatCount="indefinite"/></rect>`);
  }
  out.push(`  </g>`);
}

function build(name, c) {
  const out = [];
  out.push(`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" font-family="Consolas, Menlo, 'DejaVu Sans Mono', monospace">`);
  out.push(`  <rect x="0" y="0" width="${W}" height="${H}" rx="16" fill="${c.bg}"/>`);
  out.push(`  <rect x="0" y="0" width="${W}" height="40" rx="16" fill="${c.title}"/>`);
  out.push(`  <rect x="0" y="20" width="${W}" height="20" fill="${c.title}"/>`);
  out.push(`  <circle cx="28" cy="20" r="6.5" fill="#ff5f57"/>`);
  out.push(`  <circle cx="52" cy="20" r="6.5" fill="#febc2e"/>`);
  out.push(`  <circle cx="76" cy="20" r="6.5" fill="#28c840"/>`);
  out.push(`  <text x="360" y="26" text-anchor="middle" font-size="13" fill="${c.titleText}">sumit@about: tree ~/whois</text>`);
  out.push(`  <rect x="0.75" y="0.75" width="${W - 1.5}" height="${H - 1.5}" rx="16" fill="none" stroke="${c.border}" stroke-width="1.5"/>`);

  out.push(`  <g opacity="0"><animate attributeName="opacity" from="0" to="1" dur="0.2s" begin="0.15s" fill="freeze"/>`);
  out.push(`    <text x="32" y="66" font-size="14" fill="${c.prompt}">$ cat about.json</text>`);
  out.push(`  </g>`);

  head(out, c, { y: 96, label: '// identity', accent: c.blue, begin: 0.4 });
  row(out, c, { y: 126, key: 'name', value: 'Sumit Chauhan', begin: 0.55, accent: c.blue });
  row(out, c, { y: 156, key: 'role', value: 'Open Source Engineer', begin: 0.7, accent: c.blue });
  row(out, c, { y: 186, key: 'focus', value: 'AI-Driven Automation & Developer Tooling', begin: 0.85, accent: c.blue });
  row(out, c, { y: 216, key: 'location', value: 'Delhi, India', begin: 1.0, accent: c.blue });

  head(out, c, { y: 260, label: '// education & honors', accent: c.purple, begin: 1.2 });
  row(out, c, { y: 290, key: 'education', value: 'IIT Patna — B.S. Computer Science & Data Science', begin: 1.35, accent: c.purple });
  row(out, c, { y: 320, key: 'cgpa', value: '8.4 / 10 · Class of 2030', begin: 1.5, accent: c.purple });
  row(out, c, { y: 350, key: 'award', value: 'NASA Space Apps 2025 — Top 4 (DTC regional)', begin: 1.65, accent: c.purple });
  row(out, c, { y: 380, key: 'research', value: 'BrowserOS architecture — OSF Preprints', begin: 1.8, accent: c.purple });

  head(out, c, { y: 424, label: '// currently', accent: c.green, begin: 2.0 });
  bullet(out, c, { y: 452, text: 'intern @ Rozana — MIS / automation workflows', begin: 2.15, accent: c.green });
  bullet(out, c, { y: 482, text: 'founder @ Versz — live social debate platform (versz.app)', begin: 2.3, accent: c.green });
  bullet(out, c, { y: 512, text: 'building ctx — open-source MCP code-intelligence server', begin: 2.45, accent: c.green });
  bullet(out, c, { y: 542, text: 'open to SDE intern roles — AI tooling · backend · full-stack', begin: 2.6, accent: c.orange, cursor: true });

  out.push(`  <g opacity="0"><animate attributeName="opacity" from="0" to="1" dur="0.3s" begin="3.0s" fill="freeze"/>`);
  out.push(`    <text x="32" y="574" font-size="11" fill="${c.muted}">// building in public · 537 contributions this year · open source first</text>`);
  out.push(`  </g>`);

  out.push(`</svg>`);
  writeFileSync(`assets/about-${name}.svg`, out.join('\n'));
  console.log(`wrote assets/about-${name}.svg`);
}

build('dark', P.dark);
build('light', P.light);