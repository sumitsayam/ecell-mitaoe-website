# E-Cell MITAOE — Official Website & Management Platform

A complete, production-ready web platform for **E-Cell MITAOE** (Entrepreneurship & Innovation Cell, MIT Academy of Engineering, Pune).

Designed strictly in adherence to the visual reference identity, preserving the editorial aesthetic, oversized **“IDEAS INTO IMPACT.”** typography, warm cream-white canvas (`#FAF8F2`), deep navy accents (`#092957` / `#061B36`), layered community photo collage, and clean multi-device navigation.

---

## 🎨 1. Design System & Design Tokens

| Token | Hex Value | Application |
|---|---|---|
| **Background** | `#FAF8F2` | Warm cream-white editorial canvas |
| **Primary Navy** | `#092957` | Buttons, active navigation, key brand accents |
| **Deep Navy** | `#061B36` | Headings, hero display text, footer backdrop |
| **Secondary Blue** | `#244B7A` | Borders, subtle hover highlights, category tags |
| **White** | `#FFFFFF` | Cards, modals, elevated surfaces |
| **Body Text** | `#253247` | High-contrast readable typography |
| **Muted Text** | `#687386` | Metadata, dates, secondary labels |
| **Borders** | `#E2E5E9` | Restrained hairlines and table dividers |
| **Pale Blue Surface** | `#EDF2F8` | Icon containers, subtle pill backgrounds |

### Typography & Grid
- **Display Typography:** `Space Grotesk` (headings, oversized hero typography)
- **Body & Navigation:** `Inter` (readable UI, forms, tables)
- **Serif Accent:** `Playfair Display` (italic emphasis in section titles)
- **Desktop Grid:** 12-column responsive layout with max content width `1440px`
- **Card Radii:** `16px` to `20px` with restrained shadows

---

## 🧭 2. Complete Route Map

### Public Website
- **`/` — Homepage:**
  - Sticky header with animated search and recruitment triggers
  - Hero with architectural overline `MIT ACADEMY OF ENGINEERING · PUNE`, oversized `IDEAS INTO IMPACT.` (with stroked hollow `INTO`), community image collage, and rotated edge labels
  - Verified Impact Statistics bar (Events, Participants, Student Members, Startups Showcased) with live toggle
  - Featured Signature Events (Brand Battle, Entrepreneurship Workshop, Startup Showcase)
  - Upcoming Events Directory with live search, category pills, and status filters
  - Core Initiatives overview (Incubation Studio, E-Summit, Angel Network, Corporate Challenges)
  - About E-Cell mission & student learning tracks
  - Core Team & Faculty leadership preview
  - Milestones timeline & downloadable audited reports preview
  - Recruitment CTA banner with direct application trigger
  - Comprehensive footer with verified MITAOE campus address and social channels
- **`/about` — About E-Cell:** Institutional history, MAEER MITAOE background, CIIE incubation center relationship, 3,500 sq ft makerspace details, learning pathways.
- **`/initiatives` — Programs & Pathways:** In-depth breakdowns of the Venture Incubation Studio, E-Summit, Angel Network, Corporate Innovation Challenges, and Founder Bootcamps.
- **`/events` — Events Directory:** Searchable, category-filtered catalog with status tabs (Upcoming, Ongoing, Past) and empty states.
- **`/events/[slug]` — Event Details:** Dynamic route with hero cover, time, venue, agenda schedule, speakers, real-time registration progress, and interactive registration modal.
- **`/team` — Team Directory:** Department-filtered directory (Leadership, Technical, Corporate Relations, Design, Operations, Incubation, Faculty Advisory, Alumni Founders).
- **`/achievements` — Milestones & Archives:** Year-based milestone timeline (2024–2027), startup success spotlights, and audited annual reports.
- **`/resources` — Founder Knowledge Base:** Downloadable Student Founder Playbook, pitch deck templates, Startup India checklists, cap table models.
- **`/join` — Cohort Recruitment:** Multi-track application form with instant validation, track details, FAQs, and confetti celebration.

### Internal Management Portal
- **`/admin` — Executive Overview Dashboard:** 4 KPI cards, active events utilization charts, recruitment pipeline queue, recent audit logs.
- **`/admin/login` — Portal Authentication:** Official sign-in with pre-filled demo account credentials and clear Demo Mode disclosure.
- **`/admin/members` — Member Roster:** Searchable table, department filters, Add Member modal form, edit details, active status toggle, and delete confirmation dialog.
- **`/admin/events` — Event CMS:** Create event modal, publish/draft toggle, capacity tracking, venue allocations, and event deletions.
- **`/admin/participants` — Attendance & Check-In:** Attendee check-in status toggle (`Checked In` vs `Registered`), search by PRN or email, and **Export Attendee CSV** feature.
- **`/admin/recruitment` — Applications Pipeline:** Candidate review modal with motivation statements, interview scoring (0–10), and decision buttons (Shortlist, Accept, Reject).
- **`/admin/records` — Legal & Financial Archive:** Sponsorship agreements, audited budget summaries, institutional approvals, and upload modal.
- **`/admin/analytics` — Data & Trends:** Branch participation distributions, category satisfaction ratings, and annual growth velocity.
- **`/admin/settings` — Governance & Access:** Academic year controls, approval workflow toggles, role-based access specs, and security audit log.

---

## ⚡ 3. Quick Start & Execution

### Prerequisites
- Node.js 18.x or 20.x
- npm 9.x or 10.x

### Install Dependencies
```bash
npm install
```

### Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build & Launch
```bash
npm run build
npm start
```

### Run Automated QA Test Suite
```bash
npm test
```
Executes `scripts/test-server.js` and `scripts/test-assets.js` checking:
1. HTTP `200 OK` on all 18 public and management portal routes.
2. Content verification across all generated static pages.
3. Verification of all high-resolution Canva collage and event card image assets.

---

## 🔒 4. Data Separation & Production Integration

- **Current State (Demo Mode):** Operates on typed, realistic in-memory demo datasets (`src/data/adminDemo.ts`, `src/data/events.ts`). A yellow banner alerts administrators that changes are demo-scoped.
- **Supabase Integration Layer:** See `.env.example` for required environment variables (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`).
- **Data Protection:** Private student records, PRNs, interview evaluation scores, and financial ledgers are restricted exclusively to `/admin` routes.
