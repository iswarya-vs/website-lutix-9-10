import type { backendInterface } from "@/backend";
import { Layout } from "@/components/layout/Layout";
import HomePage from "@/pages/HomePage";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { renderWithActor } from "./test-utils";

type SubmitEnquiry = backendInterface["submitEnquiry"];

function makeActor(
  submitEnquiry: SubmitEnquiry = vi.fn<SubmitEnquiry>(),
): Pick<backendInterface, "submitEnquiry"> {
  return { submitEnquiry };
}

describe("single-page marketing site", () => {
  it("renders all five sections with their content", () => {
    renderWithActor(<HomePage />, makeActor());

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: /intelligent, scalable, user-centric digital products/i,
      }),
    ).toBeInTheDocument();

    for (const id of ["home", "about", "services", "why-us", "contact"]) {
      expect(document.getElementById(id)).not.toBeNull();
    }

    expect(
      screen.getByRole("heading", {
        name: /a technology-driven startup from madurai/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /what we build/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /why teams choose lutix/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: /let's build something intelligent/i,
      }),
    ).toBeInTheDocument();
  });

  it("exposes the hero calls to action and trust strip", () => {
    renderWithActor(<HomePage />, makeActor());

    expect(screen.getByTestId("home.primary_button")).toHaveAttribute(
      "href",
      "#contact",
    );
    expect(screen.getByTestId("home.secondary_button")).toHaveAttribute(
      "href",
      "#services",
    );

    const trust = screen.getByTestId("home.trust_strip");
    expect(
      within(trust).getByText(/software development/i),
    ).toBeInTheDocument();
    expect(
      within(trust).getByText(/ai-powered solutions/i),
    ).toBeInTheDocument();
    expect(
      within(trust).getByText(/digital transformation/i),
    ).toBeInTheDocument();
  });

  it("renders the About key facts panel", () => {
    renderWithActor(<HomePage />, makeActor());

    const facts = screen.getByTestId("about.facts_panel");
    expect(within(facts).getByText("Software Development")).toBeInTheDocument();
    expect(within(facts).getByText("Partnership")).toBeInTheDocument();
    expect(within(facts).getByText("Madurai, India")).toBeInTheDocument();
    expect(within(facts).getByText("2026")).toBeInTheDocument();
    expect(within(facts).getByText("1–10")).toBeInTheDocument();
  });

  it("renders the five service cards", () => {
    renderWithActor(<HomePage />, makeActor());

    const list = screen.getByTestId("services.list");
    expect(within(list).getAllByRole("listitem")).toHaveLength(5);
    expect(
      within(list).getByRole("heading", { name: "Software Development" }),
    ).toBeInTheDocument();
    expect(
      within(list).getByRole("heading", { name: "AI-Powered Solutions" }),
    ).toBeInTheDocument();
    expect(
      within(list).getByRole("heading", { name: "Digital Transformation" }),
    ).toBeInTheDocument();
  });

  it("renders the Why Us value propositions", () => {
    renderWithActor(<HomePage />, makeActor());

    const list = screen.getByTestId("why-us.list");
    expect(within(list).getAllByRole("listitem")).toHaveLength(3);
    expect(within(list).getByText("01")).toBeInTheDocument();
    expect(within(list).getByText("02")).toBeInTheDocument();
    expect(within(list).getByText("03")).toBeInTheDocument();
  });

  it("renders the header nav links and footer quick links", () => {
    renderWithActor(
      <Layout>
        <HomePage />
      </Layout>,
      makeActor(),
    );

    const primary = screen.getByTestId("nav.primary");
    for (const [id, label] of [
      ["home", "Home"],
      ["about", "About"],
      ["services", "Services"],
      ["why-us", "Why Us"],
      ["contact", "Contact"],
    ] as const) {
      const link = within(primary).getByRole("link", { name: label });
      expect(link).toHaveAttribute("href", `#${id}`);
    }

    const quick = screen.getByTestId("footer.quick_links");
    expect(within(quick).getAllByRole("link")).toHaveLength(5);
    expect(screen.getByTestId("footer.linkedin_link")).toBeInTheDocument();
    expect(screen.getByTestId("footer.instagram_link")).toBeInTheDocument();
  });

  it("renders the contact details and social links", () => {
    renderWithActor(<HomePage />, makeActor());

    const contact = document.getElementById("contact");
    expect(contact).not.toBeNull();
    expect(
      within(contact as HTMLElement).getByText("Madurai, India"),
    ).toBeInTheDocument();

    const social = screen.getByTestId("contact.social_links");
    expect(
      within(social).getByRole("link", { name: /linkedin/i }),
    ).toHaveAttribute("href", "https://www.linkedin.com");
    expect(
      within(social).getByRole("link", { name: /instagram/i }),
    ).toHaveAttribute("href", "https://www.instagram.com");
  });

  it("displays a technology-themed hero image", () => {
    renderWithActor(<HomePage />, makeActor());

    const image = screen.getByRole("img", {
      name: /wireframe globe/i,
    });
    expect(image).toHaveAttribute(
      "src",
      "/assets/generated/hero-signal-globe.dim_1024x1024.png",
    );
  });

  it("opens and closes the mobile navigation drawer", async () => {
    const user = userEvent.setup();
    renderWithActor(
      <Layout>
        <HomePage />
      </Layout>,
      makeActor(),
    );

    expect(screen.queryByTestId("nav.mobile")).not.toBeInTheDocument();

    await user.click(screen.getByTestId("nav.open_modal_button"));

    const mobile = await screen.findByTestId("nav.mobile");
    expect(
      within(mobile).getByRole("link", { name: "Services" }),
    ).toHaveAttribute("href", "#services");

    await user.keyboard("{Escape}");
    expect(screen.queryByTestId("nav.mobile")).not.toBeInTheDocument();
  });
});
