import Balancer from "react-wrap-balancer";
import { MagneticButton } from "../ui/MagneticButton";
import { TextReveal } from "../ui/TextReveal";

export function CTA() {
  return (
    <section id="contact" className="relative overflow-hidden border-t border-border bg-background">
      {/* ghost DG */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 select-none text-center font-serif text-[34vw] italic leading-none text-foreground/[0.04]"
      >
        DG
      </span>

      <div className="relative mx-auto max-w-[1600px] px-6 py-40 md:px-10 md:py-56">
        <div className="mx-auto max-w-5xl text-center">
          <p className="text-[10px] uppercase tracking-[0.32em] text-primary">Ready to Begin?</p>

          <TextReveal as="h2" className="mt-10 text-[clamp(2.6rem,8vw,7rem)] font-extrabold uppercase leading-[0.92] tracking-[-0.03em] text-foreground">
            Let's build something
          </TextReveal>
          <TextReveal as="div" delay={120} className="mt-2 text-[clamp(2.6rem,8vw,7rem)] font-serif italic leading-[0.92] tracking-tight text-primary">
            the internet
          </TextReveal>
          <TextReveal as="div" delay={240} className="mt-2 text-[clamp(2.6rem,8vw,7rem)] font-extrabold uppercase leading-[0.92] tracking-[-0.03em] text-foreground">
            won't forget.
          </TextReveal>

          <p className="mx-auto mt-12 max-w-xl font-serif text-lg italic leading-snug text-muted-foreground md:text-xl">
            <Balancer>
              Tell us about your brand, your audience, and the thing you wish people understood. We
              take it from there.
            </Balancer>
          </p>

          <div className="mt-14 flex flex-wrap items-center justify-center gap-4">
            <MagneticButton className="h-14 bg-primary px-10 text-[11px] font-semibold uppercase tracking-[0.3em] text-primary-foreground hover:bg-foreground hover:text-background">
              Start a Project →
            </MagneticButton>
            <MagneticButton className="h-14 border-2 border-foreground bg-transparent px-10 text-[11px] font-semibold uppercase tracking-[0.3em] text-foreground hover:bg-foreground hover:text-background">
              See Our Work
            </MagneticButton>
          </div>

          <p className="mt-12 text-sm text-muted-foreground">
            Or reach us at{" "}
            <a
              href="mailto:hello@digitalgraphics.in"
              className="text-foreground underline decoration-primary decoration-2 underline-offset-4 hover:decoration-foreground"
            >
              hello@digitalgraphics.in
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}