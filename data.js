/*
 * Contenido del juego. Editá este archivo para corregir cargas, nombres o consejos.
 * Game content. Edit this file to fix charges, names or tips — PRs welcome.
 *
 * scope: "char"    → cada personaje lleva su propio progreso
 *        "account" → compartido por todo el roster del servidor (si lo usa un alter, el main no puede)
 * max:   cantidad de usos/cargas por período (1 = casilla simple)
 * alt:   true si se muestra por defecto en personajes alter
 */
window.AION_DATA = {
  tasks: [
    // ---------- Diarias / Daily ----------
    { id: "duty", period: "daily", scope: "account", max: 5, alt: false,
      name: { es: "Misiones de deber (Duty Missions)", en: "Duty Missions" },
      desc: { es: "Kinah, Abyss Points sin tope y un slot de bonus. Agrupá las que caen en la misma zona.",
              en: "Kinah, uncapped Abyss Points and a bonus slot. Group the ones in the same zone." } },
    { id: "supply_d", period: "daily", scope: "char", max: 1, alt: false,
      name: { es: "Supply Requests (diarias)", en: "Supply Requests (daily)" },
      desc: { es: "Pagan Abyss Points. Hacé solo las que rinden bien por el esfuerzo.",
              en: "Pay Abyss Points. Only do the ones worth the effort." } },
    { id: "nightmare", period: "daily", scope: "char", max: 2, alt: true,
      name: { es: "Nightmare", en: "Nightmare" },
      desc: { es: "Boss solo potenciado, 10 dificultades. Las entradas se acumulan (hasta 14 en KR).",
              en: "Boosted solo boss, 10 difficulties. Entries stack (up to 14 in KR)." } },
    { id: "shugo", period: "daily", scope: "char", max: 2, alt: true,
      name: { es: "Shugo Festival", en: "Shugo Festival" },
      desc: { es: "Minijuegos. Tienda: cristales Daevanion → alas → skins.",
              en: "Minigames. Shop: Daevanion crystals → wings → skins." } },
    { id: "conquest", period: "daily", scope: "char", max: 3, alt: true,
      name: { es: "Expedition: Conquest", en: "Expedition: Conquest" },
      desc: { es: "Equipo y Kinah sin bindear. Ideal para alters (~1600 CP).",
              en: "Gear and unbound Kinah. Great for alts (~1600 CP)." } },
    { id: "transcendence", period: "daily", scope: "char", max: 2, alt: false,
      name: { es: "Transcendence", en: "Transcendence" },
      desc: { es: "Theostones, fragmentos de Amplify Stone y cartas Arcana. Recomendado 2200+ CP.",
              en: "Theostones, Amplify Stone fragments and Arcana cards. 2200+ CP recommended." } },
    { id: "rifts", period: "daily", scope: "char", max: 6, alt: false,
      name: { es: "Spacetime Rifts", en: "Spacetime Rifts" },
      desc: { es: "Cada 4 h. PvP, sealed dungeons y AP.", en: "Every 4 h. PvP, sealed dungeons and AP." } },
    { id: "invasion", period: "daily", scope: "char", max: 1, alt: false,
      name: { es: "Invasiones", en: "Invasions" },
      desc: { es: "Cada 2 h a la media hora. Tokens y drops de boss.", en: "Every 2 h at half past. Tokens and boss drops." } },
    { id: "kinahcap", period: "daily", scope: "char", max: 1, alt: false,
      name: { es: "Tope diario de Kinah en campo", en: "Field Kinah daily cap" },
      desc: { es: "Farmeá hasta llegar al tope diario por personaje.", en: "Farm up to the per-character daily cap." } },

    // ---------- Semanales / Weekly ----------
    { id: "scrolls", period: "weekly", scope: "char", max: 1, alt: true,
      name: { es: "Comprar Command Scrolls", en: "Buy Command Scrolls" },
      desc: { es: "Compralos cada miércoles aunque no los uses: se acumulan, y la semana que no comprás se pierde.",
              en: "Buy them every Wednesday even if unused: they stockpile, a skipped week is lost." } },
    { id: "contracts", period: "weekly", scope: "char", max: 12, alt: false,
      name: { es: "Command Missions", en: "Command Missions" },
      desc: { es: "AP, soul crystals, cube keys y fragmentos de amplificación.",
              en: "AP, soul crystals, cube keys and amplification fragments." } },
    { id: "daily_dungeon", period: "weekly", scope: "account", max: 14, alt: false,
      name: { es: "Bio-Research Base / Odylium Repository", en: "Bio-Research Base / Odylium Repository" },
      desc: { es: "14 entradas compartidas por todo el roster. Bio-Research: piedras de enhance. Odylium: almas de pet.",
              en: "14 entries shared by the whole roster. Bio-Research: enhance stones. Odylium: pet souls." } },
    { id: "ascension", period: "weekly", scope: "char", max: 3, alt: true,
      name: { es: "Ascension Trial", en: "Ascension Trial" },
      desc: { es: "Entrar consume el uso aunque falles: elegí una dificultad que puedas limpiar.",
              en: "Entering uses a run even if you fail: pick a difficulty you can clear." } },
    { id: "odyle", period: "weekly", scope: "char", max: 7, alt: true,
      name: { es: "Comprar Odyle Energy", en: "Buy Odyle Energy" },
      desc: { es: "7 por semana por personaje. Acumulá en el alter desde temprano.",
              en: "7 per week per character. Stockpile on alts early." } },
    { id: "exploration", period: "weekly", scope: "char", max: 7, alt: false,
      name: { es: "Expedition: Exploration", en: "Expedition: Exploration" },
      desc: { es: "Paga Kinah bindeado.", en: "Pays bound Kinah." } },
    { id: "raid", period: "weekly", scope: "char", max: 3, alt: false,
      name: { es: "Raid", en: "Raid" }, desc: { es: "", en: "" } },
    { id: "sanctuary", period: "weekly", scope: "char", max: 2, alt: false,
      name: { es: "Sanctuary (Ludra)", en: "Sanctuary (Ludra)" },
      desc: { es: "Raid de 10 jugadores. 2700+ CP.", en: "10-player raid. 2700+ CP." } },
    { id: "vakron", period: "weekly", scope: "char", max: 1, alt: false,
      name: { es: "Trial (Vakron Sky Island)", en: "Trial (Vakron Sky Island)" },
      desc: { es: "Moneda semanal para su tienda. De lo mejor por hora.", en: "Weekly currency for its shop. Among the best per hour." } },
    { id: "abyss", period: "weekly", scope: "char", max: 1, alt: false,
      name: { es: "Tope semanal de Abyss", en: "Abyss weekly cap" },
      desc: { es: "Recompensas semanales del Abyss.", en: "Abyss weekly rewards." } },
    { id: "supply_w", period: "weekly", scope: "char", max: 1, alt: false,
      name: { es: "Supply Requests (semanales)", en: "Supply Requests (weekly)" }, desc: { es: "", en: "" } },
    { id: "funnel", period: "weekly", scope: "char", max: 1, alt: true, main: false,
      name: { es: "Pasar Kinah y materiales al main", en: "Send Kinah and materials to main" },
      desc: { es: "Kinah sin bindear y lo que se pueda traspasar. Mirá la pestaña Traspasos.",
              en: "Unbound Kinah and anything transferable. See the Transfers tab." } }
  ],

  // Qué se puede pasar de los alters al main. sure: false = no confirmado por más de una fuente.
  // What can move from alts to main. sure: false = not confirmed by more than one source.
  transfer: {
    worth: [
      { sure: true, name: { es: "Kinah sin bindear", en: "Unbound Kinah" },
        note: { es: "Sale de Expedition: Conquest. Se manda al main por correo.", en: "Comes from Expedition: Conquest. Mail it to your main." } },
      { sure: false, name: { es: "Enhance Stones", en: "Enhance Stones" },
        note: { es: "Truco: subí a +3 un equipo normal/high-grade tradeable y pasalo por el warehouse.", en: "Trick: enhance tradable normal/high-grade gear to +3 and move it through the warehouse." } },
      { sure: false, name: { es: "Materiales Wrathful (versión tradeable)", en: "Wrathful materials (tradable version)" },
        note: { es: "Algunas dungeons los dropean en versión tradeable además de la soul-bound. Revisá el tooltip.", en: "Some dungeons drop a tradable version besides the soul-bound one. Check the tooltip." } },
      { sure: false, name: { es: "Amplify Stone (Unique)", en: "Amplify Stone (Unique)" },
        note: { es: "No figura como Bound, pero no está confirmado.", en: "Not listed as Bound, but unconfirmed." } },
      { sure: false, name: { es: "Equipo tradeable sin equipar", en: "Unequipped tradable gear" },
        note: { es: "Se puede pasar mientras no lo equipes: al equiparlo queda bindeado.", en: "Movable as long as it's never equipped: equipping binds it." } }
    ],
    no: [
      { sure: true, name: { es: "Kinah bindeado", en: "Bound Kinah" },
        note: { es: "Sale de Expedition: Exploration y queda en ese personaje.", en: "Comes from Expedition: Exploration and stays on that character." } },
      { sure: true, name: { es: "Odyle Energy", en: "Odyle Energy" }, note: { es: "Por personaje.", en: "Per character." } },
      { sure: true, name: { es: "Equipo ya equipado", en: "Gear once equipped" }, note: { es: "", en: "" } },
      { sure: false, name: { es: "Items marcados (Bound)", en: "Items tagged (Bound)" },
        note: { es: "Power Shards, Transfer Stone, Sync Stone, Orichalcum Ore, gemas Radiant/Pure, cofres de selección.", en: "Power Shards, Transfer Stone, Sync Stone, Orichalcum Ore, Radiant/Pure gems, selection chests." } }
    ],
    account: [
      { sure: true, name: { es: "Colecciones", en: "Collections" },
        note: { es: "Pantheon, títulos, pets y closet: los stats aplican a todos tus personajes.", en: "Pantheon, titles, pets and closet: stats apply to every character." } },
      { sure: false, name: { es: "Qunah", en: "Qunah" }, note: { es: "Una sola fuente dice que es compartida.", en: "Only one source says it's shared." } },
      { sure: false, name: { es: "Plumas (Monolith)", en: "Feathers (Monolith)" },
        note: { es: "Anunciado como compartido a futuro en KR.", en: "Announced as shared in a future KR update." } }
    ]
  },

  // Hitos permanentes por personaje / Permanent per-character milestones
  milestones: [
    { group: { es: "Poder base", en: "Static power" }, items: [
      { id: "regional", es: "Quests regionales", en: "Regional quests" },
      { id: "sealed", es: "Sealed Dungeons", en: "Sealed Dungeons" },
      { id: "strongholds", es: "Strongholds", en: "Strongholds" },
      { id: "belt", es: "Mejora de cinturón", en: "Belt upgrade" },
      { id: "emp_world", es: "Empyrean — Verteron / Altgard", en: "Empyrean — Verteron / Altgard" },
      { id: "emp_abyss", es: "Empyrean — Abyss", en: "Empyrean — Abyss" },
      { id: "monolith", es: "Plumas del Monolith", en: "Monolith feathers" }
    ]},
    { group: { es: "Personaje", en: "Character" }, items: [
      { id: "daevanion_c", es: "Daevanion: esquinas del tablero", en: "Daevanion: board corners" },
      { id: "daevanion_t", es: "Daevanion: umbrales", en: "Daevanion: thresholds" },
      { id: "daevanion_m", es: "Daevanion: centro", en: "Daevanion: middle" },
      { id: "skills10", es: "Skills principales a nivel 10", en: "Core skills to level 10" },
      { id: "stigma", es: "Stigmas completos", en: "Stigmas complete" },
      { id: "enhance", es: "Equipo mejorado y soulbound", en: "Gear enhanced and soulbound" },
      { id: "arcana", es: "Set de cartas Arcana", en: "Arcana card set" }
    ]},
    { group: { es: "Cuenta (colecciones)", en: "Account (collections)" }, items: [
      { id: "titles", es: "Títulos (stats permanentes)", en: "Titles (permanent stats)" },
      { id: "pantheon", es: "Pantheon: pinturas y estatuas", en: "Pantheon: paintings and statues" },
      { id: "pets", es: "Pet insight al tope (3)", en: "Pet insight capped (3)" },
      { id: "closet", es: "Closet y alas", en: "Closet and wings" }
    ]}
  ],

  // Umbrales de Combat Power / CP thresholds
  cpGates: [
    { cp: 1600, es: "Conquest (Draupnir Cave) y Vakron", en: "Conquest (Draupnir Cave) and Vakron" },
    { cp: 2200, es: "Fire Temple y Transcendence", en: "Fire Temple and Transcendence" },
    { cp: 2700, es: "Sanctuary", en: "Sanctuary" }
  ],

  tips: [
    { title: { es: "Si tenés poco tiempo", en: "Short on time" },
      body: { es: ["Comprá los Command Scrolls del miércoles.", "Hacé Duty Missions y Supply Requests.", "Después, lo que es por personaje: Nightmare, Ascension Trial y Shugo."],
              en: ["Buy Wednesday's Command Scrolls.", "Do Duty Missions and Supply Requests.", "Then per-character content: Nightmare, Ascension Trial and Shugo."] } },
    { title: { es: "Main y alters", en: "Main and alts" },
      body: { es: ["Duty Missions y las 14 entradas de Bio-Research/Odylium son del servidor: si las gasta un alter, el main no puede.",
                   "Hacé un solo alter hasta que el main tenga limpia la rotación de Conquest. Dos si jugás mucho, nunca más de tres.",
                   "En el alter, Conquest paga Kinah sin bindear (Exploration paga bindeado). Empezá por Draupnir Cave con ~1600 CP.",
                   "Lista corta para el alter: Conquest + Nightmare, y acumulá Odyle Energy desde temprano."],
              en: ["Duty Missions and the 14 Bio-Research/Odylium entries are server-wide: if an alt spends them, the main can't.",
                   "Make one alt only once your main's Conquest rotation is clean. Two if you play a lot, never more than three.",
                   "On alts, Conquest pays unbound Kinah (Exploration pays bound). Start at Draupnir Cave around 1600 CP.",
                   "Keep the alt list short: Conquest + Nightmare, and stockpile Odyle Energy early."] } },
    { title: { es: "Duty Missions", en: "Duty Missions" },
      body: { es: ["Rerolleá la fila de bonus con Kinah hasta que lo que querés quede en el slot 1 o 2: la chance baja de izquierda a derecha."],
              en: ["Reroll the bonus row with Kinah until what you want lands in slot 1 or 2: odds drop from left to right."] } },
    { title: { es: "Tiendas", en: "Shops" },
      body: { es: ["Nightmare: estatuas y alas antes que cosméticos. Al principio rinden los cristales Ariel y los puntos de skill.",
                   "Shugo: cristales Daevanion, después alas, después skins."],
              en: ["Nightmare: statues and wings before cosmetics. Early on, Ariel crystals and skill points are good picks.",
                   "Shugo: Daevanion crystals, then wings, then skins."] } },
    { title: { es: "Recursos limitados", en: "Limited resources" },
      body: { es: ["El Pet Auto-Loot Ticket se puede comprar 2 veces por mes por personaje: guardalo para tu farmeo más denso.",
                   "Ascension Trial cuenta como uso aunque falles."],
              en: ["The Pet Auto-Loot Ticket is limited to 2 per character per month: save it for your densest farming.",
                   "Ascension Trial counts as a use even if you fail."] } },
    { title: { es: "Tablero Daevanion", en: "Daevanion board" },
      body: { es: ["Orden recomendado: esquinas, umbrales y por último el centro."],
              en: ["Recommended order: corners, thresholds, then the middle."] } }
  ],

  classes: ["Gladiator", "Templar", "Assassin", "Ranger", "Sorcerer", "Spiritmaster", "Cleric", "Chanter"]
};
