"use client";

import React, { useState, useEffect } from "react"; // Import hooks for dynamic behavior

// Import the section components
import HeroSection from "../components/HeroSection";
import ExperienceSection from "../components/ExperienceSection";
import HobbiesSection from "../components/HobbiesSection";
import ContactSection from "../components/ContactSection";
import JourneySection from "@/components/JourneySection";
import Navbar from "@/components/Navbar";
import ProjectsSection from "@/components/ProjectsSection";

export default function HomePage() {
  const [isScrolled, setIsScrolled] = useState(false);

  // Effect to handle scroll event for dynamic nav bar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        // Adjust threshold as needed
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []); // Empty dependency array means this effect runs once on mount

  return (
    <div className="min-h-screen bg-neutral-100 dark:bg-slate-900 text-black flex flex-col">
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
