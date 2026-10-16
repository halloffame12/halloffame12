#!/usr/bin/env node
/**
 * check-contrast.mjs — WCAG AA audit for every text/background pair used in
 * the profile SVGs. No dependencies; run with `node scripts/check-contrast.mjs`.
 *
 * Threshold: 4.5:1 for normal text, 3:1 for large text (>= 18.66px bold or
 * >= 24px). Anything at or below the large-text size is treated as normal.
 */
const hex = (h) => {
  const s = h.replace("#", "");
  const n = s.length === 3 ? s.split("").map((c) => c + c).join("") : s;
  return [0, 2, 4].map((i) => parseInt(n.slice(i, i + 2), 16) / 255);
};

const lin = (c) => (c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4));

const luminance = (h) => {
  const [r, g, b] = hex(h).map(lin);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};

const ratio = (fg, bg) => {
  const a = luminance(fg);
  const b = luminance(bg);
  const [hi, lo] = a > b ? [a, b] : [b, a];
  return (hi + 0.05) / (lo + 0.05);
};

const panel = { dark: "#0b0f1e", light: "#f2f8ff" };
const panel2 = { dark: "#121a33", light: "#e3f0ff" };
const sky = { dark: "#131c38", light: "#d8ecff" };

/** [label, fg, bg, large?] */
const PAIRS = [
  // ---- dark theme ----
  ["dark · primary ink on panel", "#eafff6", panel.dark, false],
  ["dark · secondary ink on panel", "#a9c9bf", panel.dark, false],
  ["dark · green accent on panel", "#00ff99", panel.dark, false],
  ["dark · yellow accent on panel", "#ffe95c", panel.dark, false],
  ["dark · red accent on panel", "#ff7b7b", panel.dark, false],
  ["dark · cyan accent on panel", "#63e6ff", panel.dark, false],
  ["dark · gold on panel", "#ffd54f", panel.dark, false],
  ["dark · primary ink on panel2 (HUD/achievements)", "#eafff6", panel2.dark, false],
  ["dark · secondary ink on panel2", "#a9c9bf", panel2.dark, false],
  ["dark · green on panel2 (HUD)", "#00ff99", panel2.dark, false],
  ["dark · yellow on panel2 (HUD)", "#ffe95c", panel2.dark, false],
  ["dark · title green on sky band", "#00ff99", sky.dark, true],
  ["dark · tagline ink on sky band", "#eafff6", sky.dark, false],
  ["dark · ghost pupils on eye whites", "#1b2547", "#ffffff", false],
  ["dark · gold pellet on ground", "#ffd54f", "#070b16", true],

  // ---- light theme ----
  ["light · primary ink on panel", "#0b1b3a", panel.light, false],
  ["light · secondary ink on panel", "#33507a", panel.light, false],
  ["light · green accent on panel", "#00694a", panel.light, false],
  ["light · yellow accent on panel", "#7a4f00", panel.light, false],
  ["light · red accent on panel", "#a8251d", panel.light, false],
  ["light · cyan accent on panel", "#0b4fa8", panel.light, false],
  ["light · gold on panel", "#9c6200", panel.light, false],
  ["light · primary ink on panel2 (HUD/achievements)", "#0b1b3a", panel2.light, false],
  ["light · secondary ink on panel2", "#33507a", panel2.light, false],
  ["light · green on panel2 (HUD)", "#00694a", panel2.light, false],
  ["light · yellow on panel2 (HUD)", "#7a4f00", panel2.light, false],
  ["light · title ink on sky band", "#0b1b3a", sky.light, true],
  ["light · tagline ink on sky band", "#0b1b3a", sky.light, false],
  ["light · ghost pupils on eye whites", "#1b2547", "#ffffff", false],
  ["light · gold pellet on ground", "#9c6200", "#e7dcbf", true],
];

let fail = 0;
const rows = PAIRS.map(([label, fg, bg, large]) => {
  const r = ratio(fg, bg);
  const need = large ? 3 : 4.5;
  const ok = r >= need;
  if (!ok) fail++;
  return { label, r, need, ok };
});

const width = Math.max(...rows.map((r) => r.label.length));
for (const { label, r, need, ok } of rows) {
  console.log(
    `${ok ? "PASS" : "FAIL"}  ${label.padEnd(width)}  ${r.toFixed(2)}:1  (need ${need}:1)`
  );
}
console.log(`\n${rows.length - fail}/${rows.length} pairs meet WCAG AA.`);
if (fail) process.exitCode = 1;
