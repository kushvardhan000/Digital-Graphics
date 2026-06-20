"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface Project {
  id: string;
  client: string;
  title: string;
  category: string;
  year: string;
  image: string;
  layout: {
    widthClass: string;
    aspectClass: string;
    alignClass: string;
  };
}

const projects: Project[] = [
  {
    id: "01",
    client: "Aura Digital",
    title: "Abstracting the future of decentralised ecosystems",
    category: "CGI & Motion",
    year: "2025",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop",
    layout: {
      widthClass: "w-[38vw]",
      aspectClass: "aspect-[16/10]",
      alignClass: "self-center",
    },
  },
  {
    id: "02",
    client: "Lumen Studio",
    title: "Cinematic identity for a global film festival",
    category: "Art Direction",
    year: "2024",
    image: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?q=80&w=2400&auto=format&fit=crop",
    layout: {
      widthClass: "w-[28vw]",
      aspectClass: "aspect-[3/4]",
      alignClass: "self-start mt-[8vh]",
    },
  },
  {
    id: "03",
    client: "Voxel",
    title: "Immersive architectural environments",
    category: "3D Environments",
    year: "2025",
    image: "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=2400&auto=format&fit=crop",
    layout: {
      widthClass: "w-[32vw]",
      aspectClass: "aspect-square",
      alignClass: "self-end mb-[8vh]",
    },
  },
  {
    id: "04",
    client: "TechVenture",
    title: "The visual language that closed a Series A",
    category: "Digital Branding",
    year: "2024",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2400&auto=format&fit=crop",
    layout: {
      widthClass: "w-[42vw]",
      aspectClass: "aspect-[16/9]",
      alignClass: "self-center",
    },
  },
  {
    id: "05",
    client: "Nexus Alpha",
    title: "Generative motion synthesis and spatial mapping",
    category: "Creative Technology",
    year: "2026",
    image: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=2400&auto=format&fit=crop",
    layout: {
      widthClass: "w-[30vw]",
      aspectClass: "aspect-[4/5]",
      alignClass: "self-start mt-[12vh]",
    },
  },
];

export function Portfolio() {
  const sectionRef = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  // Curator Panel DOM element handles to eliminate React re-renders during scroll
  const panelIdRef = useRef<HTMLSpanElement>(null);
  const panelClientRef = useRef<HTMLSpanElement>(null);
  const panelYearRef = useRef<HTMLSpanElement>(null);
  const panelTitleRef = useRef<HTMLHeadingElement>(null);
  const panelCategoryRef = useRef<HTMLParagraphElement>(null);

  // Triggered after media files update bounding dimensions
  const handleMediaLoad = () => {
    ScrollTrigger.refresh();
  };

  // Mobile carousel state
  const [mobileIndex, setMobileIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState(0);
  const [dragDelta, setDragDelta] = useState(0);

  const goToPrev = useCallback(() => {
    setMobileIndex((prev) => (prev === 0 ? projects.length - 1 : prev - 1));
  }, []);

  const goToNext = useCallback(() => {
    setMobileIndex((prev) => (prev === projects.length - 1 ? 0 : prev + 1));
  }, []);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") goToPrev();
    if (e.key === "ArrowRight") goToNext();
  }, [goToPrev, goToNext]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setDragStart(e.touches[0].clientX);
    setDragDelta(0);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    setDragDelta(e.touches[0].clientX - dragStart);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    if (Math.abs(dragDelta) > 50) {
      if (dragDelta > 0) goToPrev();
      else goToNext();
    }
    setDragDelta(0);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    setDragStart(e.clientX);
    setDragDelta(0);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setDragDelta(e.clientX - dragStart);
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    if (Math.abs(dragDelta) > 50) {
      if (dragDelta > 0) goToPrev();
      else goToNext();
    }
    setDragDelta(0);
  };

  useEffect(() => {
    const handleGlobalMouseUp = () => {
      if (isDragging) {
        setIsDragging(false);
        setDragDelta(0);
      }
    };
    window.addEventListener("mouseup", handleGlobalMouseUp);
    return () => window.removeEventListener("mouseup", handleGlobalMouseUp);
  }, [isDragging]);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    // ----------------------------------------------------
    // DESKTOP SYSTEM (>= 1024px)
    // ----------------------------------------------------
    mm.add("(min-width: 1024px)", () => {
      const track = trackRef.current;
      const viewport = viewportRef.current;
      const section = sectionRef.current;
      if (!track || !viewport || !section) return;

      // Deterministic calculation: Track width minus dedicated gallery viewport width
      const getScrollAmount = () => track.scrollWidth - viewport.clientWidth;

      // Optimised performance tracking via quickSetter
      const setProgressX = gsap.quickSetter(progressRef.current, "scaleX");

      // Master horizontal scrub timeline pinning the complete exhibition zone
      const horizontalTween = gsap.to(track, {
        x: () => -getScrollAmount(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${getScrollAmount()}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            setProgressX(self.progress);
          },
        },
      });

      // Updates curator placard instantly without triggering structural tree diffs
      const updateCuratorPanel = (index: number) => {
        const activeProject = projects[index];
        if (!activeProject) return;

        const elements = [
          panelIdRef.current,
          panelClientRef.current,
          panelYearRef.current,
          panelTitleRef.current,
          panelCategoryRef.current,
        ];

        gsap.killTweensOf(elements);
        
        gsap.timeline()
          .to(elements, { opacity: 0, y: -8, duration: 0.15, stagger: 0.02, ease: "power2.in" })
          .call(() => {
            if (panelIdRef.current) panelIdRef.current.innerText = `No. ${activeProject.id}`;
            if (panelClientRef.current) panelClientRef.current.innerText = activeProject.client;
            if (panelYearRef.current) panelYearRef.current.innerText = activeProject.year;
            if (panelTitleRef.current) panelTitleRef.current.innerText = activeProject.title;
            if (panelCategoryRef.current) panelCategoryRef.current.innerText = activeProject.category;
          })
          .fromTo(elements, 
            { opacity: 0, y: 8 }, 
            { opacity: 1, y: 0, duration: 0.25, stagger: 0.03, ease: "power2.out" }
          );
      };

      const cards = gsap.utils.toArray<HTMLElement>(".exhibition-card");
      cards.forEach((card, index) => {
        const img = card.querySelector(".parallax-img");

        // Synchronized focus tracking logic mapping center collision paths
        ScrollTrigger.create({
          trigger: card,
          containerAnimation: horizontalTween,
          start: "left 65%",
          end: "right 35%",
          onEnter: () => updateCuratorPanel(index),
          onEnterBack: () => updateCuratorPanel(index),
        });

        // Layered Focus states: Strict opacity and scale modification only
        gsap.fromTo(card,
          { opacity: 0.45, scale: 0.94 },
          {
            opacity: 1,
            scale: 1,
            ease: "power1.out",
            scrollTrigger: {
              trigger: card,
              containerAnimation: horizontalTween,
              start: "left 85%",
              end: "left 45%",
              scrub: true,
            },
          }
        );

        gsap.to(card, {
          opacity: 0.45,
          scale: 0.94,
          ease: "power1.in",
          scrollTrigger: {
            trigger: card,
            containerAnimation: horizontalTween,
            start: "right 55%",
            end: "right 15%",
            scrub: true,
          },
        });

        // Inner frame counter-movement image parallax lines
        if (img) {
          gsap.fromTo(img,
            { transform3d: "translate3d(-10%, 0, 0)" },
            {
              transform3d: "translate3d(10%, 0, 0)",
              ease: "none",
              scrollTrigger: {
                trigger: card,
                containerAnimation: horizontalTween,
                start: "left right",
                end: "right left",
                scrub: true,
              },
            }
          );
        }
      });
    });

    // ----------------------------------------------------
    // MOBILE & TABLET SYSTEM (< 1024px)
    // ----------------------------------------------------
    mm.add("(max-width: 1023px)", () => {
      const mobileCards = gsap.utils.toArray<HTMLElement>(".exhibition-card-mobile");
      
      mobileCards.forEach((card) => {
        gsap.fromTo(card,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none none"
            }
          }
        );
      });
    });

    return () => mm.revert();
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      id="work"
      className="relative w-full bg-background text-foreground overflow-hidden lg:h-screen font-sans scroll-mt-[70px] md:scroll-mt-[80px]"
    >
      {/* ==================================================== */}
      {/* DESKTOP IMPLEMENTATION                               */}
      {/* ==================================================== */}
      <div className="hidden lg:flex w-full h-full select-none">
        
        {/* Persistent Editorial Panel (30%) */}
        <div className="w-[30%] h-full flex flex-col justify-between border-r border-border/40 p-12 relative z-20 bg-background">
          
          {/* ZONE A — Permanent Section Heading */}
          <div className="space-y-8 pt-2">
            <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground flex items-center gap-4">
              <span className="w-8 h-[1px] bg-muted-foreground/40" />
              Chapter 03
            </p>
            <h2 className="font-serif text-6xl xl:text-7xl tracking-tight text-foreground leading-[1.02]">
              Selected <br />
              <span className="italic text-muted-foreground">Archive.</span>
            </h2>
            <p className="text-[11px] sm:text-xs text-muted-foreground max-w-[88%] leading-[1.7] font-light">
              A curated collection of CGI, motion design, visual storytelling and digital experiences.
            </p>
          </div>

          {/* ZONE B — Active Project Details (Exhibition Placard) */}
          <div className="my-auto pb-8 pt-12 space-y-5">
            <div className="flex justify-between items-baseline border-b border-border/40 pb-3">
              <span ref={panelIdRef} className="font-serif text-sm italic text-muted-foreground will-change-[transform,opacity]">
                No. {projects[0].id}
              </span>
              <div className="text-right text-[9px] uppercase tracking-[0.25em] text-muted-foreground leading-relaxed">
                <span ref={panelClientRef} className="block text-foreground font-medium mb-0.5">{projects[0].client}</span>
                <span ref={panelYearRef} className="block">{projects[0].year}</span>
              </div>
            </div>
            <h3 ref={panelTitleRef} className="font-serif text-2xl xl:text-[1.65rem] leading-[1.2] text-foreground tracking-tight min-h-[4.5rem] will-change-[transform,opacity]">
              {projects[0].title}
            </h3>
            <p ref={panelCategoryRef} className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground/80 font-medium will-change-[transform,opacity]">
              {projects[0].category}
            </p>
          </div>

          {/* Exhibition Progress Tracks */}
          <div className="w-full">
            <div className="flex justify-between text-[9px] uppercase tracking-[0.25em] text-muted-foreground mb-3">
              <span>Exhibition Index</span>
              <span>Scrub to advance</span>
            </div>
            <div className="w-full h-[1px] bg-border/30 relative">
              <div
                ref={progressRef}
                className="absolute left-0 top-0 h-[1px] bg-foreground w-full origin-left scale-x-0 will-change-transform"
              />
            </div>
          </div>
        </div>

        {/* Scrolling Exhibition Track (70%) */}
        <div ref={viewportRef} className="w-[70%] h-full relative overflow-hidden">
          <div
            ref={trackRef}
            className="flex h-full w-max items-center px-[8vw] gap-[6vw] will-change-transform"
          >
            {projects.map((project) => (
              <article
                key={project.id}
                className={cn(
                  "exhibition-card group relative flex flex-col flex-shrink-0 will-change-[transform,opacity]",
                  project.layout.widthClass,
                  project.layout.alignClass
                )}
              >
                <div
                  className={cn(
                    "relative block w-full overflow-hidden bg-muted border border-border/10",
                    project.layout.aspectClass
                  )}
                >
                  {/* Outer safety wrapper countering width calculations flaws */}
                  <div className="absolute top-0 bottom-0 -left-[15%] -right-[15%] w-[130%] h-full will-change-transform">
                    <img
                      src={project.image}
                      alt={project.title}
                      onLoad={handleMediaLoad}
                      className="parallax-img w-full h-full object-cover object-center transition-transform duration-[1.4s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
                    />
                  </div>
                  
                  {/* Direct clean overlay overlay without filters/blurs */}
                  <div className="absolute inset-0 bg-background/0 transition-colors duration-500 group-hover:bg-background/10" />

                  {/* Operational Hover Action Tag */}
                  <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">
                    <div className="w-10 h-10 rounded-full bg-background border border-border/40 flex items-center justify-center text-foreground shadow-sm">
                      <ArrowUpRight className="w-4 h-4" strokeWidth={1.5} />
                    </div>
                  </div>
                </div>

                {/* Inline structural card metadata safeguarding view visibility limits */}
                <div className="mt-4 flex justify-between items-baseline text-[10px] uppercase tracking-[0.15em] text-muted-foreground px-1">
                  <span className="font-medium text-foreground">{project.client}</span>
                  <span>{project.category}</span>
                </div>
              </article>
            ))}

            {/* Terminal Outro Boundary Elements */}
            <div className="w-[24vw] flex flex-col items-center justify-center self-center pr-[4vw]">
              <a href="#archive" className="group flex flex-col items-center gap-5">
                <div className="w-24 h-24 rounded-full border border-border/60 flex items-center justify-center relative overflow-hidden transition-transform duration-500 group-hover:scale-105">
                  <div className="absolute inset-0 bg-foreground scale-y-0 origin-bottom group-hover:scale-y-100 transition-transform duration-[0.5s] ease-[cubic-bezier(0.16,1,0.3,1)]" />
                  <ArrowUpRight className="w-6 h-6 relative z-10 text-foreground group-hover:text-background transition-colors duration-300" strokeWidth={1.2} />
                </div>
                <span className="text-[9px] uppercase tracking-[0.25em] text-muted-foreground group-hover:text-foreground transition-colors">
                  View Full Index
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ==================================================== */}
      {/* MOBILE & TABLET IMPLEMENTATION                       */}
      {/* ==================================================== */}
      <div className="lg:hidden w-full flex flex-col bg-background">
        <div className="w-full pt-14 pb-6 px-6 sm:px-10">
          <p className="text-[9px] uppercase tracking-[0.25em] text-muted-foreground mb-3">
            Chapter 03
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl tracking-tight text-foreground leading-tight">
            Selected <span className="italic text-muted-foreground">Archive.</span>
          </h2>
        </div>

        <div
          // ref={carouselRef}
          className="relative w-full select-none"
          tabIndex={0}
          onKeyDown={handleKeyDown}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
        >
          <div className="overflow-hidden px-6 sm:px-10">
            <div
              className="flex transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform"
              style={{
                transform: `translateX(calc(-${mobileIndex * 100}% + ${isDragging ? dragDelta : 0}px))`,
              }}
            >
              {projects.map((project) => (
                <div key={project.id} className="w-full flex-shrink-0 px-1">
                  <div className="flex justify-between items-baseline mb-4 text-xs text-muted-foreground font-serif italic">
                    <span>No. {project.id}</span>
                    <span className="not-italic font-sans text-[10px] uppercase tracking-widest text-foreground font-medium">
                      {project.client}
                    </span>
                  </div>

                  <div className="w-full aspect-[4/3] overflow-hidden bg-muted border border-border/10">
                    <img
                      src={project.image}
                      alt={project.title}
                      onLoad={handleMediaLoad}
                      className="w-full h-full object-cover object-center"
                    />
                  </div>

                  <div className="mt-5 space-y-3">
                    <h3 className="font-serif text-xl sm:text-2xl text-foreground leading-snug tracking-tight">
                      {project.title}
                    </h3>
                    <div className="flex justify-between items-center text-[9px] uppercase tracking-widest text-muted-foreground pt-3 border-t border-border/30">
                      <span>{project.category}</span>
                      <span>{project.year}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between px-6 sm:px-10 mt-8">
            <button
              type="button"
              onClick={goToPrev}
              className="flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.2em] text-foreground hover:text-muted-foreground transition-colors duration-300"
            >
              <ChevronLeft className="w-4 h-4" strokeWidth={1.5} />
              Previous
            </button>

            <div className="flex gap-2">
              {projects.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setMobileIndex(i)}
                  className={cn(
                    "h-[1px] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
                    i === mobileIndex ? "w-8 bg-foreground" : "w-4 bg-border/60 hover:bg-muted-foreground/50"
                  )}
                  aria-label={`Go to project ${i + 1}`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={goToNext}
              className="flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.2em] text-foreground hover:text-muted-foreground transition-colors duration-300"
            >
              Next
              <ChevronRight className="w-4 h-4" strokeWidth={1.5} />
            </button>
          </div>
        </div>

        <div className="mt-16 w-full flex justify-center border-t border-border/40 pt-10 pb-8">
          <a
            href="#archive"
            className="flex items-center gap-3 text-[10px] font-medium uppercase tracking-[0.2em] text-foreground border border-border/60 rounded-full px-8 py-3.5 hover:bg-foreground hover:text-background transition-colors duration-300"
          >
            Complete Archive
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
}