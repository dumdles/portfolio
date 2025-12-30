"use client";

import React, { useState, useEffect, useRef } from "react";

const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#journey", label: "Journey" },
  { href: "#hobbies", label: "Hobbies" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);
  const bubbleRef = useRef<HTMLDivElement>(null);
  const linksContainerRef = useRef<HTMLDivElement>(null);

  // Effect to handle scroll event for dynamic nav bar and active link
  useEffect(() => {
    const handleScroll = () => {
      // Logic for changing the nav bar's background on scroll
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Logic for highlighting the active section
      // We iterate backwards to ensure we catch the bottom-most active section visible
      let currentSection = "home";
      for (let i = navLinks.length - 1; i >= 0; i--) {
        const link = navLinks[i];
        const section = document.getElementById(link.href.substring(1));
        if (section && window.scrollY >= section.offsetTop - 150) {
          // Adjusted offset for better accuracy
          currentSection = link.href.substring(1);
          break;
        }
      }
      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Call on mount to set initial state

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Effect to handle the smooth transition of the bubble
  useEffect(() => {
    if (linksContainerRef.current && bubbleRef.current) {
      const activeLink = linksContainerRef.current.querySelector(`[data-href="#${activeSection}"]`);
      if (activeLink instanceof HTMLElement) {
        // Calculate the position and width of the active link
        const linksContainerRect = linksContainerRef.current.getBoundingClientRect();
        const linkRect = activeLink.getBoundingClientRect();

        // Update the bubble's style with correct relative positioning
        bubbleRef.current.style.width = `${linkRect.width}px`;
        bubbleRef.current.style.transform = `translateX(${linkRect.left - linksContainerRect.left}px)`;
      }
    }
  }, [activeSection]);

  return (
    <nav
      className={`fixed right-0 left-0 top-5 w-[90%] md:w-[60%] mx-auto rounded-full z-50 transition-all duration-300 ease-in-out ${
        isScrolled ? "bg-white/30 dark:bg-black/30 backdrop-blur-md shadow-lg border border-white/20 dark:border-white/10 ring-1 ring-black/5" : "bg-transparent border border-transparent"
      } py-2 px-6`}
    >
      <div className="container mx-auto flex justify-between items-center relative">
        {/* Logo or Site Title */}
        <div className="text-xl font-bold text-neutral-800 dark:text-neutral-50 drop-shadow-sm">dumdles</div>

        {/* Navigation Links with the active bubble */}
        <div className="flex relative items-center gap-1" ref={linksContainerRef}>
          {/* This is the dynamic bubble for the active state */}
          <div
            ref={bubbleRef}
            className="absolute -z-10 bottom-0 top-0 h-full rounded-full bg-gradient-to-b from-blue-100/80 to-blue-200/80 dark:from-blue-600/50 dark:to-blue-700/50 shadow-sm transition-transform duration-500 cubic-bezier(0.23, 1, 0.32, 1)"
            style={{ width: "0px" }} // Initial width set to 0
          />

          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              data-href={link.href}
              onClick={(e) => {
                e.preventDefault();
                setActiveSection(link.href.substring(1));
                const section = document.querySelector(link.href);
                section?.scrollIntoView({ behavior: "smooth" });
              }}
              className={`
                px-4 py-2 text-sm md:text-base text-center font-medium rounded-full
                relative z-10 
                transition-colors duration-200
                ${activeSection === link.href.substring(1) ? "text-blue-900 dark:text-white" : "text-neutral-600 dark:text-neutral-300 hover:text-blue-600 dark:hover:text-blue-200"}
              `}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
