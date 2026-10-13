import assert from "node:assert/strict";
import fs from "node:fs";
import ts from "typescript";
import { createRequire } from "node:module";
const loadModule = createRequire(import.meta.url);
loadModule.extensions[".ts"] = (module, filename) => {
  module._compile(ts.transpileModule(fs.readFileSync(filename, "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, esModuleInterop: true },
  }).outputText, filename);
};
const { normalizeWeeks, cuaderno, getWeekBibliography, cuadernoIssues } = loadModule("../src/data/cuaderno.ts");
assert.deepEqual(cuadernoIssues, []);
assert.equal(cuaderno[0].activities.length, 3);
assert.equal(cuaderno[0].activities.flatMap((activity) => activity.evidence).length, 7);
assert.ok(getWeekBibliography(cuaderno[0]).some((entry) => entry.url === "https://learningwebdesign.com/"));
const result = normalizeWeeks([
  { number: 10, title: "Nueva semana", topics: ["Tema antiguo", { title: "Tema nuevo", explanation: "Mi explicación", definitions: ["Definición"] }], bibliography: ["Cita https://example.com", { type: "book", title: "Libro", author: "Autor" }], activities: [{ title: "Nueva actividad" }] },
  { number: 4, title: "Semana cuatro" },
]);
assert.deepEqual(result.weeks.map((week) => week.number), [4, 10]);
assert.equal(result.weeks[1].topics[0].title, "Tema antiguo");
assert.equal(result.weeks[1].topics[1].explanation, "Mi explicación");
assert.equal(result.weeks[1].bibliography[1].type, "book");
assert.deepEqual(result.weeks[1].activities[0].evidence, []);
assert.equal(normalizeWeeks([{ number: 1, title: "A" }, { number: 1, title: "B" }]).issues.length, 1);
assert.equal(normalizeWeeks({}).issues.length, 1);


const { preloadImages } = loadModule("../src/lib/image-preload.ts");
let active = 0;
let peak = 0;
global.window = { Image: class {
  set src(value) {
    active++;
    peak = Math.max(peak, active);
    setImmediate(() => { active--; if (value === "missing") this.onerror?.(); else this.onload?.(); });
  }
  removeAttribute() {}
} };
(async () => {
  const states = [];
  const assets = ["a", "b", "missing", "c", "d"].map((src) => ({ src, label: src, group: "gallery" }));
  const progress = await preloadImages(assets, (state) => states.push(state), new AbortController().signal);
  assert.equal(progress.completed, 5);
  assert.equal(progress.loaded, 4);
  assert.equal(progress.failed, 1);
  assert.ok(peak <= 3);
  assert.deepEqual(states.map((state) => state.completed), [1, 2, 3, 4, 5]);
  const controller = new AbortController();
  controller.abort();
  assert.equal((await preloadImages(assets, () => assert.fail("No actualizar después de cancelar"), controller.signal)).completed, 0);
  console.log("OK: JSON mixto/parcial, semanas nuevas, contenido, bibliografía, detalle visible, progreso, errores y concurrencia de precarga.");
})().catch((error) => { console.error(error); process.exitCode = 1; });


