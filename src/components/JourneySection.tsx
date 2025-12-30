"use client";

import React from "react";
import { Separator } from "./ui/separator";

// Card component for a single journey item
interface JourneyCardProps {
  title: string;
  subtitle: string;
  period: string;
}

const JourneyCard: React.FC<JourneyCardProps> = ({ title, subtitle, period }) => {
  return (
    <div
      className="flex justify-between items-start py-6 border-gray-300 dark:border-gray-700 px-4 select-none
                    transition-colors duration-200 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer rounded-lg"
    >
      <div className="flex-1 pr-4">
        <h3 className="text-lg font-semibold text-neutral-800 dark:text-gray-100">{title}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">{subtitle}</p>
      </div>
      <div className="flex-shrink-0 text-sm font-mono text-right text-gray-500 dark:text-gray-500">{period}</div>
    </div>
  );
};

export default function JourneySection() {
  return (
    <section id="journey" className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-slate-900 p-4 font-sans">
      <div className="max-w-3xl w-full py-12 px-4 sm:px-6 lg:px-8">
        <header className="mb-12 text-center">
          <h2 className="text-4xl sm:text-5xl font-bold text-neutral-800 dark:text-neutral-50 mb-4">My Journey</h2>
        </header>

        <div className="space-y-8">
          {/* Education Timeline */}
          <div>
            <div className="inline-block px-4 py-1 mb-6 text-sm font-medium rounded-full bg-gray-200 dark:bg-gray-700 text-neutral-800 dark:text-gray-200">Education</div>
            <div className="space-y-2">
              <JourneyCard title="Horizon Primary School" subtitle="Primary School Leaving Examination (PSLE)" period="2012-2017" />
              <Separator />
              <JourneyCard title="School of Science and Technology, Singapore" subtitle="GCE 'O' Levels, Design Studies Applied Subject" period="2018-2021" />
              <Separator />
              <JourneyCard title="Singapore Polytechnic" subtitle="Diploma in Computer Engineering with a Certificate in Design & Media" period="2022-2025" />
            </div>
          </div>

          {/* Experience Timeline */}
          <div>
            <div className="inline-block px-4 py-1 mb-6 text-sm font-medium rounded-full bg-gray-200 dark:bg-gray-700 text-neutral-800 dark:text-gray-200">Experience</div>
            <div className="space-y-2">
              <JourneyCard title="Part-time Server at McDonald's" subtitle="First part-timer experience during my school holidays" period="Oct 2019" />
              <Separator />
              <JourneyCard title="Retail Assistant at Giant" subtitle="GCE 'O' Levels, Design Studies Applied Subject" period="Dec 2021 → Mar 2022" />
              <Separator />
              <JourneyCard title="Intern Full Stack Developer at AC Tesla Pte Ltd" subtitle="System architecting, full stack development and cloud computing" period="Jun 2022 → Sep 2025" />{" "}
              <Separator />
              <JourneyCard title="NSF at Singapore Armed Forces" subtitle="" period="Sep 2025 → Present" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
