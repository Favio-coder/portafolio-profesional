"use client";

import type { MouseEvent } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useCallback } from "react";

export function scrollToSection(sectionId: string) {
  const section = document.getElementById(sectionId);
  if (!section) return;

  section.scrollIntoView({
    behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
    block: "start",
  });
}

export function useSectionNavigation() {
  const router = useRouter();
  const pathname = usePathname();
  const isHome = pathname === "/";

  const navigateToSection = useCallback(
    (
      event: MouseEvent<HTMLAnchorElement>,
      sectionId: string,
      onNavigate?: () => void,
    ) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      event.preventDefault();
      onNavigate?.();

      if (isHome) {
        window.requestAnimationFrame(() => scrollToSection(sectionId));
      } else {
        router.push(`/#${sectionId}`);
      }
    },
    [isHome, router],
  );

  return { navigateToSection, isHome };
}
