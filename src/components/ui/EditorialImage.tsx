import { cn } from "@/lib/utils";

interface Props {
  className?: string;
  /** Editorial gradient placeholder. Pick a tone that matches the section. */
  tone?: "warm" | "cool" | "smoke" | "ink" | "blush" | "sand";
  label?: string;
  caption?: string;
  number?: string;
}

const tones: Record<NonNullable<Props["tone"]>, string> = {
  warm: "bg-[linear-gradient(135deg,oklch(78%_0.06_60),oklch(54%_0.08_40))]",
  cool: "bg-[linear-gradient(135deg,oklch(72%_0.07_240),oklch(38%_0.09_260))]",
  smoke: "bg-[linear-gradient(135deg,oklch(74%_0.01_240),oklch(36%_0.01_240))]",
  ink: "bg-[linear-gradient(135deg,oklch(28%_0.01_240),oklch(14%_0_0))]",
  blush: "bg-[linear-gradient(135deg,oklch(86%_0.05_30),oklch(58%_0.12_25))]",
  sand: "bg-[linear-gradient(135deg,oklch(90%_0.03_85),oklch(62%_0.07_70))]",
};

export function EditorialImage({ className, tone = "smoke", label, caption, number }: Props) {
  return (
    <figure className={cn("group relative overflow-hidden", className)}>
      <div className={cn("h-full w-full", tones[tone])}>
        <div
          className="h-full w-full opacity-[0.12] mix-blend-overlay"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\")",
          }}
        />
      </div>
      {number ? (
        <span className="absolute left-4 top-4 font-serif text-xs italic text-white/80">{number}</span>
      ) : null}
      {(label || caption) && (
        <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 bg-gradient-to-t from-black/65 to-transparent p-5 text-white">
          {label ? (
            <span className="text-[10px] font-semibold uppercase tracking-[0.25em]">{label}</span>
          ) : <span />}
          {caption ? (
            <span className="font-serif text-sm italic text-white/85">{caption}</span>
          ) : null}
        </figcaption>
      )}
    </figure>
  );
}