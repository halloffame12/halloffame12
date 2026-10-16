#!/usr/bin/env node
/**
 * check-motion.mjs — verifies the SVGs animate normally and freeze under
 * prefers-reduced-motion, and that the reduced-motion fallback classes flip.
 */
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { chromium } from "playwright";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");

let failures = 0;
const check = (ok, msg) => {
  console.log((ok ? "pass  " : "FAIL  ") + msg);
  if (!ok) failures++;
};

const shot = async (browser, file, reduce, waitMs) => {
  const ctx = await browser.newContext({ reducedMotion: reduce ? "reduce" : "no-preference", viewport: { width: 900, height: 500 } });
  const page = await ctx.newPage();
  await page.goto(pathToFileURL(join(ROOT, "assets", file)).href);
  await page.waitForTimeout(waitMs);
  const buf = await page.screenshot();
  const cls = await page.evaluate(() => {
    const g = (sel) => {
      const el = document.querySelector(sel);
      return el ? getComputedStyle(el).display : "missing";
    };
    return { rmHide: g(".rm-hide"), rmShow: g(".rm-show") };
  });
  await ctx.close();
  return { buf, cls };
};

const run = async () => {
  const browser = await chromium.launch();
  const file = "hero-dark.v2.svg";

  const a = await shot(browser, file, false, 800);
  const b = await shot(browser, file, false, 2600);
  check(!a.buf.equals(b.buf), "hero animates when motion is allowed (frames differ)");
  check(a.cls.rmShow === "none", "normal mode hides the reduced-motion fallback (.rm-show:none)");
  check(a.cls.rmHide !== "none", "normal mode shows the animated title (.rm-hide visible)");

  const c = await shot(browser, file, true, 800);
  const d = await shot(browser, file, true, 2600);
  check(c.buf.equals(d.buf), "reduced motion freezes the hero (frames identical)");
  check(c.cls.rmShow !== "none", "reduced motion reveals the static title (.rm-show visible)");
  check(c.cls.rmHide === "none", "reduced motion hides the animated title (.rm-hide:none)");

  await browser.close();
  console.log(`\n${failures ? failures + " FAILURE(S)" : "MOTION CHECKS PASSED"}`);
  process.exitCode = failures ? 1 : 0;
};

run();
