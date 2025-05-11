import Image from "next/image";
import React, { useEffect, useState } from "react";

export default function HeroSection() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Calculate scale: between 1 and 1.15 as you scroll the first 400px
  const scale = 1 + Math.min(scrollY / 400, 1) * 0.15;
  // Optional: for parallax, you can also move the image up a bit
  const translateY = Math.min(scrollY / 10, 40); // max 40px up

  return (
    <main id="home" className="min-h-screen flex items-center justify-center p-4 pt-16 md:p-8 md:pt-20 lg:p-12 lg:pt-24">
      {/* Added padding-top to account for fixed nav */}
      <div className="w-full flex flex-col md:flex-row items-center md:justify-between">
        {/* Text Content */}
        <div className="w-full md:w-1/2 mb-10 md:mb-0 md:pr-10">
          <p className="text-lg sm:text-xl text-neutral-700 dark:text-neutral-200 mb-2">Hello, I am Dylan, a</p>
          <h1 className="text-6xl sm:text-6xl md:text-7xl lg:text-8xl font-bold dark:text-blue-200">Creative Developer</h1>
        </div>

        {/* Image Card with scroll-based zoom/parallax */}
        <div className="w-full md:w-1/2 h-64 sm:h-80 md:h-[500px] lg:h-[600px] bg-neutral-200 rounded-3xl flex items-center justify-center relative overflow-hidden shadow-lg">
          <Image
            src="/images/dylan-hero.jpg"
            alt="Cover image of Dylan"
            layout="fill"
            objectFit="cover"
            className="absolute inset-0 transition-transform duration-300"
            style={{
              transform: `scale(${scale}) translateY(-${translateY}px)`,
              transition: "transform 0.2s cubic-bezier(0.4,0,0.2,1)",
            }}
          />
        </div>
      </div>
    </main>
  );
}
