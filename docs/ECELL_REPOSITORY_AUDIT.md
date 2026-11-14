# E-Cell MITAOE — Mandatory Repository Audit

## 1. Existing Architecture & Stack Analysis
- **Project Name:** `ecell-web` (`ecell-mitaoe-website`)
- **Framework:** Next.js `14.2.15` (App Router)
- **Runtime:** React `18.3.1`, React DOM `18.3.1`
- **Typing:** TypeScript `5.6.3` (Strict mode)
- **Styling:** Tailwind CSS `3.4.14` with PostCSS `8.4.47` and Autoprefixer `10.4.20`
- **Motion Dependencies:** `gsap` (GreenSock Animation Platform), `lenis` (smooth scrolling), `framer-motion` (UI dialogs & drawer transitions)
- **Icons:** `lucide-react` `0.453.0`
- **Asset Bundles:** 22 local image assets under `public/images/`

---

## 2. Reusable Components & Data Structures
- **Typed Datasets:**
  - `src/data/events.ts`: Real signature events (Brand Battle, E-Summit, Idea Hackathon, Pitching Arena).
  - `src/data/team.ts`: Real faculty coordinators, president (Sumit Sayam), and student department leads.
  - `src/data/initiatives.ts`: 5 real incubation pathways (Venture Incubation Studio, E-Summit, Angel Network, Corporate Challenges, Masterclasses).
  - `src/data/achievements.ts`: Verified milestones and annual reports.
  - `src/data/resources.ts`: Founder playbooks, financial models, and pitch deck templates.
  - `src/data/insights.ts`: Founder case studies and operational playbooks.
- **Admin Dashboard:** Fully preserved under `src/app/admin/` with 7 management views.

---

## 3. Design & Motion Limitations in Prior Implementation
- **Prior Problem:** The initial ring animation was implemented as an SVG with a JavaScript `setInterval` incrementing progress by `0.05` every 25ms, resulting in severe visual stuttering and jank.
- **Resolution:** Re-architected as a 2D HTML5 Canvas running on `requestAnimationFrame` with delta-time (`dt`) interpolation, sub-pixel text rendering, device pixel ratio scaling, and exponential zoom physics.

---

## 4. Technical Risks & Guardrails
- **Risk 1:** Uncontrolled library inflation (e.g. attempting to install Three.js for 2D circular text).
  *Mitigation:* Retained high-performance 2D Canvas and SVG text paths.
- **Risk 2:** Layout thrashing during zoom.
  *Mitigation:* Use transforms and `destination-out` composite operations rather than animating DOM width/height properties.

