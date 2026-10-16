#!/usr/bin/env node
/**
 * preview.mjs — renders README.md the way GitHub would, then screenshots it
 * with Chromium at several widths in both color schemes, plus animation frames
 * and a reduced-motion pass.
 *
 * Run from the repo root or anywhere:  node scripts/preview.mjs
 * Output: preview/*.png  (git-ignored)
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { chromium } from "playwright";
import { marked } from "marked";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const OUT = join(ROOT, "preview");

let md = readFileSync(join(ROOT, "README.md"), "utf8");
// Point local assets at the on-disk copies so we test the real SVGs.
md = md.replaceAll(
  "https://raw.githubusercontent.com/halloffame12/halloffame12/main/assets/",
  "assets/"
);

const body = marked.parse(md);

const HTML = `<!doctype html><html><head><meta charset="utf-8">
<style>
  :root{color-scheme:dark light}
  *{box-sizing:border-box}
  body{margin:0;background:#ffffff;color:#1f2328;
       font:16px/1.5 -apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif}
  @media (prefers-color-scheme: dark){ body{background:#0d1117;color:#e6edf3} }
  .md{max-width:1012px;margin:0 auto;padding:24px 16px 64px}
  img{max-width:100%;height:auto}
  h2{border-bottom:1px solid rgba(127,127,127,.25);padding-bottom:.3em}
  a{color:#0969da} @media (prefers-color-scheme: dark){ a{color:#4493f8} }
  hr{border:0;border-top:1px solid rgba(127,127,127,.25);margin:24px 0}
  code{background:rgba(127,127,127,.15);padding:.15em .35em;border-radius:5px;font-size:.9em}
  table{border-collapse:collapse} td{padding:6px}
</style></head>
<body><article class="md">${body}</article></body></html>`;

if (!existsSync(OUT)) mkdirSync(OUT, { recursive: true });
const page_url = pathToFileURL(join(ROOT, ".preview.html"));
writeFileSync(join(ROOT, ".preview.html"), HTML, "utf8");

const shot = async (page, name) => {
  await page.screenshot({ path: join(OUT, name), fullPage: true });
  console.log("  ", name);
};

const run = async () => {
  const browser = await chromium.launch();

  // ---- layout passes: dark + light × 360 / 768 / 1280 ----
  for (const scheme of ["dark", "light"]) {
    for (const width of [360, 768, 1280]) {
      const ctx = await browser.newContext({
        colorScheme: scheme,
        viewport: { width, height: 900 },
        deviceScaleFactor: 1,
      });
      const page = await ctx.newPage();
      await page.goto(page_url.href);
      await page.waitForLoadState("networkidle", { timeout: 12000 }).catch(() => {});
      await page.waitForTimeout(800);
      await shot(page, `layout-${scheme}-${width}.png`);
      await ctx.close();
    }
  }

  // ---- animation frames (dark, desktop) ----
  {
    const ctx = await browser.newContext({
      colorScheme: "dark",
      viewport: { width: 1000, height: 900 },
    });
    const page = await ctx.newPage();
    await page.goto(page_url.href);
    await page.waitForLoadState("networkidle", { timeout: 12000 }).catch(() => {});
    const hero = page.locator(".md img").first();
    for (const t of [1000, 4000, 7000]) {
      await page.waitForTimeout(t === 1000 ? 1000 : 3000);
      await hero.screenshot({ path: join(OUT, `anim-hero-${t}ms.png`) });
      console.log("   anim-hero-" + t + "ms.png");
    }
    await ctx.close();
  }

  // ---- reduced motion ----
  {
    const ctx = await browser.newContext({
      colorScheme: "dark",
      viewport: { width: 1000, height: 900 },
      reducedMotion: "reduce",
    });
    const page = await ctx.newPage();
    await page.goto(page_url.href);
    await page.waitForLoadState("networkidle", { timeout: 12000 }).catch(() => {});
    await page.waitForTimeout(500);
    await shot(page, "reduced-motion-dark.png");
    await ctx.close();
  }

  await browser.close();
  console.log("done ->", OUT);
};

run();
