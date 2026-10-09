import type { NavItem, ReasonItem, ServiceItem, SocialLink } from "@/types";

export const SITE_NAME = "Lutix DeepTech";
export const SITE_TAGLINE =
  "Intelligent, scalable, user-centric digital products.";

export const NAV_ITEMS: NavItem[] = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "services", label: "Services" },
  { id: "why-us", label: "Why Us" },
  { id: "contact", label: "Contact" },
];

export const SERVICES: ServiceItem[] = [
  {
    id: "software-development",
    title: "Software Development",
    description:
      "End-to-end product engineering — architecture, build, and launch for web and mobile platforms.",
    icon: "code",
  },
  {
    id: "ai-powered-solutions",
    title: "AI-Powered Solutions",
    description:
      "Applied machine learning and generative models embedded directly into your product workflows.",
    icon: "sparkles",
  },
  {
    id: "digital-transformation",
    title: "Digital Transformation",
    description:
      "Modernising legacy systems into resilient, cloud-native, data-driven operations.",
    icon: "workflow",
  },
  {
    id: "future-learning",
    title: "Future Learning",
    description:
      "Adaptive learning platforms that personalise content and measure real comprehension.",
    icon: "graduation",
  },
  {
    id: "secure-infrastructure",
    title: "Secure Infrastructure",
    description:
      "Hardened, observable infrastructure with identity, encryption, and compliance built in.",
    icon: "shield",
  },
];

export const REASONS: ReasonItem[] = [
  {
    index: "01",
    title: "Senior Engineering",
    description:
      "A compact team of senior engineers who own outcomes, not tickets — from first sketch to production.",
  },
  {
    index: "02",
    title: "AI-Native Delivery",
    description:
      "We design with models in the loop, so intelligence is a first-class part of the product, not a bolt-on.",
  },
  {
    index: "03",
    title: "Measurable Impact",
    description:
      "Every engagement ships against clear metrics — adoption, latency, and revenue you can actually see.",
  },
];

export const SOCIAL_LINKS: SocialLink[] = [
  { label: "LinkedIn", href: "https://www.linkedin.com", icon: "linkedin" },
  { label: "Instagram", href: "https://www.instagram.com", icon: "instagram" },
];

export const SECTION_IDS = NAV_ITEMS.map((item) => item.id);
