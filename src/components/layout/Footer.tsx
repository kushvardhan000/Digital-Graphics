"use client";

import React, { useState, useRef, useEffect } from "react";
import { Instagram, Linkedin, Twitter, ArrowUp, ArrowUpRight, Check, Loader2, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function Footer() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const textRef = useRef<HTMLDivElement>(null);
  
  // Newsletter States
  const [email, setEmail] = useState<string>("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    let animationFrameId: number;
    let startTime = Date.now();
    const element = textRef.current;

    const handleMouseMove = (e: MouseEvent) => {
      if (!element || window.innerWidth <= 768) return;
      const rect = element.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    };

    if (element) {
      element.addEventListener("mousemove", handleMouseMove);
    }

    const animateMobile = () => {
      if (window.innerWidth <= 768 && element) {
        const rect = element.getBoundingClientRect();
        const elapsed = (Date.now() - startTime) / 1000;
        
        setMousePosition({
          x: rect.width / 2 + Math.sin(elapsed) * (rect.width / 2.5),
          y: rect.height / 2 + Math.cos(elapsed * 1.5) * (rect.height / 2.5),
        });
      }
      animationFrameId = requestAnimationFrame(animateMobile);
    };

    animateMobile();

    return () => {
      if (element) element.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubscribe = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Basic Regex for valid email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!email) {
      setStatus("error");
      setErrorMessage("Email is required.");
      return;
    }
    
    if (!emailRegex.test(email)) {
      setStatus("error");
      setErrorMessage("Please enter a valid email.");
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    // Simulate 2-second network request
    setTimeout(() => {
      setStatus("success");
      setEmail("");
      
      // Reset form after 3 seconds of showing success
      setTimeout(() => {
        setStatus("idle");
      }, 3000);
    }, 2000);
  };

  return (
    <footer className="bg-white text-black dark:bg-[#050505] dark:text-white pt-16 px-4 md:px-8 font-sans overflow-hidden">
      <div className="max-w-[1600px] mx-auto">
        
        {/* TOP SECTION: Spotlight Logo - Fixed Alignment & Responsive Scale */}
        <div className="w-full pb-10 flex justify-center items-center cursor-default select-none overflow-hidden px-2">
          {/* Using w-fit ensures the absolute child perfectly matches the parent size */}
          <div ref={textRef} className="relative w-fit mx-auto">
            {/* Base Outlined Text */}
            <div 
              className="text-[clamp(2.3rem,10vw,8rem)] font-black tracking-tighter uppercase whitespace-nowrap text-transparent"
              style={{ WebkitTextStroke: "1px rgba(128, 128, 128, 0.2)" }}
            >
              Digital Graphics
            </div>

            {/* Masked Spotlight Text - Absolutely positioned to perfectly overlay */}
            <div
              className="absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center text-[clamp(2.3rem,10vw,8rem)] font-black tracking-tighter uppercase whitespace-nowrap bg-gradient-to-br from-neutral-800 to-black dark:from-white dark:to-neutral-500 bg-clip-text text-transparent pointer-events-none"
              style={{
                maskImage: `radial-gradient(circle 120px at ${mousePosition.x}px ${mousePosition.y}px, black 30%, transparent 70%)`,
                WebkitMaskImage: `radial-gradient(circle 120px at ${mousePosition.x}px ${mousePosition.y}px, black 30%, transparent 70%)`,
              }}
            >
              Digital Graphics
            </div>
          </div>
        </div>

        {/* MIDDLE SECTION */}
        <div className="border-t border-neutral-600/30 dark:border-neutral-400/30 pt-12 pb-14 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
          
          <div className="lg:col-span-4 flex flex-col gap-2">
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight">
              Ready to start?
            </h2>
            <p className="text-4xl md:text-5xl font-semibold tracking-tight text-black/40 dark:text-white/40">
              Let's scale together.
            </p>
          </div>

          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div className="flex flex-col gap-4">
              <p className="text-[10px] font-bold uppercase tracking-widest text-black/40 dark:text-white/40">Emails</p>
              <div className="flex flex-col gap-2">
                <a href="mailto:digitalgraphicsranchi@gmail.com" className="text-sm hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors truncate">
                  digitalgraphicsranchi@gmail.com
                </a>
                <a href="mailto:info@digitalgraphicsindia.com" className="text-sm hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors truncate">
                  info@digitalgraphicsindia.com
                </a>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <p className="text-[10px] font-bold uppercase tracking-widest text-black/40 dark:text-white/40">Phones</p>
              <div className="flex flex-col gap-2">
                <a href="tel:+919341952713" className="text-sm hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors">+91 93419 52713</a>
                <a href="tel:+916205114112" className="text-sm hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors">+91 62051 14112</a>
                <a href="tel:+917766850199" className="text-sm hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors">+91 77668 50199</a>
                <a href="tel:+917544085199" className="text-sm hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors">+91 75440 85199</a>
              </div>
            </div>
          </div>

          {/* REFINED NEWSLETTER UI */}
          <div className="lg:col-span-3 flex flex-col gap-4">
            <p className="text-[10px] font-bold uppercase tracking-widest text-black/40 dark:text-white/40">Stay Updated</p>
            <p className="text-sm text-black/60 dark:text-white/60">Subscribe to our newsletter for the latest insights.</p>
            
            <form onSubmit={handleSubscribe} className="relative mt-2 flex flex-col gap-2">
              <div className={`relative flex items-center w-full bg-neutral-100 dark:bg-neutral-900 rounded-lg border transition-all duration-300 focus-within:ring-2 focus-within:ring-neutral-200 dark:focus-within:ring-neutral-800 ${
                status === "error" ? "border-red-500/50 focus-within:border-red-500" : "border-neutral-200 dark:border-neutral-800 focus-within:border-neutral-400 dark:focus-within:border-neutral-600"
              }`}>
                <input 
                  type="text" 
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (status === "error") setStatus("idle");
                  }}
                  disabled={status === "loading" || status === "success"}
                  placeholder="Enter your email" 
                  autoComplete="off"
                  className="w-full bg-transparent py-3 pl-4 pr-12 text-sm focus:outline-none transition-colors placeholder:text-black/30 dark:placeholder:text-white/30 disabled:opacity-50"
                />
                
                {/* Dynamic Submit Button inside the input */}
                <div className="absolute right-2 top-1/2 -translate-y-1/2">
                  <AnimatePresence mode="wait">
                    {status === "idle" || status === "error" ? (
                      <motion.button 
                        key="submit"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        type="submit" 
                        className="p-1.5 rounded-md bg-white dark:bg-[#050505] border border-neutral-200 dark:border-neutral-800 text-black/60 hover:text-black dark:text-white/60 dark:hover:text-white shadow-sm transition-colors"
                      >
                        <ArrowUpRight className="w-4 h-4" />
                      </motion.button>
                    ) : status === "loading" ? (
                      <motion.div 
                        key="loading"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="p-1.5 text-neutral-500"
                      >
                        <Loader2 className="w-4 h-4 animate-spin" />
                      </motion.div>
                    ) : (
                      <motion.div 
                        key="success"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="p-1.5 text-green-500"
                      >
                        <Check className="w-4 h-4" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
              
              {/* Error/Success Messages */}
              <AnimatePresence>
                {status === "error" && (
                  <motion.p 
                    initial={{ opacity: 0, height: 0, y: -5 }}
                    animate={{ opacity: 1, height: "auto", y: 0 }}
                    exit={{ opacity: 0, height: 0, y: -5 }}
                    className="text-xs text-red-500 flex items-center gap-1 mt-1"
                  >
                    <AlertCircle className="w-3 h-3" /> {errorMessage}
                  </motion.p>
                )}
                {status === "success" && (
                  <motion.p 
                    initial={{ opacity: 0, height: 0, y: -5 }}
                    animate={{ opacity: 1, height: "auto", y: 0 }}
                    exit={{ opacity: 0, height: 0, y: -5 }}
                    className="text-xs text-green-500 flex items-center gap-1 mt-1"
                  >
                    Subscribed successfully!
                  </motion.p>
                )}
              </AnimatePresence>
            </form>
          </div>

        </div>

        {/* BOTTOM SECTION: Legal & Socials */}
        <div className="border-t border-neutral-600/30 dark:border-neutral-400/30 pt-6 pb-8 flex flex-col md:flex-row justify-between items-center gap-6">
          
          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-6 text-[10px] md:text-xs font-semibold tracking-widest uppercase text-black/40 dark:text-white/40 text-center md:text-left">
            <p>© {new Date().getFullYear()} Digital Graphics Inc.</p>
            <div className="flex gap-4">
              <a href="#privacy" className="hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors">Privacy</a>
              <a href="#terms" className="hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors">Terms</a>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
            
            {/* HITCS Tag */}
            <p className="text-[10px] md:text-xs font-semibold tracking-widest uppercase text-black/40 dark:text-white/40">
              Made by <a href="https://www.hitcs.in/" target="_blank" rel="noopener noreferrer" className="text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200 transition-colors">HITCS Pvt. Ltd</a>
            </p>

            <button 
              onClick={scrollToTop}
              className="flex items-center gap-2 px-4 py-2 rounded-full border border-neutral-600/30 dark:border-neutral-400/30 text-[10px] md:text-xs font-semibold tracking-widest uppercase hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors"
            >
              Back to Top <ArrowUp className="w-3 h-3" />
            </button>

            <div className="flex items-center gap-2">
              <a href="#" className="p-2 rounded-full border border-neutral-600/30 dark:border-neutral-400/30 hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-full border border-neutral-600/30 dark:border-neutral-400/30 hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-full border border-neutral-600/30 dark:border-neutral-400/30 hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
}