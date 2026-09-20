"use client";

import Image from "next/image";
import React, { useEffect, useRef } from "react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

export default function HeroSection() {
  const imageRef = useRef<HTMLDivElement | null>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;

    let frame: number | null = null;

    const update = () => {
      frame = null;
      const node = imageRef.current;
      if (!node) return;

      const progress = Math.min(window.scrollY / 400, 1);
      const scale = 1 + progress * 0.15;
      const translateY = Math.min(window.scrollY / 10, 40);
      node.style.transform = `scale(${scale.toFixed(3)}) translateY(${-translateY.toFixed(1)}px)`;
    };

    // Coalesce scroll events into one write per frame. The previous version
    // called setState on every event, re-rendering the section continuously
    // while scrolling.
    const onScroll = () => {
      if (frame === null) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame !== null) cancelAnimationFrame(frame);
    };
  }, [reducedMotion]);

  return (
    // Top padding clears the navbar, which is taller below md where it wraps
    // to two rows.
    <main id="home" className="flex min-h-screen items-center justify-center p-4 pt-32 md:p-8 md:pt-24 lg:p-12">
      <div className="w-full flex flex-col md:flex-row items-center md:justify-between">
        {/* Text Content */}
        <div className="w-full md:w-1/2 mb-10 md:mb-0 md:pr-10">
          <p className="text-body-lg text-ink-muted mb-2">Hello, I am Dylan, a</p>
          <h1 className="text-display-lg font-display font-bold text-ink">Creative Developer</h1>
        </div>

        {/* Image Card with scroll-based zoom/parallax */}
        <div className="w-full md:w-1/2 h-64 sm:h-80 md:h-[500px] lg:h-[600px] bg-surface-muted rounded-lg flex items-center justify-center relative overflow-hidden shadow-card border border-rule">
          <div ref={imageRef} className="absolute inset-0 will-change-transform" style={{ transition: "transform 0.2s var(--ease-snap)" }}>
            <Image src="/images/dylan-hero.jpg" alt="Portrait of Dylan" fill sizes="(max-width: 768px) 100vw, 50vw" priority className="object-cover" />
          </div>
        </div>
      </div>
    </main>
  );
}
