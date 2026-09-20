"use client";

import React, { useState, FormEvent } from "react";
// Import shadcn/ui components
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import LinkedInBadge from "@/components/LinkedInBadge";
import { SectionHeader } from "@/components/primitives";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    // --- Placeholder Submission Logic ---
    // Replace this with your actual form submission endpoint or service
    console.log("Form Data Submitted:", formData);

    // Simulate an API call
    try {
      // const response = await fetch('/api/contact', { // Example API endpoint
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(formData),
      // });

      // if (response.ok) {
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate network delay
      setSubmitStatus("success");
      setFormData({ name: "", email: "", message: "" }); // Clear form on success
      // } else {
      //   setSubmitStatus('error');
      // }
    } catch (error) {
      console.error("Submission error:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
    // --- End Placeholder Submission Logic ---
  };

  return (
    <section id="contact" className="drafting-grid flex min-h-screen flex-col items-center justify-center bg-paper p-4 text-ink">
      <div className="w-full max-w-2xl rounded-lg border border-rule bg-surface p-8 shadow-pane sm:p-10 md:p-12">
        <SectionHeader part="07" eyebrow="Contact" align="center" className="mb-8" title="Get in touch!" lead="Have a project in mind or just want to say hello?" />

        <form onSubmit={handleSubmit} className="space-y-6 mb-8">
          {/* Added mb-8 for spacing */}
          <div className="space-y-1">
            <Label htmlFor="name">Name</Label>
            <Input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              // Shadcn Input handles basic styling, you can add custom classes if needed
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="email">Email</Label> {/* Using shadcn Label */}
            <Input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              // Shadcn Input handles basic styling
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="message">Message</Label> {/* Using shadcn Label */}
            <Textarea
              id="message"
              name="message"
              rows={4}
              value={formData.message}
              onChange={handleChange}
              required
              // Shadcn Textarea handles basic styling
            />
          </div>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full" // Make button full width
            // Shadcn Button handles styling, hover, and disabled states
          >
            {isSubmitting ? "Sending..." : "Send Message"}
          </Button>
          <p aria-live="polite" className="text-center text-body-sm">
            {submitStatus === "success" && <span className="text-positive">Message sent successfully.</span>}
            {submitStatus === "error" && <span className="text-critical">Failed to send message. Please try again later.</span>}
          </p>
        </form>

        {/* Alternative Contact Section */}
        <div className="mt-8 border-t border-rule pt-8 text-center">
          <p className="mb-2 text-body-sm text-ink-muted">or, connect with me on LinkedIn:</p>
          <LinkedInBadge username="dumdles" /> {/* Use the new component */}
        </div>
      </div>
    </section>
  );
}
