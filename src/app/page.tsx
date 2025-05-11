"use client";

import React, { useState, useEffect } from "react"; // Import hooks for dynamic behavior

// Import the section components
import HeroSection from "../components/HeroSection";
import ExperienceSection from "../components/ExperienceSection";
import HobbiesSection from "../components/HobbiesSection";
import ContactSection from "../components/ContactSection";

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
      <nav className={`fixed top-5 rounded-3xl left-5 right-5 z-50 transition-colors duration-300 ${isScrolled ? "bg-gray-50 dark:bg-slate-700 shadow-xl" : "bg-transparent"} p-4`}>
        <div className="container mx-auto flex justify-between items-center">
          {/* Logo or Site Title */}
          <div className="text-xl font-bold text-neutral-800 dark:text-neutral-50">dumdles</div>
          {/* Navigation Links */}
          <div className="flex space-x-6">
            {/* Ensure these hrefs match the section IDs in your components */}
            <a href="#home" className="text-neutral-700 dark:text-neutral-50 hover:text-blue-600 dark:hover:text-blue-200 transition-colors duration-200">
              Home
            </a>
            <a href="#hobbies" className="text-neutral-700 dark:text-neutral-50 hover:text-blue-600 dark:hover:text-blue-200 transition-colors duration-200">
              Hobbies
            </a>{" "}
            {/* Link to Hobbies */}
            <a href="#experience" className="text-neutral-700 dark:text-neutral-50 hover:text-blue-600 dark:hover:text-blue-200 transition-colors duration-200">
              Experience
            </a>{" "}
            {/* Link to Experience */}
            {/* Add or update links for other sections */}
            <a href="#projects" className="text-neutral-700 dark:text-neutral-50 hover:text-blue-600 dark:hover:text-blue-200 transition-colors duration-200">
              Projects
            </a>
            <a href="#contact" className="text-neutral-700 dark:text-neutral-50 hover:text-blue-600 dark:hover:text-blue-200 transition-colors duration-200">
              Contact
            </a>
          </div>
        </div>
      </nav>
      {/* Render the section components */}
      <HeroSection />
      <HobbiesSection /> {/* Render Hobbies Section */}
      <ExperienceSection /> {/* Render Experience Section */}
      {/* Render other section components here */}
      {/* <ProjectsSection /> */}
      <ContactSection />
    </div>
  );
}
