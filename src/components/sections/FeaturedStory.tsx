import Balancer from "react-wrap-balancer";
import { TextReveal } from "../ui/TextReveal";
import { EditorialImage } from "../ui/EditorialImage";
import { MagneticButton } from "../ui/MagneticButton";

/** Vogue-style featured cover story — full-bleed image, overlaid kicker, deep meta. */
export function FeaturedStory() {
  return (
    <section className="relative bg-background">
      <div className="mx-auto max-w-[1600px] px-6 pt-28 md:px-10 md:pt-36">
        <div className="grid grid-cols-12 items-end gap-6 border-b border-border pb-8 text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
          <span className="col-span-6">The Feature · Spring</span>
          <span className="col-span-3 hidden md:block">By the Editors</span>
          <span className="col-span-3 text-right">Eight minute read</span>
        </div>

        <div className="grid gap-10 pt-12 lg:grid-cols-12 lg:gap-16 lg:pt-16">
          {/* hero plate */}
          <div className="relative lg:col-span-7">
            <EditorialImage tone="ink" className="aspect-[4/5] w-full md:aspect-[5/6]" />
            <span className="absolute left-6 top-6 inline-flex items-center gap-3 bg-background/90 px-4 py-2 text-[10px] uppercase tracking-[0.28em] text-foreground backdrop-blur">
              <span className="h-1.5 w-1.5 bg-primary" /> Cover Story
            </span>
            <span className="absolute bottom-6 right-6 font-serif text-xs italic text-white/80">
              Photographed for Digital Graphics
            </span>
          </div>

          {/* essay */}
          <div className="lg:col-span-5">
            <p className="text-[10px] uppercase tracking-[0.32em] text-primary">A Case Study</p>
            <TextReveal as="h2" className="mt-6 font-serif text-4xl leading-[1.02] text-foreground md:text-6xl">
              <Balancer>
                How a small <em className="italic">Dhanbad café</em> became a national obsession in
                ninety days.
              </Balancer>
            </TextReveal>

            <p className="mt-8 max-w-md text-base leading-relaxed text-muted-foreground md:text-lg">
              <Balancer>
                We rebuilt Mocha's identity, restaged its menu as editorial content, and turned a
                neighbourhood favourite into a destination. The reels did not just travel — they
                relocated audiences.
              </Balancer>
            </p>

            <dl className="mt-12 grid grid-cols-3 gap-6 border-y border-border py-8">
              <div>
                <dt className="text-[10px] uppercase tracking-[0.28em] text-muted-foreground">Reach</dt>
                <dd className="mt-2 font-serif text-3xl italic text-foreground">12.4M</dd>
              </div>
              <div>
                <dt className="text-[10px] uppercase tracking-[0.28em] text-muted-foreground">Footfall</dt>
                <dd className="mt-2 font-serif text-3xl italic text-foreground">+340%</dd>
              </div>
              <div>
                <dt className="text-[10px] uppercase tracking-[0.28em] text-muted-foreground">Days</dt>
                <dd className="mt-2 font-serif text-3xl italic text-foreground">90</dd>
              </div>
            </dl>

            <MagneticButton className="mt-10 inline-flex h-12 items-center gap-3 border-2 border-foreground bg-transparent px-6 text-[10px] font-semibold uppercase tracking-[0.28em] text-foreground hover:bg-foreground hover:text-background">
              Read the Case Study →
            </MagneticButton>
          </div>
        </div>
      </div>
    </section>
  );
}