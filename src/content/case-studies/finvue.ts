/**
 * Finvue, a personal finance app for Singapore.
 *
 * Sources, so every claim here can be checked:
 *   - dumdles/portfolio-tracker (private): 255 commits, 21 Apr – 20 Sep 2026,
 *     every one by Dylan; 223 test files
 *   - docs/email-capture.md: the inbound email pipeline and duplicate rules
 *   - docs/fire.md: the two-pool engine, nominal dollars, Fisher, the bridge
 *   - docs/wallet-capture.md and docs/mobile.md: the iOS app and Wallet capture
 *   - lib/fire/constants.ts: SRS statutory retirement age, 63 by default
 *   - .github/workflows/crons.yml: five schedules
 *
 * A personal project, so it can go deeper than RMAP. It is also a live app
 * that holds people's money records, so security controls, secrets, the
 * schema and past vulnerabilities stay out.
 */

import type { CaseStudy } from "./types";

export const finvue: CaseStudy = {
  slug: "finvue",
  title: "Finvue",
  name: "Personal finance for Singapore",
  lead: "Finvue keeps a Singaporean's money in one ledger: bank accounts, US and SGX shares, Endowus funds, T-bills, CPF and daily spending. From that ledger it answers when they could stop working. I design and build it alone, on the web and on iOS.",
  disciplines: ["build", "design"],
  titleBlock: [
    { label: "Role", value: "Design and development, alone" },
    { label: "Period", value: "Apr 2026 – present" },
    { label: "Stack", value: "Next.js 16, Supabase, Expo, Vercel" },
    { label: "Size", value: "255 commits, 223 test files" },
    { label: "Status", value: "Live" },
  ],
  live: { label: "finvue.xyz", href: "https://finvue.xyz" },
  sections: [
    {
      kind: "prose",
      id: "context",
      part: "A",
      eyebrow: "Context",
      title: "What it is for",
      paragraphs: [
        "A Singaporean's money sits in places with rules of their own: CPF, which opens in stages from 55, SRS, Endowus funds, SGS T-bills, and shares that pay dividends through SGX.",
        "Finvue tracks each of these. It logs spending from the alert emails banks already send, records dividends on the day they pay, splits bills with friends, and runs a retirement plan off those same records.",
      ],
    },
    {
      kind: "system",
      id: "architecture",
      part: "B",
      eyebrow: "Architecture",
      title: "How the parts connect",
      lead: "One Next.js app on Vercel serves the web, the API and the scheduled jobs. The iOS app talks to the same database directly.",
      caption: "Finvue, simplified. Secrets and internal routes are left out.",
      diagram: {
        width: 1100,
        height: 550,
        zones: [
          { id: "vercel", label: "Vercel", x: 465, y: 60, w: 200, h: 370 },
          { id: "supabase", label: "Supabase", x: 715, y: 45, w: 190, h: 230 },
          { id: "services", label: "Services", x: 925, y: 45, w: 170, h: 290 },
        ],
        nodes: [
          { id: "web", label: "Web app", sub: "Browser", x: 30, y: 90, description: "Net worth, investments, spending, budgets and the FIRE planner." },
          { id: "ios", label: "iOS app", sub: "Expo", x: 30, y: 200, description: "Reads and writes the database directly, and calls the API for the AI coach." },
          { id: "bank", label: "Bank alerts", sub: "Forwarded email", x: 30, y: 360, description: "Alert emails from the user's bank, forwarded to their own Finvue address." },
          { id: "wallet", label: "Apple Pay taps", sub: "iOS Shortcuts", x: 30, y: 470, description: "A Shortcuts automation posts each Wallet tap: merchant, amount and card." },
          { id: "gha", label: "GitHub Actions", sub: "5 schedules", x: 250, y: 20, description: "Starts the scheduled jobs: daily alerts, dividend events, portfolio snapshots, summaries, and a weekly check that the rest all ran." },
          { id: "cf", label: "Email Routing", sub: "Cloudflare", x: 250, y: 360, description: "Receives forwarded mail and hands it to the webhook." },
          { id: "next", label: "Next.js 16", sub: "Pages, API, jobs", x: 490, y: 90, description: "The web app and its API. Scheduled jobs are API routes too." },
          { id: "hooks", label: "Webhooks", sub: "Email, Wallet", x: 490, y: 360, description: "Turn a forwarded email or a Wallet tap into a transaction." },
          { id: "auth", label: "Auth", sub: "Google, TOTP", x: 735, y: 70, description: "Supabase Auth, with Google sign-in and TOTP two-factor." },
          { id: "db", label: "Postgres", sub: "Row-level security", x: 735, y: 200, description: "Row-level security limits every query to the user's own rows, which is why the iOS app needs no backend of its own." },
          { id: "market", label: "Market data", sub: "Yahoo, SGX, FX", x: 935, y: 70, description: "Prices from Yahoo Finance, dividend announcements from SGX, and exchange rates." },
          { id: "ai", label: "AI models", sub: "OpenRouter", x: 935, y: 260, description: "Reads the emails no pattern matches, reads receipts, and runs the AI coach." },
        ],
        edges: [
          { from: "web", to: "next", points: [[180, 116], [490, 116]] },
          { from: "ios", to: "next", points: [[105, 200], [105, 170], [565, 170], [565, 142]] },
          { from: "ios", to: "db", points: [[180, 236], [735, 236]] },
          { from: "gha", to: "next", points: [[400, 46], [530, 46], [530, 90]] },
          { from: "next", to: "auth", points: [[640, 100], [735, 100]] },
          { from: "next", to: "db", points: [[640, 128], [700, 128], [700, 216], [735, 216]] },
          { from: "next", to: "market", points: [[600, 90], [600, 30], [1010, 30], [1010, 70]] },
          { from: "next", to: "ai", points: [[640, 138], [920, 138], [920, 272], [935, 272]] },
          { from: "bank", to: "cf", points: [[180, 386], [250, 386]] },
          { from: "cf", to: "hooks", points: [[400, 386], [490, 386]] },
          { from: "wallet", to: "hooks", points: [[180, 496], [445, 496], [445, 402], [490, 402]] },
          { from: "hooks", to: "db", points: [[640, 376], [700, 376], [700, 246], [735, 246]] },
          { from: "hooks", to: "ai", points: [[640, 396], [910, 396], [910, 300], [935, 300]] },
        ],
      },
    },
    {
      kind: "flow",
      id: "email",
      part: "C",
      eyebrow: "Logging",
      title: "A bank alert becomes a transaction",
      lead: "Most alerts are logged with no AI call. Two records with different bank references are always two charges, however alike they look. That rule came after two S$1.60 drinks from the same vending machine were merged into one.",
      band: "Parse",
      steps: [
        { title: "Forward", body: "The bank's alert goes to the user's own Finvue address.", where: "Email" },
        { title: "Receive", body: "Cloudflare Email Routing hands it to the webhook.", where: "Webhook" },
        { title: "Skip repeats", body: "An email already seen, by its Message-ID, stops here.", where: "Webhook" },
        { title: "Match a pattern", body: "Nine patterns, most specific first, cover the common alerts.", where: "Regex", banded: true },
        { title: "Fall back", body: "Only if none match does a model read it, into a fixed JSON shape.", where: "AI", banded: true },
        { title: "Record", body: "The bank's reference and the time decide whether it is new. New ones go into the ledger.", where: "Ledger" },
      ],
    },
    {
      kind: "pools",
      id: "fire",
      part: "D",
      eyebrow: "Retirement",
      title: "Retiring early in Singapore",
      lead: "Much of a young Singaporean's savings sits in CPF, which opens at 55 and pays an income from 65. The planner treats each pool by the age it can be spent.",
      diagram: {
        from: 30,
        to: 85,
        ticks: [30, 40, 50, 55, 63, 65, 75, 85],
        marker: { at: 50, label: "Stops work" },
        span: { from: 50, to: 65, label: "Bridge" },
        lanes: [
          { label: "Salary", segments: [{ from: 30, to: 50 }] },
          { label: "Investments", sub: "and cash", segments: [{ from: 30, to: 85 }] },
          {
            label: "CPF",
            segments: [
              { from: 55, to: 65, kind: "partial", label: "Part" },
              { from: 65, to: 85, label: "CPF LIFE" },
            ],
          },
          { label: "SRS", segments: [{ from: 63, to: 85 }] },
        ],
        caption: "An example: stopping work at 50. CPF opens in part at 55 and pays CPF LIFE from 65; SRS opens at its statutory age, 63 by default.",
      },
      paragraphs: [
        "A simple check multiplies net worth by 4% and compares it with spending. It would call a 30-year-old with most of their money in CPF financially independent, though that money stays locked for decades.",
        "What decides most early retirements is the bridge, the years between stopping work and CPF paying out, which investments and cash have to cover alone. When a plan fails, the planner says whether it failed on the bridge or ran out later, because the fixes are opposite: keep more cash, or work longer.",
        "CPF LIFE pays a fixed number of dollars that never rises with inflation. So the engine works in nominal dollars and converts to today's dollars only for display. Doing it the other way round overstates how well a plan holds up by about 40% over 30 years.",
      ],
    },
    {
      kind: "list",
      id: "numbers",
      part: "E",
      eyebrow: "Accuracy",
      title: "Getting the numbers right",
      lead: "At a 4% withdrawal rate, every S$100 a month of spending adds S$30,000 to the target. Small errors in the inputs move the retirement date by years.",
      items: [
        "Real returns use the Fisher equation, (1 + n) / (1 + i) − 1. Subtracting inflation from the return overstates it by about 0.11 points a year at 7% and 2.5%.",
        "Dividends come out of the expected total return. A test checks that reinvesting the yield lands exactly where growing at the total return does.",
        "The spending figure leaves out the current month, which always reads low until it ends, and averages only over months that have data.",
        "Budgets and the retirement plan share one definition of spending. A test checks they select the same transactions.",
        "Below six complete months of history, the plan says its figure is low confidence.",
        "Twelve withdrawal strategies can be compared side by side, and a Monte Carlo stress test runs the plan against varied market returns.",
      ],
    },
    {
      kind: "prose",
      id: "ios",
      part: "F",
      eyebrow: "iOS",
      title: "On the iPhone",
      paragraphs: [
        "The iOS app is built with Expo and uses the same database as the web app. Row-level security keeps each user to their own rows, so the app needed no backend of its own. The retirement engine has no dependencies on React or the database, so both apps run the same code.",
        "iOS only lets apps read Apple Card and Apple Cash transactions, which are US-only. So Apple Pay taps are caught by a Shortcuts automation that fires on every Wallet payment and posts it to Finvue. The app keeps a queue of them, each one tap away from being logged.",
      ],
    },
    {
      kind: "milestones",
      id: "history",
      part: "G",
      eyebrow: "History",
      title: "How it grew",
      items: [
        { date: "Apr 2026", text: "First commit: sign-in and a portfolio of holdings." },
        { date: "May 2026", text: "Spending logged from forwarded bank emails." },
        { date: "Jun 2026", text: "CPF tracking, and an AI coach that can look up the user's own figures." },
        { date: "Jul 2026", text: "The iOS app, with Apple Wallet capture. Receipts are read and split item by item." },
        { date: "Aug 2026", text: "The retirement planner, its stress test, and Google sign-in with two-factor." },
        { date: "Sep 2026", text: "Dividends logged on the day they pay." },
      ],
    },
  ],
  notice: "Finvue's source is private. Figures on this page come from its repository.",
};
