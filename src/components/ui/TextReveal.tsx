import { useEffect, useRef, type ElementType, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface Props {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  delay?: number;
}

/**
 * Subtle line reveal. Single fade+rise (no per-character stagger) — intentional,
 * editorial motion rather than awwwards showcase.
 */
export function TextReveal({ as: Tag = "div", children, className, delay = 0 }: Props) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.style.opacity = "1";
      el.style.transform = "none";
      return;
    }

    let observer: IntersectionObserver | null = null;
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.style.transitionDelay = `${delay}ms`;
            el.style.opacity = "1";
            el.style.transform = "translate3d(0,0,0)";
            observer?.disconnect();
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" },
    );
    observer.observe(el);
    return () => observer?.disconnect();
  }, [delay]);

  return (
    <Tag
      ref={ref as never}
      className={cn("opacity-0 will-change-[transform,opacity]", className)}
      style={{
        transform: "translate3d(0, 24px, 0)",
        transition: "opacity 900ms cubic-bezier(0.22,1,0.36,1), transform 900ms cubic-bezier(0.22,1,0.36,1)",
      }}
    >
      {children}
    </Tag>
  );
}