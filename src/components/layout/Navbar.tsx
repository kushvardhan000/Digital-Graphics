"use client";

import { useEffect, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "../ui/ThemeToggle";
import { MagneticButton } from "../ui/MagneticButton";

const links = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#capabilities" },
  { label: "Clients", href: "#clients" },
  { label: "Work", href: "#work" },
  { label: "Testimonials", href: "#testimonials" },
];

function useActiveSection(sectionIds: string[]) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: "-20% 0px -70% 0px" }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sectionIds]);

  return activeId;
}

export function Navbar() {
   const [scrolled, setScrolled] = useState(false);
   const [open, setOpen] = useState(false);
   
   const location = useLocation();
   const navigate = useNavigate();
   const activeSection = useActiveSection(links.map((l) => l.href.replace("#", "")));

   // Handle Scroll state for Navbar styling
   useEffect(() => {
     const onScroll = () => setScrolled(window.scrollY > 50);
     window.addEventListener("scroll", onScroll, { passive: true });
     return () => window.removeEventListener("scroll", onScroll);
   }, []);

   // Handle cross-page scrolling from hash in URL
   useEffect(() => {
     if (location.pathname === "/" && location.hash) {
       const id = location.hash.replace("#", "");
       // Small timeout ensures the DOM is fully painted after routing back to Home
       setTimeout(() => {
         const el = document.getElementById(id);
         if (el) {
           el.scrollIntoView({ behavior: "smooth", block: "start" });
         }
       }, 150);
     }
   }, [location.pathname, location.hash]);

   const handleNavClick = (href: string) => (e: React.MouseEvent) => {
     e.preventDefault();
     const id = href.replace("#", "");
     setOpen(false);

     if (location.pathname === "/") {
       // Already on home page, just scroll smoothly
       const el = document.getElementById(id);
       if (el) {
         setTimeout(() => el.scrollIntoView({ behavior: "smooth", block: "start" }), 120);
       }
     } else {
       // On another page, navigate to home with the hash
       navigate("/" + href);
     }
   };

  return (
    <>
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[999] focus:bg-background focus:px-4 focus:py-2 focus:text-foreground">
        Skip to main content
      </a>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-[100] transition-all duration-500 ease-[0.22,1,0.36,1]",
          open ? "bg-background" : scrolled ? "border-b border-border/40 bg-background/80 backdrop-blur-xl" : "bg-transparent"
        )}
      >
        <div className="mx-auto flex h-16 max-w-[1600px] items-center justify-between px-6 md:h-20 lg:px-12">
          {/* Restored Original Branding using React Router Link */}
          <Link 
  to="/" 
  onClick={(e) => {
    // If we are already on home, scroll to top
    if (location.pathname === "/") {
      e.preventDefault(); // Stop the default Link behavior
      window.scrollTo({ top: 0, behavior: "smooth" });
      setOpen(false); // Close mobile menu if open
    }
    // If we are on another page, let the default Link behavior 
    // take us to "/" and the browser will naturally be at the top
  }}
  className="group relative z-[100] flex flex-col justify-center"
>
  <span className="font-serif text-2xl leading-[0.8] tracking-tighter text-foreground md:text-3xl">Digital</span>
  <span className="ml-[2px] mt-1 text-[8px] font-semibold uppercase tracking-[0.45em] text-muted-foreground">Graphics</span>
</Link>

          <nav className="hidden items-center gap-8 lg:flex">
            {links.map((link) => {
              const isActive = location.pathname === "/" && activeSection === link.href.replace("#", "");
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={handleNavClick(link.href)}
                  className={cn(
                    "group relative text-[12px] font-medium uppercase tracking-[0.2em] transition-all duration-300",
                    isActive ? "text-foreground" : "text-foreground/65 hover:text-foreground"
                  )}
                >
                  {link.label}
                  <span className={cn(
                    "absolute inset-x-0 -bottom-1 h-[1px] bg-foreground transition-transform duration-500 ease-out",
                    isActive ? "scale-x-100" : "origin-right scale-x-0 group-hover:origin-left group-hover:scale-x-100"
                  )} />
                </a>
              );
            })}
          </nav>

          <div className="relative z-[100] flex items-center gap-4 md:gap-6">
            <ThemeToggle />
            <div className="hidden md:flex items-center gap-6">
              <MagneticButton 
                onClick={handleNavClick("#contact")}
                className="h-10 bg-foreground px-6 text-[10px] font-semibold uppercase tracking-[0.2em] text-background hover:bg-primary"
              >
                Let's Build Together
              </MagneticButton>
              
              <Link to="/proud-moments" onClick={() => {
    navigate('/proud-moments');
    // Force scroll to top instantly upon navigation
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }}
   className="group flex h-10 items-center rounded-full border border-border/90 bg-background/50 px-4 transition-all hover:border-foreground/10 hover:bg-background">
                <img src="/Proud Moments-Logo 2 (2).png" alt="Proud Moments" className="h-6 w-auto object-contain opacity-90 transition-opacity group-hover:opacity-100 dark:brightness-100 brightness-[0.85]" />
              </Link>
            </div>
            
            <button onClick={() => setOpen(!open)} className="flex h-10 w-10 flex-col items-center justify-center gap-[5px] lg:hidden">
              <div className={cn("h-[1.5px] w-5 bg-foreground transition-transform duration-500", open && "translate-y-[6.5px] rotate-45")} />
              <div className={cn("h-[1.5px] w-5 bg-foreground transition-opacity duration-500", open && "opacity-0")} />
              <div className={cn("h-[1.5px] w-5 bg-foreground transition-transform duration-500", open && "-translate-y-[6.5px] -rotate-45")} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {open && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-[90] flex h-dvh w-full flex-col bg-background pt-24 lg:hidden"
          >
            <div className="flex flex-1 flex-col justify-center px-6 sm:px-12 md:px-16">
              <div className="flex flex-col gap-2 mb-10">
                {links.map((link, i) => (
                  <div key={link.href} className="overflow-hidden py-1">
                    <motion.a
                      href={link.href}
                      onClick={handleNavClick(link.href)}
                      initial={{ y: "100%" }}
                      animate={{ y: 0 }}
                      exit={{ y: "100%" }}
                      transition={{ duration: 0.8, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                      className="flex items-center text-4xl sm:text-5xl md:text-6xl font-serif text-foreground/80 hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </motion.a>
                  </div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                <Link
                  to="/proud-moments"
                  onClick={() => {
    navigate('/proud-moments');
    // Force scroll to top instantly upon navigation
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }}
                  className="group flex w-full justify-center items-center gap-4 h-20 sm:h-24 rounded-2xl border border-border bg-secondary/20 px-6 sm:px-8 transition-all hover:bg-secondary/80 hover:border-foreground/20 active:scale-[0.98] shadow-sm"
                >
                  <img
                    src="/Proud Moments-Logo 2 (2).png"
                    alt="Proud Moments"
                    className="h-8 sm:h-10 w-auto object-contain transition-all duration-300 dark:brightness-100 brightness-[0.85] group-hover:brightness-100"
                  />
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}