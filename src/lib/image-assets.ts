export const imageSizes = {
  hero: "(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 400px",
  gallery: "(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 46vw",
  project: "(min-width: 1024px) 42vw, 90vw",
  lightbox: "(min-width: 1024px) 960px, 95vw",
  evidence: "(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw",
} as const;

export interface BootAsset {
  src: string;
  srcSet?: string;
  sizes?: string;
  label: string;
  group: "hero" | "gallery" | "project" | "evidence" | "lightbox";
}
