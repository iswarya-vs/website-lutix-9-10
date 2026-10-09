import type { backendInterface } from "@/backend";
import { EnquiryForm } from "@/components/contact/EnquiryForm";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { renderWithActor } from "./test-utils";

type SubmitEnquiry = backendInterface["submitEnquiry"];

function makeActor(submitEnquiry: SubmitEnquiry) {
  return { submitEnquiry } satisfies Pick<backendInterface, "submitEnquiry">;
}

async function fillValidForm(user: ReturnType<typeof userEvent.setup>) {
  await user.type(screen.getByTestId("contact.name_input"), "Ada Lovelace");
  await user.type(screen.getByTestId("contact.email_input"), "ada@example.com");
  await user.type(
    screen.getByTestId("contact.message_textarea"),
    "We need an AI platform.",
  );
}

describe("enquiry form", () => {
  it("rejects empty name, invalid email, and empty message with inline errors", async () => {
    const user = userEvent.setup();
    const submitEnquiry = vi.fn<SubmitEnquiry>();
    renderWithActor(<EnquiryForm />, makeActor(submitEnquiry));

    await user.click(screen.getByTestId("contact.submit_button"));

    expect(screen.getByTestId("contact.name_error")).toHaveTextContent(
      /enter your name/i,
    );
    expect(screen.getByTestId("contact.email_error")).toHaveTextContent(
      /enter your email/i,
    );
    expect(screen.getByTestId("contact.message_error")).toHaveTextContent(
      /how we can help/i,
    );
    expect(submitEnquiry).not.toHaveBeenCalled();
  });

  it("rejects a malformed email address", async () => {
    const user = userEvent.setup();
    const submitEnquiry = vi.fn<SubmitEnquiry>();
    renderWithActor(<EnquiryForm />, makeActor(submitEnquiry));

    await user.type(screen.getByTestId("contact.name_input"), "Ada");
    await user.type(screen.getByTestId("contact.email_input"), "not-an-email");
    await user.type(screen.getByTestId("contact.message_textarea"), "Hello");
    await user.click(screen.getByTestId("contact.submit_button"));

    expect(screen.getByTestId("contact.email_error")).toHaveTextContent(
      /valid email/i,
    );
    expect(submitEnquiry).not.toHaveBeenCalled();
  });

  it("submits a valid enquiry and shows the success confirmation", async () => {
    const user = userEvent.setup();
    const submitEnquiry = vi
      .fn<SubmitEnquiry>()
      .mockResolvedValue({ __kind__: "ok", ok: 1n });
    renderWithActor(<EnquiryForm />, makeActor(submitEnquiry));

    await fillValidForm(user);
    await user.type(screen.getByTestId("contact.company_input"), "Lutix");
    await user.click(screen.getByTestId("contact.submit_button"));

    await waitFor(() => {
      expect(submitEnquiry).toHaveBeenCalledTimes(1);
    });
    expect(submitEnquiry).toHaveBeenCalledWith({
      name: "Ada Lovelace",
      email: "ada@example.com",
      company: "Lutix",
      message: "We need an AI platform.",
    });

    expect(
      await screen.findByTestId("contact.success_state"),
    ).toBeInTheDocument();
    expect(screen.queryByTestId("contact.form")).not.toBeInTheDocument();
  });

  it("omits the optional company field when left blank", async () => {
    const user = userEvent.setup();
    const submitEnquiry = vi
      .fn<SubmitEnquiry>()
      .mockResolvedValue({ __kind__: "ok", ok: 2n });
    renderWithActor(<EnquiryForm />, makeActor(submitEnquiry));

    await fillValidForm(user);
    await user.click(screen.getByTestId("contact.submit_button"));

    await waitFor(() => {
      expect(submitEnquiry).toHaveBeenCalledTimes(1);
    });
    expect(submitEnquiry).toHaveBeenCalledWith({
      name: "Ada Lovelace",
      email: "ada@example.com",
      message: "We need an AI platform.",
    });
  });

  it("shows the backend error message when the submission is rejected", async () => {
    const user = userEvent.setup();
    const submitEnquiry = vi.fn<SubmitEnquiry>().mockResolvedValue({
      __kind__: "err",
      err: "Email service unavailable.",
    });
    renderWithActor(<EnquiryForm />, makeActor(submitEnquiry));

    await fillValidForm(user);
    await user.click(screen.getByTestId("contact.submit_button"));

    const error = await screen.findByTestId("contact.error_state");
    expect(error).toHaveTextContent("Email service unavailable.");
    expect(
      screen.queryByTestId("contact.success_state"),
    ).not.toBeInTheDocument();
  });

  it("shows a generic error when the actor call throws", async () => {
    const user = userEvent.setup();
    const submitEnquiry = vi
      .fn<SubmitEnquiry>()
      .mockRejectedValue(new Error("network down"));
    renderWithActor(<EnquiryForm />, makeActor(submitEnquiry));

    await fillValidForm(user);
    await user.click(screen.getByTestId("contact.submit_button"));

    const error = await screen.findByTestId("contact.error_state");
    expect(error).toHaveTextContent(/something went wrong/i);
  });
});
