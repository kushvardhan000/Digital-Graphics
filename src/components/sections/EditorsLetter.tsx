import React from "react";

export function EditorsLetter() {
  return (
    <section id="about" className="bg-[#FAF9F6] dark:bg-[#0A0A0A] text-zinc-900 dark:text-zinc-50 w-full overflow-hidden transition-colors duration-300 flex items-center min-h-screen">
      <div className="mx-auto max-w-[1400px] px-6 py-12 lg:px-12 lg:py-16 w-full">
        
        {/* --- TOP ROW --- */}
        <div className="flex flex-col lg:flex-row lg:items-stretch gap-10 lg:gap-16">
          
          {/* Left Column: Image */}
          <div className="relative w-full lg:w-[40%] aspect-[16/9] sm:aspect-[4/3] lg:aspect-[4/4.5] overflow-hidden bg-[#E5E0D8] dark:bg-zinc-800 rounded-sm group">
            <img
              src="/about-side-img.png"
              alt="Digital Graphics Creative Agency workspace with team collaboration"
              width="800"
              height="600"
              loading="lazy"
              decoding="async"
              className="object-cover w-full h-full opacity-90 dark:opacity-75 transition-transform duration-1000 ease-out group-hover:scale-105"
            />
            {/* Absolute positioned text overlay */}
            <div className="absolute top-5 left-5 md:top-6 md:left-6 text-white dark:text-white/90 flex flex-col drop-shadow-md">
              <span className="font-serif text-3xl md:text-5xl leading-none mb-1">01</span>
              <span className="text-[9px] md:text-[11px] uppercase tracking-[0.2em] font-semibold">Who we are</span>
            </div>
          </div>

          {/* Right Column: Editorial Text */}
          <div className="w-full lg:w-[60%] flex flex-col justify-center py-2 lg:py-6">
            <h4 className="text-[#0066FF] text-[10px] md:text-[11px] font-bold uppercase tracking-[0.2em] mb-4 md:mb-6">
              We're not just a creative agency.
            </h4>
            
            <h3 className="text-[2.25rem] sm:text-5xl md:text-6xl lg:text-[4rem] leading-[1.05] tracking-tight font-serif mb-6 md:mb-12">
              We're the creative<br className="hidden sm:block" />
              {" "}engine behind brands<br className="hidden sm:block" />
              {" "}that <span className="text-[#0066FF] italic pr-2">lead</span>, not follow.
            </h3>

            <div className="flex flex-col md:flex-row gap-8 lg:gap-12">
              {/* Paragraph */}
              <div className="w-full md:w-[55%]">
                <p className="text-sm md:text-base leading-[1.7] text-zinc-600 dark:text-zinc-400">
                  Digital Graphics is where strategy meets storytelling, and
                  creativity meets impact. We partner with ambitious brands
                  to build identities, campaigns, and experiences that cut
                  through the noise and stay remembered.
                </p>
              </div>
              
              {/* Feature List - Changed to wrap horizontally to save massive vertical space on mobile */}
              <div className="w-full md:w-[45%] flex items-center">
                <ul className="flex flex-wrap md:flex-col gap-x-6 gap-y-3 md:gap-y-4">
                  {[
                    "Strategic Thinkers",
                    "Visual Storytellers",
                    "Brand Builders",
                    "Results Driven"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-2.5 text-[10px] md:text-xs uppercase tracking-[0.2em] font-bold text-zinc-800 dark:text-zinc-300">
                      <svg className="w-3 h-3 md:w-3.5 md:h-3.5 text-[#0066FF] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* --- MAIN DIVIDER --- */}
        <hr className="border-t border-zinc-200 dark:border-zinc-800/80 my-10 lg:my-14" />

        {/* --- MIDDLE ROW (STATS & BELIEFS) --- */}
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-12">
          
          {/* Left Text */}
          <div className="w-full lg:w-[28%] shrink-0">
            <h4 className="text-[#0066FF] text-[10px] md:text-[11px] font-bold uppercase tracking-[0.2em] mb-3 md:mb-4">
              What we believe
            </h4>
            <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.75rem] leading-[1.15] font-serif tracking-tight">
              Good design is<br className="hidden sm:block" />
              {" "}not decoration.<br className="hidden sm:block" />
              {" "}<span className="text-[#0066FF] italic">It's direction.</span>
            </h3>
          </div>

          {/* Right Stats Grid - Changed to grid-cols-2 on mobile to cut height in half */}
          <div className="w-full lg:w-[72%] grid grid-cols-2 lg:grid-cols-4 gap-y-8 gap-x-6 lg:gap-x-0">
            {/* Stat 1 */}
            <div className="lg:pr-6 flex flex-col group cursor-default">
              <EyeViewfinderIcon className="w-6 h-6 md:w-7 md:h-7 text-zinc-800 dark:text-zinc-200 mb-3 md:mb-4 stroke-[1.5] transition-transform duration-500 group-hover:scale-110 group-hover:text-[#0066FF]" />
              <span className="font-serif text-3xl md:text-4xl mb-1">8+</span>
              <span className="text-[#0066FF] text-[9px] md:text-[10px] font-bold uppercase tracking-[0.2em] mb-2 md:mb-3">Years of impact</span>
              <p className="text-xs md:text-sm leading-[1.6] text-zinc-500 dark:text-zinc-400">
                Nearly a decade of turning ideas into unforgettable brand experiences.
              </p>
            </div>

            {/* Stat 2 */}
            <div className="lg:px-6 border-l border-zinc-200 dark:border-zinc-800/80 pl-6 lg:pl-6 flex flex-col group cursor-default">
              <AsteriskIcon className="w-6 h-6 md:w-7 md:h-7 text-zinc-800 dark:text-zinc-200 mb-3 md:mb-4 stroke-[1.5] transition-transform duration-500 group-hover:rotate-90 group-hover:text-[#0066FF]" />
              <span className="font-serif text-3xl md:text-4xl mb-1">50+</span>
              <span className="text-[#0066FF] text-[9px] md:text-[10px] font-bold uppercase tracking-[0.2em] mb-2 md:mb-3">Brands elevated</span>
              <p className="text-xs md:text-sm leading-[1.6] text-zinc-500 dark:text-zinc-400">
                From startups to icons, we've helped brands of all sizes reach new heights.
              </p>
            </div>

            {/* Stat 3 */}
            <div className="lg:px-6 border-t lg:border-t-0 pt-8 lg:pt-0 lg:border-l border-zinc-200 dark:border-zinc-800/80 flex flex-col group cursor-default">
              <PaperPlaneIcon className="w-6 h-6 md:w-7 md:h-7 text-zinc-800 dark:text-zinc-200 mb-3 md:mb-4 stroke-[1.5] transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-[#0066FF]" />
              <span className="font-serif text-3xl md:text-4xl mb-1">100+</span>
              <span className="text-[#0066FF] text-[9px] md:text-[10px] font-bold uppercase tracking-[0.2em] mb-2 md:mb-3">Campaigns</span>
              <p className="text-xs md:text-sm leading-[1.6] text-zinc-500 dark:text-zinc-400">
                Strategic, creative and data-driven campaigns that deliver real results.
              </p>
            </div>

            {/* Stat 4 */}
            <div className="lg:pl-6 border-l border-t lg:border-t-0 pt-8 lg:pt-0 pl-6 lg:pl-6 border-zinc-200 dark:border-zinc-800/80 flex flex-col group cursor-default">
              <HeartIcon className="w-6 h-6 md:w-7 md:h-7 text-zinc-800 dark:text-zinc-200 mb-3 md:mb-4 stroke-[1.5] transition-transform duration-500 group-hover:scale-110 group-hover:text-[#0066FF]" />
              <span className="font-serif text-3xl md:text-4xl mb-1">100%</span>
              <span className="text-[#0066FF] text-[9px] md:text-[10px] font-bold uppercase tracking-[0.2em] mb-2 md:mb-3">Commitment</span>
              <p className="text-xs md:text-sm leading-[1.6] text-zinc-500 dark:text-zinc-400">
                We don't do average. Every project gets our full creative energy.
              </p>
            </div>
          </div>
        </div>

        {/* --- BOTTOM FOOTER ROW --- */}
        <hr className="border-t border-zinc-200 dark:border-zinc-800/80 my-8 lg:my-10" />
        
        {/* Footer layout updated to wrap elegantly on small screens */}
        <div className="flex flex-wrap justify-center md:justify-between items-center gap-y-4 gap-x-6 text-[9px] md:text-[11px] uppercase tracking-[0.2em] font-bold text-zinc-800 dark:text-zinc-300">
          <div className="flex items-center gap-3 order-2 md:order-1">
            <svg className="w-3.5 h-3.5 md:w-5 md:h-5 text-zinc-400 dark:text-zinc-600 hidden sm:block" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
            We don't follow trends.
          </div>
          
          <div className="font-serif italic text-xl sm:text-2xl md:text-3xl tracking-normal text-zinc-900 dark:text-zinc-100 normal-case font-normal text-center order-1 md:order-2 w-full md:w-auto mb-2 md:mb-0">
            We create what's next.
          </div>
          
          <div className="flex items-center gap-3 order-3 md:order-3">
            Let's build what matters.
            <svg className="w-3.5 h-3.5 md:w-5 md:h-5 text-zinc-400 dark:text-zinc-600 hidden sm:block" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </div>
        </div>

      </div>
    </section>
  );
}

// --- Custom SVGs (Typed for TypeScript) ---

function EyeViewfinderIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 4H4v2M18 4h2v2M6 20H4v-2M18 20h2v-2" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 16c-3.5 0-6.5-2.5-8-5 1.5-2.5 4.5-5 8-5s6.5 2.5 8 5c-1.5 2.5-4.5 5-8 5z" />
      <circle cx="12" cy="11" r="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function AsteriskIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m7-11L5 15m14 2L5 7" />
    </svg>
  );
}

function PaperPlaneIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
    </svg>
  );
}

function HeartIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
    </svg>
  );
}