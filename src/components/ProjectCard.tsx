"use client";

import React from "react";

interface ProjectCardProps {
  title: string;
  description: string;
  imageUrl: string;
  index: number; // The index is crucial for the stacking effect
}

const ProjectCard: React.FC<ProjectCardProps> = ({ title, description, imageUrl, index }) => {
  // We use the index to create a staggered sticky effect.
  // The 'top' value increases with each card, so they stack on top of each other.
  const topOffset = 20 * index; // You can adjust this value to change the spacing.

  return (
    <div
      className="rounded-3xl shadow-2xl bg-white dark:bg-gray-800 text-neutral-800 dark:text-white overflow-hidden"
      style={{
        position: "sticky",
        top: `${100 + topOffset}px`, // The offset from the top of the viewport
        zIndex: 100 - index, // Ensures cards appear in the correct stacking order
      }}
    >
      <div className="md:flex">
        <div className="md:flex-shrink-0">
          <img
            className="h-full w-full object-cover md:w-56"
            src={imageUrl}
            alt={`Image for ${title}`}
            // Add a placeholder image in case the URL fails to load
            onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
              e.currentTarget.src = "https://placehold.co/400x400/333/FFF?text=Image+Not+Found";
            }}
          />
        </div>
        <div className="p-8">
          <h3 className="text-2xl font-bold mb-2">{title}</h3>
          <p className="text-gray-600 dark:text-gray-400">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
