import type { MouseEvent } from "react";

export function scrollToSection(sectionId: string) {
  const section = document.getElementById(sectionId);
  if (!section) return;

  section.scrollIntoView({
    behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
    block: "start",
  });
}

export function navigateToSection(
  event: MouseEvent<HTMLAnchorElement>,
  sectionId: string,
  onNavigate?: () => void,
) {
  if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

  event.preventDefault();
  onNavigate?.();
  window.requestAnimationFrame(() => scrollToSection(sectionId));
}
