import { writeFileSync } from 'node:fs';

// ---------- Skills matrix card ----------
const SKILLS_W = 720;
const SKILLS_H = 486;

const C = {
  bg: '#0d1117', border: '#30363d', title: '#161b22', titleText: '#8b949e',
  prompt: '#58a6ff', value: '#e6edf3', dim: '#8b949e', muted: '#484f58',
  track: '#21262d',
  blue: '#58a6ff', purple: '#a371f7', green: '#39d353', orange: '#f0883e',
};

function esc(s) {
  return s.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
}

function skillsBuild() {
  const out = [];
  out.push(`<svg xmlns="http://www.w3.org/2000/svg" width="${SKILLS_W}" height="${SKILLS_H}" viewBox="0 0 ${SKILLS_W} ${SKILLS_H}" font-family="Consolas, Menlo, 'DejaVu Sans Mono', monospace">`);
  out.push(`  <rect x="0" y="0" width="${SKILLS_W}" height="${SKILLS_H}" rx="16" fill="${C.bg}"/>`);
  out.push(`  <rect x="0" y="0" width="${SKILLS_W}" height="40" rx="16" fill="${C.title}"/>`);
  out.push(`  <rect x="0" y="20" width="${SKILLS_W}" height="20" fill="${C.title}"/>`);
  out.push(`  <circle cx="28" cy="20" r="6.5" fill="#ff5f57"/>`);
  out.push(`  <circle cx="52" cy="20" r="6.5" fill="#febc2e"/>`);
  out.push(`  <circle cx="76" cy="20" r="6.5" fill="#28c840"/>`);
  out.push(`  <text x="360" y="26" text-anchor="middle" font-size="13" fill="${C.titleText}">sumit@skills: tree ~/expertise</text>`);
  out.push(`  <rect x="0.75" y="0.75" width="${SKILLS_W - 1.5}" height="${SKILLS_H - 1.5}" rx="16" fill="none" stroke="${C.border}" stroke-width="1.5"/>`);

  out.push(`  <g opacity="0"><animate attributeName="opacity" from="0" to="1" dur="0.2s" begin="0.15s" fill="freeze"/>`);
  out.push(`    <text x="40" y="66" font-size="14" fill="${C.prompt}">$ system --spec</text>`);
  out.push(`  </g>`);

  function head(x, y, label, accent, begin) {
    out.push(`  <g opacity="0"><animate attributeName="opacity" from="0" to="1" dur="0.25s" begin="${begin}s" fill="freeze"/>`);
    out.push(`    <rect x="${x}" y="${y - 8}" width="3" height="12" rx="1.5" fill="${accent}"/>`);
    out.push(`    <text x="${x + 12}" y="${y + 1}" font-size="11" fill="${C.dim}">${esc(label)}</text>`);
    out.push(`  </g>`);
  }

  function bar(x, y, label, pct, accent, begin) {
    const w = Math.round((pct / 100) * 300);
    out.push(`  <g opacity="0"><animate attributeName="opacity" from="0" to="1" dur="0.3s" begin="${begin}s" fill="freeze"/>`);
    out.push(`    <text x="${x}" y="${y}" font-size="12.5" fill="${C.value}">${esc(label)}</text>`);
    out.push(`    <text x="${x + 300}" y="${y}" font-size="12.5" text-anchor="end" fill="${accent}">${pct}%</text>`);
    out.push(`    <rect x="${x}" y="${y + 8}" width="300" height="5" rx="2.5" fill="${C.track}"/>`);
    out.push(`    <rect x="${x}" y="${y + 8}" width="0" height="5" rx="2.5" fill="${accent}"><animate attributeName="width" from="0" to="${w}" dur="0.6s" begin="${(begin + 0.25).toFixed(2)}s" fill="freeze"/></rect>`);
    out.push(`  </g>`);
  }

  // Column A
  head(40, 92, 'LANGUAGES', C.orange, 0.4);
  bar(40, 116, 'TypeScript', 92, C.orange, 0.55);
  bar(40, 154, 'Python', 86, C.orange, 0.7);
  bar(40, 192, 'Rust', 74, C.orange, 0.85);
  bar(40, 230, 'Dart', 68, C.orange, 1.0);
  bar(40, 268, 'SQL & SQLite', 80, C.orange, 1.15);

  // Column B — Frontend & Apps
  head(375, 92, 'FRAMEWORKS & APPS', C.blue, 0.55);
  bar(375, 116, 'React', 88, C.blue, 0.7);
  bar(375, 154, 'Flutter', 76, C.blue, 0.85);
  bar(375, 192, 'Node.js', 84, C.blue, 1.0);

  // Column B — Realtime & AI
  head(375, 236, 'REALTIME & AI TOOLING', C.green, 1.15);
  bar(375, 260, 'MCP Servers', 94, C.green, 1.3);
  bar(375, 298, 'Socket.IO', 82, C.green, 1.45);
  bar(375, 336, 'Firebase', 78, C.green, 1.6);
  bar(375, 374, 'tree-sitter', 76, C.green, 1.75);
  bar(375, 412, 'TensorFlow', 66, C.green, 1.9);

  out.push(`  <g opacity="0"><animate attributeName="opacity" from="0" to="1" dur="0.3s" begin="2.4s" fill="freeze"/>`);
  out.push(`    <text x="40" y="458" font-size="11" fill="${C.muted}">// type-safe · performance-first · documented · shipped bare-metal across platforms</text>`);
  out.push(`  </g>`);

  out.push(`</svg>`);
  writeFileSync('assets/skills-card.svg', out.join('\n'));
  console.log('wrote assets/skills-card.svg');
}

// ---------- Journey timeline card ----------
const J_W = 720;
const J_H = 486;

const ERA = [
  { c: C.blue,   year: '2021', title: 'GitHub',            desc: 'began the open-source journey' },
  { c: C.purple, year: '2024', title: 'Snake AI',          desc: 'Deep Q-Learning milestone · TensorFlow' },
  { c: C.orange, year: '2025', title: 'NASA Space Apps',   desc: 'Top 4 · DTC regional' },
  { c: C.purple, year: '2026', title: 'IIT Patna',         desc: 'B.S. Computer Science & Data Science · CGPA 8.4' },
  { c: C.green,  year: '2026', title: 'Rozana',            desc: 'MIS / Automation Intern · Python' },
  { c: C.blue,   year: '2026', title: 'Versz',             desc: 'founder · live at versz.app' },
  { c: C.green,  year: '2026', title: 'ctx',               desc: 'released via npm · cargo · brew · scoop · winget' },
];

function journeyBuild() {
  const out = [];
  out.push(`<svg xmlns="http://www.w3.org/2000/svg" width="${J_W}" height="${J_H}" viewBox="0 0 ${J_W} ${J_H}" font-family="Consolas, Menlo, 'DejaVu Sans Mono', monospace">`);
  out.push(`  <rect x="0" y="0" width="${J_W}" height="${J_H}" rx="16" fill="${C.bg}"/>`);
  out.push(`  <rect x="0" y="0" width="${J_W}" height="40" rx="16" fill="${C.title}"/>`);
  out.push(`  <rect x="0" y="20" width="${J_W}" height="20" fill="${C.title}"/>`);
  out.push(`  <circle cx="28" cy="20" r="6.5" fill="#ff5f57"/>`);
  out.push(`  <circle cx="52" cy="20" r="6.5" fill="#febc2e"/>`);
  out.push(`  <circle cx="76" cy="20" r="6.5" fill="#28c840"/>`);
  out.push(`  <text x="360" y="26" text-anchor="middle" font-size="13" fill="${C.titleText}">sumit@journey: git log --oneline</text>`);
  out.push(`  <rect x="0.75" y="0.75" width="${J_W - 1.5}" height="${J_H - 1.5}" rx="16" fill="none" stroke="${C.border}" stroke-width="1.5"/>`);

  out.push(`  <g opacity="0"><animate attributeName="opacity" from="0" to="1" dur="0.2s" begin="0.15s" fill="freeze"/>`);
  out.push(`    <text x="40" y="66" font-size="14" fill="${C.prompt}">$ git log --oneline --signature</text>`);
  out.push(`  </g>`);

  const xLine = 88;
  out.push(`  <rect x="${xLine - 1}" y="92" width="2" height="${ERA.length * 52}" rx="1" fill="${C.track}"/>`);

  ERA.forEach((e, i) => {
    const y = 108 + i * 54;
    const begin = (0.5 + i * 0.35).toFixed(2);
    out.push(`  <g opacity="0"><animate attributeName="opacity" from="0" to="1" dur="0.3s" begin="${begin}s" fill="freeze"/>`);
    out.push(`    <circle cx="${xLine}" cy="${y - 6}" r="5" fill="${C.bg}" stroke="${e.c}" stroke-width="2.5"><animate attributeName="r" values="0;6;5" keyTimes="0;0.7;1" dur="0.5s" begin="${begin}s" fill="freeze"/></circle>`);
    out.push(`    <text x="${xLine + 20}" y="${y}" font-size="13" font-weight="bold" fill="${e.c}">${e.year} — ${esc(e.title)}</text>`);
    out.push(`    <text x="${xLine + 20}" y="${y + 17}" font-size="12" fill="${C.dim}">${esc(e.desc)}</text>`);
    out.push(`  </g>`);
  });

  out.push(`  <g opacity="0"><animate attributeName="opacity" from="0" to="1" dur="0.3s" begin="3.2s" fill="freeze"/>`);
  out.push(`    <text x="40" y="466" font-size="11" fill="${C.muted}">${esc('// && git commit -m "build in public · ship everywhere"')}</text>`);
  out.push(`  </g>`);

  out.push(`</svg>`);
  writeFileSync('assets/journey-card.svg', out.join('\n'));
  console.log('wrote assets/journey-card.svg');
}

skillsBuild();
journeyBuild();