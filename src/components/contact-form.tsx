"use client";
import { useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { ArrowUpRight, Check, Mail } from "lucide-react";
import { email } from "@/lib/content";
import { enquiryEndpoint, enquiryFormName, submitEnquiry } from "@/lib/netlify-form";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const sending = useRef(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sending.current) return;
    const form = event.currentTarget;
    const data = new FormData(form);
    sending.current = true;
    setStatus("sending");
    try {
      await submitEnquiry(data);
      form.reset();
      setStatus("success");
    } catch {
      setStatus("error");
    } finally {
      sending.current = false;
    }
  }

  return <div className="contact-form-wrap">
    <form name={enquiryFormName} method="POST" action={enquiryEndpoint} onSubmit={submit} className="contact-form" aria-busy={status === "sending"}>
      <input type="hidden" name="form-name" value={enquiryFormName} />
      <p hidden><label>Leave this empty<input name="bot-field" tabIndex={-1} autoComplete="off" /></label></p>
      <fieldset disabled={status === "sending" || status === "success"} hidden={status === "success"}>
        <legend className="sr-only">Your project enquiry</legend>
        <div className="form-row">
          <label>Your name<input name="name" autoComplete="name" required maxLength={100} placeholder="First and last name" /></label>
          <label>Brand / agency<input name="brand" autoComplete="organization" required maxLength={150} placeholder="Who are you creating for?" /></label>
        </div>
        <label>Email address<input name="email" type="email" autoComplete="email" required maxLength={200} placeholder="you@yourbrand.com" /></label>
        <label>What do you have in mind?<select name="service" defaultValue="" required>
          <option value="" disabled>Select a service</option><option>Organic UGC</option><option>Paid ad creative</option><option>Reviews &amp; testimonials</option><option>Monthly retainer</option><option>Event coverage</option><option>Custom project / let’s explore</option>
        </select></label>
        <div className="form-row">
          <label>Project budget<select name="budget" defaultValue="Let’s discuss"><option>Let’s discuss</option><option>Under £500</option><option>£500–£1,000</option><option>£1,000–£2,500</option><option>£2,500+</option></select></label>
          <label>Ideal timeline<input name="timeline" maxLength={120} placeholder="A date, a month, or flexible" /></label>
        </div>
        <label>A little about your project<textarea name="message" required rows={5} maxLength={4000} placeholder="Tell me about your brand, audience, deliverables and the story you’d like to tell…" /></label>
        <p className="form-note">I’ll use these details to respond to your enquiry. <Link href="/privacy">Read the privacy information.</Link></p>
        <button className="button" type="submit">{status === "sending" ? "Sending your idea…" : "Send my enquiry"}<ArrowUpRight size={18} /></button>
      </fieldset>
      <div role="status" aria-live="polite" aria-atomic="true">
        {status === "sending" && <p className="form-feedback">Sending your enquiry…</p>}
        {status === "success" && <div className="form-success"><Check size={24} /><h3>Your idea is on its way.</h3><p>Thanks for getting in touch! I’ll get back to you at the email address you shared.</p><button type="button" className="text-link" onClick={() => setStatus("idle")}>Send another enquiry <ArrowUpRight size={16} /></button></div>}
      </div>
      {status === "error" && <p className="form-feedback form-error" role="alert">I couldn’t confirm your enquiry was received. Your details are still here — please try again, or email me directly below.</p>}
    </form>
    <p className="contact-email-alternative"><Mail size={16} /> Prefer email? <a href={`mailto:${email}`}>{email}</a></p>
  </div>;
}
