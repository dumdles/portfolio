/**
 * The merged timeline: education, work and leadership on one spine.
 *
 * These were three separate lists on the old site. Merging them is the point
 * rather than a tidy-up: polytechnic, the AC Tesla internship and the club
 * roles all overlap, and the overlap is a better story than any single column
 * tells on its own.
 *
 * Entries are sorted for display by `start`, newest first, so adding one is
 * just appending to the array.
 */

export type TimelineTrack = "education" | "work" | "leadership";

export interface TimelineEntry {
  /** Stable id, used as the React key and the filter anchor. */
  id: string;
  track: TimelineTrack;
  title: string;
  /** Organisation, school or unit. */
  org?: string;
  /** Role or qualification. Shown in mono under the title. */
  role?: string;
  /** One line of detail. Omit rather than pad. */
  detail?: string;
  /** ISO-ish sort key, YYYY-MM. Only used for ordering. */
  start: string;
  /** Human-readable period as it should be printed. */
  period: string;
  /** Marks the entry as current; renders a live dot. */
  current?: boolean;
}

export const tracks: { id: TimelineTrack; label: string }[] = [
  { id: "education", label: "Education" },
  { id: "work", label: "Work" },
  { id: "leadership", label: "Leadership" },
];

export const timeline: TimelineEntry[] = [
  // --- Work ---------------------------------------------------------------
  {
    id: "saf",
    track: "work",
    title: "Singapore Armed Forces",
    role: "Full-time National Serviceman",
    start: "2025-09",
    period: "Sep 2025 — Present",
    current: true,
  },
  {
    id: "ac-tesla",
    track: "work",
    title: "AC Tesla Pte Ltd",
    role: "Full Stack Developer Intern",
    detail: "System architecture, full stack development and cloud infrastructure.",
    start: "2022-06",
    period: "Jun 2022 — Sep 2025",
  },
  {
    id: "giant",
    track: "work",
    title: "Giant",
    role: "Retail Assistant",
    start: "2021-12",
    period: "Dec 2021 — Mar 2022",
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
    period: "2022 — 2025",
  },
  {
    id: "sst",
    track: "education",
    title: "School of Science and Technology, Singapore",
    role: "GCE 'O' Levels",
    detail: "Design Studies as an applied subject.",
    start: "2018-01",
    period: "2018 — 2021",
  },
  {
    id: "horizon",
    track: "education",
    title: "Horizon Primary School",
    role: "PSLE",
    start: "2012-01",
    period: "2012 — 2017",
  },

  // --- Leadership ---------------------------------------------------------
  {
    id: "infocomm",
    track: "leadership",
    title: "SP Infocomm Club",
    role: "Programme Head",
    start: "2024-04",
    period: "2024 — 2025",
  },
  {
    id: "eee-club",
    track: "leadership",
    title: "Electrical and Electronic Engineering Club",
    role: "Publications Secretary",
    start: "2023-04",
    period: "2023 — 2024",
  },
  {
    id: "vice-chair",
    track: "leadership",
    title: "Class Vice-Chairperson",
    role: "School of Science and Technology",
    start: "2021-01",
    period: "2021",
  },
  {
    id: "robotics-apex",
    track: "leadership",
    title: "Robotics@APEX",
    role: "Logistics Head",
    start: "2020-01",
    period: "2020 — 2021",
  },
];

/** Newest first. */
export const timelineSorted = [...timeline].sort((a, b) => b.start.localeCompare(a.start));
