/*
 * Contenido del juego — SOLO versión GLOBAL (NA, SA, EU, JP). No agregar datos de KR/TW.
 * Game content — GLOBAL version ONLY (NA, SA, EU, JP). Don't add KR/TW data.
 * Editá este archivo para corregir cargas, nombres o consejos. PRs welcome.
 *
 * scope: "char"    → cada personaje lleva su propio progreso
 *        "account" → compartido por todo el roster del servidor (si lo usa un alter, el main no puede)
 * max:   cantidad de usos/cargas por período (1 = casilla simple)
 * alt:   true si se muestra por defecto en personajes alter
 * main:  false si NO se muestra por defecto en el main
 * sure:  false si el número no está confirmado para global (viene de KR o de una sola fuente)
 *
 * Fuentes: anuncios de NCSOFT para global (livestream 7/8, membresía 18/8, cierre del Launch Scale Test 18/9),
 * análisis del cliente del Launch Scale Test (17/9) y guías de la comunidad para global. Revisado 2026-09-24.
 */
window.AION_DATA = {
  tasks: [
    // ---------- Diarias / Daily ----------
    { id: "duty", period: "daily", scope: "account", max: 5, alt: false, sure: true,
      name: { es: "Misiones de deber (Duty Missions)", en: "Duty Missions" },
      desc: { es: "Kinah, Abyss Points y un slot de bonus. Compartidas por todos los personajes del servidor.",
              en: "Kinah, Abyss Points and a bonus slot. Shared by every character on the server." } },
    { id: "supply_d", period: "daily", scope: "char", max: 1, alt: false, sure: true,
      name: { es: "Supply Requests (diarias)", en: "Supply Requests (daily)" },
      desc: { es: "Pagan Abyss Points. Hacé solo las que rinden bien por el esfuerzo.",
              en: "Pay Abyss Points. Only do the ones worth the effort." } },
    { id: "nightmare", period: "daily", scope: "char", max: 2, alt: true, sure: true,
      name: { es: "Nightmare", en: "Nightmare" },
      desc: { es: "Boss solo potenciado. Cuánto se acumulan las entradas en global todavía no está confirmado.",
              en: "Boosted solo boss. How many entries stack on global is still unconfirmed." } },
    { id: "shugo", period: "daily", scope: "char", max: 3, alt: true, sure: false,
      name: { es: "Shugo Festival", en: "Shugo Festival" },
      desc: { es: "Minijuegos cada hora. En global serían 3 llaves por día sin membresía. La tienda ahora da puntos de skill y Radiant Odyle (3 por mes).",
              en: "Hourly minigames. Global reportedly gives 3 keys per day without membership. The shop now has skill points and Radiant Odyle (3 per month)." } },
    { id: "conquest", period: "daily", scope: "char", max: 3, alt: true, sure: false,
      name: { es: "Expedition: Conquest", en: "Expedition: Conquest" },
      desc: { es: "El endgame principal. Paga Kinah sin bindear: ideal para alters. Grupos de 5.",
              en: "The core endgame. Pays unbound Kinah: great for alts. Parties of 5." } },
    { id: "transcendence", period: "daily", scope: "char", max: 2, alt: false, sure: false,
      name: { es: "Transcendence", en: "Transcendence" },
      desc: { es: "Theostones, fragmentos de Amplify Stone y cartas Arcana.",
              en: "Theostones, Amplify Stone fragments and Arcana cards." } },
    { id: "invasion", period: "daily", scope: "char", max: 1, alt: false, sure: true,
      name: { es: "Invasiones", en: "Invasions" },
      desc: { es: "Cada 2 h a la media hora. Tokens y drops de boss.", en: "Every 2 h at half past. Tokens and boss drops." } },
    { id: "kinahcap", period: "daily", scope: "char", max: 1, alt: false, sure: true,
      name: { es: "Tope diario de Kinah en campo", en: "Field Kinah daily cap" },
      desc: { es: "Farmeá hasta llegar al tope diario por personaje.", en: "Farm up to the per-character daily cap." } },

    // ---------- Semanales / Weekly ----------
    { id: "scrolls", period: "weekly", scope: "char", max: 1, alt: true, sure: true,
      name: { es: "Comprar Command Scrolls", en: "Buy Command Scrolls" },
      desc: { es: "Compralos cada semana aunque no los uses: se acumulan, y la semana que no comprás se pierde.",
              en: "Buy them every week even if unused: they stockpile, a skipped week is lost." } },
    { id: "contracts", period: "weekly", scope: "char", max: 12, alt: false, sure: true,
      name: { es: "Command Missions", en: "Command Missions" },
      desc: { es: "12 normales (más 5 por grado de Abyss). AP, soul crystals, cube keys y fragmentos.",
              en: "12 regular (plus 5 per Abyss grade). AP, soul crystals, cube keys and fragments." } },
    { id: "daily_dungeon", period: "weekly", scope: "account", max: 14, alt: false, sure: true,
      name: { es: "Bio-Research Base / Odylium Repository", en: "Bio-Research Base / Odylium Repository" },
      desc: { es: "14 entradas por semana compartidas por todo el roster. En el test global solo apareció Bio-Research.",
              en: "14 entries per week shared by the whole roster. Only Bio-Research showed up in the global test." } },
    { id: "ascension", period: "weekly", scope: "char", max: 3, alt: true, sure: true,
      name: { es: "Ascension Trial", en: "Ascension Trial" },
      desc: { es: "Entrar consume el uso aunque falles: elegí una dificultad que puedas limpiar.",
              en: "Entering uses a run even if you fail: pick a difficulty you can clear." } },
    { id: "odyle", period: "weekly", scope: "char", max: 7, alt: true, sure: false,
      name: { es: "Comprar Odyle Energy", en: "Buy Odyle Energy" },
      desc: { es: "El bonus semanal se reinicia el miércoles (build de test global). Con membresía se puede inyectar 2 veces en los cubos de recompensa.",
              en: "The weekly bonus resets on Wednesday (global test build). With membership you can inject it twice into reward cubes." } },
    { id: "exploration", period: "weekly", scope: "char", max: 7, alt: false, sure: false,
      name: { es: "Expedition: Exploration", en: "Expedition: Exploration" },
      desc: { es: "Modo tutorial de las expediciones. Paga Kinah bindeado.", en: "Tutorial mode of expeditions. Pays bound Kinah." } },
    { id: "sanctuary", period: "weekly", scope: "char", max: 2, alt: false, sure: false,
      name: { es: "Sanctuary: Abyssal Forge Ludra", en: "Sanctuary: Abyssal Forge Ludra" },
      desc: { es: "Raid de 10 jugadores (en KR era de 8). Equipo Unique.", en: "10-player raid (8 in KR). Unique gear." } },
    { id: "abyss", period: "weekly", scope: "char", max: 1, alt: false, sure: false,
      name: { es: "Tope semanal de Abyss Points", en: "Abyss Points weekly cap" },
      desc: { es: "En el test global el tope era 500k y sube 500k por semana.", en: "In the global test the cap was 500k, rising 500k per week." } },
    { id: "supply_w", period: "weekly", scope: "char", max: 1, alt: false, sure: true,
      name: { es: "Supply Requests (semanales)", en: "Supply Requests (weekly)" }, desc: { es: "", en: "" } },
    { id: "funnel", period: "weekly", scope: "char", max: 1, alt: true, main: false, sure: true,
      name: { es: "Pasar Kinah y materiales al main", en: "Send Kinah and materials to main" },
      desc: { es: "Kinah sin bindear y lo que se pueda traspasar. Mirá la pestaña Traspasos.",
              en: "Unbound Kinah and anything transferable. See the Transfers tab." } }
  ],

  // Qué se puede pasar de los alters al main. sure: false = no confirmado para global.
  transfer: {
    worth: [
      { sure: true, name: { es: "Kinah sin bindear", en: "Unbound Kinah" },
        note: { es: "Sale de Expedition: Conquest. Se manda al main por correo.", en: "Comes from Expedition: Conquest. Mail it to your main." } },
      { sure: false, name: { es: "Materiales Draconic", en: "Draconic materials" },
        note: { es: "En el test global caían sin bindear y tradeables en todos los tiers.", en: "In the global test they dropped unbound and tradable at every tier." } },
      { sure: false, name: { es: "Enhance Stones", en: "Enhance Stones" },
        note: { es: "Truco de KR, sin confirmar en global: subí a +3 un equipo tradeable y pasalo por el almacén.", en: "KR trick, unconfirmed on global: enhance tradable gear to +3 and move it through storage." } },
      { sure: false, name: { es: "Equipo tradeable sin equipar", en: "Unequipped tradable gear" },
        note: { es: "Se puede pasar mientras no lo equipes: al equiparlo queda bindeado.", en: "Movable as long as it's never equipped: equipping binds it." } }
    ],
    no: [
      { sure: true, name: { es: "Kinah bindeado", en: "Bound Kinah" },
        note: { es: "Sale de Expedition: Exploration y queda en ese personaje.", en: "Comes from Expedition: Exploration and stays on that character." } },
      { sure: true, name: { es: "Odyle Energy", en: "Odyle Energy" }, note: { es: "Por personaje.", en: "Per character." } },
      { sure: true, name: { es: "Equipo ya equipado", en: "Gear once equipped" }, note: { es: "", en: "" } },
      { sure: false, name: { es: "Dragon Lord de tiers altos", en: "Higher-tier Dragon Lord gear" },
        note: { es: "Solo el primer tier se craftea directo; los siguientes salen por transfer crafting y quedan bindeados.", en: "Only the first tier is crafted directly; higher tiers come from transfer crafting and are bound." } }
    ],
    account: [
      { sure: true, name: { es: "Colecciones", en: "Collections" },
        note: { es: "Pantheon, títulos, pets y closet: los stats aplican a todos tus personajes.", en: "Pantheon, titles, pets and closet: stats apply to every character." } },
      { sure: true, name: { es: "Membresía", en: "Membership" },
        note: { es: "Es por servidor, no por personaje: cubre a todos tus personajes de ese servidor.", en: "It's per server, not per character: it covers all your characters on that server." } }
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
      { id: "stigma", es: "Los 4 slots de Stigma completos", en: "All 4 Stigma slots filled" },
      { id: "enhance_g", es: "Equipo verde a +5 (tope)", en: "Green gear to +5 (cap)" },
      { id: "enhance", es: "Equipo azul a +10 (tope)", en: "Blue gear to +10 (cap)" },
      { id: "dragonlord", es: "Primer tier de Dragon Lord crafteado", en: "First Dragon Lord tier crafted" },
      { id: "arcana", es: "Set de cartas Arcana", en: "Arcana card set" }
    ]},
    { group: { es: "Cuenta (colecciones)", en: "Account (collections)" }, items: [
      { id: "titles", es: "Títulos (stats permanentes)", en: "Titles (permanent stats)" },
      { id: "pantheon", es: "Pantheon: pinturas y estatuas", en: "Pantheon: paintings and statues" },
      { id: "pets", es: "Pets al tope (3)", en: "Pets capped (3)" },
      { id: "closet", es: "Closet y alas (cosméticas)", en: "Closet and wings (cosmetic)" }
    ]}
  ],

  // Umbrales de Item Level en global (cliente del Launch Scale Test) / Global Item Level gates
  cpGates: [
    { cp: 700, es: "Conquest: Krao Cave y Draupnir Cave", en: "Conquest: Krao Cave and Draupnir Cave" },
    { cp: 800, es: "Expediciones de 1 estrella", en: "1-star expeditions" },
    { cp: 1400, es: "Conquest: Urugugu Canyon", en: "Conquest: Urugugu Canyon" },
    { cp: 2100, es: "Conquest: Fire Temple y Ferocious Horn Den", en: "Conquest: Fire Temple and Ferocious Horn Den" },
    { cp: 2200, es: "Expediciones de 3 estrellas (recomendado)", en: "3-star expeditions (recommended)" }
  ],

  // Camino para subir Item Level (etapas según los umbrales globales). sure: false = viene de KR, sin confirmar en global.
  ilGuide: [
    { from: 0, to: 700,
      title: { es: "Base: nivel 45 y poder estático", en: "Foundation: level 45 and static power" },
      steps: [
        { id: "g1_quests", es: "Terminá la historia y las quests secundarias hasta nivel 45.", en: "Finish the story and side quests up to level 45." },
        { id: "g1_sealed", es: "Hacé las Sealed Dungeons y los Strongholds: dan poder permanente y mejoran el cinturón.", en: "Clear Sealed Dungeons and Strongholds: permanent power and belt upgrades." },
        { id: "g1_pantheon", es: "Completá lo que puedas del Pantheon (pinturas y estatuas): suma stats a toda la cuenta.", en: "Fill what you can of the Pantheon (paintings and statues): account-wide stats." },
        { id: "g1_amulet", es: "Empezá a mejorar el Revelation Amulet y el cinturón: no se reemplazan nunca.", en: "Start enhancing the Revelation Amulet and the belt: you never replace them." }
      ] },
    { from: 700, to: 1400,
      title: { es: "Primeras Conquest: Krao Cave y Draupnir Cave", en: "First Conquests: Krao Cave and Draupnir Cave" },
      steps: [
        { id: "g2_conquest", es: "Corré Conquest en Krao Cave y Draupnir Cave todos los días.", en: "Run Conquest in Krao Cave and Draupnir Cave every day." },
        { id: "g2_voucher", es: "Guardá los Gear Change Voucher (recompensa segura de cada Conquest): 1 convierte un arma, 2 craftean un guard.", en: "Keep Gear Change Vouchers (guaranteed Conquest reward): 1 converts a weapon, 2 craft a guard." },
        { id: "g2_draupnir", sure: false, es: "Para armadura, Draupnir rinde más; en Krao Cave el arma cae poco.", en: "For armor, Draupnir pays better; weapons rarely drop in Krao Cave." },
        { id: "g2_abyss", sure: false, es: "Gastá Abyss Points en accesorios, anillos primero.", en: "Spend Abyss Points on accessories, rings first." },
        { id: "g2_weekly", es: "No dejes pasar Nightmare, Shugo Festival ni Ascension Trial: todo suma Item Level.", en: "Don't skip Nightmare, Shugo Festival or Ascension Trial: it all adds Item Level." }
      ] },
    { from: 1400, to: 2100,
      title: { es: "Urugugu Canyon, Arcana y Dragon Lord", en: "Urugugu Canyon, Arcana and Dragon Lord" },
      steps: [
        { id: "g3_urugugu", es: "Pasá a Conquest en Urugugu Canyon.", en: "Move up to Conquest in Urugugu Canyon." },
        { id: "g3_arcana", sure: false, es: "Transcendence para cartas Arcana: cada carta simple suma ~20 de Item Level y las verdes ~40.", en: "Transcendence for Arcana cards: each basic card adds ~20 Item Level, green ones ~40." },
        { id: "g3_blue", es: "Subí el equipo azul que vayas a conservar hasta +10 (el tope en global).", en: "Take the blue gear you'll keep to +10 (the global cap)." },
        { id: "g3_dragonlord", es: "Crafteá el primer tier de Dragon Lord: los tiers siguientes salen por transfer crafting.", en: "Craft the first Dragon Lord tier: higher tiers come from transfer crafting." },
        { id: "g3_draconic", es: "Juntá materiales Draconic: caen sin bindear, así que los alters también aportan.", en: "Stockpile Draconic materials: they drop unbound, so alts can contribute." }
      ] },
    { from: 2100, to: 99999,
      title: { es: "Endgame: Fire Temple, Ludra y optimización", en: "Endgame: Fire Temple, Ludra and optimization" },
      steps: [
        { id: "g4_fire", es: "Corré Conquest en Fire Temple (armas) y Ferocious Horn Den (para completar huecos).", en: "Run Conquest in Fire Temple (weapons) and Ferocious Horn Den (to fill gaps)." },
        { id: "g4_ludra", es: "Entrá a Sanctuary: Abyssal Forge Ludra. El brazalete se craftea desde el día 1 con 3 vouchers + 5M Kinah.", en: "Join Sanctuary: Abyssal Forge Ludra. The bracelet is craftable from day 1 with 3 vouchers + 5M Kinah." },
        { id: "g4_transfer", es: "Subí el Dragon Lord de tier con transfer crafting: conserva enhance, amplificación y soulbind.", en: "Tier up Dragon Lord with transfer crafting: it keeps enhancement, amplification and soulbind." },
        { id: "g4_manastones", sure: false, es: "Poné manastones: el equipo azul usa 3 slots de grado bajo; el Unique, 4 de grado alto.", en: "Socket manastones: blue gear takes 3 lower-grade slots; Unique takes 4 higher-grade." },
        { id: "g4_soulbind", es: "Recién ahora optimizá el soulbind: en global las tiradas son más bajas que en KR.", en: "Only now optimize soulbind: global rolls are lower than in KR." }
      ] }
  ],

  proTips: [
    { es: "Orden de inversión: Revelation Amulet y cinturón primero (no se reemplazan), después el arma, y el resto con cuidado.",
      en: "Investment order: Revelation Amulet and belt first (never replaced), then the weapon, and the rest sparingly." },
    { es: "No sobre-inviertas en equipo verde: en global el tope es +5.", en: "Don't overinvest in green gear: the global cap is +5." },
    { sure: false, es: "Un enhance fallido no rompe el item. Si lo extraés, solo recuperás las piedras, no el Kinah ni las manastones.",
      en: "A failed enhance doesn't break the item. Extracting it refunds only the stones, not the Kinah or manastones." },
    { es: "El Dragon Lord crafteado es inversión segura: el transfer crafting conserva todo lo que le pusiste.",
      en: "Crafted Dragon Lord is a safe investment: transfer crafting keeps everything you put into it." },
    { es: "No gastes en soulbind hasta tener el equipo que vas a conservar.", en: "Don't spend on soulbind until you have keeper gear." },
    { sure: false, es: "La Odyle Energy es el cuello de botella: comprá las 7 semanales siempre.", en: "Odyle Energy is the bottleneck: always buy the weekly 7." },
    { es: "Hacé los gastos grandes después del reset semanal, cuando entra el ingreso de la semana.", en: "Make big spends after the weekly reset, when the week's income comes in." },
    { es: "Invertí primero en el slot que te bloquea el próximo contenido, no en todo parejo.", en: "Invest first in the slot blocking your next content, not everything evenly." }
  ],

  tips: [
    { title: { es: "Qué cambia en global", en: "What's different on global" },
      body: { es: ["Arranca con una Season 1 modificada: trae mejoras de calidad de vida de Corea, pero no su contenido del último año.",
                   "Grupos de 5 en dungeons (en KR eran 4) y raid de 10 (en KR eran 8). Elyos y Asmodians pueden agruparse para dungeons.",
                   "Battlegrounds 10v10 con stats normalizados: gana la habilidad, no el equipo. El PvP en el mundo es opcional.",
                   "4 slots de Stigma en Season 1 (en KR eran 6). No hay dificultad Heroic ni equipo Heroic todavía.",
                   "Tope de mejora: +5 en equipo verde y +10 en azul. No está el tablero de Ariel."],
              en: ["It starts with a modified Season 1: Korea's quality-of-life improvements, but not its last year of content.",
                   "Parties of 5 in dungeons (4 in KR) and a 10-player raid (8 in KR). Elyos and Asmodians can group for dungeons.",
                   "Battlegrounds are 10v10 with normalized stats: skill wins, not gear. World PvP is optional.",
                   "4 Stigma slots in Season 1 (6 in KR). No Heroic difficulty or Heroic gear yet.",
                   "Enhancement cap: +5 on green gear and +10 on blue. The Ariel board isn't there."] } },
    { title: { es: "Membresía", en: "Membership" },
      body: { es: ["Cuesta USD 15 por 30 días y es por servidor. Los Founder's Packs traen 30 días.",
                   "Sin membresía podés publicar en el Market, pero no comprar. También habilita el World Market, el cambio Kinah↔Quna, el almacén remoto y el comercio directo (5 por día).",
                   "Con membresía, la Odyle Energy se inyecta 2 veces en los cubos de Expedition, Transcendence y Sanctuary."],
              en: ["USD 15 for 30 days, per server. Founder's Packs include 30 days.",
                   "Without membership you can list on the Market but not buy. It also unlocks the World Market, the Kinah↔Quna exchange, remote storage and direct trade (5 per day).",
                   "With membership, Odyle Energy can be injected twice into Expedition, Transcendence and Sanctuary cubes."] } },
    { title: { es: "Comercio", en: "Trading" },
      body: { es: ["En el test global NCSOFT desactivó el comercio directo entre jugadores como medida anti-bots: el Market es el centro del comercio. No aclaró si sigue así en el lanzamiento.",
                   "El cambio Kinah↔Quna tiene más límites que en Corea."],
              en: ["In the global test NCSOFT disabled direct player trades as an anti-bot measure: the Market is the trading hub. It didn't say whether that stays at launch.",
                   "The Kinah↔Quna exchange is more limited than in Korea."] } },
    { title: { es: "Si tenés poco tiempo", en: "Short on time" },
      body: { es: ["Comprá los Command Scrolls de la semana.", "Hacé Duty Missions y Supply Requests.", "Después, lo que es por personaje: Nightmare, Ascension Trial y Shugo."],
              en: ["Buy the week's Command Scrolls.", "Do Duty Missions and Supply Requests.", "Then per-character content: Nightmare, Ascension Trial and Shugo."] } },
    { title: { es: "Main y alters", en: "Main and alts" },
      body: { es: ["Duty Missions y las 14 entradas de Bio-Research/Odylium son del servidor: si las gasta un alter, el main no puede.",
                   "Tenés 4 slots de personaje. Hacé un alter recién cuando el main tenga limpia la rotación de Conquest.",
                   "En el alter, Conquest paga Kinah sin bindear (Exploration paga bindeado). En global, Krao Cave y Draupnir Cave piden Item Level 700.",
                   "Lista corta para el alter: Conquest + Nightmare, y acumulá Odyle Energy desde temprano."],
              en: ["Duty Missions and the 14 Bio-Research/Odylium entries are server-wide: if an alt spends them, the main can't.",
                   "You have 4 character slots. Make an alt only once your main's Conquest rotation is clean.",
                   "On alts, Conquest pays unbound Kinah (Exploration pays bound). On global, Krao Cave and Draupnir Cave need Item Level 700.",
                   "Keep the alt list short: Conquest + Nightmare, and stockpile Odyle Energy early."] } },
    { title: { es: "Expediciones", en: "Expeditions" },
      body: { es: ["Se desbloquean por nivel: Krao Cave (20), Urugugu Canyon (28), Fire Temple (35) y Draupnir Cave (45).",
                   "Cada una tiene modo Exploration (tutorial, equipo básico) y modo Conquest (el endgame).",
                   "En Season 1 hay dificultad de 1, 2 y 3 estrellas."],
              en: ["They unlock by level: Krao Cave (20), Urugugu Canyon (28), Fire Temple (35) and Draupnir Cave (45).",
                   "Each has an Exploration mode (tutorial, basic gear) and a Conquest mode (the endgame).",
                   "Season 1 has 1, 2 and 3-star difficulty."] } },
    { title: { es: "Duty Missions", en: "Duty Missions" },
      body: { es: ["Rerolleá la fila de bonus con Kinah hasta que lo que querés quede en el slot 1 o 2: la chance baja de izquierda a derecha."],
              en: ["Reroll the bonus row with Kinah until what you want lands in slot 1 or 2: odds drop from left to right."] } },
    { title: { es: "Recursos limitados", en: "Limited resources" },
      body: { es: ["El Pet Auto-Loot Ticket tiene tope mensual por personaje: guardalo para tu farmeo más denso.",
                   "Ascension Trial cuenta como uso aunque falles.",
                   "Radiant Odyle de la tienda del Shugo Festival: 3 por mes."],
              en: ["The Pet Auto-Loot Ticket has a monthly cap per character: save it for your densest farming.",
                   "Ascension Trial counts as a use even if you fail.",
                   "Radiant Odyle from the Shugo Festival shop: 3 per month."] } },
    { title: { es: "Tablero Daevanion", en: "Daevanion board" },
      body: { es: ["Orden recomendado: esquinas, umbrales y por último el centro."],
              en: ["Recommended order: corners, thresholds, then the middle."] } }
  ],

  classes: ["Gladiator", "Templar", "Assassin", "Ranger", "Sorcerer", "Spiritmaster", "Cleric", "Chanter"]
};
