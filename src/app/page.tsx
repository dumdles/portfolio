import { HeroSection } from "@/components/sections/hero-section";
import { WorksSection } from "@/components/sections/works-section";
import { TimelineSection } from "@/components/sections/timeline-section";
import HobbiesSection from "@/components/sections/hobbies-section";
import ContactSection from "@/components/sections/contact-section";
import Navbar from "@/components/Navbar";

/**
 * The spine of the site, in the order a first-time visitor should meet it.
 *
 * Part numbers come from the information architecture in docs/PLAN.md. The
 * gaps are intentional: 02 Craft, 04 Security and 05 Toolbelt are planned but
 * not built yet, and renumbering around them now would only mean renumbering
 * back later.
 *
 * This is a server component. Each section opts into the client itself, so
 * only the interactive parts ship JavaScript.
 */
export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-paper text-ink">
      <Navbar />
      <main>
        <HeroSection />
        <WorksSection />
        <TimelineSection />
        <HobbiesSection />
        <ContactSection />
      </main>
    </div>
  );
}
