"use client";

import { useEffect, useState } from "react";
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
  { label: "Contact", href: "#contact" },
];

// Helper to track active section via IntersectionObserver
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
  const activeSection = useActiveSection(links.map((l) => l.href.replace("#", "")));

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (href: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) {
      setOpen(false);
      setTimeout(() => el.scrollIntoView({ behavior: "smooth", block: "start" }), 120);
    }
  };

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-[100] transition-all duration-500 ease-[0.22,1,0.36,1]",
          open ? "bg-background" : scrolled ? "border-b border-border/40 bg-background/80 backdrop-blur-xl" : "bg-transparent"
        )}
      >
        <div className="mx-auto flex h-16 max-w-[1600px] items-center justify-between px-6 md:h-20 lg:px-12">
          {/* Logo */}
          <a href="#top" onClick={handleNavClick("#top")} className="group relative z-[100] flex flex-col justify-center">
            <span className="font-serif text-2xl leading-[0.8] tracking-tighter text-foreground md:text-3xl">Digital</span>
            <span className="ml-[2px] mt-1 text-[8px] font-semibold uppercase tracking-[0.45em] text-muted-foreground">Graphics</span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden items-center gap-8 lg:flex">
            {links.map((link) => {
              const isActive = activeSection === link.href.replace("#", "");
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

          {/* Actions */}
          <div className="relative z-[100] flex items-center gap-4 md:gap-6">
            <ThemeToggle />
            <div className="hidden md:block">
              <MagneticButton onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                className="h-10 bg-foreground px-6 text-[10px] font-semibold uppercase tracking-[0.2em] text-background hover:bg-primary">
                Start a Project
              </MagneticButton>
            </div>
            {/* Mobile Hamburger */}
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
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}
            className="fixed inset-0 z-[90] flex h-dvh w-full flex-col bg-background pt-24 lg:hidden"
          >
            <div className="flex flex-1 flex-col justify-center gap-2 px-8">
              {links.map((link, i) => {
                const isActive = activeSection === link.href.replace("#", "");
                return (
                  <div key={link.href} className="overflow-hidden py-1">
                    <motion.a
                      href={link.href}
                      onClick={handleNavClick(link.href)}
                      initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
                      transition={{ duration: 0.8, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                      className={cn(
                        "group flex items-center gap-4 text-4xl font-serif tracking-tight transition-colors duration-300 md:text-6xl",
                        isActive ? "text-foreground" : "text-foreground/50 hover:text-foreground"
                      )}
                    >
                      <span className={cn("h-1.5 w-1.5 rounded-full bg-foreground transition-transform duration-500", isActive ? "scale-100" : "scale-0")} />
                      <span className="transition-transform duration-500 group-hover:translate-x-4 group-hover:italic">
                        {link.label}
                      </span>
                    </motion.a>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}