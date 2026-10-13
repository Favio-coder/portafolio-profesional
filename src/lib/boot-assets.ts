import { getImageProps } from "next/image";
import { gallery } from "@/data/gallery";
import { projects } from "@/data/project";
import { cuaderno } from "@/data/cuaderno";
import { imageSizes, type BootAsset } from "@/lib/image-assets";

// Use the same responsive sources as rendered images, warming the browser's
// HTTP cache rather than downloading full-size JPEGs a second time.
export function getBootAssets(): BootAsset[] {
  const sources = [
    ...["/assets/images/FavioAsturimac.png", "/assets/images/PixelFavio.png"].map((image) => ({ image, group: "hero" as const })),
    ...gallery.map((item) => ({ image: item.image, group: "gallery" as const })),
    ...projects.map((item) => ({ image: item.image, group: "project" as const })),
    ...cuaderno.flatMap((week) => [...(week.evidence ?? []), ...week.activities.flatMap((activity) => activity.evidence)]).filter((item) => item.type === "image" && item.url.startsWith("/")).map((item) => ({ image: item.url, group: "evidence" as const })),
    ...gallery.map((item) => ({ image: item.image, group: "lightbox" as const })),
  ];
  return sources.filter((item, index) => sources.findIndex((other) => other.image === item.image && other.group === item.group) === index).map(({ image, group }) => {
    const { props } = getImageProps({ src: image, alt: "", fill: true, sizes: imageSizes[group] });
    return { src: props.src, srcSet: props.srcSet, sizes: props.sizes, label: image.split("/").pop() ?? image, group };
  });
}
