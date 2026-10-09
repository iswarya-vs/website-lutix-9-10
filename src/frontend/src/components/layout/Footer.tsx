import { NAV_ITEMS, SITE_NAME, SITE_TAGLINE, SOCIAL_LINKS } from "@/lib/site";
import { Instagram, Linkedin } from "lucide-react";

const SOCIAL_ICONS = {
  linkedin: Linkedin,
  instagram: Instagram,
} as const;

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-card/60">
      <div className="container py-14">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            <p className="font-display text-xl font-bold tracking-tight text-foreground">
              LUTIX<span className="text-primary"> DEEPTECH</span>
            </p>
            <p className="mt-3 max-w-xs text-sm text-muted-foreground">
              {SITE_TAGLINE}
            </p>
          </div>

          <nav aria-label="Quick links" data-ocid="footer.quick_links">
            <p className="eyebrow mb-4">Quick Links</p>
            <ul className="space-y-2">
              {NAV_ITEMS.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    data-ocid={`footer.${item.id}_link`}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="eyebrow mb-4">Connect</p>
            <ul className="flex gap-3" data-ocid="footer.social_links">
              {SOCIAL_LINKS.map((social) => {
                const Icon = SOCIAL_ICONS[social.icon];
                return (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={social.label}
                      data-ocid={`footer.${social.icon}_link`}
                      className="inline-flex size-10 items-center justify-center rounded-full border border-border text-muted-foreground transition-smooth hover:border-primary/50 hover:text-primary"
                    >
                      <Icon className="size-4" />
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {SITE_NAME}. All rights reserved.
          </p>
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
            target="_blank"
            rel="noreferrer"
            className="transition-colors hover:text-primary"
          >
            © {year}. Built with love using caffeine.ai
          </a>
        </div>
      </div>
    </footer>
  );
}
