"use client";

import React, { useState } from "react";

interface LinkedInBadgeProps {
  username: string; // Your LinkedIn username
}

const LinkedInBadge: React.FC<LinkedInBadgeProps> = ({ username }) => {
  const [isHovered, setIsHovered] = useState(false);

  // Construct the LinkedIn profile URL
  const linkedInUrl = `https://www.linkedin.com/in/${username}`;

  return (
    <a
      href={linkedInUrl}
      target="_blank" // Open in a new tab
      rel="noopener noreferrer" // Security best practice
      className={`
        inline-flex items-center
        bg-blue-500 text-white
        rounded-full space-x-2
        px-4 py-1
        shadow-md
        transition-all duration-300 ease-in-out
        overflow-hidden
        ${isHovered ? "w-auto max-w-xs" : "w-10"} {/* Control width on hover */}
        hover:bg-blue-800
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
        group // Enable group-hover variants
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* LinkedIn SVG Icon */}
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="white" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect width="4" height="12" x="2" y="9" />
        <circle cx="4" cy="4" r="2" />
      </svg>
      {/* Username Text */}
      <span className={`text-sm font-medium whitespace-nowrap transition-opacity duration-300 ${isHovered ? "opacity-100" : "opacity-0"}`}>{username}</span>
    </a>
  );
};

export default LinkedInBadge;
