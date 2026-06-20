import Balancer from "react-wrap-balancer";
import { EditorialImage } from "../ui/EditorialImage"; 
import { TextReveal } from "../ui/TextReveal";

/**
 * "Story" — editor's letter / about. Vogue-style: chapter mark, lead paragraph
 * with oversized drop cap, signature, and a tall asymmetric portrait column.
 */
export function EditorsLetter() {
  return (
    <section id="about" className="bg-background scroll-mt-[70px] md:scroll-mt-[80px]">
      <div className="mx-auto max-w-[1600px] px-6 py-15 md:px-10 md:py-20">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-20">
          {/* portrait column */}
          <div className="relative lg:col-span-5">
            <div className="relative">
              <EditorialImage
                tone="sand"
                className="aspect-[4/5] w-full"
                label="Inside the Studio"
                caption="Plate I"
              />
              <span className="absolute -left-4 -top-6 font-serif text-[7rem] italic leading-none text-foreground/10 md:text-[10rem]">
                01
              </span>
            </div>
            <div className="mt-6 flex items-center justify-between text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
              <span>Plate I · The atelier</span>
              <span>Dhanbad, IN</span>
            </div>
          </div>

          {/* essay column */}
          <div className="lg:col-span-7">
            <div className="flex items-center gap-4 text-[10px] uppercase tracking-[0.32em] text-muted-foreground">
              <span className="h-px w-12 bg-foreground/40" />
              Chapter One · Editor's Letter
            </div>

            <TextReveal as="h2" className="mt-10 font-serif text-4xl leading-[1.05] tracking-tight text-foreground md:text-6xl lg:text-7xl">
              <Balancer>
                Born from <em className="italic text-primary">obsession</em>, built for brands that
                refuse to be <em className="italic">ordinary.</em>
              </Balancer>
            </TextReveal>

            <div className="mt-12 grid gap-10 md:grid-cols-2">
              <TextReveal as="p" delay={100} className="text-base leading-[1.75] text-foreground/85 md:text-lg">
                <span className="float-left mr-3 mt-1 font-serif text-6xl italic leading-[0.8] text-primary md:text-7xl">
                  D
                </span>
                igital Graphics is a full-stack creative media house. We don't do generic. We
                dissect your brand, find the nerve that makes your audience react, and build
                everything around that — from identity to Instagram, from strategy to a
                scroll-stopping reel.
              </TextReveal>
              <TextReveal as="p" delay={200} className="text-base leading-[1.75] text-muted-foreground md:text-lg">
                Our team of designers, strategists and storytellers operates at the intersection of
                art and algorithm. We've scaled brands from zero to viral — quietly, then
                relentlessly — and we're only beginning to write the next volume.
              </TextReveal>
            </div>

            <div className="mt-16 flex flex-col gap-6 border-t border-border pt-10 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="font-serif text-2xl italic text-foreground">— The Editors</p>
                <p className="mt-1 text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                  Volume 01 · Spring 2026
                </p>
              </div>
              <a
                href="#capabilities"
                className="group inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-foreground"
              >
                Continue Reading
                <span className="h-px w-10 bg-foreground transition-all duration-500 group-hover:w-16" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}