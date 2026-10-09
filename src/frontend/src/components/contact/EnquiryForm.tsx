import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useSubmitEnquiry } from "@/hooks/useQueries";
import type { EnquiryInput } from "@/types";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import { useState } from "react";

interface FormValues {
  name: string;
  email: string;
  company: string;
  message: string;
}

type FieldErrors = Partial<Record<keyof FormValues, string>>;

const EMPTY: FormValues = { name: "", email: "", company: "", message: "" };

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(values: FormValues): FieldErrors {
  const errors: FieldErrors = {};
  if (!values.name.trim()) errors.name = "Please enter your name.";
  if (!values.email.trim()) {
    errors.email = "Please enter your email address.";
  } else if (!EMAIL_PATTERN.test(values.email.trim())) {
    errors.email = "Enter a valid email address.";
  }
  if (!values.message.trim()) {
    errors.message = "Please tell us how we can help.";
  }
  return errors;
}

/**
 * Enquiry form: captures name, email, optional company, and message with inline
 * validation, stores the enquiry in the backend, and shows a success state.
 */
export function EnquiryForm() {
  const [values, setValues] = useState<FormValues>(EMPTY);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const submitEnquiry = useSubmitEnquiry();

  function update<K extends keyof FormValues>(key: K, value: string) {
    setValues((current) => ({ ...current, [key]: value }));
    setErrors((current) => {
      if (!current[key]) return current;
      const next = { ...current };
      delete next[key];
      return next;
    });
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    const input: EnquiryInput = {
      name: values.name.trim(),
      email: values.email.trim(),
      message: values.message.trim(),
      ...(values.company.trim() ? { company: values.company.trim() } : {}),
    };

    setSubmitted(false);
    submitEnquiry.mutate(input, {
      onSuccess: (result) => {
        if (result.__kind__ === "ok") {
          setValues(EMPTY);
          setSubmitted(true);
        }
      },
    });
  }

  const backendError =
    submitEnquiry.isError ||
    (submitEnquiry.data && submitEnquiry.data.__kind__ === "err")
      ? submitEnquiry.data && submitEnquiry.data.__kind__ === "err"
        ? submitEnquiry.data.err
        : "Something went wrong while sending your enquiry. Please try again."
      : null;

  if (submitted) {
    return (
      <output
        data-ocid="contact.success_state"
        className="surface-card flex flex-col items-start gap-4 p-8"
      >
        <span className="inline-flex size-12 items-center justify-center rounded-full border border-success/30 bg-success/10 text-success">
          <CheckCircle2 className="size-6" aria-hidden="true" />
        </span>
        <div>
          <h3 className="font-display text-xl font-semibold tracking-tight text-foreground">
            Thank you — your enquiry is on its way.
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            We have received your message and our team has been notified. We
            will get back to you shortly.
          </p>
        </div>
        <Button
          type="button"
          variant="outline"
          data-ocid="contact.send_another_button"
          className="rounded-full"
          onClick={() => setSubmitted(false)}
        >
          Send another enquiry
        </Button>
      </output>
    );
  }

  return (
    <form
      noValidate
      onSubmit={handleSubmit}
      data-ocid="contact.form"
      className="surface-card p-6 md:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <Label htmlFor="enquiry-name">
            Name <span className="text-primary">*</span>
          </Label>
          <Input
            id="enquiry-name"
            name="name"
            autoComplete="name"
            placeholder="Ada Lovelace"
            value={values.name}
            onChange={(event) => update("name", event.target.value)}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "enquiry-name-error" : undefined}
            data-ocid="contact.name_input"
          />
          {errors.name && (
            <p
              id="enquiry-name-error"
              data-ocid="contact.name_error"
              className="text-xs text-destructive"
            >
              {errors.name}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="enquiry-email">
            Email <span className="text-primary">*</span>
          </Label>
          <Input
            id="enquiry-email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@company.com"
            value={values.email}
            onChange={(event) => update("email", event.target.value)}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "enquiry-email-error" : undefined}
            data-ocid="contact.email_input"
          />
          {errors.email && (
            <p
              id="enquiry-email-error"
              data-ocid="contact.email_error"
              className="text-xs text-destructive"
            >
              {errors.email}
            </p>
          )}
        </div>
      </div>

      <div className="mt-5 flex flex-col gap-2">
        <Label htmlFor="enquiry-company">
          Company <span className="text-muted-foreground">(optional)</span>
        </Label>
        <Input
          id="enquiry-company"
          name="company"
          autoComplete="organization"
          placeholder="Lutix DeepTech"
          value={values.company}
          onChange={(event) => update("company", event.target.value)}
          data-ocid="contact.company_input"
        />
      </div>

      <div className="mt-5 flex flex-col gap-2">
        <Label htmlFor="enquiry-message">
          Message <span className="text-primary">*</span>
        </Label>
        <Textarea
          id="enquiry-message"
          name="message"
          rows={5}
          placeholder="Tell us about your product, goals, and timeline."
          value={values.message}
          onChange={(event) => update("message", event.target.value)}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={
            errors.message ? "enquiry-message-error" : undefined
          }
          data-ocid="contact.message_textarea"
        />
        {errors.message && (
          <p
            id="enquiry-message-error"
            data-ocid="contact.message_error"
            className="text-xs text-destructive"
          >
            {errors.message}
          </p>
        )}
      </div>

      {backendError && (
        <p
          role="alert"
          data-ocid="contact.error_state"
          className="mt-5 rounded-lg border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive"
        >
          {backendError}
        </p>
      )}

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-muted-foreground">
          We typically respond within one business day.
        </p>
        <Button
          type="submit"
          size="lg"
          disabled={submitEnquiry.isPending}
          data-ocid="contact.submit_button"
          className="rounded-full"
        >
          {submitEnquiry.isPending ? (
            <>
              <Loader2 className="size-4 animate-spin" aria-hidden="true" />
              Sending…
            </>
          ) : (
            <>
              <Send className="size-4" aria-hidden="true" />
              Send enquiry
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
