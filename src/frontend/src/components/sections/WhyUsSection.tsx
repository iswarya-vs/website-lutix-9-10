import { Section } from "@/components/layout/Section";
import { REASONS } from "@/lib/site";
import { BrainCircuit, Layers, LineChart, type LucideIcon } from "lucide-react";

const REASON_ICONS: LucideIcon[] = [BrainCircuit, Layers, LineChart];

/**
 * Why Us — numbered value propositions with icons, presented as a telemetry
 * list with a strong numeric anchor.
 */
export function WhyUsSection() {
  return (
    <Section
      id="why-us"
      band
      eyebrow="Why Us"
      title="Why teams choose Lutix"
      description="Senior engineering, AI-native delivery, and measurable impact on every engagement."
    >
      <ol data-ocid="why-us.list" className="grid gap-6 md:grid-cols-3">
        {REASONS.map((reason, index) => {
          const Icon = REASON_ICONS[index] ?? BrainCircuit;
          return (
            <li
              key={reason.index}
              data-ocid={`why-us.item.${index + 1}`}
              className="group surface-card relative flex flex-col p-6 transition-smooth hover:-translate-y-1 hover:border-primary/50 hover:shadow-elevated md:p-8"
            >
              <div className="mb-6 flex items-center justify-between">
                <span className="font-mono text-3xl font-bold tracking-tight text-primary/80 md:text-4xl">
                  {reason.index}
                </span>
                <span className="inline-flex size-11 items-center justify-center rounded-xl border border-accent/25 bg-accent/10 text-accent transition-smooth group-hover:border-accent/50">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
              </div>
              <h3 className="font-display text-lg font-semibold tracking-tight text-foreground md:text-xl">
                {reason.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {reason.description}
              </p>
            </li>
          );
        })}
      </ol>
    </Section>
  );
}
