"use client";

import React from "react";

// Import the section components
import HeroSection from "../components/HeroSection";
import ExperienceSection from "../components/ExperienceSection";
import HobbiesSection from "../components/HobbiesSection";
import ContactSection from "../components/ContactSection";
import JourneySection from "@/components/JourneySection";
import Navbar from "@/components/Navbar";
import ProjectsSection from "@/components/ProjectsSection";

export default function HomePage() {
  // Scroll state for the navigation bar is owned by Navbar itself.
  return (
    <div className="flex min-h-screen flex-col bg-paper text-ink">
      {/* Dynamic Navigation Bar */}
      {/* Added fixed positioning, background change on scroll */}
      <Navbar />
      {/* Render the section components */}
      <HeroSection />
      <JourneySection /> {/* <ProjectsSection /> */}
      <HobbiesSection /> {/* Render Hobbies Section */}
      <ExperienceSection /> {/* Render Experience Section */}
      <ProjectsSection />
      <ContactSection />
    </div>
  );
}
