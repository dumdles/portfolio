"use client";

import Image from "next/image";
import React, { useRef, useState, MouseEvent } from "react";

interface CardStyle {
  transform: string;
  transition: string;
}

interface HobbyCardProps {
  title: string;
  details?: string;
  imageUrl: string; // URL for the image to reveal (can be local or external)
  bgColor: string;
  borderColor: string;
  textColor: string;
  className?: string; // Allow passing additional classes for grid span
}

const HobbyCard: React.FC<HobbyCardProps> = ({ title, details, imageUrl, bgColor, borderColor, textColor, className = "" }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState<CardStyle>({
    transform: "perspective(1000px) rotateX(0deg) rotateY(0deg)",
    transition: "transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)",
  });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const { left, top, width, height } = cardRef.current.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;
    const rotateX = (y / height - 0.5) * -15; // Slightly less rotation for hobbies
    const rotateY = (x / width - 0.5) * 15;

    setStyle((prevStyle) => ({
      ...prevStyle,
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03, 1.03, 1.03)`, // Slightly less scale
      transition: "transform 0.1s ease-out",
    }));
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setStyle({
      transform: "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
      transition: "transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)",
    });
    setIsHovered(false);
  };

  return (
    <div
      ref={cardRef}
      className={`relative rounded-3xl p-4 sm:p-6 shadow-xl border-2 overflow-hidden cursor-pointer ${bgColor} ${borderColor} ${textColor} ${className}`}
      style={style}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Image that appears on hover */}
      {/* Use the provided imageUrl prop */}
      <Image
        src={imageUrl} // Use the imageUrl prop
        alt={`Image related to ${title}`}
        layout="fill" // Cover the card area
        objectFit="cover"
        className={`absolute inset-0 transition-opacity duration-300 ${isHovered ? "opacity-80" : "opacity-0"}`}
        // Removed onError as we expect local images or configured external domains
      />

      {/* Content (Title and Details) */}
      {/* Positioned relative and z-indexed to be above the image */}
      <div className={`relative z-10 flex flex-col justify-end h-full transition-colors duration-300 ${isHovered ? "text-white" : textColor}`}>
        <h3 className="text-xl sm:text-2xl font-bold">{title}</h3>
        {details && <p className="text-sm sm:text-base font-medium opacity-90">{details}</p>}
      </div>
    </div>
  );
};

export default function HobbiesSection() {
  return (
    <section id="hobbies" className="min-h-screen flex flex-col items-center justify-center bg-neutral-100 dark:bg-slate-800 text-neutral-800 dark:text-slate-200 p-4 font-sans">
      <div className="max-w-5xl w-full py-12 px-4 sm:px-6 lg:px-8">
        <header className="mb-12 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">I promise I'm not a boring person...</h1>
          <p className="text-lg sm:text-xl text-neutral-600 dark:text-slate-400">Here are some of my hobbies and interests!</p>
        </header>

        {/* Adjusted grid for Bento Box layout */}
        {/* On medium screens and up, use a 3-column grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 auto-rows-[180px]">
          {" "}
          {/* Added auto-rows for consistent height */}
          <HobbyCard
            title="Design"
            imageUrl="/images/design-hobby.jpg" // Example local image path
            bgColor="bg-green-300 dark:bg-green-600"
            borderColor="border-green-500 dark:border-green-400"
            textColor="text-green-900 dark:text-green-100"
          />
          <HobbyCard
            title="Media"
            imageUrl="/images/media-hobby.jpg" // Example local image path
            bgColor="bg-blue-300 dark:bg-blue-600"
            borderColor="border-blue-500 dark:border-blue-400"
            textColor="text-blue-900 dark:text-blue-100"
          />
          <HobbyCard
            title="Cycling"
            imageUrl="/images/cycling-hobby.jpg" // Example local image path
            bgColor="bg-red-300 dark:bg-red-600"
            borderColor="border-red-500 dark:border-red-400"
            textColor="text-red-900 dark:text-red-100"
          />
          <HobbyCard
            title="Guitar"
            imageUrl="/images/guitar-hobby.jpg" // Example local image path
            bgColor="bg-yellow-300 dark:bg-yellow-600"
            borderColor="border-yellow-500 dark:border-yellow-400"
            textColor="text-yellow-900 dark:text-yellow-100"
          />
          {/* These cards span 2 columns on medium and large screens */}
          <HobbyCard
            title="Making new connections"
            imageUrl="/images/connections-hobby.jpg" // Example local image path
            bgColor="bg-purple-300 dark:bg-purple-600"
            borderColor="border-purple-500 dark:border-purple-400"
            textColor="text-purple-900 dark:text-purple-100"
            className="sm:col-span-2" // Span 2 columns on small and larger screens
          />
          <HobbyCard
            title="Serving the community"
            imageUrl="/images/community-hobby.jpg" // Example local image path
            bgColor="bg-cyan-300 dark:bg-cyan-600"
            borderColor="border-cyan-500 dark:border-cyan-400"
            textColor="text-cyan-900 dark:text-cyan-100"
            className="sm:col-span-2" // Span 2 columns on small and larger screens
          />
        </div>
      </div>
    </section>
  );
}
