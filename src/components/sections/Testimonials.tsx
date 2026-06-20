"use client";

import React, { useRef, useState, useEffect } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface VintageLetter {
  id: string;
  dispatchDate: string;
  archiveSerial: string;
  content: string;
  signee: string;
  designation: string;
  institution: string;
  initialCap: string;
}

const vintageArchive: VintageLetter[] = [
  {
    id: "01",
    dispatchDate: "12.05.2026",
    archiveSerial: "MS/8042-B",
    content: "The studio did not simply overhaul our communication pipelines; they completely reconstructed our visual narrative logic. Our market acquisition velocity expanded by 340% within the initial ninety days of deployment.",
    signee: "Arjun Mehta",
    designation: "Founder & Creative Director",
    institution: "Mocha Group Corp.",
    initialCap: "T"
  },
  {
    id: "02",
    dispatchDate: "29.03.2026",
    archiveSerial: "TV/1193-A",
    content: "Every blueprint, high-fidelity asset, and interactive framework delivered felt fit for a design monograph. They do not operate as an external agency—they code and design with the absolute soul of equity co-founders.",
    signee: "Priya Nanda",
    designation: "Chief Executive Officer",
    institution: "TechVenture Global",
    initialCap: "E"
  },
  {
    id: "03",
    dispatchDate: "04.01.2026",
    archiveSerial: "EW/9921-E",
    content: "Their mastery over creative technology, physics-based motion setups, and advanced cinematic sequencing solved aesthetic challenges we spent cycles trying to decode. An exceptional, uncompromised layer of craft.",
    signee: "Rohan Das",
    designation: "Principal Technical Architect",
    institution: "EcoWear Ecosystems",
    initialCap: "T"
  },
  {
    id: "04",
    dispatchDate: "18.11.2025",
    archiveSerial: "EL/4402-C",
    content: "They orchestrated the complete convergence of our physical interactive art installations and digital frameworks. The resulting audience retention metrics completely altered our global brand trajectory.",
    signee: "Vikram Malhotra",
    designation: "Managing Partner",
    institution: "Engine Logistics Int.",
    initialCap: "T"
  },
  {
    id: "05",
    dispatchDate: "02.09.2025",
    archiveSerial: "ME/3011-D",
    content: "Pristine execution paired with rigorous strategic discipline. The structural design layouts and spatial philosophies provided continue to organically compound our engagement volume month over month.",
    signee: "Ananya Roy",
    designation: "VP of Product Experience",
    institution: "Minu Enhance Ltd.",
    initialCap: "P"
  }
];

export function Testimonials() {
  const trackRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const [isDragging, setIsDragging] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  const pointerStartX = useRef(0);
  const trackTransformX = useRef(0);
  const animationFrameId = useRef<number | null>(null);
  const velocityX = useRef(0);

  const tripleArchive = [...vintageArchive, ...vintageArchive, ...vintageArchive];

  useEffect(() => {
    const runMarqueeEngine = () => {
      if (!trackRef.current) return;

      if (!isDragging) {
        if (Math.abs(velocityX.current) > 0.1) {
          trackTransformX.current += velocityX.current;
          velocityX.current *= 0.94; 
        } else if (!isHovered) {
          trackTransformX.current -= 0.75; 
        }
      }

      const thirdWidth = trackRef.current.scrollWidth / 3;
      if (trackTransformX.current < -thirdWidth) {
        trackTransformX.current = 0;
      } else if (trackTransformX.current > 0) {
        trackTransformX.current = -thirdWidth;
      }

      trackRef.current.style.transform = `translate3d(${trackTransformX.current}px, 0, 0)`;
      animationFrameId.current = requestAnimationFrame(runMarqueeEngine);
    };

    animationFrameId.current = requestAnimationFrame(runMarqueeEngine);
    return () => {
      if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
    };
  }, [isDragging, isHovered]);

  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    pointerStartX.current = e.clientX;
    velocityX.current = 0;
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging || !trackRef.current) return;
    const currentX = e.clientX;
    const deltaX = currentX - pointerStartX.current;
    pointerStartX.current = currentX;

    trackTransformX.current += deltaX;
    velocityX.current = deltaX; 
  };

  const shiftTrack = (direction: "left" | "right") => {
    const impulse = direction === "left" ? 400 : -400;
    velocityX.current = impulse * 0.15;
  };

  return (
    <section id="testimonials" className="bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 py-10 sm:py-16 md:py-20 overflow-hidden transition-colors duration-300 select-none relative scroll-mt-[70px] md:scroll-mt-[80px]">
      
      {/* MICRO-CALIBRATED GRAPH CANVAS DOT PATTERN */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(#e1e1e1_1.5px,transparent_1.5px)] dark:bg-[radial-gradient(#262626_1.5px,transparent_1.5px)] [background-size:20px_20px]" />

      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 md:px-8 lg:px-12 flex flex-col items-center relative z-10">
        
        {/* ============================================================================ */}
        {/* COMPACT GIANT EDITORIAL HEADER                                               */}
        {/* ============================================================================ */}
        <header className="w-full text-left md:text-center flex flex-col items-start md:items-center mb-10 md:mb-14">
          <span className="text-[10px] font-sans font-extrabold tracking-[0.3em] text-neutral-400 dark:text-neutral-500 uppercase mb-2">
            TESTIMONIAL ARCHIVES
          </span>
          
          <h2 className="font-serif font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight leading-none text-neutral-950 dark:text-white max-w-4xl">
            What our <span className="italic font-normal font-serif text-neutral-500 dark:text-neutral-400">clients</span> say.
          </h2>
        </header>

        {/* ============================================================================ */}
        {/* THE CAROUSEL SLIDER CONTROLLER WINDOW                                        */}
        {/* ============================================================================ */}
        <div
          ref={containerRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={() => setIsDragging(false)}
          onPointerCancel={() => setIsDragging(false)}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => { setIsHovered(false); setIsDragging(false); }}
          className={cn(
            "w-full overflow-hidden relative py-2 touch-pan-y rounded-lg",
            isDragging ? "cursor-grabbing" : "cursor-grab"
          )}
        >
          <div
            ref={trackRef}
            className="flex gap-4 sm:gap-6 md:gap-8 w-max will-change-transform"
            style={{ transform: `translate3d(0px, 0, 0)` }}
          >
            {tripleArchive.map((letter, index) => (
              <article
                key={`${letter.archiveSerial}-${index}`}
                className="w-[280px] sm:w-[340px] md:w-[380px] shrink-0 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 p-5 sm:p-6 md:p-7 flex flex-col justify-between relative transition-all duration-300 shadow-md hover:shadow-xl dark:shadow-black/40 group rounded-xl"
              >
                {/* HIGHLY VISIBLE CLEAN SUBHEADER FRAME */}
                <div className="w-full flex justify-between items-baseline mb-4 md:mb-5 text-[10px] font-mono tracking-wider text-neutral-400 dark:text-neutral-500">
                  <div className="space-y-0.5">
                    <p className="font-bold text-neutral-800 dark:text-neutral-200">{letter.dispatchDate}</p>
                    <p className="opacity-75 font-sans text-[9px]">{letter.archiveSerial}</p>
                  </div>
                  <span className="font-serif italic font-medium opacity-60 group-hover:opacity-100 transition-opacity">
                    # {letter.id}
                  </span>
                </div>

                {/* REVIEW TYPOGRAPHY BODY */}
                <div className="flex-grow flex flex-col justify-start my-1 text-left">
                  <p className="font-serif text-sm sm:text-base leading-relaxed text-neutral-700 dark:text-neutral-300 antialiased tracking-wide">
                    <span className="font-serif text-2xl font-bold float-left mr-1.5 line-height-none text-neutral-900 dark:text-white">
                      {letter.initialCap}
                    </span>
                    {letter.content.substring(1)}
                  </p>
                </div>

                {/* MODERN TIGHT COMPACT DIVIDER GRID */}
                <div className="w-12 h-[1px] bg-neutral-200 dark:bg-neutral-800 my-4 md:my-5 group-hover:w-full transition-all duration-500" />

                {/* CLOSING CREDENTIAL FOOTER SIGNATURE */}
                <footer className="w-full flex items-center justify-between">
                  <div className="flex flex-col text-left">
                    <span className="font-sans font-semibold text-sm text-neutral-950 dark:text-neutral-50 tracking-tight">
                      {letter.signee}
                    </span>
                    <span className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-0.5 leading-tight">
                      {letter.designation}
                      <span className="block font-serif italic text-neutral-400 dark:text-neutral-500 text-[10px] mt-0.5">{letter.institution}</span>
                    </span>
                  </div>

                  {/* PREMIUM CLEAN STAMP SYSTEM */}
                  <div className="w-8 h-8 bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-[9px] text-neutral-500 dark:text-neutral-400 font-mono font-bold flex items-center justify-center rounded-lg shadow-inner shrink-0 group-hover:rotate-6 transition-transform duration-300">
                    VERIFIED
                  </div>
                </footer>
              </article>
            ))}
          </div>
        </div>

        {/* ============================================================================ */}
        {/* COMPACT REBALANCED NAVIGATION ACTION CONTROLS BAR                            */}
        {/* ============================================================================ */}
        <footer className="w-full mt-8 pt-4 border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-[9px] uppercase font-bold tracking-widest text-neutral-400 dark:text-neutral-500">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse" />
            <span>LIVE FEED</span>
          </div>

          <div className="flex items-center gap-2 relative z-20">
            <button
              onClick={() => shiftTrack("left")}
              className="w-8 h-8 rounded-full border border-neutral-200 dark:border-neutral-800 flex items-center justify-center text-neutral-600 dark:text-neutral-400 bg-white dark:bg-neutral-900 transition-all hover:bg-neutral-950 hover:text-white dark:hover:bg-white dark:hover:text-black active:scale-95 shadow-sm"
              aria-label="Shift Left"
            >
              <ArrowLeft className="w-4 h-4" strokeWidth={2} />
            </button>
            <button
              onClick={() => shiftTrack("right")}
              className="w-8 h-8 rounded-full border border-neutral-200 dark:border-neutral-800 flex items-center justify-center text-neutral-600 dark:text-neutral-400 bg-white dark:bg-neutral-900 transition-all hover:bg-neutral-950 hover:text-white dark:hover:bg-white dark:hover:text-black active:scale-95 shadow-sm"
              aria-label="Shift Right"
            >
              <ArrowRight className="w-4 h-4" strokeWidth={2} />
            </button>
          </div>
        </footer>

      </div>
    </section>
  );
}