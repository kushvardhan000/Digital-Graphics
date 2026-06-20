import Balancer from "react-wrap-balancer";
import { TextReveal } from "../ui/TextReveal";

interface Props {
  kicker: string;
  quote: string;
  attribution: string;
}

/** Typographic interlude — full-bleed pull quote between chapters. */
export function Interlude({ kicker, quote, attribution }: Props) {
  return (
    <section className="bg-background">
      <div className="mx-auto max-w-[1400px] border-y border-border px-6 py-28 md:px-10 md:py-40">
        <div className="grid grid-cols-12 gap-6 md:gap-10">
          <div className="col-span-12 md:col-span-2">
            <p className="text-[10px] uppercase tracking-[0.32em] text-muted-foreground">
              {kicker}
            </p>
          </div>
          <div className="col-span-12 md:col-span-10">
            <TextReveal as="blockquote" className="font-serif text-3xl leading-[1.1] tracking-tight text-foreground md:text-5xl lg:text-6xl">
              <span className="text-primary">“</span>
              <Balancer>{quote}</Balancer>
              <span className="text-primary">”</span>
            </TextReveal>
            <p className="mt-10 text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
              — {attribution}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}