# Fuentes locales para Next.js

El build fallaba en Vercel porque `next/font/google` intenta descargar las fuentes
desde Google Fonts en tiempo de compilación. Ahora usamos `next/font/local` con los
archivos `.woff2` alojados en este repositorio.

## Qué descargar

Ve a https://fonts.google.com y descarga estas familias (formato `.woff2`):

| Fuente | Pesos | Archivo que debes guardar en `src/assets/fonts/` |
|--------|-------|--------------------------------------------------|
| Inter | 400 | `Inter-Regular.woff2` |
| Space Grotesk | 400, 500, 600, 700 | `SpaceGrotesk-400.woff2`, `SpaceGrotesk-500.woff2`, `SpaceGrotesk-600.woff2`, `SpaceGrotesk-700.woff2` |
| IBM Plex Mono | 400, 500, 600 | `IBMPlexMono-400.woff2`, `IBMPlexMono-500.woff2`, `IBMPlexMono-600.woff2` |

## Cómo ponerlos

1. En fonts.google.com busca cada familia.
2. Selecciona los pesos indicados arriba.
3. Haz clic en "Download family" y elige la variante `.woff2`.
4. Descomprime el ZIP y coloca los archivos en `src/assets/fonts/`.
5. Renómbralos exactamente como se indica en la tabla (para que coincidan con `src/app/layout.tsx`).

## Verificar localmente

```bash
rm -rf .next
npm run build
```

Si el build pasa localmente, súbelo a GitHub y Vercel desplegará sin el error
`module-not-found` de `space_grotesk_89314182.module.css`.
