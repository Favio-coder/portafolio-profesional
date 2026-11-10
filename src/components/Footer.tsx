"use client";

import SectionDivider from "@/components/ui/SectionDivider";
import { useSectionNavigation } from "@/lib/section-navigation";
import { useLanguage } from "@/lib/i18n";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { t } = useLanguage();
  const { navigateToSection } = useSectionNavigation();

  return (
    <footer className="border-t border-border bg-muted py-12 px-6 md:px-8 lg:px-12">
      <div className="mx-auto max-w-350">
        <SectionDivider className="mb-8" label="SYSTEM_INFO" thick />

        <div className="grid gap-8 md:grid-cols-3">
          <div className="space-y-4">
            <p className="font-heading font-black text-2xl md:text-3xl text-foreground">
              FAVIO.DEV
            </p>
            <p className="font-mono text-sm uppercase tracking-widest text-muted-foreground">
              {t("footer.role")}
            </p>
            <p className="text-muted-foreground leading-relaxed max-w-xs">
              {t("footer.bio")}
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
              {t("footer.navigation")}
            </h4>
            <nav className="space-y-2" aria-label={t("footer.navigation")}>
              {[
                { label: t("footer.navAbout"), href: "#about" },
                { label: t("footer.navExperience"), href: "#experience" },
                { label: t("footer.navProjects"), href: "#projects" },
                { label: t("footer.navGallery"), href: "#gallery" },
                { label: t("footer.navContact"), href: "#contact" },
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(event) => navigateToSection(event, item.href.slice(1))}
                  className="block font-mono text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>

          <div className="space-y-4">
            <h4 className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
              {t("footer.connect")}
            </h4>
            <div className="space-y-2">
              {[
                { label: "Email", href: "mailto:faviusam@gmail.com" },
                { label: "GitHub", href: "https://github.com/Favio-coder", external: true },
                { label: "LinkedIn", href: "https://www.linkedin.com/in/favio-asturimac-6b907825b/", external: true },
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.external ? "_blank" : undefined}
                  rel={item.external ? "noopener noreferrer" : undefined}
                  className="block font-mono text-sm text-muted-foreground hover:text-primary-ink transition-colors"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <SectionDivider className="my-8" />

        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex items-center gap-4 font-mono text-xs uppercase tracking-wider text-muted-foreground">
            <span>{t("footer.build", { year: String(currentYear) })}</span>
            <span className="text-border">|</span>
            <span className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
              {t("footer.statusOnline")}
            </span>
          </div>

          <div className="hidden md:flex items-center gap-6 font-mono text-[0.625rem] uppercase tracking-widest text-muted-foreground">
            <span>© {currentYear} Favio Asturimac</span>
            <span className="text-border">|</span>
            <span>{t("footer.madeWith")}</span>
          </div>

          <div className="md:hidden text-center font-mono text-[0.625rem] uppercase tracking-widest text-muted-foreground">
            © {currentYear} Favio Asturimac
          </div>
        </div>
      </div>
    </footer>
  );
}
