import { Button } from "@/components/ui/button";
import { SITE_NAME } from "@/lib/site";
import { ArrowRight, Cpu, Sparkles, Workflow } from "lucide-react";

const TRUST_STRIP = [
  { label: "Software Development", icon: Cpu },
  { label: "AI-Powered Solutions", icon: Sparkles },
  { label: "Digital Transformation", icon: Workflow },
] as const;

/**
 * Home / Hero — split editorial hero with a calibrated-grid backdrop, the
 * wireframe signal globe, dual calls to action, and a compact trust strip.
 */
export function HomeSection() {
  return (
    <section
      id="home"
      data-ocid="home.section"
      className="relative isolate overflow-hidden scroll-mt-24"
    >
      {/* Decorative calibrated-grid + signal glow backdrop */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-grid bg-radial-glow"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 top-24 -z-10 size-72 rounded-full bg-primary/10 blur-3xl animate-pulse-glow"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 bottom-0 -z-10 size-80 rounded-full bg-accent/10 blur-3xl animate-float"
      />

      <div className="container grid items-center gap-12 py-20 md:grid-cols-[1.05fr_0.95fr] md:gap-16 md:py-28 lg:py-32">
        <div className="animate-fade-up">
          <p className="eyebrow mb-5">Deep-Tech Studio · Madurai, India</p>
          <h1 className="font-display text-4xl font-bold leading-[1.05] tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
            Intelligent, scalable,{" "}
            <span className="text-gradient">user-centric</span> digital products
          </h1>
          <p className="mt-6 max-w-xl text-base text-muted-foreground md:text-lg">
            {SITE_NAME} is a technology-driven startup engineering AI-powered
            software, automation, and digital transformation for businesses and
            institutions.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button
              asChild
              className="group h-12 rounded-full bg-primary px-7 text-base font-medium text-primary-foreground shadow-glow-primary transition-smooth hover:-translate-y-0.5 hover:bg-primary/90"
            >
              <a href="#contact" data-ocid="home.primary_button">
                Get in Touch
                <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-0.5" />
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              className="h-12 rounded-full border-border bg-transparent px-7 text-base font-medium text-foreground transition-smooth hover:-translate-y-0.5 hover:border-primary/50 hover:bg-primary/5 hover:text-primary"
            >
              <a href="#services" data-ocid="home.secondary_button">
                Explore Services
              </a>
            </Button>
          </div>
        </div>

        <div className="relative animate-fade-in">
          <div className="relative mx-auto aspect-square w-full max-w-md lg:max-w-lg">
            <div
              aria-hidden="true"
              className="absolute inset-6 rounded-full bg-primary/15 blur-3xl"
            />
            <img
              src="/assets/generated/hero-signal-globe.dim_1024x1024.png"
              alt="A glowing cyan wireframe globe surrounded by orbital rings and amber nodes on a dark technical grid background."
              width={1024}
              height={1024}
              loading="eager"
              className="relative size-full rounded-3xl border border-border/60 object-cover shadow-elevated"
            />
          </div>
        </div>
      </div>

      {/* Compact trust strip */}
      <div className="border-y border-border bg-card/40">
        <div className="container">
          <ul
            data-ocid="home.trust_strip"
            className="grid divide-y divide-border sm:grid-cols-3 sm:divide-x sm:divide-y-0"
          >
            {TRUST_STRIP.map(({ label, icon: Icon }) => (
              <li
                key={label}
                className="flex items-center justify-center gap-3 px-4 py-5"
              >
                <Icon
                  className="size-4 shrink-0 text-primary"
                  aria-hidden="true"
                />
                <span className="font-mono text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
                  {label}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
