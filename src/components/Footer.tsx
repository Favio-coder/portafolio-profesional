export default function Footer() {
  return (
    <footer className="border-t border-[#e6e3d9]/10 bg-[#0a0a0a] py-8">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          {/* Left */}
          <div className="flex flex-col items-center gap-2 md:items-start">
            <span className="font-mono text-xs uppercase tracking-widest text-[#e6e3d9]/40">
              Favio Asturimac
            </span>
            <div className="flex items-center gap-3 font-mono text-[9px] uppercase tracking-wider text-[#e6e3d9]/20">
              <span>BUILD: 2026</span>
              <span className="text-[#e6e3d9]/10">|</span>
              <span className="flex items-center gap-1">
                <span className="h-1 w-1 rounded-full bg-[#0ce642]" />
                STATUS: ONLINE
              </span>
            </div>
          </div>

          {/* Center - Decorative */}
          <div className="hidden font-mono text-[9px] uppercase tracking-widest text-[#e6e3d9]/10 md:block">
            —
          </div>

          {/* Right */}
          <div className="font-mono text-[9px] uppercase tracking-wider text-[#e6e3d9]/20">
            © 2026 Favio Asturimac
          </div>
        </div>
      </div>
    </footer>
  );
}
