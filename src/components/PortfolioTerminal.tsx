"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import AsciiPortrait from "@/components/AsciiPortrait";
import { completions, runTerminalCommand, terminalHelp, type TerminalResult } from "@/lib/terminal-commands";
import { scrollToSection } from "@/lib/section-navigation";

type Entry = TerminalResult & { command: string; id: number };
export default function PortfolioTerminal({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const router = useRouter();
  const pathname = usePathname();
  const [input, setInput] = useState("");
  const [entries, setEntries] = useState<Entry[]>([]);
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [expanded, setExpanded] = useState(false);
  const [suggestion, setSuggestion] = useState("");
  const draft = useRef("");
  const sequence = useRef(0);
  const field = useRef<HTMLInputElement>(null);
  const output = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (open && output.current) output.current.scrollTop = output.current.scrollHeight;
  }, [entries, open]);

  const execute = (value: string) => {
    if (!value.trim()) return;
    const result = value.trim().toLowerCase() === "history"
      ? { text: history.map((item, i) => `${i + 1}  ${item}`).join("\n") || "Tu historial comienza aquí." }
      : runTerminalCommand(value, pathname);
    setHistory((previous) => [...previous, value].slice(-100));
    setHistoryIndex(-1);
    setInput("");
    setSuggestion("");
    const id = sequence.current++;
    setEntries((previous) => result.clear ? [] : [...previous, { ...result, command: value, id }].slice(-60));
    if (result.href) {
      onOpenChange(false);
      const [path, hash] = result.href.split("#");
      if (path === pathname && path === "/" && hash) {
        window.requestAnimationFrame(() => {
          scrollToSection(hash);
          const section = document.getElementById(hash);
          section?.setAttribute("tabindex", "-1");
          section?.focus({ preventScroll: true });
        });
      } else if (path === pathname && hash) {
        window.history.pushState(null, "", result.href);
        window.dispatchEvent(new HashChangeEvent("hashchange"));
      } else router.push(result.href);
    } else if (result.close) onOpenChange(false);
    else field.current?.focus();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent initialFocus={field} showCloseButton={false} className={`z-[100] flex max-h-[90dvh] flex-col gap-0 overflow-hidden rounded-none border border-[#303a30] bg-[#080c09] p-0 text-[#e6e3d9] motion-reduce:animate-none ${expanded ? "h-[90dvh] sm:max-w-[95vw]" : "h-[min(760px,85dvh)] sm:max-w-4xl"}`}>
        <div className="flex shrink-0 items-center justify-between gap-2 border-b border-[#303a30] px-4 py-2">
          <DialogTitle className="font-mono text-xs tracking-widest">FAVIO_OS / TERMINAL</DialogTitle>
          <div className="flex gap-1">
            <button type="button" onClick={() => setExpanded(!expanded)} className="min-h-10 px-3 font-mono text-sm hover:bg-white/10" aria-label={expanded ? "Restaurar tamaño" : "Maximizar terminal"}>{expanded ? "↙" : "↗"}</button>
            <button type="button" onClick={() => onOpenChange(false)} className="min-h-10 px-3 font-mono text-sm hover:bg-white/10" aria-label="Cerrar terminal">×</button>
          </div>
        </div>
        <div ref={output} data-lenis-prevent className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-4 sm:p-6">
          <DialogDescription className="font-mono text-sm leading-relaxed text-[#bdc8bd]">Bienvenido. Explora los archivos o salta a cualquier sección con <span className="text-[#0ce642]">ir</span>. Escribe un comando y pulsa Enter.</DialogDescription>
          <pre className="mt-4 whitespace-pre-wrap font-mono text-xs leading-6 text-[#bdc8bd]">{terminalHelp}</pre>
          <div className="my-4 flex flex-wrap gap-2" aria-label="Comandos rápidos">
            {["whoami", "cuaderno", "projects", "ir contact"].map((command) => <button key={command} type="button" onClick={() => execute(command)} className="min-h-10 border border-[#303a30] px-3 font-mono text-xs text-[#0ce642] hover:border-[#0ce642] focus-visible:outline-2 focus-visible:outline-[#0ce642]">$ {command}</button>)}
          </div>
          <div role="log" aria-label="Resultados de comandos" aria-live="polite" aria-relevant="additions" className="space-y-5 font-mono text-sm">
            {entries.map((entry) => <div key={entry.id}>
              <p className="break-all text-[#0ce642]">visitante@favio:~$ {entry.command}</p>
              {entry.portrait && <AsciiPortrait />}
              <pre className="mt-2 whitespace-pre-wrap break-words font-mono text-xs leading-6 sm:text-sm">{entry.text}</pre>
            </div>)}
          </div>
        </div>
        <form onSubmit={(event) => { event.preventDefault(); execute(input); }} className="shrink-0 border-t border-[#303a30] p-3 sm:px-6">
          <div className="flex items-center gap-2 font-mono text-sm">
            <label htmlFor="portfolio-command" className="text-[#0ce642]"><span className="hidden sm:inline">visitante@favio:~</span>$<span className="sr-only"> Comando del terminal</span></label>
            <input ref={field} id="portfolio-command" value={input} onChange={(event) => { setInput(event.target.value); setHistoryIndex(-1); setSuggestion(""); }} onKeyDown={(event) => {
              if (event.key === "ArrowUp" || event.key === "ArrowDown") {
                event.preventDefault();
                if (!history.length) return;
                if (historyIndex === -1) draft.current = input;
                const next = event.key === "ArrowUp" ? Math.min(historyIndex + 1, history.length - 1) : Math.max(-1, historyIndex - 1);
                setHistoryIndex(next);
                setInput(next === -1 ? draft.current : history[history.length - 1 - next]);
              }
              if (event.key === "Tab" && !event.shiftKey && input.trim()) {
                const matches = completions.filter((command) => command.startsWith(input.trim().toLowerCase()));
                if (matches.length && !matches.includes(input.trim().toLowerCase()) && !suggestion) {
                  event.preventDefault();
                  if (matches.length === 1) { setInput(matches[0]); setSuggestion(""); }
                  else setSuggestion(matches.join(" · "));
                }
              }
            }} autoComplete="off" autoCapitalize="none" spellCheck={false} enterKeyHint="send" placeholder="help, whoami, ir projects…" className="min-h-11 min-w-0 flex-1 bg-transparent text-base outline-none focus-visible:ring-1 focus-visible:ring-[#0ce642] sm:text-sm" />
            <button type="submit" className="min-h-11 px-3 text-[#0ce642] hover:bg-white/10" aria-label="Ejecutar comando">↵</button>
          </div>
          <p role="status" className="max-h-16 overflow-y-auto font-mono text-[10px] leading-5 text-[#bdc8bd]">{suggestion || "↑ ↓ HISTORIAL / TAB COMPLETAR / ESC SALIR"}</p>
        </form>
      </DialogContent>
    </Dialog>
  );
}


