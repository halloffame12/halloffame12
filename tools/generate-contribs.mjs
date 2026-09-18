import { execSync } from 'node:child_process';
import { writeFileSync, unlinkSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const USER = 'halloffame12';

const ql = `query {
  user(login: "${USER}") {
    contributionsCollection {
      contributionCalendar {
        totalContributions
        months { name year firstDay }
        weeks {
          firstDay
          contributionDays {
            date
            contributionCount
          }
        }
      }
    }
  }
}`;

const qFile = join(tmpdir(), 'contribs.graphql');
writeFileSync(qFile, ql);
let raw;
try {
  raw = execSync(`gh api graphql -F query=@${qFile}`, { encoding: 'utf8', maxBuffer: 1e7 });
} finally {
  unlinkSync(qFile);
}
const cal = JSON.parse(raw).data.user.contributionsCollection.contributionCalendar;

const PALETTES = {
  dark: {
    bg: '#0d1117', text: '#8b949e', strong: '#e6edf3', border: '#30363d',
    cells: ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'],
    cellStroke: 'rgba(255,255,255,0.05)',
  },
  light: {
    bg: '#ffffff', text: '#656d76', strong: '#24292f', border: '#d0d7de',
    cells: ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'],
    cellStroke: 'rgba(0,0,0,0.05)',
  },
};

const ALL_COUNTS = cal.weeks.flatMap(w => w.contributionDays).map(d => d.contributionCount).filter(c => c > 0).sort((a, b) => a - b);
const CUTS = [0, 1, 2, 3].map(i => ALL_COUNTS[Math.floor((ALL_COUNTS.length - 1) * ((i + 1) / 4))] ?? 0);
function LEVEL_OF(count) {
  const level = CUTS.findIndex(c => count <= c) + 1;
  return level === 0 ? 4 : level;
}

const CELL = 11;
const GAP = 3;
const WEEKW = CELL + GAP;
const ROWS = 7;
const WEEKS = cal.weeks;
const GRID_W = WEEKS.length * WEEKW - GAP;
const GRID_H = ROWS * WEEKW - GAP;
const PAD_TOP = 24;      // month labels
const PAD_LEFT = 34;     // day labels
const PAD_RIGHT = 14;
const PAD_BOTTOM = 34;   // legend
const MONTH_BAND_H = 18;

function esc(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function build(palette) {
  const { bg, text, border, cells, cellStroke } = palette;
  const W = PAD_LEFT + GRID_W + PAD_RIGHT;
  const MONTHS_Y = MONTH_BAND_H - 14;
  const H = PAD_TOP + GRID_H + PAD_BOTTOM;

  const out = [];
  out.push(`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" font-family="-apple-system, 'Segoe UI', sans-serif">`);
  out.push(`  <rect x="0" y="0" width="${W}" height="${H}" rx="14" fill="${bg}"/>`);
  out.push(`  <rect x="0.75" y="0.75" width="${W - 1.5}" height="${H - 1.5}" rx="14" fill="none" stroke="${border}" stroke-width="1.5"/>`);

  // month labels
  let prevIdx = -1;
  cal.months.forEach((m) => {
    if (m.firstDay < WEEKS[0].firstDay) return;
    let idx = 0;
    for (let w = 0; w < WEEKS.length; w++) {
      if (WEEKS[w].firstDay >= m.firstDay) { idx = w; break; }
    }
    if (idx === prevIdx) return;
    prevIdx = idx;
    const x = PAD_LEFT + idx * WEEKW;
    out.push(`  <text x="${x}" y="${MONTHS_Y + 1}" font-size="10" fill="${text}">${esc(m.name)}</text>`);
  });

  // day labels
  const dayLabels = { 0: 'Mon', 2: 'Wed', 4: 'Fri' };
  for (let r = 0; r < ROWS; r++) {
    const col0 = new Date(WEEKS[0].firstDay);
    col0.setDate(col0.getDate() + r);
    const dn = col0.getDay();
    if (dayLabels[dn] !== undefined) {
      const y = PAD_TOP + r * WEEKW + CELL / 2 + 3.5;
      out.push(`  <text x="${PAD_LEFT - 6}" y="${y}" font-size="9" text-anchor="end" fill="${text}">${dayLabels[dn]}</text>`);
    }
  }

  // cells, staggered per column
  WEEKS.forEach((week, w) => {
    const x = PAD_LEFT + w * WEEKW;
    const begin = (0.05 + w * 0.025).toFixed(3);
    week.contributionDays.forEach((d, r) => {
      const y = PAD_TOP + r * WEEKW;
      const lvl = d.contributionCount === 0 ? 0 : LEVEL_OF(d.contributionCount);
      const fill = cells[lvl];
      const title = `${d.date}: ${d.contributionCount} contribution${d.contributionCount === 1 ? '' : 's'}`;
      out.push(`  <g opacity="0"><animate attributeName="opacity" from="0" to="1" dur="0.35s" begin="${begin}s" fill="freeze"/>`);
      out.push(`    <rect x="${x}" y="${y}" width="${CELL}" height="${CELL}" rx="2.5" fill="${fill}" stroke="${cellStroke}">`);
      out.push(`      <title>${title}</title>`);
      out.push(`    </rect>`);
      out.push(`  </g>`);
    });
  });

  // legend
  const legendY = PAD_TOP + GRID_H + 12;
  out.push(`  <text x="${PAD_LEFT}" y="${legendY + 9}" font-size="9" fill="${text}">Less</text>`);
  let lx = PAD_LEFT + 32;
  cells.forEach((c) => {
    out.push(`  <rect x="${lx}" y="${legendY}" width="${9}" height="${9}" rx="2" fill="${c}"/>`);
    lx += 12;
  });
  out.push(`  <text x="${lx + 2}" y="${legendY + 9}" font-size="9" fill="${text}">More</text>`);

  // total
  const totalY = legendY + 24;
  out.push(`  <text x="${PAD_LEFT}" y="${totalY}" font-size="10" fill="${text}">`);
  out.push(`    ${cal.totalContributions} contributions in the last year<animate attributeName="opacity" from="0" to="1" dur="0.5s" begin="1.6s" fill="freeze"/>`);
  out.push(`  </text>`);

  out.push(`</svg>`);
  return out.join('\n');
}

writeFileSync('assets/contributions-dark.svg', build(PALETTES.dark));
writeFileSync('assets/contributions-light.svg', build(PALETTES.light));
console.log(`totalContributions: ${cal.totalContributions}`);
console.log('wrote assets/contributions-dark.svg and assets/contributions-light.svg');