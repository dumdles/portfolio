"use client";

import React from "react";
import ProjectCard from "./ProjectCard";
import { SectionHeader } from "@/components/primitives";

// Placeholder data for the projects section
const projectsData = [
  {
    title: "Project Alpha",
    description: "A brief, concise description of Project Alpha. This project was a fun challenge that allowed me to explore new technologies and solve a complex problem.",
    imageUrl: "https://placehold.co/1200x800/222/FFF?text=Project+Alpha",
  },
  {
    title: "Project Beta",
    description: "Project Beta was a collaborative effort to build a scalable web application. We focused on clean architecture and test-driven development to ensure robustness.",
    imageUrl: "https://placehold.co/1200x800/333/FFF?text=Project+Beta",
  },
  {
    title: "Project Gamma",
    description: "In Project Gamma, I designed and developed a mobile-first UI for a finance app. My goal was to create an intuitive user experience with a modern aesthetic.",
    imageUrl: "https://placehold.co/1200x800/444/FFF?text=Project+Gamma",
  },
  {
    title: "Project Delta",
    description: "Project Delta involved building a real-time data visualization dashboard. I used d3.js to create interactive charts and graphs from live data streams.",
    imageUrl: "https://placehold.co/1200x800/555/FFF?text=Project+Delta",
  },
];

export default function ProjectsSection() {
  return (
    <section id="projects" className="relative min-h-screen bg-paper pb-12 pt-24 text-ink">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <SectionHeader part="02" eyebrow="Selected works" align="center" className="mb-12" title="My Projects" lead="A showcase of my recent work and creations." />

        {/* The container for the stacking cards */}
        <div className="relative space-y-5">
          {projectsData.map((project, index) => (
            <ProjectCard key={index} {...project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
