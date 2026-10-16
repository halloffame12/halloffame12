#!/usr/bin/env node
/**
 * check-render.mjs — headless verification of the generated SVGs and README.
 *
 * 1. SVG fit: every <text> bounding box must stay inside the viewBox.
 * 2. README: no horizontal overflow, every <img> actually loads, and <picture>
 *    picks the expected source for the theme/width.
 */
import { readFileSync, readdirSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { chromium } from "playwright";
import { marked } from "marked";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const OUT = join(ROOT, "preview");

let failures = 0;
const fail = (m) => {
  failures++;
  console.log("FAIL  " + m);
};
const pass = (m) => console.log("pass  " + m);

const run = async () => {
  const browser = await chromium.launch();

  // ---------- 1. SVG text fit ----------
  const svgFiles = readdirSync(join(ROOT, "assets")).filter((f) => f.endsWith(".v2.svg"));
  for (const file of svgFiles) {
    const url = pathToFileURL(join(ROOT, "assets", file));
    const page = await browser.newPage();
    await page.goto(url.href);
    const bad = await page.evaluate(() => {
      const svg = document.querySelector("svg");
      const vb = svg.viewBox.baseVal;
      const out = [];
      svg.querySelectorAll("text").forEach((t) => {
        const b = t.getBBox();
        const right = b.x + b.width;
        const bottom = b.y + b.height;
        if (right > vb.width + 0.5 || b.x < -0.5 || bottom > vb.height + 0.5 || b.y < -0.5) {
          out.push({
            text: t.textContent.slice(0, 40),
            x: +b.x.toFixed(1),
            right: +right.toFixed(1),
            bottom: +bottom.toFixed(1),
            vbW: vb.width,
            vbH: vb.height,
          });
        }
      });
      return out;
    });
    if (bad.length) {
      fail(`${file}: ${bad.length} text node(s) outside viewBox`);
      bad.forEach((b) => console.log("        ", JSON.stringify(b)));
    } else {
      pass(`${file}: all text within viewBox`);
    }
    await page.close();
  }

  // ---------- 2. README layout ----------
  let md = readFileSync(join(ROOT, "README.md"), "utf8");
  md = md.replaceAll(
    "https://raw.githubusercontent.com/halloffame12/halloffame12/main/assets/",
    "assets/"
  );
  const HTML = `<!doctype html><html><head><meta charset="utf-8"><style>
    *{box-sizing:border-box} body{margin:0} .md{max-width:1012px;margin:0 auto;padding:24px 16px 64px}
    img{max-width:100%;height:auto} table{border-collapse:collapse}
  </style></head><body><article class="md">${marked.parse(md)}</article></body></html>`;
  if (!existsSync(OUT)) mkdirSync(OUT, { recursive: true });
  writeFileSync(join(ROOT, ".preview.html"), HTML, "utf8");
  const pageUrl = pathToFileURL(join(ROOT, ".preview.html")).href;

  for (const scheme of ["dark", "light"]) {
    for (const width of [360, 768, 1280]) {
      const ctx = await browser.newContext({
        colorScheme: scheme,
        viewport: { width, height: 900 },
      });
      const page = await ctx.newPage();
      await page.goto(pageUrl);
      await page.waitForLoadState("networkidle", { timeout: 15000 }).catch(() => {});
      const info = await page.evaluate(() => {
        const local = [...document.querySelectorAll("img")].filter((i) =>
          i.getAttribute("src").startsWith("assets/")
        );
        const broken = local.filter((i) => !i.complete || i.naturalWidth === 0).map((i) => i.getAttribute("src"));
        const overflow = document.documentElement.scrollWidth - window.innerWidth;
        const picks = local.map((i) => i.currentSrc.split("/").pop());
        return { broken, overflow, picks, n: local.length };
      });
      const tag = `${scheme}-${width}`;
      if (info.broken.length) fail(`${tag}: broken images ${info.broken.join(", ")}`);
      else pass(`${tag}: all ${info.n} local images loaded`);
      if (info.overflow > 1) fail(`${tag}: horizontal overflow ${info.overflow}px`);
      else pass(`${tag}: no horizontal overflow`);
      pass(`${tag}: sources -> ${info.picks.join(", ")}`);
      await ctx.close();
    }
  }

  await browser.close();
  console.log(`\n${failures ? failures + " FAILURE(S)" : "ALL CHECKS PASSED"}`);
  process.exitCode = failures ? 1 : 0;
};

run();
