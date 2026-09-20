"use client";

import React, { useState, useEffect, useRef } from "react";
import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#journey", label: "Journey" },
  { href: "#hobbies", label: "Hobbies" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);
  const bubbleRef = useRef<HTMLDivElement>(null);
  const linksContainerRef = useRef<HTMLDivElement>(null);

  // Background state. Coalesced into one read per frame; the previous version
  // ran on every scroll event.
  useEffect(() => {
    let frame: number | null = null;

    const update = () => {
      frame = null;
      setIsScrolled(window.scrollY > 50);
    };

    const onScroll = () => {
      if (frame === null) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame !== null) cancelAnimationFrame(frame);
    };
  }, []);

  // Active section. IntersectionObserver replaces the previous approach of
  // reading offsetTop for every section on every scroll event, which forced a
  // synchronous layout each time.
  useEffect(() => {
    const sections = navLinks.map((link) => document.getElementById(link.href.slice(1))).filter((section): section is HTMLElement => section !== null);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // A narrow band near the top of the viewport acts as the playhead.
        // Whichever section crosses it is the one being read.
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible.length > 0) setActiveSection(visible[0].target.id);
      },
      { rootMargin: "-20% 0px -70% 0px", threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  // Slide the bubble to the active link.
  useEffect(() => {
    const container = linksContainerRef.current;
    const bubble = bubbleRef.current;
    if (!container || !bubble) return;

    const activeLink = container.querySelector(`[data-href="#${activeSection}"]`);
    if (!(activeLink instanceof HTMLElement)) return;

    bubble.style.width = `${activeLink.offsetWidth}px`;
    bubble.style.transform = `translateX(${activeLink.offsetLeft}px)`;
  }, [activeSection]);

  return (
    <nav
      className={cn(
        "fixed inset-x-0 top-4 z-50 mx-auto w-[94%] rounded-lg px-3 py-2 transition-all duration-300 md:w-auto md:max-w-4xl md:px-6",
        // The bar is transparent until scrolled, but only from md upward.
        // Below md it wraps to two rows, and a transparent two-row bar lets
        // the link row collide with whatever is behind it.
        isScrolled
          ? "border border-rule bg-surface/85 shadow-card backdrop-blur-md"
          : "border border-rule bg-surface/75 backdrop-blur-md md:border-transparent md:bg-transparent md:shadow-none md:backdrop-blur-none"
      )}
    >
      {/* Below md the bar wraps to two rows: brand and theme control on the
          first, the link row spanning the full width on the second. Squeezing
          six links into the gap beside the toggle clipped them mid-word. */}
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2 md:flex-nowrap md:justify-between">
        <span className="order-1 mr-auto shrink-0 font-display text-heading-sm font-bold text-ink md:mr-0">dumdles</span>

        {/* The link row scrolls on narrow screens. The mask fades the right
            edge so a clipped link reads as "there is more", rather than as a
            layout bug. It is removed once everything fits. */}
        <div
          className={cn(
            "relative order-3 flex w-full items-center gap-1 overflow-x-auto pr-6 md:order-2 md:w-auto md:pr-0",
            "[scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
            "[mask-image:linear-gradient(to_right,black_calc(100%-1.5rem),transparent)] md:[mask-image:none]"
          )}
          ref={linksContainerRef}
        >
          <div ref={bubbleRef} aria-hidden className="absolute inset-y-0 -z-10 rounded-md bg-brand-soft transition-transform duration-500 ease-[var(--ease-drafting)]" style={{ width: 0 }} />

          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              data-href={link.href}
              aria-current={activeSection === link.href.slice(1) ? "true" : undefined}
              className={cn(
                "relative z-10 shrink-0 rounded-md px-3 py-1.5 text-body-sm font-medium transition-colors duration-200",
                activeSection === link.href.slice(1) ? "text-brand" : "text-ink-muted hover:text-ink"
              )}
            >
              {link.label}
            </a>
          ))}
        </div>

        <ThemeToggle className="order-2 shrink-0 md:order-3" />
      </div>
    </nav>
  );
}
