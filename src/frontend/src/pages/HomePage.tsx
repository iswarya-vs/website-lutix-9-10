import { AboutSection } from "@/components/sections/AboutSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { HomeSection } from "@/components/sections/HomeSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { WhyUsSection } from "@/components/sections/WhyUsSection";

/**
 * Single-page marketing site: hero, about, services, why-us, and contact,
 * composed as anchor-navigable sections.
 */
export default function HomePage() {
  return (
    <>
      <HomeSection />
      <AboutSection />
      <ServicesSection />
      <WhyUsSection />
      <ContactSection />
    </>
  );
}
