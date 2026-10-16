/**
 * Contact section content. Sources: `design/resume.pdf`.
 *
 * Form submission is intentionally out of scope (per the task brief:
 * "Contact (UI only for now)"). The form is wired with a no-op
 * handler that surfaces a success placeholder, and the actual email
 * address comes from the resume.
 */

export const CONTACT = {
  eyebrow: "06. Connect",
  heading: "Let's build reliable software systems",
  description:
    "Open to Software Engineering roles, distributed backend opportunities, and competitive programming mentorships. Reach out directly or send a transmission below.",

  // Direct email from the resume header.
  email: "ashrafulislamdarkeye@gmail.com",

  // Location, from the resume header.
  location: "SUST, Sylhet, Bangladesh",
  timezone: "UTC+6",

  // Form labels (UI chrome — no fabricated copy).
  form: {
    nameLabel: "Your Name",
    namePlaceholder: "Linus Torvalds",
    emailLabel: "Email Address",
    emailPlaceholder: "linus@kernel.org",
    subjectLabel: "Inquiry Type / Subject",
    subjectPlaceholder: "Distributed Systems Collaboration / Opportunity",
    messageLabel: "Message Transmission",
    messagePlaceholder: "Let's build something extraordinary...",
    submit: "Send Message",
    success:
      "Message dispatched! darkEye will respond within 24 hours.",
  },
} as const;
