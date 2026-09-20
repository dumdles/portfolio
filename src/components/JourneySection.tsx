"use client";

import React from "react";
import { Separator } from "./ui/separator";
import { SectionHeader, TechnicalLabel } from "@/components/primitives";

// Card component for a single journey item
interface JourneyCardProps {
  title: string;
  subtitle: string;
  period: string;
}

const JourneyCard: React.FC<JourneyCardProps> = ({ title, subtitle, period }) => {
  return (
    <div className="flex items-start justify-between gap-4 rounded-md px-4 py-6 transition-colors duration-200 hover:bg-surface-muted">
      <div className="flex-1">
        <h3 className="font-display text-heading-sm font-semibold text-ink">{title}</h3>
        {subtitle && <p className="text-body-sm text-ink-muted">{subtitle}</p>}
      </div>
      <div className="shrink-0 text-right font-mono text-caption text-ink-faint">{period}</div>
    </div>
  );
};

export default function JourneySection() {
  return (
    <section id="journey" className="flex min-h-screen flex-col items-center justify-center bg-paper p-4 text-ink">
      <div className="w-full max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <SectionHeader part="03" eyebrow="Timeline" align="center" className="mb-12" title="My Journey" />

        <div className="space-y-8">
          {/* Education Timeline */}
          <div>
            <TechnicalLabel rule tone="brand" className="mb-6">
              Education
            </TechnicalLabel>
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
            <TechnicalLabel rule tone="brand" className="mb-6">
              Experience
            </TechnicalLabel>
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
