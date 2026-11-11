/**
 * Script para descargar automáticamente las fuentes .woff2 de Google Fonts
 * y guardarlas en src/assets/fonts/ con los nombres que espera layout.tsx
 *
 * Uso: node scripts/download-fonts.mjs
 */

import fs from "node:fs/promises";
import path from "node:path";

const FONTS_DIR = path.resolve("src/assets/fonts");
const CSS_URL =
  "https://fonts.googleapis.com/css2?" +
  "family=Space+Grotesk:wght@400;500;600;700&" +
  "family=IBM+Plex+Mono:wght@400;500;600&" +
  "family=Inter:wght@400&" +
  "display=swap";

const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";

// Mapeo: nombre de archivo esperado -> { family, weight, style }
const expected = {
  "Inter-Regular.woff2": { family: "Inter", weight: 400, style: "normal" },
  "SpaceGrotesk-400.woff2": { family: "Space Grotesk", weight: 400, style: "normal" },
  "SpaceGrotesk-500.woff2": { family: "Space Grotesk", weight: 500, style: "normal" },
  "SpaceGrotesk-600.woff2": { family: "Space Grotesk", weight: 600, style: "normal" },
  "SpaceGrotesk-700.woff2": { family: "Space Grotesk", weight: 700, style: "normal" },
  "IBMPlexMono-400.woff2": { family: "IBM Plex Mono", weight: 400, style: "normal" },
  "IBMPlexMono-500.woff2": { family: "IBM Plex Mono", weight: 500, style: "normal" },
  "IBMPlexMono-600.woff2": { family: "IBM Plex Mono", weight: 600, style: "normal" },
};

/**
 * Extrae las reglas @font-face del CSS de Google Fonts.
 * Devuelve un array de objetos con family, weight, style y url (woff2).
 */
function parseFontFaces(css) {
  const faces = [];
  const faceBlocks = css.match(/@font-face\s*\{[^}]+\}/g) || [];
  for (const block of faceBlocks) {
    const familyMatch = block.match(/font-family:\s*['"]([^'"]+)['"]/);
    const weightMatch = block.match(/font-weight:\s*(\d+)/);
    const styleMatch = block.match(/font-style:\s*([a-z-]+)/);
    const urlMatch = block.match(/url\(([^)]+)\)\s*format\('woff2'\)/);

    if (familyMatch && weightMatch && urlMatch) {
      faces.push({
        family: familyMatch[1].trim(),
        weight: parseInt(weightMatch[1], 10),
        style: styleMatch ? styleMatch[1].trim() : "normal",
        url: urlMatch[1].trim(),
      });
    }
  }
  return faces;
}

async function main() {
  await fs.mkdir(FONTS_DIR, { recursive: true });

  console.log("Descargando CSS de Google Fonts...");
  const cssRes = await fetch(CSS_URL, { headers: { "User-Agent": UA } });
  if (!cssRes.ok) {
    throw new Error(`Error al obtener CSS: ${cssRes.status} ${cssRes.statusText}`);
  }
  const css = await cssRes.text();

  const faces = parseFontFaces(css);
  console.log(`Se encontraron ${faces.length} reglas @font-face con woff2.`);

  const downloaded = new Map(); // targetName -> url

  for (const face of faces) {
    const targetName = Object.keys(expected).find(
      (name) =>
        expected[name].family === face.family &&
        expected[name].weight === face.weight &&
        expected[name].style === face.style
    );

    if (!targetName) continue;

    // Si ya descargamos este target, saltamos (tomamos la primera URL encontrada)
    if (downloaded.has(targetName)) continue;

    downloaded.set(targetName, face.url);
  }

  for (const [targetName, url] of downloaded) {
    console.log(`Descargando ${targetName}...`);
    const fileRes = await fetch(url, { headers: { "User-Agent": UA } });
    if (!fileRes.ok) {
      throw new Error(`Error al descargar ${targetName}: ${fileRes.status}`);
    }
    const buffer = await fileRes.arrayBuffer();
    await fs.writeFile(path.join(FONTS_DIR, targetName), Buffer.from(buffer));
    console.log(`  ✓ Guardado: src/assets/fonts/${targetName}`);
  }

  const missing = Object.keys(expected).filter((n) => !downloaded.has(n));
  if (missing.length > 0) {
    console.warn("\n⚠️  No se pudieron descargar:");
    for (const name of missing) {
      console.warn(`   - ${name}`);
    }
    process.exit(1);
  }

  console.log("\n✅ Todas las fuentes se descargaron correctamente.");
  console.log("Ahora ejecuta: npm run build");
}

main().catch((err) => {
  console.error("❌ Error:", err.message);
  process.exit(1);
});
