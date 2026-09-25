/**
 * RMAP, the Report Management Application Portal.
 *
 * Sources, so every claim here can be checked:
 *   - the RMAP README (Next.js portal, AWS architecture, features)
 *   - dumdles/rmap: the PHP prototype, 206 commits, Sep 2024 – Apr 2025
 *   - dumdles/rmap-middleware: the PHP API, first commit Apr 2025
 *   - dumdles/rmap_mobile: the Flutter iPad app, first commit Oct 2024
 *
 * The repositories are private and the system belongs to AC Tesla, and this
 * site's source is public. Nothing here may name a host, an endpoint, a
 * table, a secret or a teammate. Architecture level only.
 */

import type { CaseStudy } from "./types";

export const rmap: CaseStudy = {
  slug: "rmap",
  title: "RMAP",
  name: "Report Management Application Portal",
  lead: "AC Tesla uses RMAP to run its infrared thermal scanning inspections, from assigning an inspector to filing the finished report. It began as a PHP prototype I wrote on my own in September 2024. Today it is a Next.js portal, a PHP API and an offline iPad app, maintained by a small team on AWS.",
  disciplines: ["build", "design", "break"],
  titleBlock: [
    { label: "Role", value: "Prototype, iPad app, API" },
    { label: "For", value: "AC Tesla Pte Ltd" },
    { label: "Period", value: "2024–2026" },
    { label: "Stack", value: "Next.js 14, PHP, Flutter, MySQL, AWS" },
    { label: "Status", value: "In production" },
  ],
  sections: [
    {
      kind: "prose",
      id: "context",
      part: "A",
      eyebrow: "Context",
      title: "What it is for",
      paragraphs: [
        "Infrared thermal scanning checks electrical equipment for parts running hotter than they should. An inspector walks a site with a thermal camera, records a reading for each component, and photographs anything that looks like a hotspot. The next visit works through the same list.",
        "RMAP holds all of it: customers and contractors, who is assigned where, every component's readings, and whether each report is a draft, reserved or submitted. It also runs two automated checks. One looks for mislabelled equipment in a report's Excel data. The other flags thermal hotspots above a threshold the user sets.",
      ],
    },
    {
      kind: "system",
      id: "architecture",
      part: "B",
      eyebrow: "Architecture",
      title: "How the parts connect",
      lead: "Two clients share one API. The database sits in a private subnet behind the PHP middleware.",
      diagram: {
        width: 1080,
        height: 620,
        zones: [
          { id: "aws", label: "AWS", x: 205, y: 20, w: 855, h: 590 },
          { id: "vpc", label: "VPC", x: 465, y: 205, w: 580, h: 250 },
          { id: "public", label: "Public subnet", x: 485, y: 240, w: 245, h: 200 },
          { id: "private", label: "Private subnet", x: 770, y: 240, w: 260, h: 200 },
        ],
        nodes: [
          { id: "browser", label: "Browser", sub: "Portal users", x: 30, y: 110, description: "Admins, engineers and inspectors create, assign and review reports in the portal." },
          { id: "route53", label: "Route 53", sub: "DNS", x: 240, y: 45, description: "Resolves the portal's domain." },
          { id: "amplify", label: "Amplify", sub: "Next.js 14, SSR", x: 240, y: 125, description: "Builds and serves the Next.js 14 portal, rendered on the server." },
          { id: "ipad", label: "iPad app", sub: "Flutter", x: 30, y: 320, description: "Runs inspections in the field. It works with no connection; only the upload needs one." },
          { id: "sqlite", label: "SQLite", sub: "On the iPad", x: 30, y: 392, description: "Holds reports and inspections on the device. Each schema migration first copies the database to a timestamped backup." },
          { id: "waf", label: "WAF", sub: "Request filter", x: 240, y: 320, description: "Filters requests before they reach the load balancer." },
          { id: "alb", label: "Load balancer", sub: "ALB, TLS", x: 532, y: 265, description: "Spreads requests across the middleware and terminates TLS." },
          { id: "eb", label: "Middleware", sub: "PHP, Beanstalk", x: 532, y: 365, description: "The PHP API on Elastic Beanstalk. It checks every request's token and permissions, and logs what users do." },
          { id: "rds", label: "Database", sub: "MySQL, Aurora/RDS", x: 825, y: 315, description: "MySQL in a private subnet. Development and production run on separate instances." },
          { id: "s3", label: "S3", sub: "Files, images", x: 532, y: 520, description: "Report files and inspection images." },
          { id: "ecr", label: "ECR", sub: "Model container", x: 485, y: 60, description: "Holds the container image that runs the AI checks." },
          { id: "sagemaker", label: "SageMaker", sub: "Inference", x: 680, y: 60, description: "Runs the AI checks: mislabelled equipment in Excel data, and hotspots above the user's threshold. The models are YOLO-based." },
          { id: "s3ai", label: "S3", sub: "Models, results", x: 875, y: 60, description: "Trained model files going in, processed images coming out." },
          { id: "backup", label: "AWS Backup", sub: "60 days", x: 825, y: 520, description: "Keeps backups of S3 for 60 days." },
          { id: "nas", label: "NAS", sub: "On site", x: 30, y: 520, description: "A second copy of S3, kept on a QNAP NAS on premises." },
        ],
        edges: [
          { from: "browser", to: "route53", points: [[180, 125], [214, 125], [214, 71], [240, 71]] },
          { from: "browser", to: "amplify", points: [[180, 151], [240, 151]] },
          { from: "amplify", to: "waf", points: [[315, 177], [315, 320]] },
          { from: "ipad", to: "waf", points: [[180, 346], [240, 346]] },
          { from: "ipad", to: "sqlite", points: [[105, 372], [105, 392]], both: true },
          { from: "waf", to: "alb", points: [[390, 346], [452, 346], [452, 291], [532, 291]] },
          { from: "alb", to: "eb", points: [[607, 317], [607, 365]] },
          { from: "eb", to: "rds", points: [[682, 404], [795, 404], [795, 341], [825, 341]] },
          { from: "eb", to: "s3", points: [[607, 417], [607, 520]] },
          { from: "eb", to: "sagemaker", points: [[682, 378], [755, 378], [755, 112]] },
          { from: "ecr", to: "sagemaker", points: [[635, 86], [680, 86]] },
          { from: "sagemaker", to: "s3ai", points: [[830, 86], [875, 86]], both: true },
          { from: "s3", to: "backup", points: [[682, 546], [825, 546]] },
          { from: "s3", to: "nas", points: [[532, 546], [180, 546]] },
        ],
      },
    },
    {
      kind: "flow",
      id: "cycle",
      part: "C",
      eyebrow: "Workflow",
      title: "One inspection, start to finish",
      lead: "Steps three to five happen on an iPad, and none of them needs a signal. Only the upload does.",
      steps: [
        { title: "Create", body: "An admin creates the report in the portal.", where: "Portal" },
        { title: "Assign", body: "The report goes to the inspector responsible for the site.", where: "Portal" },
        { title: "Choose a source", body: "On the iPad, the inspector picks the data source for the report.", where: "iPad", offline: true },
        {
          title: "Inspect",
          body: "The last visit's items load as a checklist. A tap records an image number, a hotspot or a current reading. New items go in where the site has changed.",
          where: "iPad",
          offline: true,
        },
        { title: "Complete", body: "Once every item is captured, the inspection is marked complete.", where: "iPad", offline: true },
        { title: "Upload", body: "The app sends it to the API, and the portal generates the report from it.", where: "iPad", online: true },
      ],
    },
    {
      kind: "anatomy",
      id: "numbers",
      part: "D",
      eyebrow: "Report numbers",
      title: "Reading a report number",
      lead: "Each report type counts on its own, month by month, and a number can be held before its report exists. A number is free only when no report uses it and nobody has reserved it.",
      example: [
        { text: "IRTS", label: "Type", note: "IRTS for thermal scans. Three other report types keep separate sequences." },
        { text: "2508", label: "Year, month", note: "Two digits each. This one is August 2025." },
        { text: "07", label: "Sequence", note: "One above the highest number issued that month for that type." },
      ],
      notes: ["A reservation records who holds the number and when they took it.", "Reinspections are tracked as levels, R1 to R3, and a reservation carries its level."],
    },
    {
      kind: "prose",
      id: "offline",
      part: "E",
      eyebrow: "Offline",
      title: "Working without signal",
      paragraphs: [
        "The iPad app keeps everything in SQLite and marks each report and inspection as uploaded or not, so the inspector can see what still has to go. A banner shows when the connection drops, and uploads show their progress.",
        "The checklist for a visit comes from the site's most recent report, and the app flags any current reading above the component's rating.",
        "The local schema is on version 34. Before each migration the app copies its database to a timestamped backup. Inspectors can also back up by hand or export a report to Excel.",
      ],
    },
    {
      kind: "list",
      id: "security",
      part: "F",
      eyebrow: "Security",
      title: "What is in place",
      items: [
        "A web application firewall filters requests before they reach the load balancer.",
        "The database is in a private subnet.",
        "Every API endpoint requires a signed token, apart from a short list of public ones such as login.",
        "Permissions are granular, per user and per group, and fail closed. If they cannot be loaded, the request gets none.",
        "Cross-origin requests are accepted only from allowlisted domains.",
        "Deletes are soft. Only an admin can restore a record or remove it for good.",
        "User actions are written to an audit log.",
        "S3 is backed up twice: 60 days in AWS Backup, and a copy on a NAS on premises.",
        "The infrastructure is defined in Terraform.",
      ],
    },
    {
      kind: "contributions",
      id: "role",
      part: "G",
      eyebrow: "My part",
      title: "What I built",
      paragraphs: [
        "I wrote the first version alone: a PHP and MySQL app, run on XAMPP, from September 2024 to April 2025.",
        "In October 2024 I started the iPad app. Its first layout, login with token auth, offline viewing and the first upload path are mine.",
        "When the API moved into its own repository in April 2025, I created it. My parts of it are sign-up, login, password reset and sessions; the endpoints behind the AI checks, including batch handling; report number reservations and their reinspection levels; and importing historic reports.",
        "The Next.js portal, the AI models and the Terraform setup were built with the team.",
      ],
      items: [
        { repo: "Prototype", what: "PHP, MySQL", mine: 206, total: 206 },
        { repo: "iPad app", what: "Flutter", mine: 110, total: 283 },
        { repo: "API", what: "PHP middleware", mine: 127, total: 565 },
      ],
      footnote: "Commit counts show how often someone committed, not how much they changed. The Next.js portal's repository is not counted.",
    },
    {
      kind: "milestones",
      id: "history",
      part: "H",
      eyebrow: "History",
      title: "How it grew",
      items: [
        { date: "Sep 2024", text: "First commit on the PHP prototype." },
        { date: "Oct 2024", text: "iPad app started, with login and token auth in its first week." },
        { date: "Apr 2025", text: "The API gets its own repository, and the portal moves to Next.js on AWS Amplify." },
        { date: "Jul 2025", text: "Reserved report numbers gain reinspection levels." },
        { date: "Mar 2026", text: "AI report checks start recording who checked them, with a history." },
        { date: "Sep 2026", text: "The iPad app's local schema reaches version 34." },
      ],
    },
  ],
  notice: "RMAP belongs to AC Tesla Pte Ltd and its source is private, so this page stays at the level of its architecture.",
};
