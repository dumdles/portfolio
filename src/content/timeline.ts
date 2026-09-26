/**
 * The timeline: education, work and service on one spine.
 *
 * Each school carries what happened there, in `involvements`: co-curricular
 * activities, leadership roles, achievements. Those used to be a separate
 * "leadership" list with no school attached, which lost the most useful
 * fact about them, which is where and when they happened.
 *
 * Entries are sorted for display by `start`, newest first, so adding one is
 * just appending to the array.
 *
 * ────────────────────────────────────────────────────────────────────────
 *  STILL TO FILL IN, marked TODO below. Gaps are left empty rather than
 *  guessed; an empty field renders nothing, so the page stays honest.
 * ────────────────────────────────────────────────────────────────────────
 */

export type TimelineTrack = "education" | "work" | "service";

export type InvolvementKind = "cca" | "leadership" | "achievement" | "project";

export const involvementLabels: Record<InvolvementKind, string> = {
  cca: "CCA",
  leadership: "Leadership",
  achievement: "Achievement",
  project: "Project",
};

export interface Involvement {
  kind: InvolvementKind;
  /** The club, committee, competition or project. */
  title: string;
  /** Your position in it. */
  role?: string;
  period?: string;
  /** One line on what you actually did. Omit rather than pad. */
  detail?: string;
}

export interface TimelineEntry {
  /** Stable id, used as the React key. */
  id: string;
  track: TimelineTrack;
  /** Organisation, school or unit. */
  title: string;
  /** Role or qualification. Shown in mono under the title. */
  role?: string;
  /** Parent organisation, where the title alone is ambiguous. */
  org?: string;
  /** One line of detail. Omit rather than pad. */
  detail?: string;
  /** YYYY-MM. Only used for ordering. */
  start: string;
  /** Human-readable period as it should be printed. */
  period: string;
  /** Marks the entry as current; renders a live marker. */
  current?: boolean;
  /** A case study about work done here. */
  href?: string;
  /** What happened here beyond the headline. Schools mostly. */
  involvements?: Involvement[];
}

export const tracks: { id: TimelineTrack; label: string }[] = [
  { id: "education", label: "Education" },
  { id: "work", label: "Work" },
  { id: "service", label: "Service" },
];

export const timeline: TimelineEntry[] = [
  // --- Service ------------------------------------------------------------
  {
    id: "dis",
    track: "service",
    title: "Digital and Intelligence Service",
    org: "Singapore Armed Forces",
    role: "C4X Expert",
    start: "2025-09",
    period: "Sep 2025 – Present",
    current: true,
  },

  // --- Work ---------------------------------------------------------------
  {
    id: "ac-tesla",
    track: "work",
    title: "AC Tesla Pte Ltd",
    role: "Full Stack Developer Intern",
    detail: "Took RMAP, the company's inspection reporting system, from a basic prototype to production on AWS, and led its team of four.",
    href: "/projects/rmap",
    start: "2022-06",
    period: "Jun 2022 – Sep 2025",
  },
  {
    id: "giant",
    track: "work",
    title: "Giant",
    role: "Retail Assistant",
    start: "2021-12",
    period: "Dec 2021 – Mar 2022",
  },
  {
    id: "mcdonalds",
    track: "work",
    title: "McDonald's",
    role: "Server, part-time",
    detail: "First job, over the school holidays.",
    start: "2019-10",
    period: "Oct 2019",
  },

  // --- Education ----------------------------------------------------------
  {
    id: "sp",
    track: "education",
    title: "Singapore Polytechnic",
    role: "Diploma in Computer Engineering",
    detail: "With a Certificate in Design & Media.",
    start: "2022-04",
    period: "2022–2025",
    involvements: [
      { kind: "leadership", title: "SP Infocomm Club", role: "Programme Head", period: "2024–2025" },
      { kind: "leadership", title: "Electrical and Electronic Engineering Club", role: "Publications Secretary", period: "2023–2024" },
      // TODO: final-year project, awards, competitions, other clubs.
    ],
  },
  {
    id: "sst",
    track: "education",
    title: "School of Science and Technology, Singapore",
    role: "GCE 'O' Levels",
    detail: "Design Studies as an applied subject.",
    start: "2018-01",
    period: "2018–2021",
    involvements: [
      { kind: "cca", title: "Robotics@APEX", role: "Logistics Head", period: "2020–2021" },
      { kind: "leadership", title: "Class Committee", role: "Vice-Chairperson", period: "2021" },
      // TODO: competitions, awards, other roles.
    ],
  },
  {
    id: "horizon",
    track: "education",
    title: "Horizon Primary School",
    role: "PSLE",
    start: "2012-01",
    period: "2012–2017",
    // TODO: CCA and any roles.
  },
];

/** Newest first. */
export const timelineSorted = [...timeline].sort((a, b) => b.start.localeCompare(a.start));
