import { useEffect, useRef, useState } from "react";
import { motion, useAnimationFrame, useMotionValue, useSpring, useTransform } from "motion/react";
// import { cn } from "@/lib/utils";

// Curated list of bulletproof, transparent, high-color SVGs 
// that look perfect on BOTH Light and Dark themes natively.
const logos = [
  "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
  "https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg",
  "https://upload.wikimedia.org/wikipedia/commons/3/33/Figma-logo.svg",
  "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg",
  "https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg",
  "https://upload.wikimedia.org/wikipedia/commons/d/d5/Slack_icon_2019.svg",
  "https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg",
  "https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg",
  "https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg"
];

export function ClientSection() {
  return (
    <section id="clients" className="w-full bg-background overflow-hidden border-b border-border/40 scroll-mt-[70px] md:scroll-mt-[80px]">
      <div className="py-6 md:py-10 lg:py-18 text-center flex flex-col items-center justify-center">
        <h2 className="font-serif text-5xl leading-[0.9] md:text-7xl lg:text-8xl italic tracking-tight text-foreground px-6">
          OUR WORK <br className="md:hidden" />
          <span className="not-italic font-sans font-medium text-4xl md:text-6xl lg:text-7xl tracking-tighter">
            speaks!
          </span>
        </h2>
      </div>

      <div className="flex flex-col border-t border-border/40">
        <SmoothMarquee items={logos.slice(0, 5)} direction="left" />
        <SmoothMarquee items={logos.slice(5, 10)} direction="right" />
      </div>
    </section>
  );
}

function SmoothMarquee({ items, direction = "left" }: { items: string[]; direction?: "left" | "right" }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [contentWidth, setContentWidth] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Measure the exact width of one set of logos for seamless wrapping
  useEffect(() => {
    const calculateWidth = () => {
      if (containerRef.current && containerRef.current.children[0]) {
        setContentWidth(containerRef.current.children[0].getBoundingClientRect().width);
      }
    };

    calculateWidth();
    window.addEventListener("resize", calculateWidth);
    return () => window.removeEventListener("resize", calculateWidth);
  }, []);

  // Set up the motion values
  const baseX = useMotionValue(0);
  
  // The Spring gives us that premium, buttery-smooth deceleration/acceleration on hover
  const velocity = useSpring(direction === "left" ? -1 : 1, {
    stiffness: 80,
    damping: 25, 
    mass: 1,
  });

  // Adjust velocity target based on hover state
  useEffect(() => {
    velocity.set(isHovered ? 0 : direction === "left" ? -1 : 1);
  }, [isHovered, direction, velocity]);

  // Fix starting position for right-moving marquees to prevent initial jump
  useEffect(() => {
    if (direction === "right" && contentWidth && baseX.get() === 0) {
      baseX.set(-contentWidth);
    }
  }, [contentWidth, direction, baseX]);

  // The rendering loop runs natively outside of React state for perfect 60/120fps
  useAnimationFrame((_t, delta) => {
    if (!contentWidth) return;

    // Control base speed here (higher number = faster)
    const baseSpeed = 1.5; 
    const moveBy = velocity.get() * baseSpeed * (delta / 16); 
    
    let newX = baseX.get() + moveBy;

    // Seamless wrap logic based on exact pixel measurements
    if (direction === "left") {
      if (newX <= -contentWidth) {
        newX += contentWidth;
      }
    } else {
      if (newX >= 0) {
        newX -= contentWidth;
      }
    }

    baseX.set(newX);
  });

  const x = useTransform(baseX, (v) => `${v}px`);

  return (
    <div 
      className="flex w-full overflow-hidden border-b border-border/40 last:border-b-0"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      // Add touch events for mobile smooth stopping
      onTouchStart={() => setIsHovered(true)}
      onTouchEnd={() => setIsHovered(false)}
    >
      <motion.div
        ref={containerRef}
        className="flex w-max"
        style={{ x }}
      >
        {/* Render 3 identical sets to guarantee the screen is always filled */}
        {[1, 2, 3].map((set) => (
          <div key={set} className="flex w-max shrink-0">
            {items.map((src, i) => (
              <div 
                key={`${set}-${i}`} 
                className="flex h-24 w-40 md:h-36 md:w-72 lg:h-40 lg:w-80 items-center justify-center border-r border-border/40 shrink-0 group transition-colors duration-500 hover:bg-muted/30 cursor-pointer"
              >
                <div className="relative flex items-center justify-center h-10 w-24 md:h-14 md:w-32 lg:h-16 lg:w-36 transition-transform duration-500 ease-[0.22,1,0.36,1] group-hover:scale-110">
                  <img 
                    src={src} 
                    alt="Brand Partner Logo" 
                    className="h-full w-full object-contain"
                    loading="lazy"
                    // Fallback just in case a network error occurs
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  );
}