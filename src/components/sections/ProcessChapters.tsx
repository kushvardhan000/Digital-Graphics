"use client";

import  { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface StudioManifestoConsoleProps {
  theme?: "dark" | "light";
  className?: string;
}

const manifestoPanels = [
  {
    id: "01",
    action: "Observe.",
    phase: "PERCEPTION",
    metric: "120+",
    metricLabel: "Platforms Launched",
    statement: "Isolating structural signals from cultural noise before the market shifts.",
  },
  {
    id: "02",
    action: "Decode.",
    phase: "LOGIC",
    metric: "5M+",
    metricLabel: "Attention Logged",
    statement: "Deconstructing complex brand truths into unified cinematic directions.",
  },
  {
    id: "03",
    action: "Construct.",
    phase: "SYNTHESIS",
    metric: "98%",
    metricLabel: "Systemic Trust",
    statement: "Forging advanced 3D frameworks optimized for uncompromised fidelity.",
  },
  {
    id: "04",
    action: "Amplify.",
    phase: "RESONANCE",
    metric: "08",
    metricLabel: "Platform Honors",
    statement: "Deploying high-impact arrays that capture and compound audience engagement.",
  }
];

export function ProcessChapters({ theme = "dark", className }: StudioManifestoConsoleProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const themeStyles = {
    dark: {
      bg: "bg-[#070707]",
      panelBg: "bg-[#0d0d0d]",
      panelActive: "bg-[#141414]",
      border: "border-neutral-800/70",
      textPrimary: "text-[#f5f5f5]",
      textMuted: "text-[#a3a3a3]",
      textSubtle: "text-[#444444]",
      accentText: "text-neutral-500",
      lineColor: "bg-neutral-800"
    },
    light: {
      bg: "bg-[#f4f3ef]",
      panelBg: "bg-[#edece6]",
      panelActive: "bg-[#e3e2da]",
      border: "border-neutral-300/80",
      textPrimary: "text-[#1a1a1a]",
      textMuted: "text-[#5a5a54]",
      textSubtle: "text-[#b5b4ad]",
      accentText: "text-neutral-600",
      lineColor: "bg-neutral-300"
    }
  }[theme];

  return (
    <section
      className={cn(
        "relative w-full h-screen overflow-hidden select-none font-sans p-4 sm:p-6 md:p-8 flex flex-col justify-between transition-colors duration-500",
        themeStyles.bg,
        themeStyles.textPrimary,
        className
      )}
    >
      {/* BACKGROUND BRAND MARKING */}
      <div className={cn("absolute right-6 top-1/2 -translate-y-1/2 font-serif text-[24vw] leading-none opacity-[0.02] pointer-events-none font-black tracking-tighter hidden md:block", themeStyles.textPrimary)}>
        STUDIO
      </div>

      {/* FIXED ONE-SCREEN TOP HEADER CONTROL */}
      <header className="w-full flex justify-between items-baseline z-10 shrink-0 pb-4">
        <div className="space-y-1">
          <p className={cn("text-[9px] font-bold uppercase tracking-[0.35em]", themeStyles.textSubtle)}>
            System Operational Codex
          </p>
          <h2 className="font-serif text-xl md:text-2xl tracking-tight">
            How We Think <span className="italic text-muted-foreground opacity-70">& Proof.</span>
          </h2>
        </div>
        <div className="text-right hidden sm:block">
          <p className={cn("font-serif text-xs italic tracking-tight", themeStyles.textMuted)}>
            Manifesto Runway · Edition 2026
          </p>
        </div>
      </header>

      {/* ==================================================== */}
      {/* DESKTOP INTERACTIVE CONSOLE DECK (>= 768px)          */}
      {/* ==================================================== */}
      <div className="hidden md:flex w-full h-full items-stretch gap-3 lg:gap-4 my-4 overflow-hidden relative z-10">
        {manifestoPanels.map((panel, idx) => {
          const isHovered = hoveredIndex === idx;
          const isAnyHovered = hoveredIndex !== null;

          return (
            <article
              key={panel.id}
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
              className={cn(
                "relative flex flex-col justify-between p-8 border rounded-lg overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] will-change-[flex,background-color]",
                panel.id === "01" ? "rounded-tl-2xl rounded-bl-2xl" : "",
                panel.id === "04" ? "rounded-tr-2xl rounded-br-2xl" : "",
                themeStyles.border,
                isHovered ? themeStyles.panelActive : themeStyles.panelBg,
                isHovered ? "flex-[1.6]" : isAnyHovered ? "flex-[0.8]" : "flex-1"
              )}
            >
              {/* Top Row Indicators */}
              <div className="w-full flex justify-between items-baseline">
                <span className={cn("text-[10px] font-semibold uppercase tracking-[0.25em]", isHovered ? "text-foreground" : themeStyles.textSubtle)}>
                  {panel.phase}
                </span>
                <span className={cn("font-serif text-sm italic transition-opacity duration-500", isHovered ? "opacity-100" : "opacity-40")}>
                  {panel.id}
                </span>
              </div>

              {/* Middle Core Concept Focus Block */}
              <div className="space-y-4 my-auto">
                <h3 className={cn(
                  "font-serif tracking-tight leading-none transition-all duration-500 origin-left",
                  isHovered ? "text-5xl lg:text-6xl scale-105" : "text-3xl lg:text-4xl"
                )}>
                  {panel.action}
                </h3>
                <p className={cn(
                  "text-xs lg:text-sm leading-relaxed tracking-wide transition-all duration-700 max-w-xs",
                  isHovered ? "opacity-100 translate-y-0" : "opacity-40 translate-y-2"
                )}>
                  {panel.statement}
                </p>
              </div>

              {/* Integrated Typographic Proof Floor */}
              <div className="pt-6 border-t border-neutral-500/10 flex flex-col gap-1">
                <div className="flex justify-between items-baseline relative overflow-hidden group">
                  <span className={cn(
                    "font-serif font-light leading-none tracking-tighter transition-all duration-500",
                    isHovered ? "text-6xl lg:text-7xl xl:text-8xl text-foreground font-normal" : "text-5xl lg:text-6xl text-muted-foreground opacity-60"
                  )}>
                    {panel.metric}
                  </span>
                  <div className={cn(
                    "w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-500 shrink-0",
                    themeStyles.border,
                    isHovered ? "opacity-100 translate-x-0 rotate-40" : "opacity-0 translate-x-4"
                  )}>
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
                <span className={cn("text-[9px] font-medium uppercase tracking-[0.2em] block mt-1", themeStyles.textSubtle)}>
                  {panel.metricLabel}
                </span>
              </div>

              {/* Dynamic Interactive Accent Light Strip */}
              <div className={cn(
                "absolute bottom-0 left-0 h-[2px] bg-foreground transition-all duration-700 origin-left",
                isHovered ? "w-full opacity-100" : "w-0 opacity-0"
              )} />
            </article>
          );
        })}
      </div>

      {/* ==================================================== */}
      {/* MOBILE COMPACT 4-QUADRANT VIEWPORT DECK (< 768px)    */}
      {/* ==================================================== */}
      <div className="md:hidden grid grid-cols-2 grid-rows-2 gap-3 w-full h-full my-3 overflow-hidden relative z-10">
        {manifestoPanels.map((panel) => (
          <article
            key={panel.id}
            className={cn(
              "p-5 border rounded-xl flex flex-col justify-between overflow-hidden relative",
              themeStyles.border,
              themeStyles.panelBg
            )}
          >
            <div className="flex justify-between items-center">
              <span className={cn("text-[8px] font-bold uppercase tracking-widest", themeStyles.textSubtle)}>
                {panel.phase}
              </span>
              <span className="font-serif text-xs italic opacity-30">{panel.id}</span>
            </div>

            <div className="space-y-1">
              <h3 className="font-serif text-2xl tracking-tight">{panel.action}</h3>
              <p className={cn("text-[10px] leading-snug line-clamp-2", themeStyles.textMuted)}>
                {panel.statement}
              </p>
            </div>

            <div className="pt-2 border-t border-neutral-500/10">
              <span className="font-serif text-3xl font-light tracking-tighter text-foreground block">
                {panel.metric}
              </span>
              <span className={cn("text-[8px] font-medium uppercase tracking-wider block", themeStyles.textSubtle)}>
                {panel.metricLabel}
              </span>
            </div>
          </article>
        ))}
      </div>

      {/* FIXED ONE-SCREEN FOOTER META */}
      <footer className="w-full flex justify-between items-center z-10 shrink-0 pt-2 text-[9px] uppercase tracking-[0.2em]">
        <div className={cn("flex items-center gap-4", themeStyles.textSubtle)}>
          <span>Engine Active</span>
          <span className="w-1 h-1 rounded-full bg-current opacity-40 animate-pulse" />
          <span>Fidelity Checked</span>
        </div>
        <div className={cn("font-medium", themeStyles.textSubtle)}>
          © Studio Archive 2026
        </div>
      </footer>
    </section>
  );
}