// Descarga las recetas de AION 2 (versión global) desde questlog.gg y genera data/recipes.json.
// Uso: node tools/fetch-recipes.mjs
// Correlo de nuevo después de cada patch. Va despacio a propósito para no cargar a questlog.
import { writeFile, mkdir } from "node:fs/promises";

const API = "https://questlog.gg/aion-2/api/trpc/database.";
const HEADERS = { "User-Agent": "aion2-tracker data refresh (https://github.com/aion2-tracker/Aion2-DailiesTracker)" };
const CATEGORIES = ["blacksmithing", "tailoring", "jewelcrafting", "alchemy", "cooking"];
const EQUIP = new Set(["weapon", "armor", "accessory"]);
const CONCURRENCY = 3;

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function call(proc, input, tries = 4) {
  const url = API + proc + "?input=" + encodeURIComponent(JSON.stringify(input));
  for (let i = 1; ; i++) {
    try {
      const res = await fetch(url, { headers: HEADERS });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return (await res.json()).result.data;
    } catch (err) {
      if (i >= tries) throw new Error(`${proc} ${JSON.stringify(input)}: ${err.message}`);
      await sleep(1000 * i);
    }
  }
}

async function pool(list, fn) {
  const out = new Array(list.length);
  let next = 0, done = 0;
  await Promise.all(Array.from({ length: CONCURRENCY }, async () => {
    while (next < list.length) {
      const i = next++;
      out[i] = await fn(list[i]);
      await sleep(120);
      if (++done % 100 === 0) console.log(`  ${done}/${list.length}`);
    }
  }));
  return out;
}

// Ícono: "/assets/.../Icon_X.Icon_X" → "/assets/.../Icon_X"
const iconPath = (p) => (p ? p.replace(/\.[^./]+$/, "") : "");

const items = {};
function addItem(it, lang) {
  if (!it) return;
  const e = (items[it.id] ||= { n: {}, i: iconPath(it.icon), g: it.grade, c: it.mainCategory, s: it.subCategory });
  e.n[lang] = it.name;
}

console.log("Listando recetas…");
const ids = [];
for (const cat of CATEGORIES) {
  for (let page = 1, count = 1; page <= count; page++) {
    const d = await call("getRecipes", { language: "es", page, mainCategory: cat });
    count = d.pageCount;
    d.pageData.forEach((r) => ids.push(r.id));
  }
}
console.log(`${ids.length} recetas. Bajando detalle en español e inglés…`);

const details = await pool(ids, async (id) => {
  const [es, en] = [await call("getRecipe", { id, language: "es" }), await call("getRecipe", { id, language: "en" })];
  return { es, en };
});

const recipes = details.map(({ es, en }) => {
  for (const [lang, r] of [["es", es], ["en", en]]) {
    addItem(r.recipeOutputItems?.productItem, lang);
    addItem(r.recipeOutputItems?.comboProductItem, lang);
    (r.recipeInputItems || []).forEach((x) => addItem(x, lang));
  }
  const out = es.recipeOutputItems || {};
  return {
    id: es.id,
    n: { es: es.name, en: en.name },
    prof: es.mainCategory,
    sub: es.subCategory || null,
    race: es.qualificationRace || null,
    lvl: es.masteryLevel ?? null,
    gold: es.goldCost || 0,
    out: out.productItem ? [out.productItem.id, out.productItem.quantity] : null,
    combo: out.comboProductItem ? [out.comboProductItem.id, out.comboProbability / 100] : null,
    in: (es.recipeInputItems || []).map((x) => [x.id, x.quantity, x.craftableRecipe?.id || null])
  };
});

console.log("Bajando Item Level del equipo…");
const equipIds = [...new Set(recipes.map((r) => r.out?.[0]).filter((id) => id && EQUIP.has(items[id]?.c)))];
await pool(equipIds, async (id) => {
  const it = await call("getItem", { id, language: "es" });
  const info = typeof it.equipmentInfo === "string" ? JSON.parse(it.equipmentInfo.replace(/'/g, '"').replace(/\bTrue\b/g, "true").replace(/\bFalse\b/g, "false")) : it.equipmentInfo;
  if (info?.itemLevel) items[id].il = info.itemLevel;
  items[id].x = it.exchangeType || null;
});

await mkdir(new URL("../data/", import.meta.url), { recursive: true });
const payload = { source: "https://questlog.gg/aion-2", fetchedAt: new Date().toISOString().slice(0, 10), items, recipes };
await writeFile(new URL("../data/recipes.json", import.meta.url), JSON.stringify(payload));
console.log(`Listo: ${recipes.length} recetas, ${Object.keys(items).length} items → data/recipes.json`);
