import SectionDivider from "@/components/ui/SectionDivider";

export default function Footer() {
  const currentYear = new Date().getFullYear();

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
              Full Stack Developer
            </p>
            <p className="text-muted-foreground leading-relaxed max-w-xs">
              Construyendo productos digitales en la intersección de software, cloud, datos e IA.
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
              NAVEGACIÓN
            </h4>
            <nav className="space-y-2" aria-label="Navegación del footer">
              {[
                { label: "Sobre mí", href: "#about" },
                { label: "Experiencia", href: "#experience" },
                { label: "Proyectos", href: "#projects" },
                { label: "Galería", href: "#gallery" },
                { label: "Contacto", href: "#contact" },
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="block font-mono text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>

          <div className="space-y-4">
            <h4 className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
              CONECTAR
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
            <span>BUILD: {currentYear}</span>
            <span className="text-border">|</span>
            <span className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
              STATUS: ONLINE
            </span>
          </div>

          <div className="hidden md:flex items-center gap-6 font-mono text-[0.625rem] uppercase tracking-widest text-muted-foreground">
            <span>© {currentYear} Favio Asturimac</span>
            <span className="text-border">|</span>
            <span>HECHO CON NEXT.JS + TAILWIND + MOTION</span>
          </div>

          <div className="md:hidden text-center font-mono text-[0.625rem] uppercase tracking-widest text-muted-foreground">
            © {currentYear} Favio Asturimac
          </div>
        </div>
      </div>
    </footer>
  );
}
