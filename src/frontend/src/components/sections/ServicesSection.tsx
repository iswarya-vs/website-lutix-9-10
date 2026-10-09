import { Section } from "@/components/layout/Section";
import { SERVICES } from "@/lib/site";
import type { ServiceItem } from "@/types";
import {
  Code2,
  GraduationCap,
  type LucideIcon,
  ShieldCheck,
  Sparkles,
  Workflow,
} from "lucide-react";

const SERVICE_ICONS: Record<ServiceItem["icon"], LucideIcon> = {
  code: Code2,
  sparkles: Sparkles,
  workflow: Workflow,
  graduation: GraduationCap,
  shield: ShieldCheck,
};

/**
 * Services — responsive card grid, each card with an icon, description, and
 * hover elevation.
 */
export function ServicesSection() {
  return (
    <Section
      id="services"
      eyebrow="Services"
      title="What we build"
      description="A focused set of capabilities spanning product engineering, applied AI, and modernisation."
    >
      <ul
        data-ocid="services.list"
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {SERVICES.map((service, index) => {
          const Icon = SERVICE_ICONS[service.icon];
          return (
            <li
              key={service.id}
              data-ocid={`services.item.${index + 1}`}
              className="group surface-card flex flex-col p-6 transition-smooth hover:-translate-y-1 hover:border-primary/50 hover:shadow-elevated md:p-7"
            >
              <span className="mb-5 inline-flex size-12 items-center justify-center rounded-xl border border-primary/25 bg-primary/10 text-primary transition-smooth group-hover:border-primary/50 group-hover:bg-primary/15">
                <Icon className="size-6" aria-hidden="true" />
              </span>
              <h3 className="font-display text-lg font-semibold tracking-tight text-foreground md:text-xl">
                {service.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {service.description}
              </p>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
