import React, { useEffect, useRef, useState, useCallback } from "react";
import { Share2, Play, Users, Target, FileText, ArrowRight, ChevronLeft, ChevronRight, GripHorizontal } from "lucide-react";

const services = [
  {
    no: "01",
    icon: Share2,
    title: "social media management",
    desc: "STRATEGY, CONTENT CREATION, CALENDAR PLANNING, COMMUNITY MANAGEMENT. FOR BRANDS WHO WANT TO ENGAGE, NOT JUST POST.",
    illustration: (
      <svg className="w-full h-32 text-foreground" viewBox="0 0 200 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="100" cy="55" r="22" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
        <rect x="88" y="43" width="24" height="24" rx="4" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.05" className="transition-transform duration-700 origin-center group-hover/card:scale-110" />
        <circle cx="50" cy="35" r="12" stroke="currentColor" strokeWidth="1.2" />
        <circle cx="150" cy="35" r="12" stroke="currentColor" strokeWidth="1.2" />
        <circle cx="55" cy="85" r="14" stroke="currentColor" strokeWidth="1.2" />
        <circle cx="145" cy="85" r="14" stroke="currentColor" strokeWidth="1.2" />
        <path d="M74 43C82 48 84 48 88 49" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" />
        <path d="M126 43C118 48 116 48 112 49" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" />
        <circle cx="93" cy="51" r="2" fill="currentColor" />
        <circle cx="107" cy="51" r="2" fill="currentColor" />
        <path d="M96 60C98 62 102 62 104 60" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="20" y1="105" x2="180" y2="105" stroke="currentColor" strokeWidth="1" opacity="0.3" />
      </svg>
    )
  },
  {
    no: "02",
    icon: Play,
    title: "production & shoots",
    desc: "LIFESTYLE SHOOTS, PRODUCT PHOTOGRAPHY, BRAND REELS, CAMPAIGN VISUALS. WE TELL YOUR STORY THROUGH SCROLL-STOPPING VISUALS.",
    illustration: (
      <svg className="w-full h-32 text-foreground" viewBox="0 0 200 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="65" y="25" width="70" height="50" rx="2" stroke="currentColor" strokeWidth="1.5" className="transition-transform duration-700 origin-center group-hover/card:-translate-y-2" />
        <circle cx="100" cy="50" r="14" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.05" />
        <circle cx="100" cy="50" r="6" stroke="currentColor" strokeWidth="1" />
        <rect x="120" y="15" width="10" height="10" stroke="currentColor" strokeWidth="1.2" />
        <path d="M75 95 L90 75 M125 95 L110 75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="100" y1="75" x2="100" y2="100" stroke="currentColor" strokeWidth="1.5" />
        <line x1="40" y1="105" x2="160" y2="105" stroke="currentColor" strokeWidth="1" opacity="0.3" />
      </svg>
    )
  },
  {
    no: "03",
    icon: Users,
    title: "influencer marketing",
    desc: "COLLABORATIONS WITH LOCAL AND REGIONAL CREATORS. AUTHENTIC VOICES, AMPLIFIED IMPACT.",
    illustration: (
      <svg className="w-full h-32 text-foreground" viewBox="0 0 200 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M65 75 C 65 60, 85 60, 85 75" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.05" className="transition-transform duration-700 origin-center group-hover/card:-translate-y-1" />
        <circle cx="75" cy="50" r="10" stroke="currentColor" strokeWidth="1.5" />
        <path d="M115 75 C 115 58, 135 58, 135 75" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.05" className="transition-transform duration-700 origin-center group-hover/card:-translate-y-1 group-hover/card:translate-x-1" />
        <circle cx="125" cy="46" r="10" stroke="currentColor" strokeWidth="1.5" />
        <path d="M90 48 Q100 40 110 48" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
        <path d="M95 58 Q100 64 105 58" stroke="currentColor" strokeWidth="1" />
        <line x1="30" y1="105" x2="170" y2="105" stroke="currentColor" strokeWidth="1" opacity="0.3" />
      </svg>
    )
  },
  {
    no: "04",
    icon: Target,
    title: "performance campaigns",
    desc: "META & GOOGLE ADS, ANALYTICS, LEAD FUNNELS. NUMBERS-DRIVEN STRATEGIES THAT DELIVER.",
    illustration: (
      <svg className="w-full h-32 text-foreground" viewBox="0 0 200 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="45" y="25" width="75" height="55" rx="3" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.05" />
        <line x1="45" y1="38" x2="120" y2="38" stroke="currentColor" strokeWidth="1" />
        <circle cx="55" cy="31" r="2" fill="currentColor" />
        <circle cx="63" cy="31" r="2" fill="currentColor" />
        <circle cx="71" cy="31" r="2" fill="currentColor" />
        <path d="M55 70 L70 52 L85 60 L110 42" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="transition-all duration-700 group-hover/card:stroke-2" />
        <circle cx="110" cy="42" r="2" fill="currentColor" />
        <circle cx="145" cy="50" r="18" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" className="transition-transform duration-1000 origin-center group-hover/card:rotate-45" />
        <circle cx="145" cy="50" r="12" stroke="currentColor" strokeWidth="1.2" />
        <circle cx="145" cy="50" r="5" fill="currentColor" />
        <line x1="30" y1="105" x2="170" y2="105" stroke="currentColor" strokeWidth="1" opacity="0.3" />
      </svg>
    )
  },
  {
    no: "05",
    icon: FileText,
    title: "media buying",
    desc: "NEWSPAPER ADS, HOARDINGS, FM RADIO PLACEMENTS. INTEGRATED MEDIA, LOCALLY EXECUTED.",
    illustration: (
      <svg className="w-full h-32 text-foreground" viewBox="0 0 200 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="40" y="25" width="45" height="55" rx="1" stroke="currentColor" strokeWidth="1.2" fill="currentColor" fillOpacity="0.03" className="transition-transform duration-700 origin-center group-hover/card:-translate-y-1 group-hover/card:-rotate-3" />
        <line x1="45" y1="35" x2="70" y2="35" stroke="currentColor" strokeWidth="1.5" />
        <line x1="45" y1="45" x2="75" y2="45" stroke="currentColor" strokeWidth="1" />
        <line x1="45" y1="53" x2="75" y2="53" stroke="currentColor" strokeWidth="1" />
        <line x1="45" y1="61" x2="65" y2="61" stroke="currentColor" strokeWidth="1" />
        <rect x="100" y="30" width="60" height="40" rx="2" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.05" className="transition-transform duration-700 origin-center group-hover/card:scale-105" />
        <text x="112" y="54" fill="currentColor" fontSize="10" fontFamily="sans-serif" fontWeight="900" letterSpacing="1">ADS</text>
        <line x1="30" y1="105" x2="170" y2="105" stroke="currentColor" strokeWidth="1" opacity="0.3" />
      </svg>
    )
  }
];

// Tripling the array for true seamless looping (Previous, Current, Next buffers)
const loopableServices = [...services, ...services, ...services];

export function Capabilities() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  
  const [activeIndicator, setActiveIndicator] = useState(0);

  // Core physics & dimension state isolated from React re-renders
  const state = useRef({
    x: 0,
    velocity: -0.6,
    baseVelocity: -0.6,
    isDragging: false,
    startX: 0,
    lastMouseX: 0,
    width: 0,
    isHovered: false,
    dragInertiaTracker: 0
  });

  // Calculate layout widths
  const computeWidth = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const cardEl = track.children[0] as HTMLElement;
    if (cardEl) {
      const cardWidth = cardEl.getBoundingClientRect().width;
      // Width of a single logical set
      state.current.width = cardWidth * services.length;
      // Initialize X to the middle set to allow immediate left/right scrolling
      if (state.current.x === 0) {
        state.current.x = -state.current.width;
      }
    }
  }, []);

  useEffect(() => {
    computeWidth();
    window.addEventListener("resize", computeWidth);

    let frameId: number;

    const tick = () => {
      const s = state.current;

      if (!s.isDragging) {
        // Return to base velocity or slower hover velocity
        const targetV = s.isHovered ? s.baseVelocity * 0.2 : s.baseVelocity;
        
        // Apply smooth friction/momentum return
        s.velocity += (targetV - s.velocity) * 0.04;
      }

      s.x += s.velocity;

      // Wrap-around logic for true seamless loop
      if (s.width > 0) {
        if (s.x <= -(s.width * 2)) {
          s.x += s.width;
        } else if (s.x >= 0) {
          s.x -= s.width;
        }
      }

      // Update transform via DOM for performance
      if (trackRef.current) {
        trackRef.current.style.transform = `translate3d(${s.x}px, 0, 0)`;
      }

      // Update indicator logic
      if (s.width > 0) {
        const normX = Math.abs(s.x) % s.width;
        const index = Math.floor((normX / s.width) * services.length);
        setActiveIndicator(index % services.length);
      }

      frameId = requestAnimationFrame(tick);
    };

    frameId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", computeWidth);
    };
  }, [computeWidth]);

  // Momentum-based Interaction Handlers
  const handleNext = () => { state.current.velocity = -25; };
  const handlePrev = () => { state.current.velocity = 25; };

  // Drag Handlers
  const handlePointerDown = (e: React.PointerEvent) => {
    state.current.isDragging = true;
    state.current.lastMouseX = e.clientX;
    state.current.dragInertiaTracker = 0;
    if (trackRef.current) trackRef.current.style.cursor = "grabbing";
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!state.current.isDragging) return;
    const delta = e.clientX - state.current.lastMouseX;
    
    // Direct position update for true 1:1 drag feel
    state.current.x += delta;
    
    // Store velocity for release momentum
    state.current.velocity = delta;
    state.current.lastMouseX = e.clientX;
  };

  const handlePointerUp = () => {
    state.current.isDragging = false;
    // Velocity naturally carries over to the physics loop (inertia)
    if (trackRef.current) trackRef.current.style.cursor = "grab";
  };

  return (
    <section 
      ref={containerRef}
      id="capabilities"
      className="relative w-full overflow-hidden border-t border-foreground/10 bg-[#FBF9F4] py-10 text-[#111111] dark:bg-[#0A0A0A] dark:text-[#EDEDED] select-none scroll-mt-[70px] md:scroll-mt-[80px]"
    >
    
{/* SECTION HEADER BLOCK */}
       <div className="mx-auto max-w-[1920px] px-6 pb-16 md:px-10 lg:px-16 grid grid-cols-1 gap-8 lg:grid-cols-12 items-start relative z-20">
         
         <div className="lg:col-span-6 flex flex-col">
           <h2 className="text-[28px] md:text-[36px] font-light tracking-[0.05em] leading-none uppercase font-sans sr-only">
             Our Services
           </h2>
           <span className="text-[28px] md:text-[36px] font-light tracking-[0.05em] leading-none uppercase font-sans">
             OUR
           </span>
           <span className="text-[52px] md:text-[68px] font-serif italic font-normal tracking-tight leading-[0.9] mt-1 pl-1">
             services
           </span>
         </div>

        <div className="lg:col-span-6 flex flex-col lg:items-end justify-between h-full lg:text-right gap-6 lg:gap-8">
          <p className="text-[11px] md:text-[12px] font-sans font-medium tracking-[0.12em] uppercase leading-relaxed text-foreground/80 max-w-md lg:text-right">
            WE BRING CLARITY TO CHAOS. WHETHER IT'S DIGITAL, TRADITIONAL, OR SOMEWHERE IN BETWEEN, WE PARTNER WITH YOU TO CRAFT CAMPAIGNS ROOTED IN INSIGHT AND EXECUTED WITH INTENTION.
          </p>
          
          <div className="flex items-center gap-6 self-start lg:self-end">
            <div className="flex gap-2">
              {services.map((_, idx) => (
                <div 
                  key={idx}
                  className={`h-1.5 rounded-full transition-all duration-700 ease-out border border-foreground/30 ${
                    activeIndicator === idx ? "w-6 bg-foreground" : "w-1.5 bg-transparent"
                  }`}
                />
              ))}
            </div>

            <a 
              href="#contact"
              className="group flex items-center gap-3 rounded-full border border-foreground/20 px-5 py-2.5 text-[9px] font-bold uppercase tracking-[0.2em] transition-all duration-500 hover:bg-foreground hover:text-background focus:outline-none focus:ring-2 focus:ring-foreground/50 focus:ring-offset-2 focus:ring-offset-background"
            >
              PARTNER WITH US 
              <ArrowRight className="h-3 w-3 transition-transform duration-500 group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </div>

      {/* INFINITE MARQUEE CAROUSEL TRACK */}
      <div className="relative w-full overflow-hidden border-y border-foreground/10 group/carousel">
        
        {/* Circular Edge Navigation Buttons - Always Visible */}
        <button 
  onClick={handlePrev}
  className="absolute left-2 md:left-8 top-1/2 -translate-y-1/2 z-30 flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-full bg-background/60 md:bg-background/40 backdrop-blur-md border border-foreground/10 text-foreground shadow-sm transition-all duration-500 hover:bg-background/90 hover:scale-105 active:scale-95 outline-none focus:outline-none"
  aria-label="Previous Service"
>
  <ChevronLeft className="h-5 w-5" strokeWidth={1.5} />
</button>

{/* Next Button */}
<button 
  onClick={handleNext}
  className="absolute right-2 md:right-8 top-1/2 -translate-y-1/2 z-30 flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-full bg-background/60 md:bg-background/40 backdrop-blur-md border border-foreground/10 text-foreground shadow-sm transition-all duration-500 hover:bg-background/90 hover:scale-105 active:scale-95 outline-none focus:outline-none"
  aria-label="Next Service"
>
  <ChevronRight className="h-5 w-5" strokeWidth={1.5} />
</button>

        {/* Centered Floating Drag Indicator */}
        <div className="pointer-events-none absolute bottom-6 left-1/2 z-30 -translate-x-1/2 flex items-center gap-2 rounded-full bg-background/50 backdrop-blur-md border border-foreground/10 px-4 py-2 opacity-0 transition-opacity duration-700 group-hover/carousel:opacity-100 shadow-sm">
          <GripHorizontal className="h-3 w-3 text-foreground/50" />
          <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-foreground/70">Drag to explore</span>
        </div>

        {/* Draggable Area */}
        <div
          className="cursor-grab active:cursor-grabbing touch-pan-y"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
          onMouseEnter={() => { state.current.isHovered = true; }}
          onMouseLeave={() => { state.current.isHovered = false; }}
        >
          <div 
            ref={trackRef}
            className="flex will-change-transform py-0"
            style={{ width: "max-content" }}
          >
            {loopableServices.map((item, idx) => {
              const IconComponent = item.icon;
              return (
                <div 
                  key={idx}
                  className="w-[85vw] sm:w-[50vw] md:w-[35vw] lg:w-[25vw] min-w-[290px] max-w-[420px] flex-shrink-0 border-r border-foreground/10 flex flex-col justify-between p-8 md:p-10 transition-colors duration-700 hover:bg-foreground/[0.03] group/card relative"
                >
                  <div className="flex items-center justify-between w-full pb-8">
                    <span className="font-sans text-[11px] font-medium tracking-widest text-foreground/40 transition-colors duration-500 group-hover/card:text-foreground/80">
                      {item.no}
                    </span>
                    <div className="h-8 w-8 rounded-full border border-foreground/10 flex items-center justify-center text-foreground/70 bg-background/50 backdrop-blur-sm transition-all duration-700 group-hover/card:rotate-12 group-hover/card:border-foreground/30 group-hover/card:scale-110">
                      <IconComponent strokeWidth={1.2} className="h-3.5 w-3.5" />
                    </div>
                  </div>

                  <div className="pt-4 pb-6 transition-transform duration-700 ease-out group-hover/card:-translate-y-1">
                    <h3 className="font-serif text-[24px] md:text-[28px] font-normal leading-tight tracking-tight text-foreground normal-case italic">
                      {item.title}
                    </h3>
                    <p className="mt-4 text-[10px] md:text-[10.5px] font-sans font-medium tracking-[0.14em] leading-relaxed text-foreground/70 transition-opacity duration-500 group-hover/card:text-foreground/90">
                      {item.desc}
                    </p>
                  </div>

                  <div className="w-full pt-6 mt-auto opacity-80 dark:opacity-60 transition-transform duration-700 group-hover/card:scale-[1.02] group-hover/card:opacity-100 dark:group-hover/card:opacity-80">
                    {item.illustration}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}