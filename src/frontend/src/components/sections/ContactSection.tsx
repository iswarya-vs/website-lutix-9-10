import { ContactDetails } from "@/components/contact/ContactDetails";
import { EnquiryForm } from "@/components/contact/EnquiryForm";
import { Section } from "@/components/layout/Section";

/**
 * Contact — company location and social links beside the enquiry form that
 * stores submissions and notifies the team.
 */
export function ContactSection() {
  return (
    <Section
      id="contact"
      eyebrow="Contact"
      title="Let's build something intelligent"
      description="Tell us about your product and we will get back to you."
    >
      <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-12">
        <ContactDetails />
        <EnquiryForm />
      </div>
    </Section>
  );
}
