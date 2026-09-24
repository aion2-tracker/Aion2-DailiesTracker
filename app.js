(() => {
  "use strict";

  const DATA = window.AION_DATA;
  const KEY = "aion2-tracker:v1";
  const LOCAL_TZ = Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC";

  // ---------- i18n ----------
  const STR = {
    es: {
      elyos: "Elyos", asmodian: "Asmodian",
      tab_checklist: "Checklist", tab_overview: "Roster", tab_progress: "Progresión", tab_tips: "Consejos", tab_settings: "Ajustes",
      footer: "Proyecto de fans, sin relación con NCSOFT. Tus datos se guardan solo en este navegador: exportalos desde Ajustes para no perderlos.",
      daily_reset: "Reset diario", weekly_reset: "Reset semanal", adjust: "Ajustar",
      resets_at: "Resetea", your_time: "en tu hora", every_day: "todos los días",
      daily: "Diarias", weekly: "Semanales", shared: "compartido", shared_hint: "Compartido por todo el roster",
      hide: "Ocultar", show_hidden: "Mostrar ocultas", hide_hidden: "Esconder ocultas", unhide: "Mostrar",
      add_char: "Agregar personaje", edit_char: "Editar personaje", new_char: "Nuevo personaje",
      name: "Nombre", cls: "Clase", role: "Rol", main: "Main", alt: "Alter",
      save: "Guardar", cancel: "Cancelar", delete: "Borrar", add: "Agregar",
      no_chars_title: "Empezá por tu main",
      no_chars_body: "Agregá tu personaje principal y después los alters. Cada uno tiene su propia checklist; lo compartido del servidor se marca una sola vez.",
      alt_note: "A los alters les mostramos una lista corta. Podés mostrar el resto cuando quieras.",
      clock_title_daily: "Reset diario", clock_title_weekly: "Reset semanal",
      timezone: "Zona horaria", time: "Hora del reset", weekday: "Día",
      tz_hint: "Escribí una ciudad (ej. America/Buenos_Aires). Cada contador usa su propia zona.",
      tz_invalid: "Esa zona horaria no existe. Elegí una de la lista.",
      preset_local: "Mi hora", next_reset: "Próximo reset",
      cp: "Combat Power", cp_add: "Registrar", cp_empty: "Registrá tu CP para ver tu curva.",
      gates: "Contenido por CP", milestones: "Hitos permanentes", goals: "Objetivos", goal_ph: "Ej. +15 en el arma",
      notes: "Notas", notes_ph: "Builds, stigmas, lo que quieras recordar…",
      history: "Historial",
      lang_label: "Idioma", tasks: "Tareas", tasks_hint: "Ajustá las cargas si tu servidor es distinto, o apagá lo que no hacés.",
      on: "Activa", charges: "Cargas", custom_task: "Tarea propia", period: "Período", scope: "Alcance",
      per_char: "Por personaje", per_account: "Compartida (roster)",
      data: "Tus datos", export: "Exportar backup", import: "Importar backup", wipe: "Borrar todo",
      wipe_confirm: "¿Borrar todos los personajes y el progreso? No se puede deshacer.",
      del_char_confirm: "¿Borrar este personaje y su progreso?",
      imported: "Backup importado.", import_bad: "Ese archivo no es un backup de AION 2 Tracker.",
      overview_empty: "Agregá personajes para ver el resumen del roster.",
      done: "hecho", days: ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"],
      tips_intro: "Basado en guías de la comunidad. Los números pueden cambiar con el lanzamiento global: corregilos en Ajustes o mandá un PR.",
      contribute: "¿Algo desactualizado? Abrí un issue o PR en GitHub."
    },
    en: {
      elyos: "Elyos", asmodian: "Asmodian",
      tab_checklist: "Checklist", tab_overview: "Roster", tab_progress: "Progression", tab_tips: "Tips", tab_settings: "Settings",
      footer: "Fan project, not affiliated with NCSOFT. Your data lives only in this browser: export it from Settings to keep it safe.",
      daily_reset: "Daily reset", weekly_reset: "Weekly reset", adjust: "Adjust",
      resets_at: "Resets", your_time: "your time", every_day: "every day",
      daily: "Daily", weekly: "Weekly", shared: "shared", shared_hint: "Shared by the whole roster",
      hide: "Hide", show_hidden: "Show hidden", hide_hidden: "Collapse hidden", unhide: "Show",
      add_char: "Add character", edit_char: "Edit character", new_char: "New character",
      name: "Name", cls: "Class", role: "Role", main: "Main", alt: "Alt",
      save: "Save", cancel: "Cancel", delete: "Delete", add: "Add",
      no_chars_title: "Start with your main",
      no_chars_body: "Add your main character, then your alts. Each gets its own checklist; server-wide content is tracked once.",
      alt_note: "Alts start with a short list. Show the rest whenever you like.",
      clock_title_daily: "Daily reset", clock_title_weekly: "Weekly reset",
      timezone: "Time zone", time: "Reset time", weekday: "Day",
      tz_hint: "Type a city (e.g. America/New_York). Each counter uses its own zone.",
      tz_invalid: "That time zone doesn't exist. Pick one from the list.",
      preset_local: "My time", next_reset: "Next reset",
      cp: "Combat Power", cp_add: "Log", cp_empty: "Log your CP to see your curve.",
      gates: "Content by CP", milestones: "Permanent milestones", goals: "Goals", goal_ph: "e.g. +15 weapon",
      notes: "Notes", notes_ph: "Builds, stigmas, anything to remember…",
      history: "History",
      lang_label: "Language", tasks: "Tasks", tasks_hint: "Adjust charges if your server differs, or turn off what you skip.",
      on: "On", charges: "Charges", custom_task: "Custom task", period: "Period", scope: "Scope",
      per_char: "Per character", per_account: "Shared (roster)",
      data: "Your data", export: "Export backup", import: "Import backup", wipe: "Delete everything",
      wipe_confirm: "Delete all characters and progress? This can't be undone.",
      del_char_confirm: "Delete this character and its progress?",
      imported: "Backup imported.", import_bad: "That file isn't an AION 2 Tracker backup.",
      overview_empty: "Add characters to see the roster overview.",
      done: "done", days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      tips_intro: "Based on community guides. Numbers may change with the global launch: fix them in Settings or send a PR.",
      contribute: "Something outdated? Open an issue or PR on GitHub."
    }
  };
  const t = (k) => STR[state.lang][k] ?? STR.es[k] ?? k;
  const L = (v) => (v == null ? "" : typeof v === "string" ? v : v[state.lang] ?? v.es ?? "");
  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const uid = () => Math.random().toString(36).slice(2, 10);

  // ---------- State ----------
  const defaults = () => ({
    v: 1,
    lang: (navigator.language || "es").startsWith("es") ? "es" : "en",
    faction: "asmodian",
    tab: "checklist",
    active: null,
    showHidden: false,
    clocks: {
      daily: { tz: LOCAL_TZ, time: "05:00" },
      weekly: { tz: LOCAL_TZ, time: "05:00", day: 3 }
    },
    periods: { daily: 0, weekly: 0 },
    overrides: {},
    custom: [],
    chars: [],
    account: { prog: {} }
  });

  function load() {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) return Object.assign(defaults(), JSON.parse(raw));
    } catch (_) { /* storage bloqueado o JSON roto */ }
    return defaults();
  }
  let state = load();
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (_) {} };

  // ---------- Time zones ----------
  const fmtCache = {};
  function zoneParts(ts, tz) {
    const f = fmtCache[tz] || (fmtCache[tz] = new Intl.DateTimeFormat("en-US", {
      timeZone: tz, hourCycle: "h23", year: "numeric", month: "numeric", day: "numeric",
      hour: "numeric", minute: "numeric", second: "numeric", weekday: "short"
    }));
    const p = {};
    for (const { type, value } of f.formatToParts(new Date(ts))) p[type] = value;
    const wd = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(p.weekday);
    return { y: +p.year, m: +p.month, d: +p.day, h: +p.hour % 24, mi: +p.minute, s: +p.second, wd };
  }
  function tzOffset(ts, tz) {
    const p = zoneParts(ts, tz);
    return Date.UTC(p.y, p.m - 1, p.d, p.h, p.mi, p.s) - Math.floor(ts / 1000) * 1000;
  }
  // Hora "de pared" en una zona → timestamp UTC (maneja horario de verano)
  function zonedToUtc(y, m, d, h, mi, tz) {
    const guess = Date.UTC(y, m - 1, d, h, mi);
    let ts = guess - tzOffset(guess, tz);
    const o2 = tzOffset(ts, tz);
    if (guess - o2 !== ts) ts = guess - o2;
    return ts;
  }
  function shiftDay(y, m, d, n) {
    const dt = new Date(Date.UTC(y, m - 1, d + n));
    return [dt.getUTCFullYear(), dt.getUTCMonth() + 1, dt.getUTCDate()];
  }
  function validTz(tz) {
    try { new Intl.DateTimeFormat("en-US", { timeZone: tz }); return true; } catch (_) { return false; }
  }
  function boundaries(kind, now = Date.now()) {
    const c = state.clocks[kind];
    const tz = validTz(c.tz) ? c.tz : "UTC";
    const [hh, mm] = (c.time || "05:00").split(":").map(Number);
    const p = zoneParts(now, tz);
    if (kind === "daily") {
      let prev = zonedToUtc(p.y, p.m, p.d, hh, mm, tz);
      if (prev > now) prev = zonedToUtc(...shiftDay(p.y, p.m, p.d, -1), hh, mm, tz);
      const pp = zoneParts(prev, tz);
      const next = zonedToUtc(...shiftDay(pp.y, pp.m, pp.d, 1), hh, mm, tz);
      return { prev, next };
    }
    const back = (p.wd - c.day + 7) % 7;
    let prev = zonedToUtc(...shiftDay(p.y, p.m, p.d, -back), hh, mm, tz);
    if (prev > now) prev = zonedToUtc(...shiftDay(p.y, p.m, p.d, -back - 7), hh, mm, tz);
    const pp = zoneParts(prev, tz);
    const next = zonedToUtc(...shiftDay(pp.y, pp.m, pp.d, 7), hh, mm, tz);
    return { prev, next };
  }
  let tzList = null;
  const allZones = () => tzList || (tzList = (Intl.supportedValuesOf ? Intl.supportedValuesOf("timeZone") : [
    "UTC", "America/Buenos_Aires", "America/Sao_Paulo", "America/Santiago", "America/Mexico_City", "America/New_York",
    "America/Chicago", "America/Los_Angeles", "Europe/London", "Europe/Madrid", "Europe/Berlin", "Asia/Seoul", "Asia/Taipei", "Asia/Tokyo"
  ]));

  // ---------- Tasks ----------
  function allTasks() {
    return [...DATA.tasks, ...state.custom].map((tk) => {
      const o = state.overrides[tk.id] || {};
      return { ...tk, max: Math.max(1, o.max ?? tk.max), off: !!o.off };
    });
  }
  const activeTasks = () => allTasks().filter((tk) => !tk.off);
  const activeChar = () => state.chars.find((c) => c.id === state.active) || state.chars[0] || null;
  const progStore = (tk, ch) => (tk.scope === "account" ? state.account.prog : ch.prog);
  const getVal = (tk, ch) => Math.min(progStore(tk, ch)[tk.id] || 0, tk.max);
  const setVal = (tk, ch, v) => { progStore(tk, ch)[tk.id] = Math.max(0, Math.min(tk.max, v)); };

  // Limpia el progreso cuando pasa un reset
  function applyResets() {
    let changed = false;
    for (const kind of ["daily", "weekly"]) {
      const { prev } = boundaries(kind);
      if (state.periods[kind] !== prev) {
        if (state.periods[kind]) {
          const ids = allTasks().filter((tk) => tk.period === kind).map((tk) => tk.id);
          for (const store of [state.account.prog, ...state.chars.map((c) => c.prog)]) ids.forEach((id) => delete store[id]);
        }
        state.periods[kind] = prev;
        changed = true;
      }
    }
    if (changed) save();
    return changed;
  }

  // ---------- Clocks ----------
  const $clocks = document.getElementById("clocks");
  const R = 46, CIRC = 2 * Math.PI * R;
  function renderClocks() {
    $clocks.innerHTML = ["daily", "weekly"].map((kind) => {
      const ticks = kind === "daily" ? 24 : 7;
      const tickMarks = Array.from({ length: ticks }, (_, i) => {
        const a = (i / ticks) * 2 * Math.PI - Math.PI / 2;
        const r1 = 52, r2 = kind === "daily" && i % 6 ? 54 : 56;
        return `<line class="tick" x1="${60 + r1 * Math.cos(a)}" y1="${60 + r1 * Math.sin(a)}" x2="${60 + r2 * Math.cos(a)}" y2="${60 + r2 * Math.sin(a)}"/>`;
      }).join("");
      return `<article class="clock ${kind}">
        <svg class="ring" viewBox="0 0 120 120" aria-hidden="true">
          ${tickMarks}
          <circle class="track" cx="60" cy="60" r="${R}"/>
          <circle class="arc" cx="60" cy="60" r="${R}" stroke-dasharray="${CIRC}" stroke-dashoffset="${CIRC}" transform="rotate(-90 60 60)"/>
        </svg>
        <div>
          <h2>${t(kind === "daily" ? "daily_reset" : "weekly_reset")}</h2>
          <div class="countdown" aria-live="off"></div>
          <div class="clock-meta"></div>
        </div>
        <button class="clock-edit" data-clock="${kind}" type="button">${t("adjust")}</button>
      </article>`;
    }).join("");
    tickClocks();
  }
  function fmtCountdown(ms, kind) {
    const s = Math.max(0, Math.floor(ms / 1000));
    const d = Math.floor(s / 86400), h = Math.floor((s % 86400) / 3600), m = Math.floor((s % 3600) / 60), sec = s % 60;
    const p = (n) => String(n).padStart(2, "0");
    if (kind === "weekly") return `${d}<small>d</small>${p(h)}<small>h</small>${p(m)}<small>m</small>`;
    return `${p(h)}<small>h</small>${p(m)}<small>m</small>${p(sec)}<small>s</small>`;
  }
  function clockMeta(kind, next) {
    const c = state.clocks[kind];
    const when = kind === "weekly" ? `${t("days")[c.day]} ${c.time}` : `${t("every_day")} ${c.time}`;
    const local = new Intl.DateTimeFormat(state.lang, {
      weekday: kind === "weekly" ? "short" : undefined, hour: "2-digit", minute: "2-digit"
    }).format(next);
    const sameZone = c.tz === LOCAL_TZ;
    return `${t("resets_at")} <b>${esc(when)}</b> · ${esc(c.tz.replace(/_/g, " "))}` +
      (sameZone ? "" : `<br>${esc(local)} ${t("your_time")}`);
  }
  function tickClocks() {
    if (applyResets()) render();
    const now = Date.now();
    $clocks.querySelectorAll(".clock").forEach((el) => {
      const kind = el.classList.contains("daily") ? "daily" : "weekly";
      const { prev, next } = boundaries(kind, now);
      el.querySelector(".countdown").innerHTML = fmtCountdown(next - now, kind);
      const frac = (now - prev) / (next - prev);
      el.querySelector(".arc").setAttribute("stroke-dashoffset", String(CIRC * (1 - frac)));
      const meta = el.querySelector(".clock-meta");
      const html = clockMeta(kind, next);
      if (meta.innerHTML !== html) meta.innerHTML = html;
    });
  }

  // ---------- Dialog ----------
  const $dlg = document.getElementById("dlg");
  function openDialog(html, onSubmit, onClick) {
    $dlg.innerHTML = `<form method="dialog">${html}</form>`;
    const form = $dlg.querySelector("form");
    form.addEventListener("submit", (e) => {
      if (e.submitter && e.submitter.value === "cancel") return;
      if (onSubmit(new FormData(form), form) === false) e.preventDefault();
    });
    if (onClick) form.addEventListener("click", (e) => onClick(e, form));
    $dlg.showModal();
  }

  function clockDialog(kind) {
    const c = state.clocks[kind];
    const presets = [["preset_local", LOCAL_TZ], ["Seoul (KST)", "Asia/Seoul"], ["Taipei", "Asia/Taipei"], ["UTC", "UTC"]];
    openDialog(`
      <h2>${t(kind === "daily" ? "clock_title_daily" : "clock_title_weekly")}</h2>
      <div class="stack">
        <label class="field">${t("timezone")}
          <input name="tz" list="tzlist" value="${esc(c.tz)}" autocomplete="off" required>
        </label>
        <datalist id="tzlist">${allZones().map((z) => `<option value="${esc(z)}">`).join("")}</datalist>
        <div class="presets">${presets.map(([label, tz]) =>
          `<button type="button" class="btn small" data-preset="${esc(tz)}">${esc(STR[state.lang][label] || label)}</button>`).join("")}</div>
        <p class="hint">${t("tz_hint")}</p>
        <div class="row">
          ${kind === "weekly" ? `<label class="field">${t("weekday")}
            <select name="day">${t("days").map((d, i) => `<option value="${i}" ${i === c.day ? "selected" : ""}>${esc(d)}</option>`).join("")}</select>
          </label>` : ""}
          <label class="field">${t("time")}<input type="time" name="time" value="${esc(c.time)}" required></label>
        </div>
        <p class="hint" id="tzErr" hidden>${t("tz_invalid")}</p>
      </div>
      <div class="actions">
        <button class="btn" value="cancel" formnovalidate>${t("cancel")}</button>
        <button class="btn primary" value="ok">${t("save")}</button>
      </div>`,
      (fd, form) => {
        const tz = String(fd.get("tz")).trim();
        if (!validTz(tz)) { form.querySelector("#tzErr").hidden = false; return false; }
        state.clocks[kind] = { tz, time: String(fd.get("time") || "05:00"), ...(kind === "weekly" ? { day: +fd.get("day") } : {}) };
        state.periods[kind] = boundaries(kind).prev; // cambiar el reloj no borra el progreso
        save(); renderClocks();
      },
      (e, form) => {
        const b = e.target.closest("[data-preset]");
        if (b) form.elements.tz.value = b.dataset.preset;
      });
  }

  function charDialog(ch) {
    const isNew = !ch;
    ch = ch || { name: "", cls: DATA.classes[0], role: state.chars.some((c) => c.role === "main") ? "alt" : "main" };
    openDialog(`
      <h2>${t(isNew ? "new_char" : "edit_char")}</h2>
      <div class="stack">
        <label class="field">${t("name")}<input name="name" value="${esc(ch.name)}" maxlength="24" required autofocus></label>
        <div class="row">
          <label class="field">${t("cls")}<select name="cls">${DATA.classes.map((c) => `<option ${c === ch.cls ? "selected" : ""}>${c}</option>`).join("")}</select></label>
          <label class="field">${t("role")}<select name="role">
            <option value="main" ${ch.role === "main" ? "selected" : ""}>${t("main")}</option>
            <option value="alt" ${ch.role === "alt" ? "selected" : ""}>${t("alt")}</option>
          </select></label>
        </div>
        ${isNew ? `<p class="hint">${t("alt_note")}</p>` : ""}
      </div>
      <div class="actions">
        ${isNew ? "" : `<button type="button" class="btn danger" data-del style="margin-right:auto">${t("delete")}</button>`}
        <button class="btn" value="cancel" formnovalidate>${t("cancel")}</button>
        <button class="btn primary" value="ok">${t("save")}</button>
      </div>`,
      (fd) => {
        const name = String(fd.get("name")).trim();
        if (!name) return false;
        const role = fd.get("role"), cls = fd.get("cls");
        if (isNew) {
          const hidden = {};
          if (role === "alt") DATA.tasks.forEach((tk) => { if (!tk.alt) hidden[tk.id] = true; });
          const c = { id: uid(), name, cls, role, hidden, prog: {}, cp: [], ms: {}, goals: [], notes: "" };
          state.chars.push(c);
          state.active = c.id;
        } else Object.assign(ch, { name, cls, role });
        save(); render();
      },
      (e) => {
        if (e.target.closest("[data-del]") && confirm(t("del_char_confirm"))) {
          state.chars = state.chars.filter((c) => c !== ch);
          state.active = state.chars[0]?.id ?? null;
          $dlg.close(); save(); render();
        }
      });
  }

  // ---------- Views ----------
  const $roster = document.getElementById("roster");
  const $view = document.getElementById("view");

  function renderRoster() {
    const act = activeChar();
    $roster.innerHTML = state.chars.map((c) => `
      <button type="button" class="chip ${c.role}" data-char="${c.id}" aria-current="${act && c.id === act.id}">
        <span class="sigil">${esc(c.cls[0])}</span>
        <span class="who">${esc(c.name)}<span>${t(c.role)} · ${esc(c.cls)}</span></span>
      </button>`).join("") +
      `<button type="button" class="chip add" data-add-char>+ ${t("add_char")}</button>`;
  }

  function taskRow(tk, ch) {
    const v = getVal(tk, ch), hidden = !!ch.hidden[tk.id];
    let ctrl;
    if (tk.max === 1) {
      ctrl = `<button class="pip single ${v ? "on" : ""}" data-set="${tk.id}" data-v="${v ? 0 : 1}" aria-label="${esc(L(tk.name))}" aria-pressed="${!!v}"></button>`;
    } else if (tk.max <= 14) {
      ctrl = `<div class="pips" role="group" aria-label="${esc(L(tk.name))}: ${v}/${tk.max}">${Array.from({ length: tk.max }, (_, i) =>
        `<button class="pip ${i < v ? "on" : ""}" data-set="${tk.id}" data-v="${i + 1 === v ? i : i + 1}" aria-label="${i + 1}"></button>`).join("")}</div>`;
    } else {
      ctrl = `<div class="stepper"><button data-set="${tk.id}" data-v="${v - 1}" aria-label="-1">−</button><output>${v}/${tk.max}</output><button data-set="${tk.id}" data-v="${v + 1}" aria-label="+1">+</button></div>`;
    }
    return `<div class="task ${v >= tk.max ? "done" : ""}">
      <div class="t-name">${esc(L(tk.name))}
        ${tk.scope === "account" ? `<span class="badge shared" title="${t("shared_hint")}">${t("shared")}</span>` : ""}
        ${tk.max > 1 ? `<span class="badge">${v}/${tk.max}</span>` : ""}
      </div>
      <div class="t-ctrl">
        ${ctrl}
        <button class="icon-btn" data-toggle-hide="${tk.id}">${hidden ? t("unhide") : t("hide")}</button>
      </div>
      ${L(tk.desc) ? `<div class="t-desc">${esc(L(tk.desc))}</div>` : ""}
    </div>`;
  }

  function renderChecklist() {
    const ch = activeChar();
    if (!ch) {
      $view.innerHTML = `<div class="panel empty"><h2>${t("no_chars_title")}</h2><p>${t("no_chars_body")}</p>
        <button class="btn primary" data-add-char>${t("add_char")}</button></div>`;
      return;
    }
    const tasks = activeTasks();
    const col = (period) => {
      const all = tasks.filter((tk) => tk.period === period);
      const vis = all.filter((tk) => !ch.hidden[tk.id]);
      const hid = all.filter((tk) => ch.hidden[tk.id]);
      const got = vis.reduce((a, tk) => a + getVal(tk, ch) / tk.max, 0);
      const pct = vis.length ? Math.round((got / vis.length) * 100) : 0;
      return `<section class="${period}-list">
        <div class="list-head"><h2>${t(period)}</h2><span class="pct">${pct}% ${t("done")}</span></div>
        <div class="bar"><i style="width:${pct}%"></i></div>
        ${vis.map((tk) => taskRow(tk, ch)).join("")}
        ${state.showHidden ? hid.map((tk) => taskRow(tk, ch)).join("") : ""}
        ${hid.length ? `<div class="list-foot"><button class="btn small" data-show-hidden>${state.showHidden ? t("hide_hidden") : `${t("show_hidden")} (${hid.length})`}</button></div>` : ""}
      </section>`;
    };
    $view.innerHTML = `
      <div class="list-head" style="margin-bottom:16px">
        <h2 style="font-size:1.9rem">${esc(ch.name)} <span class="muted" style="font-size:1rem">${t(ch.role)} · ${esc(ch.cls)}</span></h2>
        <button class="btn small" data-edit-char>${t("edit_char")}</button>
      </div>
      <div class="lists">${col("daily")}${col("weekly")}</div>`;
  }

  function renderOverview() {
    if (!state.chars.length) { $view.innerHTML = `<div class="panel empty"><p>${t("overview_empty")}</p></div>`; return; }
    const tasks = activeTasks();
    const block = (period) => `
      <tr><th colspan="${state.chars.length + 1}" style="text-align:left;padding-top:18px"><h3>${t(period)}</h3></th></tr>
      ${tasks.filter((tk) => tk.period === period).map((tk) => `<tr>
        <td>${esc(L(tk.name))}${tk.scope === "account" ? ` <span class="badge shared">${t("shared")}</span>` : ""}</td>
        ${state.chars.map((c) => {
          if (c.hidden[tk.id]) return `<td class="hidden">—</td>`;
          const v = getVal(tk, c);
          const cls = v >= tk.max ? "full" : v > 0 ? "part" : "";
          return `<td class="${cls}">${tk.max === 1 ? (v ? "✓" : "·") : `${v}/${tk.max}`}</td>`;
        }).join("")}
      </tr>`).join("")}`;
    $view.innerHTML = `<div class="table-wrap"><table class="matrix">
      <thead><tr><th></th>${state.chars.map((c) => `<th>${esc(c.name)}<br><span class="muted">${t(c.role)}</span></th>`).join("")}</tr></thead>
      <tbody>${block("daily")}${block("weekly")}</tbody></table></div>`;
  }

  function sparkline(cp) {
    if (cp.length < 2) return "";
    const W = 600, H = 90, pad = 6;
    const vals = cp.map((p) => p.v);
    const gates = DATA.cpGates.map((g) => g.cp);
    const lo = Math.min(...vals), hi = Math.max(...vals, lo + 1);
    const nearGate = gates.find((g) => g > hi && g - hi < (hi - lo) * 0.5);
    const top = nearGate || hi;
    const x = (i) => pad + (i / (cp.length - 1)) * (W - 2 * pad);
    const y = (v) => H - pad - ((v - lo) / (top - lo)) * (H - 2 * pad);
    const pts = cp.map((p, i) => `${x(i).toFixed(1)},${y(p.v).toFixed(1)}`);
    const gateLines = gates.filter((g) => g > lo && g <= top)
      .map((g) => `<line class="gate" x1="0" x2="${W}" y1="${y(g)}" y2="${y(g)}"><title>${g}</title></line>`).join("");
    return `<svg class="spark" viewBox="0 0 ${W} ${H}" preserveAspectRatio="none" role="img" aria-label="${t("cp")}">
      ${gateLines}
      <path class="area" d="M${pts[0]} L${pts.join(" L")} L${x(cp.length - 1)},${H} L${x(0)},${H} Z"/>
      <path class="line" d="M${pts.join(" L")}"/></svg>`;
  }

  function renderProgress() {
    const ch = activeChar();
    if (!ch) { renderChecklist(); return; }
    const cur = ch.cp.length ? ch.cp[ch.cp.length - 1].v : 0;
    const today = new Date().toISOString().slice(0, 10);
    $view.innerHTML = `<div class="grid2">
      <div class="stack">
        <section class="panel">
          <h3>${t("cp")}</h3>
          <div class="cp-now">${cur ? cur.toLocaleString(state.lang) : "—"}</div>
          ${ch.cp.length > 1 ? sparkline(ch.cp) : `<p class="muted">${t("cp_empty")}</p>`}
          <form class="row" data-cp-form style="margin-top:12px">
            <label class="field">${t("cp")}<input type="number" name="v" min="0" step="1" required></label>
            <label class="field"><span>&nbsp;</span><input type="date" name="d" value="${today}" required></label>
            <button class="btn primary">${t("cp_add")}</button>
          </form>
          ${ch.cp.length ? `<details style="margin-top:12px"><summary class="muted">${t("history")} (${ch.cp.length})</summary>
            ${ch.cp.slice().reverse().map((p) => `<div class="goal"><span>${esc(p.d)} — <b>${p.v.toLocaleString(state.lang)}</b></span>
              <button class="icon-btn" data-del-cp="${esc(p.id)}">${t("delete")}</button></div>`).join("")}</details>` : ""}
          <h3 style="margin-top:18px">${t("gates")}</h3>
          <ul class="gates">${DATA.cpGates.map((g) => `<li class="${cur >= g.cp ? "reached" : ""}"><b>${g.cp}</b><span>${esc(L(g))}</span></li>`).join("")}</ul>
        </section>
        <section class="panel">
          <h3>${t("goals")}</h3>
          ${ch.goals.map((g) => `<div class="goal ${g.done ? "done" : ""}">
            <input type="checkbox" data-goal="${g.id}" ${g.done ? "checked" : ""} aria-label="${esc(g.text)}">
            <span>${esc(g.text)}</span><button class="icon-btn" data-del-goal="${g.id}">${t("delete")}</button></div>`).join("")}
          <form class="row" data-goal-form style="margin-top:8px">
            <label class="field"><input name="text" placeholder="${t("goal_ph")}" maxlength="80" required aria-label="${t("goals")}"></label>
            <button class="btn">${t("add")}</button>
          </form>
        </section>
        <section class="panel">
          <label class="field"><h3 style="color:var(--ink)">${t("notes")}</h3>
            <textarea rows="5" data-notes placeholder="${t("notes_ph")}">${esc(ch.notes)}</textarea></label>
        </section>
      </div>
      <section class="panel stack">
        <h3>${t("milestones")}</h3>
        ${DATA.milestones.map((grp) => `<div class="ms-group"><p class="muted" style="margin:0 0 4px">${esc(L(grp.group))}</p>
          ${grp.items.map((it) => `<label class="check"><input type="checkbox" data-ms="${it.id}" ${ch.ms[it.id] ? "checked" : ""}>${esc(L(it))}</label>`).join("")}
        </div>`).join("")}
      </section>
    </div>`;
  }

  function renderTips() {
    $view.innerHTML = `<p class="muted" style="max-width:70ch;margin-top:0">${t("tips_intro")}</p>
      <div class="tips">${DATA.tips.map((tp) => `<article class="tip panel"><h3>${esc(L(tp.title))}</h3>
        <ul>${L(tp.body).map((li) => `<li>${esc(li)}</li>`).join("")}</ul></article>`).join("")}</div>`;
  }

  function renderSettings() {
    const tasks = allTasks();
    const rows = (period) => tasks.filter((tk) => tk.period === period).map((tk) => `<tr>
      <td><input type="checkbox" data-task-on="${tk.id}" ${tk.off ? "" : "checked"} aria-label="${t("on")}"></td>
      <td>${esc(L(tk.name))}${tk.scope === "account" ? ` <span class="badge shared">${t("shared")}</span>` : ""}</td>
      <td><input type="number" min="1" max="99" value="${tk.max}" data-task-max="${tk.id}" style="width:70px" aria-label="${t("charges")}"></td>
      <td>${state.custom.some((c) => c.id === tk.id) ? `<button class="icon-btn" data-del-task="${tk.id}">${t("delete")}</button>` : ""}</td>
    </tr>`).join("");
    $view.innerHTML = `<div class="grid2">
      <section class="panel">
        <h3>${t("tasks")}</h3><p class="hint">${t("tasks_hint")}</p>
        <div class="table-wrap"><table class="matrix">
          <thead><tr><th>${t("on")}</th><th style="text-align:left">${t("name")}</th><th>${t("charges")}</th><th></th></tr></thead>
          <tbody><tr><th colspan="4" style="text-align:left"><h3>${t("daily")}</h3></th></tr>${rows("daily")}
          <tr><th colspan="4" style="text-align:left"><h3>${t("weekly")}</h3></th></tr>${rows("weekly")}</tbody>
        </table></div>
      </section>
      <div class="stack">
        <section class="panel">
          <h3>${t("custom_task")}</h3>
          <form class="stack" data-custom-form style="margin-top:10px">
            <label class="field">${t("name")}<input name="name" maxlength="50" required></label>
            <div class="row">
              <label class="field">${t("period")}<select name="period"><option value="daily">${t("daily")}</option><option value="weekly">${t("weekly")}</option></select></label>
              <label class="field">${t("scope")}<select name="scope"><option value="char">${t("per_char")}</option><option value="account">${t("per_account")}</option></select></label>
              <label class="field">${t("charges")}<input type="number" name="max" min="1" max="99" value="1"></label>
            </div>
            <div><button class="btn primary">${t("add")}</button></div>
          </form>
        </section>
        <section class="panel">
          <h3>${t("lang_label")}</h3>
          <div class="row" style="margin-top:8px">
            <button class="btn small" data-lang="es" aria-pressed="${state.lang === "es"}">Español</button>
            <button class="btn small" data-lang="en" aria-pressed="${state.lang === "en"}">English</button>
          </div>
        </section>
        <section class="panel">
          <h3>${t("data")}</h3>
          <div class="row" style="margin-top:8px">
            <button class="btn" data-export>${t("export")}</button>
            <label class="btn">${t("import")}<input type="file" accept="application/json,.json" data-import hidden></label>
            <button class="btn danger" data-wipe>${t("wipe")}</button>
          </div>
          <p class="hint" style="margin-top:12px">${t("contribute")}</p>
        </section>
      </div>
    </div>`;
  }

  function applyChrome() {
    document.documentElement.dataset.faction = state.faction;
    document.documentElement.lang = state.lang;
    document.querySelectorAll("[data-set-faction]").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.setFaction === state.faction)));
    document.querySelectorAll("[data-i18n]").forEach((el) => { el.textContent = t(el.dataset.i18n); });
    document.getElementById("langBtn").textContent = state.lang === "es" ? "EN" : "ES";
    document.querySelectorAll("#tabs [data-tab]").forEach((b) => b.setAttribute("aria-selected", String(b.dataset.tab === state.tab)));
  }

  function render() {
    applyChrome();
    renderRoster();
    ({ checklist: renderChecklist, overview: renderOverview, progress: renderProgress, tips: renderTips, settings: renderSettings }[state.tab] || renderChecklist)();
  }

  // ---------- Events ----------
  document.addEventListener("click", (e) => {
    const el = e.target.closest("button, [data-goal], [data-ms], [data-task-on]");
    if (!el || $dlg.contains(el)) return;
    const ch = activeChar();
    const d = el.dataset;

    if (d.setFaction) { state.faction = d.setFaction; save(); applyChrome(); return; }
    if (el.id === "langBtn" || d.lang) { state.lang = d.lang || (state.lang === "es" ? "en" : "es"); save(); renderClocks(); render(); return; }
    if (d.tab) { state.tab = d.tab; save(); render(); return; }
    if (d.char) { state.active = d.char; save(); render(); return; }
    if ("addChar" in d) { charDialog(null); return; }
    if ("editChar" in d && ch) { charDialog(ch); return; }
    if (d.clock) { clockDialog(d.clock); return; }
    if (d.set && ch) {
      const tk = allTasks().find((x) => x.id === d.set);
      setVal(tk, ch, +d.v); save(); render(); return;
    }
    if (d.toggleHide && ch) {
      if (ch.hidden[d.toggleHide]) delete ch.hidden[d.toggleHide]; else ch.hidden[d.toggleHide] = true;
      save(); render(); return;
    }
    if ("showHidden" in d) { state.showHidden = !state.showHidden; save(); render(); return; }
    if (d.goal && ch) { const g = ch.goals.find((x) => x.id === d.goal); g.done = el.checked; save(); render(); return; }
    if (d.delGoal && ch) { ch.goals = ch.goals.filter((x) => x.id !== d.delGoal); save(); render(); return; }
    if (d.delCp && ch) { ch.cp = ch.cp.filter((x) => x.id !== d.delCp); save(); render(); return; }
    if (d.ms && ch) { ch.ms[d.ms] = el.checked; save(); return; }
    if (d.taskOn) { (state.overrides[d.taskOn] ||= {}).off = !el.checked; save(); return; }
    if (d.delTask) { state.custom = state.custom.filter((x) => x.id !== d.delTask); delete state.overrides[d.delTask]; save(); render(); return; }
    if ("export" in d) {
      const blob = new Blob([JSON.stringify(state, null, 2)], { type: "application/json" });
      const a = Object.assign(document.createElement("a"), { href: URL.createObjectURL(blob), download: `aion2-tracker-${new Date().toISOString().slice(0, 10)}.json` });
      a.click(); URL.revokeObjectURL(a.href); return;
    }
    if ("wipe" in d && confirm(t("wipe_confirm"))) {
      const keep = { lang: state.lang, faction: state.faction, clocks: state.clocks };
      state = Object.assign(defaults(), keep); save(); renderClocks(); render();
    }
  });

  document.addEventListener("change", (e) => {
    const el = e.target, ch = activeChar();
    if (el.dataset.taskMax) {
      const n = Math.max(1, Math.min(99, parseInt(el.value, 10) || 1));
      (state.overrides[el.dataset.taskMax] ||= {}).max = n; save(); return;
    }
    if ("import" in el.dataset && el.files[0]) {
      el.files[0].text().then((txt) => {
        const obj = JSON.parse(txt);
        if (!obj || obj.v !== 1 || !Array.isArray(obj.chars)) throw new Error("bad");
        state = Object.assign(defaults(), obj); save(); renderClocks(); render(); alert(t("imported"));
      }).catch(() => alert(t("import_bad")));
    }
    if ("notes" in el.dataset && ch) { ch.notes = el.value; save(); }
  });

  document.addEventListener("submit", (e) => {
    const f = e.target, ch = activeChar();
    if ($dlg.contains(f)) return;
    e.preventDefault();
    const fd = new FormData(f);
    if ("cpForm" in f.dataset && ch) {
      const v = parseInt(fd.get("v"), 10);
      if (!(v >= 0)) return;
      ch.cp.push({ id: uid(), d: String(fd.get("d")), v });
      ch.cp.sort((a, b) => a.d.localeCompare(b.d));
    } else if ("goalForm" in f.dataset && ch) {
      ch.goals.push({ id: uid(), text: String(fd.get("text")).trim(), done: false });
    } else if ("customForm" in f.dataset) {
      state.custom.push({
        id: "c_" + uid(), period: fd.get("period"), scope: fd.get("scope"),
        max: Math.max(1, Math.min(99, parseInt(fd.get("max"), 10) || 1)), alt: true,
        name: String(fd.get("name")).trim(), desc: ""
      });
    } else return;
    save(); render();
  });

  // ---------- Boot ----------
  applyResets();
  renderClocks();
  render();
  setInterval(tickClocks, 1000);
  document.addEventListener("visibilitychange", () => { if (!document.hidden) tickClocks(); });
})();
