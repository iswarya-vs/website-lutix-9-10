import { AboutSection } from "@/components/sections/AboutSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { HomeSection } from "@/components/sections/HomeSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { WhyUsSection } from "@/components/sections/WhyUsSection";

export default function Home() {
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
