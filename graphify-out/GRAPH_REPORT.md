# Graph Report - .  (2026-07-13)

## Corpus Check
- Corpus is ~3,715 words - fits in a single context window. You may not need a graph.

## Summary
- 81 nodes · 94 edges · 9 communities (8 shown, 1 thin omitted)
- Extraction: 88% EXTRACTED · 12% INFERRED · 0% AMBIGUOUS · INFERRED: 11 edges (avg confidence: 0.84)
- Token cost: 33,238 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Booking, Scroll & UI Modules|Booking, Scroll & UI Modules]]
- [[_COMMUNITY_Site Composition & Stack|Site Composition & Stack]]
- [[_COMMUNITY_package.json Metadata|package.json Metadata]]
- [[_COMMUNITY_Page Sections & Features|Page Sections & Features]]
- [[_COMMUNITY_Estimate Calculator Logic|Estimate Calculator Logic]]
- [[_COMMUNITY_Reviews Module Logic|Reviews Module Logic]]
- [[_COMMUNITY_Runtime Dependencies|Runtime Dependencies]]
- [[_COMMUNITY_NPM Scripts|NPM Scripts]]
- [[_COMMUNITY_Phone Call-to-Action|Phone Call-to-Action]]

## God Nodes (most connected - your core abstractions)
1. `Old English Bricklayer` - 6 edges
2. `scripts` - 5 edges
3. `initReviews()` - 4 edges
4. `Estimate Calculator Form` - 4 edges
5. `Reviews Section` - 4 edges
6. `stamp()` - 3 edges
7. `slide()` - 3 edges
8. `GSAP + ScrollTrigger` - 3 edges
9. `Booking with Calendar Export` - 3 edges
10. `Hero Section` - 3 edges

## Surprising Connections (you probably didn't know these)
- `Splitting.js` --implements--> `Hero Section`  [INFERRED]
  README.md → index.html
- `Swiper` --implements--> `Reviews Section`  [INFERRED]
  README.md → index.html
- `Free Estimate Calculator` --implements--> `Estimate Calculator Form`  [INFERRED]
  README.md → index.html
- `Reviews Carousel & Leave-a-Review` --implements--> `Reviews Section`  [INFERRED]
  README.md → index.html
- `Booking with Calendar Export` --implements--> `Booking Section`  [INFERRED]
  README.md → index.html

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Scroll-Driven Animation Stack** — readme_lenis, readme_gsap_scrolltrigger, readme_splitting_js [EXTRACTED 1.00]
- **Lead Conversion Flow** — index_estimate_calculator, index_booking_section, index_calendar_export [INFERRED 0.85]
- **Backendless Client-Side Persistence** — readme_no_backend, readme_localstorage_reviews, index_calendar_export [INFERRED 0.75]

## Communities (9 total, 1 thin omitted)

### Community 0 - "Booking, Scroll & UI Modules"
Cohesion: 0.19
Nodes (9): gcalUrl(), icsBlob(), initBooking(), stamp(), initGallery(), initSmoothScroll(), initScrollReveal(), initTextReveal() (+1 more)

### Community 1 - "Site Composition & Stack"
Cohesion: 0.16
Nodes (14): Hero Section, main.js Entry Point, Reviews Section, Trust Strip, GSAP + ScrollTrigger, Ink & Ember Design Direction, Lenis Smooth Scroll, localStorage Review Persistence (+6 more)

### Community 2 - "package.json Metadata"
Cohesion: 0.18
Nodes (10): author, description, devDependencies, vite, keywords, license, main, name (+2 more)

### Community 3 - "Page Sections & Features"
Cohesion: 0.22
Nodes (10): Booking Section, Google Calendar & .ics Export, Estimate Calculator Form, Footer, Services Section, Work Gallery Section, Booking with Calendar Export, Free Estimate Calculator (+2 more)

### Community 4 - "Estimate Calculator Logic"
Cohesion: 0.22
Nodes (6): ACCESS, FINISH, HINTS, initCalculator(), MIN_JOB, RATES

### Community 5 - "Reviews Module Logic"
Cohesion: 0.33
Nodes (7): escape(), initReviews(), load(), SEED, slide(), stars(), wireForm()

### Community 6 - "Runtime Dependencies"
Cohesion: 0.40
Nodes (5): dependencies, gsap, lenis, splitting, swiper

### Community 7 - "NPM Scripts"
Cohesion: 0.40
Nodes (5): scripts, build, dev, preview, test

## Knowledge Gaps
- **30 isolated node(s):** `name`, `version`, `description`, `main`, `test` (+25 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **1 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Estimate Calculator Form` connect `Page Sections & Features` to `Site Composition & Stack`?**
  _High betweenness centrality (0.047) - this node is a cross-community bridge._
- **Why does `Hero Section` connect `Site Composition & Stack` to `Page Sections & Features`?**
  _High betweenness centrality (0.043) - this node is a cross-community bridge._
- **What connects `name`, `version`, `description` to the rest of the system?**
  _34 weakly-connected nodes found - possible documentation gaps or missing edges._