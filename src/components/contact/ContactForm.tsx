"use client";

import { useState, type FormEvent } from "react";
import { FiCheckCircle, FiSend } from "react-icons/fi";

// Subject dropdown er option list. Notun option lagle ekhane add koro.
const subjectOptions = [
  "General question",
  "Organize an event",
  "Volunteer with us",
  "Partnership",
  "Other",
] as const;

// Input ar textarea er common style.
const fieldStyles =
  "mt-2 w-full rounded-2xl border border-ink/15 bg-white px-4 py-3 text-sm text-ink shadow-sm shadow-ink/5 outline-none transition placeholder:text-ink/40 focus:border-brand focus:ring-2 focus:ring-brand/25";

const ContactForm = () => {
  // Mailto link ready hole success message dekhabo.
  const [isReady, setIsReady] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Form er value gulo niye mailto link banano hocche.
    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const subject = String(formData.get("subject") ?? "General question");
    const message = String(formData.get("message") ?? "").trim();

    const mailtoLink = `mailto:support@changenest.com?subject=${encodeURIComponent(
      `ChangeNest contact — ${subject}`,
    )}&body=${encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\n${message}`,
    )}`;

    // Visitor er email app open hobe, message age theke bhora thakbe.
    window.location.href = mailtoLink;
    setIsReady(true);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="text-sm font-semibold text-ink">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            autoComplete="name"
            placeholder="Your name"
            className={fieldStyles}
          />
        </div>

        <div>
          <label htmlFor="email" className="text-sm font-semibold text-ink">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@example.com"
            className={fieldStyles}
          />
        </div>
      </div>

      <div>
        <label htmlFor="subject" className="text-sm font-semibold text-ink">
          Subject
        </label>
        <select
          id="subject"
          name="subject"
          required
          defaultValue=""
          className={fieldStyles}
        >
          <option value="" disabled>
            Choose a subject
          </option>
          {subjectOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="message" className="text-sm font-semibold text-ink">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          placeholder="Tell us a little about your question or idea..."
          className={`${fieldStyles} resize-y`}
        />
      </div>

      <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-brand px-6 py-3.5 text-sm font-semibold text-ink shadow-lg shadow-brand/20 transition hover:-translate-y-0.5 hover:bg-ink hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 motion-reduce:transform-none"
        >
          Send message
          <FiSend aria-hidden="true" className="h-4 w-4" />
        </button>

        <p className="text-xs leading-5 text-ink/50">
          This opens your email app. Nothing is stored on the site.
        </p>
      </div>

      {isReady && (
        <p
          role="status"
          className="flex items-start gap-2 rounded-2xl border border-brand/20 bg-brand/10 px-4 py-3 text-sm leading-6 text-ink"
        >
          <FiCheckCircle
            aria-hidden="true"
            className="mt-0.5 h-4 w-4 shrink-0 text-brand"
          />
          <span>
            Your email app should open with the message ready to send. If it
            doesn&apos;t, email us directly at support@changenest.com.
          </span>
        </p>
      )}
    </form>
  );
};

export default ContactForm;
