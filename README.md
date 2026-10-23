# E-Cell MITAOE — Official Web Platform

The modern, responsive web application for **E-Cell MITAOE** (Entrepreneurship & Innovation Cell, MIT Academy of Engineering, Pune).

Built strictly according to the reference design specifications preserving the signature cream-white (`#FAF7F0`) and deep navy (`#0B1B3D`) visual identity, high-fidelity hero image collage, and verified statistics strip.

---

## 🎨 Visual Identity & Architecture

- **Color Palette:**
  - **Cream Canvas:** `#FAF7F0` / `#FDFCF7` with subtle paper & technical grid accents
  - **Prussian Navy:** `#0B1B3D` / `#060F19` / `#05244C`
  - **Accent Blue & Watercolor:** `#2563EB` / `#38BDF8` with artistic ink washes
- **Typography:**
  - **Display / Headers:** Modern Bold Grotesk (`Plus Jakarta Sans` & `Space Grotesk`)
  - **Hero Text Stroke:** Custom stroke typography for hollow `"INTO"`
  - **Serif Accent:** Elegant italic flourish for `"Our Signature Events"` (`Playfair Display`)
- **Key Sections:**
  1. **Sticky Header & Navigation:** MITAOE E-Cell monogram, desktop navigation, search modal trigger, and `"Join E-Cell"` CTA with responsive mobile flyout.
  2. **Signature Hero Section:**
     - Overline: `MIT ACADEMY OF ENGINEERING • PUNE` with architectural framing bracket
     - Giant Title: `IDEAS INTO IMPACT.` with stroked "INTO", 4-point star sparkle, and dynamic accent lines
     - Compelling image collage featuring student builders, keynote speakers, and badge: `"BUILT BY STUDENTS, FOR THE FUTURE."`
     - Rotated edge text: `"INNOVATE / COLLABORATE / BUILD"`
  3. **Verified Statistics Strip:** Floating translucent card highlighting Events Organized, Participants Engaged, and Student Members with toggleable live data.
  4. **Our Signature Events:** Interactive responsive card grid for:
     - **Brand Battle** (`COMPETITION`)
     - **Entrepreneurship Workshop** (`WORKSHOP`)
     - **Startup Showcase** (`INITIATIVE`)
     - Click-to-expand Event Detail Modal with agenda, prize pools, and registration portal.
  5. **About & Mission Section:** 4 strategic pillars (Ideation, Incubation, Mentorship, Capital Access).
  6. **Core Initiatives:** Venture studio, E-Summit, Angel Network, Corporate Challenges.
  7. **Recruitment CTA & Application Modal:** Interactive student recruitment modal with confetti animation.
  8. **Comprehensive Footer:** Campus address (Alandi, Pune), accreditation details, ecosystem links, and social channels.

---

## 🚀 Running the Project

### Prerequisites
- Node.js 18.x or 20.x
- npm 9.x or 10.x

### Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build & Start
```bash
npm run build
npm start
```

### Automated Tests
```bash
npm test
```
Verifies server HTTP endpoints, critical content strings, and image asset delivery.
