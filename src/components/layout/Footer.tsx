"use client";

import React, { useState, useRef, useEffect } from "react";
import { Instagram, ArrowUp, ArrowRight, Youtube, Facebook } from "lucide-react";
import { MagneticButton } from "../ui/MagneticButton";
import { useNavigate } from "react-router-dom";

export function Footer() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const textRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  
  // Refs to manage animation states without triggering re-renders
  const isHovered = useRef(false);
const targetMousePos = useRef({ x: 0, y: 0 });
const currentPos = useRef({ x: 0, y: 0 });

// NEW
const velocity = useRef({ x: 0, y: 0 });
const hoverBlend = useRef(0);

  useEffect(() => {
    let animationFrameId: number;
    let startTime = Date.now();
    let initialized = false;

    const animate = () => {
  const element = textRef.current;

  if (element) {
    const rect = element.getBoundingClientRect();
    const elapsed = (Date.now() - startTime) / 1000;

    // Slower floating animation
    const autoX =
      rect.width / 2 +
      Math.sin(elapsed * 0.22) * (rect.width * 0.35);

    const autoY =
      rect.height / 2 +
      Math.cos(elapsed * 0.18) * (rect.height * 0.35);

    // Smooth transition between auto mode and hover mode
    hoverBlend.current +=
      ((isHovered.current ? 1 : 0) - hoverBlend.current) * 0.08;

    const targetX =
      autoX * (1 - hoverBlend.current) +
      targetMousePos.current.x * hoverBlend.current;

    const targetY =
      autoY * (1 - hoverBlend.current) +
      targetMousePos.current.y * hoverBlend.current;

    if (!initialized) {
      currentPos.current = {
        x: targetX,
        y: targetY,
      };
      initialized = true;
    }

    // Spring physics
    const stiffness = isHovered.current ? 0.045 : 0.02;
    const damping = 0.88;

    velocity.current.x =
      velocity.current.x * damping +
      (targetX - currentPos.current.x) * stiffness;

    velocity.current.y =
      velocity.current.y * damping +
      (targetY - currentPos.current.y) * stiffness;

    currentPos.current.x += velocity.current.x;
    currentPos.current.y += velocity.current.y;

    setMousePosition({
      x: currentPos.current.x,
      y: currentPos.current.y,
    });
  }

  animationFrameId = requestAnimationFrame(animate);
};

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

const handleMouseMove = (e: React.MouseEvent) => {
  if (!textRef.current) return;

  const rect = textRef.current.getBoundingClientRect();

  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  targetMousePos.current.x +=
    (x - targetMousePos.current.x) * 0.25;

  targetMousePos.current.y +=
    (y - targetMousePos.current.y) * 0.25;
};


  const handleMouseEnter = (e: React.MouseEvent) => {
    isHovered.current = true;
    handleMouseMove(e); // Update target instantly on enter
  };

  const handleMouseLeave = () => {
    isHovered.current = false;
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-white text-black dark:bg-[#050505] dark:text-white pt-16 px-4 md:px-8 font-sans overflow-hidden">
      <div className="max-w-[1400px] mx-auto">
        
        {/* TOP SECTION: Spotlight Logo */}
        <div className="w-full pb-10 flex justify-center items-center cursor-default select-none overflow-hidden px-2">
          <div 
            ref={textRef} 
            className="relative w-fit mx-auto touch-none"
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            
            {/* Base Outlined Text */}
            <div 
              className="text-[clamp(2.5rem,10vw,8.5rem)] font-black tracking-tighter uppercase whitespace-nowrap text-transparent pb-4"
              style={{ WebkitTextStroke: "1px #2563EB" }} // Tailwind blue-600
            >
              Digital Graphics
            </div>

            {/* Masked Spotlight Text */}
            <div
              className="absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center text-[clamp(2.5rem,10vw,8.5rem)] font-black tracking-tighter uppercase whitespace-nowrap bg-gradient-to-r from-blue-700 via-blue-500 to-blue-300 bg-clip-text text-transparent pointer-events-none pb-4"
              style={{
                maskImage: `radial-gradient(circle clamp(80px, 15vw, 150px) at ${mousePosition.x}px ${mousePosition.y}px, black 30%, transparent 70%)`,
                WebkitMaskImage: `radial-gradient(circle clamp(80px, 15vw, 150px) at ${mousePosition.x}px ${mousePosition.y}px, black 30%, transparent 70%)`,
              }}
            >
              Digital Graphics
            </div>
          </div>
        </div>

        {/* MIDDLE SECTION */}
        <div className="border-y border-neutral-200 dark:border-neutral-800 py-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
          
          {/* CTA Column */}
          <div className="lg:col-span-5 flex flex-col gap-3 justify-center">
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-black dark:text-white">
              Ready to start?
            </h2>
            <p className="text-4xl md:text-5xl font-semibold tracking-tight text-blue-600 dark:text-blue-500">
              Let's scale together.
            </p>
            <div className="mt-4">
              <MagneticButton 
  onClick={() => {
    navigate('/proud-moments');
    // Force scroll to top instantly upon navigation
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }}
  className="group relative flex items-center gap-3 px-6 py-3 border border-blue-600 text-blue-600 dark:border-blue-500 dark:text-blue-500 text-xs font-bold tracking-widest uppercase overflow-hidden transition-colors duration-300 hover:text-white dark:hover:text-white cursor-pointer"
  strength={0.25}
>
  {/* Animated Background Fill */}
  <div className="absolute inset-0 bg-blue-600 dark:bg-blue-500 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
  
  {/* Button Content */}
  <span className="relative z-10 flex items-center gap-2">
    Proud Moments 
    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" />
  </span>
</MagneticButton>
            </div>
          </div>

          {/* Contact Info Columns */}
          <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-0 lg:pt-4">
            
            {/* Email */}
            <div className="flex flex-col gap-4 md:pr-6">
              <p className="text-[10px] font-bold uppercase tracking-widest text-blue-600 dark:text-blue-500">Email</p>
              <div className="flex flex-col gap-2">
                <a
  href="mailto:digitalgraphicsranchi@gmail.com"
  className="inline-flex items-center gap-2 text-sm font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
>
  digitalgraphicsranchi@gmail.com
</a>
              </div>
            </div>

            {/* Phone */}
            <div className="flex flex-col gap-4 border-t md:border-t-0 md:border-l border-neutral-200 dark:border-neutral-800 pt-6 md:pt-0 md:px-6">
              <p className="text-[10px] font-bold uppercase tracking-widest text-blue-600 dark:text-blue-500">Phone</p>
              <div className="flex flex-col gap-2">
                <a href="tel:6205114112" className="text-sm font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors">6205114112</a>
                <a href="tel:0651-3555666" className="text-sm font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors">0651-3555666</a>
              </div>
            </div>

            {/* Office */}
            <div className="flex flex-col gap-4 border-t md:border-t-0 md:border-l border-neutral-200 dark:border-neutral-800 pt-6 md:pt-0 md:pl-6">
              <p className="text-[10px] font-bold uppercase tracking-widest text-blue-600 dark:text-blue-500">Office</p>
              <div className="flex flex-col gap-2 text-sm font-medium leading-relaxed">
                <p>507, Gridhar Plaza (5th Floor),</p>
                <p>Harmu Rd, Ranchi,</p>
                <p>Jharkhand 834001</p>
              </div>
            </div>

          </div>
        </div>

        {/* BOTTOM SECTION: Legal & Socials */}
        <div className="pt-8 pb-12 flex flex-col md:flex-row justify-between items-center gap-6">
          
          {/* Copyright & Links */}
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8 text-[10px] font-bold tracking-widest uppercase text-neutral-400 dark:text-neutral-500 text-center md:text-left">
            <p>© {new Date().getFullYear()} Digital Graphics Inc.</p>
            <div className="flex gap-6">
              <a href="#privacy" className="hover:text-black dark:hover:text-white transition-colors">Privacy</a>
              <a href="#terms" className="hover:text-black dark:hover:text-white transition-colors">Terms</a>
            </div>
          </div>

          {/* Credits, Back to Top, Socials */}
          <div className="flex flex-col md:flex-row items-center gap-6">
            
            <p className="text-[10px] font-bold tracking-widest uppercase text-neutral-400 dark:text-neutral-500">
              Made by <a href="https://www.hitcs.in/" target="_blank" rel="noopener noreferrer" className="hover:text-black dark:hover:text-white transition-colors">HITCS Pvt. Ltd</a>
            </p>

            <button 
              onClick={scrollToTop}
              className="flex items-center gap-2 px-5 py-2 rounded-full border border-blue-600 text-blue-600 dark:border-blue-500 dark:text-blue-500 text-[10px] font-bold tracking-widest uppercase hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
            >
              Back to Top <ArrowUp className="w-3 h-3" />
            </button>

<div className="flex items-center gap-3">
    {/* Instagram */}
  <a 
    target="_blank" 
    href="https://www.instagram.com/digitalgraphicsranchi/" 
    className="p-2 rounded-full border border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 transition-all duration-300 hover:border-pink-600 hover:text-pink-600 dark:hover:border-pink-400 dark:hover:text-pink-400" 
    aria-label="Instagram"
  >
    <Instagram className="w-4 h-4" />
  </a>

  
  {/* Facebook */}
  <a 
    target="_blank" 
    href="https://www.facebook.com/DigitalGraphicsRanchi" 
    className="p-2 rounded-full border border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 transition-all duration-300 hover:border-blue-600 hover:text-blue-600 dark:hover:border-blue-400 dark:hover:text-blue-400" 
    aria-label="Facebook"
  >
    <Facebook className="w-4 h-4" />
  </a>

  {/* YouTube */}
  <a 
    target="_blank" 
    href="https://www.youtube.com/channel/UCgbQmUTDPvfVNurxywKJ8EQ" 
    className="p-2 rounded-full border border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 transition-all duration-300 hover:border-red-600 hover:text-red-600 dark:hover:border-red-500 dark:hover:text-red-500" 
    aria-label="Youtube"
  >
    <Youtube className="w-4 h-4" />
  </a>



</div>

          </div>

        </div>
      </div>
    </footer>
  );
}