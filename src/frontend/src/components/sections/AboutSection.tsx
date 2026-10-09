import { Section } from "@/components/layout/Section";
import { Building2, CalendarDays, MapPin, Users } from "lucide-react";

const FACTS = [
  { label: "Industry", value: "Software Development", icon: Building2 },
  { label: "Type", value: "Partnership", icon: Users },
  { label: "Headquarters", value: "Madurai, India", icon: MapPin },
  { label: "Founded", value: "2026", icon: CalendarDays },
  { label: "Team", value: "1–10", icon: Users },
] as const;

/**
 * About — company story, mission statement, and a key-facts telemetry panel.
 */
export function AboutSection() {
  return (
    <Section
      id="about"
      band
      eyebrow="About"
      title="A technology-driven startup from Madurai"
      description="Founded in 2026, Lutix DeepTech builds intelligent software for organisations ready to move faster."
    >
      <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
        <div className="space-y-6">
          <p className="text-base leading-relaxed text-muted-foreground md:text-lg">
            Lutix DeepTech is a technology-driven startup headquartered in
            Madurai, India. We bring together senior engineering and applied AI
            to design, build, and scale digital products that hold up in
            production — not just in a demo.
          </p>
          <p className="text-base leading-relaxed text-muted-foreground md:text-lg">
            Our mission is to help businesses, educational institutions, and
            organisations improve productivity, automate processes, and
            accelerate digital transformation. We work as an embedded partner,
            turning ambitious ideas into measurable outcomes.
          </p>

          <div className="surface-card border-l-2 border-l-primary p-6">
            <p className="eyebrow mb-2">Our Mission</p>
            <p className="font-display text-lg font-medium leading-snug text-foreground md:text-xl">
              Help organisations improve productivity, automate processes, and
              accelerate digital transformation.
            </p>
          </div>
        </div>

        <div
          data-ocid="about.facts_panel"
          className="surface-card h-fit p-6 md:p-8"
        >
          <p className="eyebrow mb-6">Company Facts</p>
          <dl className="space-y-5">
            {FACTS.map(({ label, value, icon: Icon }) => (
              <div
                key={label}
                className="flex items-start justify-between gap-4 border-b border-border/60 pb-4 last:border-0 last:pb-0"
              >
                <dt className="flex items-center gap-2.5 text-sm text-muted-foreground">
                  <Icon
                    className="size-4 shrink-0 text-primary"
                    aria-hidden="true"
                  />
                  {label}
                </dt>
                <dd className="text-right font-mono text-sm font-medium text-foreground">
                  {value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </Section>
  );
}
