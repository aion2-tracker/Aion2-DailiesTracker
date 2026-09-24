// Planificador de crafteo. Datos de recetas: questlog.gg (versión global), ver tools/fetch-recipes.mjs
(() => {
  "use strict";

  const ICON_CDN = "https://cdn.questlog.gg/aion-2";
  const EQUIP = new Set(["weapon", "armor", "accessory"]);
  const MAX_RESULTS = 60;

  // Arma de cada clase (la armadura y los accesorios sirven para todas)
  const CLASS_WEAPONS = {
    Gladiator: ["greatsword"], Templar: ["sword", "guarder"], Assassin: ["dagger"], Ranger: ["bow"],
    Sorcerer: ["magicbook"], Spiritmaster: ["orb"], Cleric: ["mace"], Chanter: ["staff"]
  };

  const STR = {
    es: {
      loading: "Cargando recetas…", load_error: "No se pudieron cargar las recetas. Revisá tu conexión y recargá la página.",
      search: "Buscar receta", search_ph: "Ej. rey dragón, anillo, poción…", prof: "Profesión", type: "Tipo", all: "Todas", all_types: "Todos",
      for_class: "Solo lo que sirve para", faction_note: "Recetas de", results: "resultados", more: "Mostrando los primeros",
      add: "Agregar", in_plan: "En el plan", rec_title: "Recomendado para", rec_weapon: "Tu arma", rec_armor: "Armadura", rec_acc: "Accesorios",
      rec_hint: "Ordenado por Item Level. La armadura y los accesorios sirven para todas las clases; el arma depende de la clase.",
      plan: "Tu plan de crafteo", plan_empty: "Agregá recetas desde la lista para ver qué materiales necesitás.",
      expand: "Incluir materiales intermedios que se craftean", expand_hint: "Si lo activás, reemplaza cada material crafteable por lo que lleva.",
      shopping: "Lista de materiales", need: "Necesitás", have: "Tenés", missing: "Faltan", kinah: "Kinah de crafteo",
      requires: "Requiere", upgrade: "mejora a brillante", combo: "chance de combo", lvl: "Nivel de oficio",
      remove: "Quitar", clear: "Vaciar plan", all_done: "Tenés todo para craftear el plan.",
      source: "Datos de recetas de questlog.gg (versión global), actualizados el", open_ql: "Ver en questlog",
      tips_title: "Consejos de crafteo", no_char: "Agregá un personaje para usar el planificador.",
      prof_names: { blacksmithing: "Herrería", tailoring: "Sastrería", jewelcrafting: "Joyería", alchemy: "Alquimia", cooking: "Cocina" },
      type_names: { weapon: "Armas", armor: "Armadura", accessory: "Accesorios", usable: "Consumibles", misc: "Materiales" },
      weapon_names: { sword: "Espada larga", greatsword: "Espadón", dagger: "Daga", mace: "Maza", guarder: "Escudo", bow: "Arco", staff: "Bastón", magicbook: "Libro de hechizos", orb: "Orbe" },
      tips: [
        "El primer tier de Dragon Lord se craftea directo. La versión brillante tiene 25% de chance de salir como combo; si no, se mejora aparte.",
        "Los materiales Draconic caen sin bindear: tus alters pueden farmearlos y pasárselos al main.",
        "La armadura crafteada no depende de la clase: priorizá el arma, que es lo que más Item Level mueve al principio.",
        "Marcá cuánto tenés de cada material: la lista te dice exactamente qué te falta farmear."
      ]
    },
    en: {
      loading: "Loading recipes…", load_error: "Couldn't load recipes. Check your connection and reload the page.",
      search: "Search recipes", search_ph: "e.g. dragon lord, ring, potion…", prof: "Profession", type: "Type", all: "All", all_types: "All",
      for_class: "Only what's useful for", faction_note: "Recipes for", results: "results", more: "Showing the first",
      add: "Add", in_plan: "In plan", rec_title: "Recommended for", rec_weapon: "Your weapon", rec_armor: "Armor", rec_acc: "Accessories",
      rec_hint: "Sorted by Item Level. Armor and accessories work for every class; the weapon depends on your class.",
      plan: "Your crafting plan", plan_empty: "Add recipes from the list to see which materials you need.",
      expand: "Include craftable intermediate materials", expand_hint: "When on, each craftable material is replaced by what it takes to make it.",
      shopping: "Materials list", need: "Need", have: "Have", missing: "Missing", kinah: "Crafting Kinah",
      requires: "Requires", upgrade: "splendent upgrade", combo: "combo chance", lvl: "Crafting level",
      remove: "Remove", clear: "Clear plan", all_done: "You have everything to craft this plan.",
      source: "Recipe data from questlog.gg (global version), updated", open_ql: "View on questlog",
      tips_title: "Crafting tips", no_char: "Add a character to use the planner.",
      prof_names: { blacksmithing: "Blacksmithing", tailoring: "Tailoring", jewelcrafting: "Jewelcrafting", alchemy: "Alchemy", cooking: "Cooking" },
      type_names: { weapon: "Weapons", armor: "Armor", accessory: "Accessories", usable: "Consumables", misc: "Materials" },
      weapon_names: { sword: "Longsword", greatsword: "Greatsword", dagger: "Dagger", mace: "Mace", guarder: "Shield", bow: "Bow", staff: "Staff", magicbook: "Spellbook", orb: "Orb" },
      tips: [
        "The first Dragon Lord tier is crafted directly. The splendent version has a 25% combo chance; otherwise you upgrade it separately.",
        "Draconic materials drop unbound: your alts can farm them and send them to your main.",
        "Crafted armor isn't class-specific: prioritize the weapon, which moves Item Level the most early on.",
        "Log how much of each material you have: the list tells you exactly what's left to farm."
      ]
    }
  };

  let db = null, loadErr = false, loading = null;
  const byOut = {}; // itemId → recipe que lo produce

  function prepare(d) {
    // Recetas sin materiales (conversiones de tienda) no sirven para planificar
    d.recipes = d.recipes.filter((r) => r.in.length);
    const comboOf = {};
    d.recipes.forEach((r) => { if (r.out) byOut[r.out[0]] ||= r; if (r.combo) comboOf[r.combo[0]] = r; });
    d.recipes.forEach((r) => {
      const base = r.out && comboOf[r.out[0]];
      const hasEquip = r.in.some((x) => EQUIP.has(d.items[x[0]]?.c));
      // Las mejoras a "brillante" consumen la versión normal, pero questlog no la lista como material
      if (base && !hasEquip && base.out) { r.in = [[base.out[0], 1, base.id], ...r.in]; r.up = true; }
      r.key = (r.n.es + " " + r.n.en).toLowerCase();
    });
    d.byId = Object.fromEntries(d.recipes.map((r) => [r.id, r]));
    return d;
  }

  function load() {
    return loading ||= fetch("data/recipes.json").then((r) => { if (!r.ok) throw new Error(r.status); return r.json(); })
      .then((d) => { db = prepare(d); }).catch(() => { loadErr = true; });
  }

  // ---------- helpers ----------
  const A = () => window.AionApp;
  const s = (k) => STR[A().state.lang][k] ?? STR.es[k];
  const iname = (id) => { const it = db.items[id]; return it ? (it.n[A().state.lang] || it.n.es || it.n.en) : id; };
  const rname = (r) => r.n[A().state.lang] || r.n.es;
  const icon = (id) => { const p = db.items[id]?.i; return p ? `<img class="ic" src="${ICON_CDN}${p}.webp" alt="" loading="lazy" referrerpolicy="no-referrer" onerror="this.style.visibility='hidden'">` : `<span class="ic"></span>`; };
  const gcls = (g) => `g${g || 0}`;
  const qlUrl = (type, id) => `https://questlog.gg/aion-2/${A().state.lang === "en" ? "en" : "es"}/db/${type}/${id}`;
  const race = (ch) => (ch.faction === "elyos" ? "light" : "dark");
  const fmt = (n) => (n || 0).toLocaleString(A().state.lang);

  function opts() {
    const st = A().state;
    return (st.craftOpts ||= { q: "", prof: "", type: "", forClass: true, expand: false });
  }

  function filtered(ch) {
    const o = opts(), q = o.q.trim().toLowerCase(), weapons = CLASS_WEAPONS[ch.cls] || [];
    return db.recipes.filter((r) => {
      if (!r.out || (r.race && r.race !== race(ch))) return false;
      const it = db.items[r.out[0]];
      if (o.prof && r.prof !== o.prof) return false;
      if (o.type && it?.c !== o.type) return false;
      if (o.forClass && it?.c === "weapon" && !weapons.includes(it.s)) return false;
      return !q || r.key.includes(q);
    }).sort((a, b) => (db.items[b.out[0]]?.il || 0) - (db.items[a.out[0]]?.il || 0) || rname(a).localeCompare(rname(b)));
  }

  // ---------- material math ----------
  function totals(ch) {
    const need = {}, craftedFrom = {}, expand = opts().expand;
    let gold = 0;
    const walk = (r, times, depth) => {
      gold += (r.gold || 0) * times;
      for (const [id, q, sub] of r.in) {
        const amount = q * times, subR = sub && db.byId[sub];
        if (expand && subR && depth < 6) {
          const crafts = Math.ceil(amount / (subR.out?.[1] || 1));
          craftedFrom[id] = (craftedFrom[id] || 0) + amount;
          walk(subR, crafts, depth + 1);
        } else need[id] = (need[id] || 0) + amount;
      }
    };
    ch.craft.forEach((p) => { const r = db.byId[p.r]; if (r) walk(r, p.q, 0); });
    return { need, gold };
  }

  // ---------- render ----------
  function row(r, ch) {
    const it = db.items[r.out[0]], inPlan = ch.craft.some((p) => p.r === r.id);
    return `<div class="rc-row">
      ${icon(r.out[0])}
      <div class="rc-main">
        <a class="rc-name ${gcls(it?.g)}" href="${qlUrl("recipe", r.id)}" target="_blank" rel="noopener">${A().esc(rname(r))}</a>
        <span class="rc-meta">${it?.il ? `IL ${it.il} · ` : ""}${it?.c === "weapon" && s("weapon_names")[it.s] ? `${s("weapon_names")[it.s]} · ` : ""}${A().esc(s("prof_names")[r.prof] || r.prof)}${r.up ? ` · ${s("upgrade")}` : ""}</span>
      </div>
      <button class="btn small ${inPlan ? "" : "primary"}" data-craft-add="${r.id}">${inPlan ? s("in_plan") + " +1" : s("add")}</button>
    </div>`;
  }

  function recommended(ch) {
    const mine = db.recipes.filter((r) => r.out && (!r.race || r.race === race(ch)));
    const byIl = (a, b) => (db.items[b.out[0]]?.il || 0) - (db.items[a.out[0]]?.il || 0);
    const weapons = CLASS_WEAPONS[ch.cls] || [];
    const pick = (fn, n) => mine.filter((r) => fn(db.items[r.out[0]])).sort(byIl).slice(0, n);
    // Mejor pieza por slot
    const bestPerSlot = (cat, n) => {
      const seen = new Set();
      return mine.filter((r) => db.items[r.out[0]]?.c === cat).sort(byIl)
        .filter((r) => { const sl = db.items[r.out[0]].s; if (seen.has(sl)) return false; seen.add(sl); return true; }).slice(0, n);
    };
    const group = (title, list) => list.length ? `<h4>${title}</h4>${list.map((r) => row(r, ch)).join("")}` : "";
    return `<div class="rc-rec">
      <p class="hint">${s("rec_hint")}</p>
      ${group(s("rec_weapon"), pick((it) => it?.c === "weapon" && weapons.includes(it.s), 6))}
      ${group(s("rec_armor"), bestPerSlot("armor", 7))}
      ${group(s("rec_acc"), bestPerSlot("accessory", 5))}
    </div>`;
  }

  function renderResults(ch) {
    const el = document.getElementById("rcResults");
    if (!el) return;
    const o = opts();
    if (!o.q && !o.prof && !o.type) { el.innerHTML = recommended(ch); return; }
    const list = filtered(ch);
    el.innerHTML = `<p class="hint">${fmt(list.length)} ${s("results")}${list.length > MAX_RESULTS ? ` · ${s("more")} ${MAX_RESULTS}` : ""}</p>` +
      list.slice(0, MAX_RESULTS).map((r) => row(r, ch)).join("");
  }

  function renderPlan(ch) {
    const el = document.getElementById("rcPlan");
    if (!el) return;
    const esc = A().esc;
    if (!ch.craft.length) { el.innerHTML = `<p class="muted">${s("plan_empty")}</p>`; return; }
    const { need, gold } = totals(ch);
    const ids = Object.keys(need).sort((a, b) => (db.items[b]?.g || 0) - (db.items[a]?.g || 0) || iname(a).localeCompare(iname(b)));
    const missingCount = ids.filter((id) => (ch.have[id] || 0) < need[id]).length;
    el.innerHTML = `
      ${ch.craft.map((p) => { const r = db.byId[p.r]; if (!r) return ""; return `<div class="rc-row plan">
        ${icon(r.out[0])}
        <div class="rc-main"><span class="rc-name ${gcls(db.items[r.out[0]]?.g)}">${esc(rname(r))}</span>
          <span class="rc-meta">${r.lvl ? `${s("lvl")} ${r.lvl}` : ""}${r.combo ? `${r.lvl ? " · " : ""}${r.combo[1]}% ${s("combo")}` : ""}</span></div>
        <div class="stepper"><button data-craft-q="${r.id}" data-d="-1" aria-label="-1">−</button><output>${p.q}</output><button data-craft-q="${r.id}" data-d="1" aria-label="+1">+</button></div>
      </div>`; }).join("")}
      <label class="check" style="margin-top:10px"><input type="checkbox" data-craft-expand ${opts().expand ? "checked" : ""}>${s("expand")}</label>
      <p class="hint" style="margin-top:0">${s("expand_hint")}</p>
      <div class="list-head" style="margin-top:14px"><h3>${s("shopping")}</h3>
        ${gold ? `<span class="muted">${s("kinah")}: <b class="k-total">${fmt(gold)}</b></span>` : ""}</div>
      ${missingCount ? "" : `<p class="rc-done">${s("all_done")}</p>`}
      <div class="table-wrap"><table class="matrix rc-mats">
        <thead><tr><th></th><th>${s("need")}</th><th>${s("have")}</th><th>${s("missing")}</th></tr></thead>
        <tbody>${ids.map((id) => { const miss = Math.max(0, need[id] - (ch.have[id] || 0)); return `<tr class="${miss ? "" : "ok"}">
          <td><span class="rc-mat">${icon(id)}<a class="${gcls(db.items[id]?.g)}" href="${qlUrl("item", id)}" target="_blank" rel="noopener" title="${s("open_ql")}">${esc(iname(id))}</a></span></td>
          <td>${fmt(need[id])}</td>
          <td><input class="amt" type="number" min="0" value="${ch.have[id] || ""}" placeholder="0" data-have="${id}" aria-label="${s("have")}: ${esc(iname(id))}"></td>
          <td class="${miss ? "part" : "full"}">${miss ? fmt(miss) : "✓"}</td></tr>`; }).join("")}</tbody>
      </table></div>
      <div class="list-foot"><button class="btn small danger" data-craft-clear>${s("clear")}</button></div>`;
  }

  function render($view) {
    const app = A(), ch = app.activeChar(), esc = app.esc;
    if (!ch) { $view.innerHTML = `<div class="panel empty"><p>${s("no_char")}</p></div>`; return; }
    if (!db && !loadErr) { $view.innerHTML = `<p class="muted">${s("loading")}</p>`; load().then(() => { if (app.state.tab === "craft") app.render(); }); return; }
    if (loadErr) { $view.innerHTML = `<div class="panel empty"><p>${s("load_error")}</p></div>`; return; }
    ch.craft ||= []; ch.have ||= {};
    const o = opts(), profs = s("prof_names"), types = s("type_names");
    $view.innerHTML = `<div class="craft-grid">
      <section class="panel">
        <div class="list-head"><h3>${o.q || o.prof || o.type ? s("search") : `${s("rec_title")} ${esc(ch.name)}`}</h3>
          <span class="muted">${s("faction_note")} ${app.t(ch.faction)} · ${esc(ch.cls)}</span></div>
        <div class="row rc-filters">
          <label class="field">${s("search")}<input type="search" data-craft-f="q" value="${esc(o.q)}" placeholder="${s("search_ph")}"></label>
          <label class="field">${s("prof")}<select data-craft-f="prof"><option value="">${s("all")}</option>${Object.entries(profs).map(([k, v]) => `<option value="${k}" ${o.prof === k ? "selected" : ""}>${v}</option>`).join("")}</select></label>
          <label class="field">${s("type")}<select data-craft-f="type"><option value="">${s("all_types")}</option>${Object.entries(types).map(([k, v]) => `<option value="${k}" ${o.type === k ? "selected" : ""}>${v}</option>`).join("")}</select></label>
        </div>
        <label class="check"><input type="checkbox" data-craft-f="forClass" ${o.forClass ? "checked" : ""}>${s("for_class")} ${esc(ch.cls)}</label>
        <div id="rcResults"></div>
      </section>
      <div class="stack">
        <section class="panel"><h3>${s("plan")}</h3><div id="rcPlan" style="margin-top:10px"></div></section>
        <section class="panel"><h3>${s("tips_title")}</h3><ul class="pro-tips">${s("tips").map((x) => `<li>${esc(x)}</li>`).join("")}</ul></section>
        <p class="hint">${s("source")} ${esc(db.fetchedAt)}. <a href="https://questlog.gg/aion-2" target="_blank" rel="noopener">questlog.gg</a></p>
      </div>
    </div>`;
    renderResults(ch);
    renderPlan(ch);
  }

  // ---------- events ----------
  let t = null;
  document.addEventListener("input", (e) => {
    const f = e.target.dataset?.craftF;
    if (f !== "q") return;
    opts().q = e.target.value;
    clearTimeout(t);
    t = setTimeout(() => { A().save(); const ch = A().activeChar(); renderResults(ch); updateTitle(); }, 150);
  });
  function updateTitle() {
    const o = opts(), h = document.querySelector(".craft-grid .list-head h3"), ch = A().activeChar();
    if (h) h.textContent = o.q || o.prof || o.type ? s("search") : `${s("rec_title")} ${ch.name}`;
  }
  document.addEventListener("change", (e) => {
    const el = e.target, d = el.dataset || {}, ch = A().activeChar();
    if (!ch || !db) return;
    if (d.craftF && d.craftF !== "q") {
      opts()[d.craftF] = el.type === "checkbox" ? el.checked : el.value;
      A().save(); renderResults(ch); updateTitle(); return;
    }
    if ("craftExpand" in d) { opts().expand = el.checked; A().save(); renderPlan(ch); return; }
    if (d.have) {
      const n = Math.max(0, parseInt(el.value, 10) || 0);
      if (n) ch.have[d.have] = n; else delete ch.have[d.have];
      A().save();
      // Actualiza solo la fila para no perder el foco al tabular
      const { need } = totals(ch), miss = Math.max(0, (need[d.have] || 0) - n), tr = el.closest("tr"), cell = tr?.lastElementChild;
      if (cell) { cell.textContent = miss ? fmt(miss) : "✓"; cell.className = miss ? "part" : "full"; tr.classList.toggle("ok", !miss); }
    }
  });
  document.addEventListener("click", (e) => {
    const b = e.target.closest("[data-craft-add], [data-craft-q], [data-craft-clear]");
    if (!b || !db) return;
    const ch = A().activeChar(), d = b.dataset;
    if (d.craftAdd) {
      const p = ch.craft.find((x) => x.r === d.craftAdd);
      if (p) p.q++; else ch.craft.push({ r: d.craftAdd, q: 1 });
    } else if (d.craftQ) {
      const p = ch.craft.find((x) => x.r === d.craftQ);
      if (p) { p.q += +d.d; if (p.q <= 0) ch.craft = ch.craft.filter((x) => x !== p); }
    } else if ("craftClear" in d) {
      if (!confirm(s("clear") + "?")) return;
      ch.craft = [];
    }
    A().save(); renderResults(ch); renderPlan(ch);
  });

  window.AionCraft = { render };
})();
