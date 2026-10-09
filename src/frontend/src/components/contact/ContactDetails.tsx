import { SOCIAL_LINKS } from "@/lib/site";
import type { SocialLink } from "@/types";
import {
  Instagram,
  Linkedin,
  type LucideIcon,
  Mail,
  MapPin,
} from "lucide-react";

const SOCIAL_ICONS: Record<SocialLink["icon"], LucideIcon> = {
  linkedin: Linkedin,
  instagram: Instagram,
};

/**
 * Contact details: headquarters location and social channels, presented as a
 * compact telemetry panel beside the enquiry form.
 */
export function ContactDetails() {
  return (
    <div className="flex flex-col gap-6">
      <div className="surface-card p-6 md:p-8">
        <p className="eyebrow mb-6">Headquarters</p>
        <div className="flex items-start gap-3">
          <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-xl border border-primary/25 bg-primary/10 text-primary">
            <MapPin className="size-5" aria-hidden="true" />
          </span>
          <div>
            <p className="font-display text-lg font-semibold tracking-tight text-foreground">
              Madurai, India
            </p>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
              Tamil Nadu, India — building intelligent software for teams
              worldwide.
            </p>
          </div>
        </div>

        <div className="mt-6 flex items-start gap-3 border-t border-border/60 pt-6">
          <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-xl border border-accent/25 bg-accent/10 text-accent">
            <Mail className="size-5" aria-hidden="true" />
          </span>
          <div>
            <p className="font-display text-lg font-semibold tracking-tight text-foreground">
              Start a conversation
            </p>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
              Share your project through the form and our team will be notified
              by email.
            </p>
          </div>
        </div>
      </div>

      <div className="surface-card p-6 md:p-8">
        <p className="eyebrow mb-5">Follow Us</p>
        <ul className="flex flex-wrap gap-3" data-ocid="contact.social_links">
          {SOCIAL_LINKS.map((social) => {
            const Icon = SOCIAL_ICONS[social.icon];
            return (
              <li key={social.label}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  data-ocid={`contact.${social.icon}_link`}
                  className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm text-muted-foreground transition-smooth hover:border-primary/50 hover:text-primary"
                >
                  <Icon className="size-4" aria-hidden="true" />
                  {social.label}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
