# AION 2 Tracker

Checklist diaria y semanal para **AION 2 global** (servidores NA, SA, EU y JP), pensada para llevar al main y a los alters al mismo tiempo.

El contenido está pensado solo para la versión global, no para Corea ni Taiwán. Lo que todavía no está confirmado para global aparece marcado como *sin confirmar*.

**Usala online:** https://aion2-tracker.github.io/Aion2-DailiesTracker/

## Qué hace

- **Contadores de reset diario y semanal**, cada uno con su propia zona horaria, hora y día. Maneja horario de verano y te muestra el reset en tu hora local.
- **Checklist por personaje** con cargas (Nightmare 2/2, Conquest 3/3…). El progreso se limpia solo cuando pasa el reset.
- **Contenido compartido del roster** (Duty Missions, Bio-Research/Odylium): se marca una sola vez y lo ven todos tus personajes.
- **Alters con lista corta** por defecto. Cualquier tarea se puede ocultar o mostrar por personaje.
- **Vista Roster**: todos tus personajes contra todas las tareas en una tabla.
- **Traspasos**: Kinah bindeado y sin bindear por personaje, envío de alters al main y qué materiales se pueden pasar.
- **Crafteo**: buscá cualquier receta del global, armá tu plan y mirá la lista de materiales que te faltan (incluye los intermedios). Recomendaciones según la clase y facción del personaje.
- **Progresión**: curva de Item Level, umbrales de contenido por Item Level, hitos permanentes, objetivos y notas.
- **Consejos** de la comunidad para main y alters.
- **Ajustes**: cambiá las cargas, apagá tareas, creá tareas propias, exportá o importá un backup.
- Español / English, tema Elyos (claro) y Asmodian (oscuro).

Los datos se guardan solo en tu navegador (`localStorage`). No hay cuentas ni servidor.

## Contribuir

Todo el contenido del juego (tareas, cargas, hitos, consejos) vive en [`data.js`](data.js). Solo datos de la versión global. Si algo cambió, abrí un issue o mandá un PR editando ese archivo.

## Datos de recetas

Las recetas vienen de [questlog.gg](https://questlog.gg/aion-2) (versión global) y se guardan en `data/recipes.json`. Para actualizarlas después de un patch:

```
node tools/fetch-recipes.mjs
```

El script va despacio a propósito para no cargar a questlog. Gracias a questlog por su base de datos.

## Correrla local

Es HTML/CSS/JS sin build. Para que carguen las recetas necesitás un servidor local, por ejemplo `python -m http.server`, y abrir `http://localhost:8000`.

---

Fan project, not affiliated with NCSOFT. AION is a trademark of NCSOFT Corporation.
