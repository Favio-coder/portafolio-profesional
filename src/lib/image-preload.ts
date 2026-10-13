import type { BootAsset } from "./image-assets";

export interface LoadProgress {
  completed: number;
  loaded: number;
  failed: number;
  total: number;
  label: string;
}

export async function preloadImages(assets: BootAsset[], onProgress: (progress: LoadProgress) => void, signal: AbortSignal) {
  let next = 0;
  const progress: LoadProgress = { completed: 0, loaded: 0, failed: 0, total: assets.length, label: "INITIALIZING…" };
  async function worker() {
    while (!signal.aborted && next < assets.length) {
      const asset = assets[next++];
      const loaded = await new Promise<boolean>((resolve) => {
        const image = new window.Image();
        let settled = false;
        const finish = (success: boolean) => {
          if (settled) return;
          settled = true;
          clearTimeout(timer);
          signal.removeEventListener("abort", abort);
          image.onload = null;
          image.onerror = null;
          resolve(success);
        };
        const abort = () => { image.removeAttribute("srcset"); image.removeAttribute("src"); finish(false); };
        const timer = setTimeout(() => finish(false), 12000);
        signal.addEventListener("abort", abort, { once: true });
        image.onload = () => finish(true);
        image.onerror = () => finish(false);
        image.decoding = "async";
        if (asset.sizes) image.sizes = asset.sizes;
        if (asset.srcSet) image.srcset = asset.srcSet;
        image.src = asset.src;
      });
      if (signal.aborted) return;
      progress.completed++;
      if (loaded) progress.loaded++; else progress.failed++;
      progress.label = asset.label;
      onProgress({ ...progress });
    }
  }
  // Bound network and image decoding work on phones and slower connections.
  await Promise.all(Array.from({ length: Math.min(3, assets.length) }, worker));
  return progress;
}
