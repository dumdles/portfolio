import Image from "next/image";
import React from "react";

export default function HeroSection() {
  return (
    <main id="home" className="min-h-screen flex items-center justify-center p-4 pt-16 md:p-8 md:pt-20 lg:p-12 lg:pt-24">
      {" "}
      {/* Added padding-top to account for fixed nav */}
      <div className="w-full flex flex-col md:flex-row items-center md:justify-between">
        {/* Text Content */}
        <div className="w-full md:w-1/2 mb-10 md:mb-0 md:pr-10">
          <p className="text-lg sm:text-xl text-neutral-700 dark:text-neutral-200 mb-2">Hello, I am Dylan, a</p>
          <h1 className="text-6xl sm:text-6xl md:text-7xl lg:text-8xl font-bold dark:text-blue-200">Creative Developer</h1>
        </div>

        {/* Image Placeholder */}
        {/* Adjusted height for better responsiveness */}
        <div className="w-full md:w-1/2 h-64 sm:h-80 md:h-[500px] lg:h-[600px] bg-neutral-200 rounded-3xl flex items-center justify-center relative overflow-hidden shadow-lg">
          <Image
            src="/images/dylan-hero.jpg" // Use the imageUrl prop
            alt={`Cover image of Dylan`}
            layout="fill" // Cover the card area
            objectFit="cover"
            className="absolute inset-0 transition-opacity duration-300"
            // Removed onError as we expect local images or configured external domains
          />
        </div>
      </div>
    </main>
  );
}
