/**
 * RMAP, the Report Management Application Portal.
 *
 * Sources, so every claim here can be checked:
 *   - the RMAP README (Next.js portal, AWS architecture, features)
 *   - dumdles/rmap: the PHP prototype, 206 commits, Sep 2024 – Apr 2025
 *   - dumdles/rmap-middleware: the PHP API, first commit Apr 2025
 *   - dumdles/rmap_mobile: the Flutter iPad app, first commit Oct 2024
 *   - Dylan, 2026-09-26: the history list, the team of four, ~20 daily users
 *
 * The repositories are private and the system belongs to AC Tesla, and this
 * site's source is public. Nothing here may name a host, an endpoint, a
 * table, a secret or a teammate, and security controls, report numbering
 * and internal version numbers stay out too (Dylan asked for an overview).
 */

import type { CaseStudy } from "./types";

export const rmap: CaseStudy = {
  slug: "rmap",
  title: "RMAP",
  name: "Report Management Application Portal",
  lead: "AC Tesla uses RMAP to run its infrared thermal scanning inspections, from assigning an inspector to filing the finished report. I took it on alone as a basic PHP prototype. Today it is a Next.js portal, a PHP API and an offline iPad app on AWS, with about 20 people using it each day.",
  disciplines: ["build", "design", "break"],
  titleBlock: [
    { label: "Role", value: "Solo developer, then team lead" },
    { label: "For", value: "AC Tesla Pte Ltd" },
    { label: "Period", value: "2024–2026" },
    { label: "Stack", value: "Next.js 14, PHP, Flutter, MySQL, AWS" },
    { label: "Status", value: "In production, about 20 daily users" },
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
      lead: "The portal and the iPad app share one PHP API, which is the only thing that talks to the database.",
      caption: "RMAP on AWS, simplified. Hosts and endpoints are left out.",
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
          { id: "eb", label: "Middleware", sub: "PHP, Beanstalk", x: 532, y: 365, description: "The PHP API on Elastic Beanstalk. The portal and the iPad app both go through it." },
          { id: "rds", label: "Database", sub: "MySQL, Aurora/RDS", x: 825, y: 315, description: "MySQL, behind the API." },
          { id: "s3", label: "S3", sub: "Files, images", x: 532, y: 520, description: "Report files and inspection images." },
          { id: "ecr", label: "ECR", sub: "Model container", x: 485, y: 60, description: "Holds the container image that runs the AI checks." },
          { id: "sagemaker", label: "SageMaker", sub: "Inference", x: 680, y: 60, description: "Runs the AI checks: mislabelled equipment in Excel data, and hotspots above the user's threshold." },
          { id: "s3ai", label: "S3", sub: "Models, results", x: 875, y: 60, description: "Trained model files going in, processed images coming out." },
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
      band: "No signal needed",
      steps: [
        { title: "Create", body: "An admin creates the report in the portal.", where: "Portal" },
        { title: "Assign", body: "The report goes to the inspector responsible for the site.", where: "Portal" },
        { title: "Choose a source", body: "On the iPad, the inspector picks the data source for the report.", where: "iPad", banded: true },
        {
          title: "Inspect",
          body: "The last visit's items load as a checklist. A tap records an image number, a hotspot or a current reading. New items go in where the site has changed.",
          where: "iPad",
          banded: true,
        },
        { title: "Complete", body: "Once every item is captured, the inspection is marked complete.", where: "iPad", banded: true },
        { title: "Upload", body: "The app sends it to the API, and the portal generates the report from it.", where: "iPad", note: "Needs signal" },
      ],
    },
    {
      kind: "prose",
      id: "offline",
      part: "D",
      eyebrow: "Offline",
      title: "Working without signal",
      paragraphs: [
        "The iPad app keeps reports and inspections in SQLite on the device, so an inspection can run on a site with no signal. The checklist for each visit comes from that site's last report.",
        "Each report is marked as uploaded or not, so the inspector can see what still has to go once the connection is back.",
      ],
    },
    {
      kind: "milestones",
      id: "history",
      part: "E",
      eyebrow: "History",
      title: "How it grew",
      items: [
        { text: "It started as a solo project, handed to me as a basic PHP and HTML prototype." },
        { text: "I rewrote it in Next.js, with a PHP middleware so a mobile app could use the same data later." },
        { text: "I built that app for the iPad in Flutter, with SQLite for storage on the device." },
        { text: "I went on to lead a team of four that moved it onto AWS and scaled it." },
        { text: "It runs in production with about 20 daily users." },
      ],
    },
  ],
  notice: "RMAP belongs to AC Tesla Pte Ltd and its source is private, so this page is an overview.",
};
