// src/app/experience/page.tsx
"use client"; // Add this for client-side interactivity

import React, { useRef, useState, MouseEvent } from "react";

interface CardStyle {
  transform: string;
  transition: string;
}

interface BaseCardProps {
  bgColor: string; // e.g., "bg-red-400 dark:bg-red-500"
  borderColor: string; // e.g., "border-red-600 dark:border-red-400"
  textColor: string; // e.g., "text-white" or "text-amber-900 dark:text-amber-200"
  children: React.ReactNode;
  className?: string; // Allow passing additional classes
}

// Generic Hover Card Component to encapsulate the 3D tilt logic
const InteractiveCard: React.FC<BaseCardProps> = ({ bgColor, borderColor, textColor, children, className = "" }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState<CardStyle>({
    transform: "perspective(1000px) rotateX(0deg) rotateY(0deg)",
    transition: "transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)",
  });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const { left, top, width, height } = cardRef.current.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;
    const rotateX = (y / height - 0.5) * -20; // Max rotation 20deg / 2 = 10deg
    const rotateY = (x / width - 0.5) * 20; // Max rotation 20deg / 2 = 10deg

    setStyle((prevStyle) => ({
      ...prevStyle,
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`,
      transition: "transform 0.1s ease-out",
    }));
  };

  const handleMouseLeave = () => {
    setStyle({
      transform: "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
      transition: "transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)",
    });
  };

  return (
    <div
      ref={cardRef}
      className={`rounded-3xl p-4 sm:p-8 shadow-xl border-2 ${bgColor} ${borderColor} ${textColor} ${className}`}
      style={style}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  );
};

interface RoleCardProps {
  title: string;
  details: string;
  tenure: string;
  bgColor: string;
  borderColor: string;
  textColor: string;
}

const RoleCard: React.FC<RoleCardProps> = ({ title, details, tenure, bgColor, borderColor, textColor }) => {
  return (
    <InteractiveCard
      bgColor={bgColor}
      borderColor={borderColor}
      textColor={textColor}
      className="min-h-[280px] font-sans sm:min-h-[320px] flex flex-col justify-between" // Use font-sans for Inter
    >
      <h3 className={`text-2xl sm:text-3xl font-bold mb-2`}>{title}</h3> {/* Inherits textColor */}
      <div>
        <p className={`text-sm sm:text-base font-semibold font-mono opacity-90`}>{details}</p> {/* Inherits textColor, font-mono for details */}
        <p className={`text-xs sm:text-sm font-light font-mono opacity-80`}>{tenure}</p> {/* Inherits textColor, font-mono for tenure */}
      </div>
    </InteractiveCard>
  );
};

interface InfoCardProps {
  title: string;
  year?: string;
  details?: string;
  bgColor: string;
  borderColor: string;
  textColor: string;
}

const InfoCard: React.FC<InfoCardProps> = ({ title, year, details, bgColor, borderColor, textColor }) => {
  return (
    <InteractiveCard
      bgColor={bgColor}
      borderColor={borderColor}
      textColor={textColor}
      className="p-6 sm:p-8 flex flex-col justify-between font-sans" // Use font-sans for Inter
    >
      <div>
        <h3 className="text-2xl sm:text-3xl font-bold font-sans mb-1">{title}</h3> {/* Inherits textColor */}
        {details && <p className="text-sm sm:text-base font-medium font-mono">{details}</p>} {/* Inherits textColor, font-mono for details */}
      </div>
      {year && <p className="text-sm sm:text-base font-light font-mono mt-auto pt-2">{year}</p>} {/* Inherits textColor, font-mono for year */}
    </InteractiveCard>
  );
};

export default function ExperiencePage() {
  return (
    // Centering container for the whole page
    <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-slate-900 text-neutral-800 dark:text-slate-200 p-4 font-sans">
      {/* Max width container for the content itself */}
      <div className="max-w-5xl w-full py-12 px-4 sm:px-6 lg:px-8">
        <header className="mb-12 text-center md:text-left">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">I was not born a natural leader...</h1>
          <p className="text-lg sm:text-xl text-neutral-600 dark:text-slate-400">
            But by stepping out of my comfort zone, I slowly
            <br className="hidden sm:inline" /> realised I enjoyed making meaningful connections.
          </p>
        </header>

        <section className="mb-12">
          <h2 className="text-2xl sm:text-3xl font-semibold mb-8 lg:text-right md:text-left sm:text-center">
            Here are some roles I took on to <span className="underline">Sharpen The Saw</span>.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <RoleCard
              title="Electrical and Electronic Engineering Club"
              details="PUBLICATIONS SECRETARY,"
              tenure="2023-2024"
              bgColor="bg-red-400 dark:bg-red-500"
              borderColor="border-red-600 dark:border-red-400"
              textColor="text-white" // White text works well on these backgrounds in both modes
            />
            <RoleCard
              title="SP Infocomm Club"
              details="PROGRAMME HEAD,"
              tenure="2024-2025"
              bgColor="bg-blue-400 dark:bg-blue-500"
              borderColor="border-blue-600 dark:border-blue-400"
              textColor="text-white"
            />
            <div className="space-y-6 sm:space-y-8">
              <InfoCard
                title="Class Vice-Chairperson"
                year="2021"
                bgColor="bg-amber-300 dark:bg-amber-600" // Darker amber for dark mode
                borderColor="border-amber-500 dark:border-amber-400"
                textColor="text-amber-900 dark:text-amber-100" // Light amber text for dark mode
              />
              <InfoCard
                title="Robotics@APEX"
                details="LOGISTICS HEAD,"
                year="2020-2021"
                bgColor="bg-yellow-300 dark:bg-yellow-600" // Darker yellow for dark mode
                borderColor="border-yellow-500 dark:border-yellow-400"
                textColor="text-yellow-900 dark:text-yellow-100" // Light yellow text for dark mode
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
