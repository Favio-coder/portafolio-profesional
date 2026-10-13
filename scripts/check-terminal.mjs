import assert from 'node:assert/strict';
import ts from 'typescript';
import fs from 'node:fs';
import path from 'node:path';
const cache = new Map();
function load(file) {
  file = path.resolve(file);
  if (cache.has(file)) return cache.get(file);
  if (file.endsWith('.json')) return JSON.parse(fs.readFileSync(file, 'utf8'));
  const source = ts.transpileModule(fs.readFileSync(file, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, esModuleInterop: true } }).outputText;
  const compiled = { exports: {} };
  cache.set(file, compiled.exports);
  const localRequire = (name) => {
    const target = name.startsWith('@/') ? path.join(process.cwd(), 'src', name.slice(2)) : path.resolve(path.dirname(file), name);
    return load(path.extname(target) ? target : `${target}.ts`);
  };
  new Function('require', 'module', 'exports', source)(localRequire, compiled, compiled.exports);
  return compiled.exports;
}
const { runTerminalCommand: run } = load('src/lib/terminal-commands.ts');
const { cuaderno } = load('src/data/cuaderno.ts');
const { projects } = load('src/data/project.ts');
const { gallery } = load('src/data/gallery.ts');
assert.equal(run('IR A SECCIÓN GALERÍA', '/cuaderno').href, '/#gallery');
assert.equal(run('cd ./projects/', '/').href, '/#projects');
assert.equal(run('whoami', '/').portrait, true);
for (const week of cuaderno) {
  assert.ok(run('cuaderno', '/').text.includes(week.title));
  assert.equal(run(`ir cuaderno ${week.number}`, '/cuaderno').href, `/cuaderno#${week.id}`);
}
for (const project of projects) assert.ok(run('tree ./projects', '/').text.includes(project.name));
for (const image of gallery) assert.ok(run('ls gallery', '/').text.includes(image.title));
assert.equal(run('ir cuaderno 99999', '/').href, undefined);
assert.equal(run('ir inexistente', '/').href, undefined);
assert.equal(run('clear', '/').clear, true);
assert.equal(run('exit', '/').close, true);
assert.ok(run('cat .secret', '/').text.includes('DESBLOQUEADO'));
console.log('Terminal OK: destinos, aliases, datos sincronizados, semanas, errores y easter eggs.');

