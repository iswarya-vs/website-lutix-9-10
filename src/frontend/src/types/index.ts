import type { Enquiry, EnquiryInput, SubmitResult } from "@/backend";

export type { Enquiry, EnquiryInput, SubmitResult };

export interface NavItem {
  id: string;
  label: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: "code" | "sparkles" | "workflow" | "graduation" | "shield";
}

export interface ReasonItem {
  index: string;
  title: string;
  description: string;
}

export interface SocialLink {
  label: string;
  href: string;
  icon: "linkedin" | "instagram";
}
