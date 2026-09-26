// Genera og.png (vista previa al compartir el link) desde tools/og-card.html.
// Uso: node tools/og-image.mjs   (necesita playwright: npm i -g playwright o PLAYWRIGHT_PATH)
import { createRequire } from "node:module";
import { fileURLToPath, pathToFileURL } from "node:url";
import path from "node:path";

const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_PATH || "playwright");
const here = path.dirname(fileURLToPath(import.meta.url));

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
await page.goto(pathToFileURL(path.join(here, "og-card.html")).href);
await page.evaluate(() => document.fonts.ready);
await page.screenshot({ path: path.join(here, "..", "og.png") });
await browser.close();
console.log("og.png generado");
