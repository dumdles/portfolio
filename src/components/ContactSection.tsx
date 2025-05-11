"use client";

import React, { useState, FormEvent } from "react";
// Import shadcn/ui components
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import LinkedInBadge from "./LinkedInBadge"; // Import the new LinkedInBadge component

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
    <section id="contact" className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 text-white p-4 font-sans">
      <div className="max-w-2xl w-full bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8 sm:p-10 md:p-12 text-neutral-800 dark:text-slate-200">
        <header className="mb-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-1">Get in touch!</h2>
          <p className="text-md text-neutral-600 dark:text-slate-400">Have a project in mind or just want to say hello?</p>
        </header>

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
          {submitStatus === "success" && <p className="text-center text-green-600 dark:text-green-400 mt-4">Message sent successfully!</p>}
          {submitStatus === "error" && <p className="text-center text-red-600 dark:text-red-400 mt-4">Failed to send message. Please try again later.</p>}
        </form>

        {/* Alternative Contact Section */}
        <div className="text-center mt-8 border-t border-neutral-200 dark:border-gray-700 pt-8">
          <p className="text-md text-neutral-600 dark:text-slate-400 mb-2">or, connect with me on LinkedIn:</p>
          <LinkedInBadge username="dumdles" /> {/* Use the new component */}
        </div>
      </div>
    </section>
  );
}
