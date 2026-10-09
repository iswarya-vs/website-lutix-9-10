import { ContactSection } from "@/components/sections/ContactSection";

/**
 * Standalone contact route. The single-page site renders the same contact
 * section inline; this page keeps the route reachable on its own.
 */
export default function ContactPage() {
  return (
    <div className="pt-16">
      <ContactSection />
    </div>
  );
}
