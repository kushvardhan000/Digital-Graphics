import { useEffect, useRef, useState } from "react";

const stats = [
  { value: 120, suffix: "+", label: "Brands Launched" },
  { value: 5, suffix: "M+", label: "Monthly Reach" },
  { value: 8, suffix: "", label: "Awards Won" },
  { value: 98, suffix: "%", label: "Client Retention" },
];

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const [n, setN] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const done = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setN(value);
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting && !done.current) {
          done.current = true;
          const start = performance.now();
          const dur = 1600;
          const step = (t: number) => {
            const p = Math.min(1, (t - start) / dur);
            const eased = 1 - Math.pow(1 - p, 3);
            setN(Math.round(value * eased));
            if (p < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        }
      });
    }, { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, [value]);

  return (
    <span ref={ref} className="font-serif text-6xl italic leading-none text-background md:text-7xl lg:text-8xl">
      {n}{suffix}
    </span>
  );
}

export function Stats() {
  return (
    <section className="bg-primary text-background">
      <div className="mx-auto max-w-[1600px] px-6 py-24 md:px-10 md:py-32">
        <p className="text-[10px] uppercase tracking-[0.32em] text-background/70">
          The Receipts · Updated Spring 2026
        </p>
        <div className="mt-12 grid grid-cols-2 gap-y-12 md:grid-cols-4 md:gap-x-10">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className={`flex flex-col gap-4 ${i > 0 ? "md:border-l md:border-background/20 md:pl-10" : ""}`}
            >
              <Counter value={s.value} suffix={s.suffix} />
              <span className="text-[10px] uppercase tracking-[0.28em] text-background/80">
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}