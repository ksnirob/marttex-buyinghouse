import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, SiteLayout } from "@/components/site/Layout";
import { Mail, MapPin, Phone, User } from "lucide-react";
import type { FormEvent } from "react";
import { useState } from "react";
import { API_URL } from "@/lib/site-api";

export const Route = createFileRoute("/contact")({
  component: Contact,
  head: () => ({
    meta: [
      { title: "Contact — Mart Tex" },
      { name: "description", content: "Request a quote or get in touch with our Dhaka team." },
    ],
  }),
});

function Contact() {
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSending(true);
    setError("");

    const form = new FormData(event.currentTarget);
    const payload = {
      name: String(form.get("name") || ""),
      company: String(form.get("company") || ""),
      email: String(form.get("email") || ""),
      phone: String(form.get("phone") || ""),
      category: String(form.get("category") || ""),
      quantity: String(form.get("qty") || ""),
      message: String(form.get("message") || ""),
    };

    try {
      const response = await fetch(`${API_URL}/api/enquiries`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const result = await response.json().catch(() => ({}));
        throw new Error(result.message || "Could not send your enquiry.");
      }

      setSent(true);
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Could not send your enquiry.");
    } finally {
      setSending(false);
    }
  }

  return (
    <SiteLayout>
      <PageHeader
        eyebrow="Contact"
        title="Let's talk threads."
        lead="Send your tech pack, target FOB and quantity. We'll come back within 48 hours."
      />
      <section className="section-reveal container-x grid gap-12 py-24 lg:grid-cols-[1.2fr_1fr]">
        <form
          onSubmit={handleSubmit}
          className="rounded-3xl border border-border bg-card p-8 md:p-10"
        >
          {sent ? (
            <div className="grid place-items-center py-20 text-center">
              <h3 className="font-display text-3xl text-primary">Thank you.</h3>
              <p className="mt-3 max-w-md text-muted-foreground">
                We've received your message and will respond within 48 hours.
              </p>
            </div>
          ) : (
            <div className="grid gap-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Full name" name="name" required />
                <Field label="Company" name="company" />
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Email" name="email" type="email" required />
                <Field label="Phone" name="phone" />
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Product category" name="category" placeholder="e.g. Knit T-shirts" />
                <Field label="Quantity / order size" name="qty" placeholder="e.g. 20,000 pcs" />
              </div>
              <div>
                <label className="text-sm font-medium">Project details</label>
                <textarea
                  name="message"
                  rows={5}
                  required
                  className="mt-2 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-ring"
                  placeholder="Tell us about your product, target FOB and timeline."
                />
              </div>
              <button className="btn-primary mt-2 w-fit" type="submit" disabled={sending}>
                {sending ? "Sending..." : "Send enquiry"}
              </button>
              {error && <p className="text-sm text-destructive">{error}</p>}
            </div>
          )}
        </form>

        <aside className="space-y-6">
          <div className="rounded-3xl border border-border bg-card p-8">
            <h3 className="font-display text-2xl text-primary">Dhaka office</h3>
            <ul className="mt-5 space-y-4 text-sm text-muted-foreground">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-5 w-5 text-primary" /> Nikunja-02, Road-09, House-07,
                Khilkhet, Dhaka-1229, Bangladesh
              </li>
              <li className="flex items-start gap-3">
                <User className="mt-0.5 h-5 w-5 text-primary" /> Mukhlesur Rahman (Shakil)
              </li>
              <li className="flex items-start gap-3 whitespace-nowrap">
                <Phone className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <span>
                  <a href="tel:+8801905450850" className="hover:text-primary">
                    +8801905450850
                  </a>
                  ,{" "}
                  <a href="tel:+8801681624965" className="hover:text-primary">
                    +8801681624965
                  </a>
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="mt-0.5 h-5 w-5 text-primary" />
                <a href="mailto:info@marttex.net" className="hover:text-primary">
                  info@marttex.net
                </a>
              </li>
            </ul>
          </div>
          <div className="rounded-3xl bg-primary p-8 text-primary-foreground">
            <h3 className="font-display text-2xl">Working hours</h3>
            <p className="mt-3 text-sm text-primary-foreground/80">
              Sunday – Thursday
              <br />
              9:00 — 18:00 GMT+6
            </p>
            <p className="mt-4 text-sm text-primary-foreground/80">
              Urgent? WhatsApp our merchandising desk anytime.
            </p>
          </div>
        </aside>
      </section>
    </SiteLayout>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="text-sm font-medium">
        {label}
        {required && <span className="text-accent"> *</span>}
      </label>
      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="mt-2 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-ring"
      />
    </div>
  );
}
