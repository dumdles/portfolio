---
name: unslop-portfolio-copy
description: Apply before writing or editing any text that appears on the website, including headings, leads, project summaries, case studies, alt text, metadata and button labels. Lists the default phrasings and conceits to avoid in portfolio copy for a designer, engineer and security practitioner, measured with unslop, plus rules drawn from an audit of this site's own copy.
---

# Unslop: Personal Portfolio Copy (Designer / Engineer / Security Practitioner)

Unslop profile for personal portfolio website copy for a designer, software engineer and security practitioner: hero taglines, about sections, project case studies, section intros and footers.

## Meta-conversation patterns to avoid

- Don't preface deliverables with "Here's a draft:", "Here's a —", "Here are 5 options, ranging from X to Y:", or any variant announcing that a list/draft follows.
- Don't produce a spread of options framed as a spectrum ("ranging from subtle to more direct", "minimal to playful", "playful / minimalist / enterprise-serious"). Commit to one piece of copy.
- Don't append a self-editorialized favorite in the form "**My pick:** [option] — [reason]". If asked for options, present them plainly without ranking commentary.
- Don't close with an offer menu shaped like "Want me to [A], or [B]?" or any sentence starting with "Want me to" / "Want a". Don't invite further iteration as a mandatory closing beat.
- Don't self-report word counts as a standalone sentence (e.g., "That's ~195 words.").
- Don't wrap the actual copy between `---` horizontal rules to separate "product" from "chat." Just answer.
- Don't respond to a request for concrete details with a ritual refusal like "I don't want to invent details/credentials/technical claims that would misrepresent real work." If specifics are missing, ask once, briefly, in plain language — not as a numbered template.
- Don't produce numbered clarifying-question lists in the skeleton: bolded 2-3 word label + em dash + "(e.g., ...)" with three examples. This applies regardless of project type (pentest, crypto app, dashboard, etc.) — don't reuse the same 6-7 item skeleton (context → technical detail → method → impact → resolution → format).

## Phrases and conceits to never use

- The "build it, then break it / secure it" duality as the central conceit of a tagline or bio. Avoid all phrasings of this sequence: "I design/build X, then break/attack/secure it", "builds things... then tries to break them", "I build the front door, then check the locks", "design → build → lock the door behind them."
- Staccato period-separated tricolon fragments standing in for a real sentence: "Breaks. Builds. Secures." / "Design. Engineering. Security. One person." Any three (or near-three) one-to-two-word fragments each ending in a period.
- A rhetorical "what X" question as the punchy payoff line: "what did we miss?", "what happens when someone tries to make it fail", "what makes something believable."
- "Not just X but Y" / "I'm not X, I'm Y" hedge-then-correct antithesis construction.
- Spatial-metaphor framing for multidisciplinary identity: "intersection of craft and rigor", "both sides of the stack", "both ends of that line", "across the stack", "where X, Y, and Z converge." State what the person does; don't describe it as a geometric meeting point.
- "I care about ___" as a stand-in for demonstrated conviction (e.g., "I care about the details most people skip", "I care about clean abstractions").
- The fixed hacker-pun joke bank for footers/easter eggs: SHA-256 references, "handshake trusted", "$ whoami", "paranoia" as a virtue, "no vulnerabilities disclosed [today]", cookie puns ("no cookies were harmed"), fingerprint hex strings, "mostly on purpose." These specific jokes are exhausted — don't reach for any of them.
- The narrow security/engineering buzzword shortlist used as default vocabulary regardless of context: least-privilege, sane defaults, threat model, attack surface, IDOR, CVSS, bounty, fingerprint, handshake, paranoia. Don't pad copy with these as generic flavor.

## Structural patterns to avoid

- Bolded mini-header scaffolding for About sections ("**Engineering background.**", "**Design experience.**", "**Security focus.**", "**Why X.**") each followed by 3-5 sentences. Don't impose a chronological-pillars template before the actual content exists.
- Delivering an outline (Context / Constraints / Design Decisions / Impact with dashed sub-bullets) in place of actual case-study prose. Write the prose.
- Ending a section on an invitational or forward-looking coda as a reflex: "If that sounds like a fit, I'd welcome the conversation," "Get in touch or find me elsewhere online," "browse below." Not every section needs a closing invitation — a section is allowed to just end.
- Nav/section blurbs built from the identical "[noun phrase] — [soft restatement of what it means for the visitor]" mold applied uniformly across every section ("Selected projects — what I built and the problems they solved." / "Background, skills, and how I approach the craft."). Vary the construction per section instead of stamping the same template four times.

## Punctuation and word-level tics to break

- Em dash overuse. Don't default to em dashes for every appositive, clarification, or "not X — Y" pivot. Use periods, commas, or just restructure the sentence. If a paragraph has more than one em dash, cut one.
- "e.g." as the reflexive example-marker. Vary how examples are introduced, or state them directly without a parenthetical hedge.
- "Swap in" as the fixed verb for placeholder replacement. Don't reuse this specific verb for every instance of template substitution.
- Bracket-placeholder convention for unknown facts: "[age]", "[tool — Photoshop/Figma]", "[N] years later", "[FILL IN]". Don't default to square brackets as the universal unknown-fact marker.
- The word "invent" used specifically to self-justify a refusal to fabricate details ("I don't want to invent credentials/accomplishments/technical claims").

## Be creative

None of the above is a template to swap for another template. Vary sentence shape, structure, and word choice piece to piece — a tagline shouldn't share its bones with the last five taglines you wrote for this persona. If you catch yourself reaching for any pattern listed above — an options spectrum, a build/break duality, an em dash pivot, a "Want me to" close — stop and do something else instead.

---

## Addendum: this site's own habits

Found by auditing the site's copy on 2026-09-25, after the profile above was
generated. The profile's samples were other people's portfolio copy; these are
the defaults that showed up here specifically.

- **The make-then-break conceit had leaked into three places**: the hero
  line, the works heading, and the page description. It is the profile's
  most frequent pattern (6 of 20 samples). The three pixel glyphs mark three
  disciplines. They are not a narrative arc, so do not write sentences that
  march through them in order.
- **"X, not Y" and "rather than"** turn up whenever a sentence wants to sound
  considered. Say the positive claim and stop.
- **Colon reveals**: a clause, a colon, then an aphorism ("Three habits that
  keep turning out to be the same habit: …"). Cut the setup and state the
  fact.
- **The drawing metaphor belongs to the visuals.** Part numbers, labels,
  "Fig." and "Rev." are fine because they are labels. Sentences should not
  extend the metaphor ("Thanks for reading the drawing", "Drawn in
  Singapore"). Prose is plain.
- **Reflexive sign-offs and invitations** at the end of sections and pages.
  The footer does not need a farewell line; the contact section does not
  need "Have a project in mind or just want to say hello?".
- **"Actually" as an authenticity marker** ("what I actually did", "how it
  actually works"). Delete it; the sentence gets stronger.
- **Instructions about the interface** ("Point at one"). If a hover effect
  needs explaining, the design is doing the explaining badly.

## Rules for this site

- **Every claim needs a source**: a repository, a README, commit history, or
  something the site owner said. If a fact is unknown, leave the field empty.
  The content models render nothing for empty fields, so a gap stays
  invisible instead of becoming filler.
- **Never let the interface claim something it does not do.** The contact
  form once said "Message sent successfully" while discarding the message.
- **Visitors never see notes to the owner.** Placeholder content is either
  neutral or absent.
- **Team work is credited as team work.** Say which parts were Dylan's, with
  evidence where possible, and name the rest as the team's.
- **Prefer proper nouns and numbers to adjectives.** "About 20 daily users"
  over "widely adopted".
- **Work done for a company stays at overview level.** What it does, how the
  main parts connect, what Dylan did and how it grew. Leave out security
  controls, identifier formats, internal version numbers, per-person commit
  counts, hosts, endpoints, tables and teammates' names. Dylan cut all of
  these from the RMAP study on 2026-09-26. Personal projects can go deeper.
- Date ranges use an en dash: closed up between years (2022–2025), spaced when
  either side contains a space (Jun 2022 – Sep 2025).
