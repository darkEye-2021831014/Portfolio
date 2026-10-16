"use client";

import { useState } from "react";
import {
  AlertCircle,
  CheckCircle2,
  Loader2,
  Mail,
  MapPin,
  Send,
} from "lucide-react";
import { Button, Card, SectionLabel } from "@/components/ui";
import { CONTACT } from "@/content";
import { cn } from "@/lib/cn";

/**
 * Contact section — interactive form.
 *
 *   • Submits to POST /api/contact (see app/api/contact/route.ts).
 *   • Inline per-field validation: errors from zod are mapped back to
 *     each field by the API and shown under the input.
 *   • States: idle → submitting → success | error.
 *   • Hidden honeypot field (`honey`) — bots auto-fill it, we silently
 *     drop the submission. The field is `aria-hidden` and `tabIndex={-1}`
 *     so screen-readers and keyboard users never interact with it.
 */
export function ContactSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  // Honey is hidden; we just need a state slot so React doesn't complain
  // about an uncontrolled input. We never read or send it ourselves.
  const [, setHoney] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState<{
    stored: boolean;
    emailed: boolean;
    supabaseConfigured: boolean;
  } | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (submitting) return;

    setSubmitting(true);
    setFieldErrors({});
    setFormError(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          subject: subject || undefined,
          message,
          honey: (document.getElementById("honey") as HTMLInputElement | null)
            ?.value ?? "",
        }),
      });
      const data = await res.json().catch(() => ({}));

      if (res.status === 429) {
        setFormError(
          data?.error ??
            "You're sending messages too quickly. Please wait a few minutes.",
        );
        return;
      }
      if (!res.ok || data.success === false) {
        if (data?.fieldErrors) setFieldErrors(data.fieldErrors);
        setFormError(
          data?.error ??
            "Something went wrong. Please try again or email me directly.",
        );
        return;
      }

      setSubmitted({
        stored: Boolean(data.stored),
        emailed: Boolean(data.emailed),
        supabaseConfigured: Boolean(data.supabaseConfigured),
      });
      // Reset the form so a follow-up message is fast to compose.
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
      setHoney("");
    } catch (err) {
      setFormError(
        "Network error. Please check your connection and try again.",
      );
      // eslint-disable-next-line no-console
      console.error("[contact] submission failed:", err);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="flex flex-col gap-space-xl pt-4 pb-12"
    >
      <div className="grid grid-cols-1 items-start gap-space-xl lg:grid-cols-12">
        {/* Left: contact details */}
        <div className="flex flex-col gap-space-md lg:col-span-5">
          <SectionLabel>
            <Mail size={16} className="mr-1" />
            {CONTACT.eyebrow}
          </SectionLabel>
          <h2
            id="contact-heading"
            className="font-headline-xl text-headline-xl tracking-tight text-on-surface"
          >
            {CONTACT.heading}
          </h2>
          <p className="font-body-lg text-body-lg leading-relaxed text-on-surface-variant">
            {CONTACT.description}
          </p>

          <div className="flex flex-col gap-space-sm pt-2">
            <a
              href={`mailto:${CONTACT.email}`}
              className="group flex items-center gap-space-md rounded-xl bg-surface-container-low p-4 shadow-sm transition-all hover:bg-surface-container"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-surface-container-high text-primary transition-transform group-hover:scale-105">
                <Mail size={20} />
              </span>
              <div className="flex flex-col">
                <span className="font-label-caps text-label-caps uppercase tracking-[0.08em] text-on-surface-variant">
                  Direct Email
                </span>
                <span className="font-code-badge text-code-badge text-on-surface transition-colors group-hover:text-primary">
                  {CONTACT.email}
                </span>
              </div>
            </a>

            <div className="flex items-center gap-space-md rounded-xl bg-surface-container-low p-4 shadow-sm">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-surface-container-high text-secondary">
                <MapPin size={20} />
              </span>
              <div className="flex flex-col">
                <span className="font-label-caps text-label-caps uppercase tracking-[0.08em] text-on-surface-variant">
                  Location
                </span>
                <span className="font-body-sm text-body-sm text-on-surface">
                  {CONTACT.location} ({CONTACT.timezone})
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: contact form / success state */}
        <Card className="flex flex-col gap-space-md lg:col-span-7">
          {submitted ? (
            <SuccessPanel
              result={submitted}
              onReset={() => setSubmitted(null)}
            />
          ) : (
            <form
              className="flex flex-col gap-space-md"
              onSubmit={onSubmit}
              noValidate
              aria-label="Contact form"
            >
              {/* Honeypot — hidden from humans and assistive tech. Bots
                  that auto-fill every input trip the field. */}
              <div
                aria-hidden
                className="absolute h-0 w-0 overflow-hidden"
                style={{ left: "-9999px" }}
              >
                <label htmlFor="honey">
                  Leave this field empty
                  <input
                    id="honey"
                    name="honey"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    onChange={(e) => setHoney(e.target.value)}
                  />
                </label>
              </div>

              <div className="grid grid-cols-1 gap-space-md sm:grid-cols-2">
                <Field
                  id="name"
                  label={CONTACT.form.nameLabel}
                  placeholder={CONTACT.form.namePlaceholder}
                  type="text"
                  required
                  value={name}
                  onChange={setName}
                  error={fieldErrors.name}
                  disabled={submitting}
                  autoComplete="name"
                />
                <Field
                  id="email"
                  label={CONTACT.form.emailLabel}
                  placeholder={CONTACT.form.emailPlaceholder}
                  type="email"
                  required
                  value={email}
                  onChange={setEmail}
                  error={fieldErrors.email}
                  disabled={submitting}
                  autoComplete="email"
                />
              </div>
              <Field
                id="subject"
                label={CONTACT.form.subjectLabel}
                placeholder={CONTACT.form.subjectPlaceholder}
                type="text"
                value={subject}
                onChange={setSubject}
                error={fieldErrors.subject}
                disabled={submitting}
                autoComplete="off"
              />
              <Textarea
                id="message"
                label={CONTACT.form.messageLabel}
                placeholder={CONTACT.form.messagePlaceholder}
                required
                rows={5}
                value={message}
                onChange={setMessage}
                error={fieldErrors.message}
                disabled={submitting}
              />

              {formError ? (
                <div
                  role="alert"
                  className="flex items-start gap-2 rounded-lg border border-error/40 bg-error/10 px-4 py-3 font-body-sm text-body-sm text-error"
                >
                  <AlertCircle size={16} className="mt-0.5 shrink-0" aria-hidden />
                  <span>{formError}</span>
                </div>
              ) : null}

              <Button
                type="submit"
                size="lg"
                disabled={submitting}
                className="self-start shadow-[0_0_20px_var(--glow-teal)] disabled:opacity-70"
              >
                {submitting ? (
                  <>
                    <Loader2 size={18} className="animate-spin" aria-hidden />
                    <span>Sending…</span>
                  </>
                ) : (
                  <>
                    <Send size={18} aria-hidden />
                    <span>{CONTACT.form.submit}</span>
                  </>
                )}
              </Button>
            </form>
          )}
        </Card>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Form sub-components                                                 */
/* ------------------------------------------------------------------ */

type FieldProps = {
  id: string;
  label: string;
  placeholder: string;
  type: "text" | "email";
  required?: boolean;
  value: string;
  onChange: (next: string) => void;
  error?: string;
  disabled?: boolean;
  autoComplete?: string;
};

function Field({
  id,
  label,
  placeholder,
  type,
  required,
  value,
  onChange,
  error,
  disabled,
  autoComplete,
}: FieldProps) {
  return (
    <label htmlFor={id} className="flex flex-col gap-2">
      <span className="font-label-caps text-label-caps uppercase tracking-[0.08em] text-on-surface-variant">
        {label}
        {required ? <span className="text-error"> *</span> : null}
      </span>
      <input
        id={id}
        name={id}
        type={type}
        required={required}
        placeholder={placeholder}
        value={value}
        disabled={disabled}
        autoComplete={autoComplete}
        aria-invalid={error ? "true" : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        onChange={(e) => onChange(e.target.value)}
        className={cn(
          "w-full rounded-lg bg-surface-container-lowest px-4 py-3 font-body-sm text-body-sm text-on-surface placeholder:text-outline transition-all focus:outline-none focus:ring-1",
          "disabled:cursor-not-allowed disabled:opacity-60",
          error
            ? "ring-1 ring-error focus:ring-error"
            : "focus:ring-primary",
        )}
      />
      {error ? (
        <span
          id={`${id}-error`}
          role="alert"
          className="flex items-center gap-1.5 font-body-sm text-body-sm text-error"
        >
          <AlertCircle size={12} aria-hidden />
          {error}
        </span>
      ) : null}
    </label>
  );
}

function Textarea({
  id,
  label,
  placeholder,
  required,
  rows,
  value,
  onChange,
  error,
  disabled,
}: {
  id: string;
  label: string;
  placeholder: string;
  required?: boolean;
  rows: number;
  value: string;
  onChange: (next: string) => void;
  error?: string;
  disabled?: boolean;
}) {
  return (
    <label htmlFor={id} className="flex flex-col gap-2">
      <span className="font-label-caps text-label-caps uppercase tracking-[0.08em] text-on-surface-variant">
        {label}
        {required ? <span className="text-error"> *</span> : null}
      </span>
      <textarea
        id={id}
        name={id}
        required={required}
        rows={rows}
        placeholder={placeholder}
        value={value}
        disabled={disabled}
        aria-invalid={error ? "true" : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        onChange={(e) => onChange(e.target.value)}
        className={cn(
          "w-full resize-none rounded-lg bg-surface-container-lowest px-4 py-3 font-body-sm text-body-sm text-on-surface placeholder:text-outline transition-all focus:outline-none focus:ring-1",
          "disabled:cursor-not-allowed disabled:opacity-60",
          error
            ? "ring-1 ring-error focus:ring-error"
            : "focus:ring-primary",
        )}
      />
      {error ? (
        <span
          id={`${id}-error`}
          role="alert"
          className="flex items-center gap-1.5 font-body-sm text-body-sm text-error"
        >
          <AlertCircle size={12} aria-hidden />
          {error}
        </span>
      ) : null}
    </label>
  );
}

/* ------------------------------------------------------------------ */
/*  Success panel                                                       */
/* ------------------------------------------------------------------ */

function SuccessPanel({
  result,
  onReset,
}: {
  result: { stored: boolean; emailed: boolean; supabaseConfigured: boolean };
  onReset: () => void;
}) {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex flex-col items-start gap-space-sm py-2"
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/15 text-primary">
        <CheckCircle2 size={28} aria-hidden />
      </div>
      <h3 className="font-headline-lg text-headline-lg font-semibold text-on-surface">
        Message sent
      </h3>
      <p className="font-body-md text-body-md leading-relaxed text-on-surface-variant">
        {CONTACT.form.success}
      </p>

      {!result.stored ? (
        <p className="rounded-lg border border-tertiary/40 bg-tertiary/10 px-3 py-2 font-body-sm text-body-sm text-tertiary">
          Note: message storage is currently disabled (no database
          configured). Your message reached the page but was not saved —
          email me directly at {CONTACT.email} to be safe.
        </p>
      ) : result.emailed ? null : result.supabaseConfigured ? (
        <p className="font-body-sm text-body-sm text-on-surface-variant">
          Saved. Email notification is not configured — I&apos;ll see your
          message in the dashboard.
        </p>
      ) : null}

      <button
        type="button"
        onClick={onReset}
        className="mt-2 font-code-badge text-code-badge text-primary transition-colors hover:text-primary-fixed"
      >
        Send another message →
      </button>
    </div>
  );
}
