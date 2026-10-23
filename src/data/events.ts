export interface EventScheduleItem {
  time: string;
  activity: string;
  speakerOrVenue?: string;
}

export interface EventSpeaker {
  name: string;
  role: string;
  company: string;
  avatar?: string;
}

export interface EventItem {
  id: string;
  slug: string;
  title: string;
  category: 'COMPETITION' | 'WORKSHOP' | 'INITIATIVE' | 'CONCLAVE' | 'SPEAKER SESSION';
  status: 'upcoming' | 'ongoing' | 'past';
  tagline: string;
  description: string;
  fullDescription: string;
  date: string;
  time?: string;
  venue: string;
  attendees: string;
  registeredCount?: number;
  maxCapacity?: number;
  image: string;
  gallery?: string[];
  registrationOpen: boolean;
  registrationDeadline?: string;
  registrationFee?: string;
  prizePool?: string;
  keyHighlights: string[];
  schedule?: EventScheduleItem[];
  speakers?: EventSpeaker[];
  eligibility?: string;
}

export const signatureEvents: EventItem[] = [
  {
    id: 'brand-battle',
    slug: 'brand-battle',
    title: 'Brand Battle',
    category: 'COMPETITION',
    status: 'upcoming',
    tagline: 'A one-day team branding battle. Think. Rebuild. Conquer.',
    description: 'A one-day team branding battle. Think. Rebuild. Conquer.',
    fullDescription:
      'Brand Battle is MITAOE’s signature corporate turnaround competition. Student teams are presented with historic brand blunders and real-world brand distress scenarios. Within intense 4-hour working blocks, teams diagnose market perception, reconstruct positioning, craft go-to-market roadmaps, and pitch turnaround strategies to leading advertising executives and venture partners.',
    date: 'November 18, 2026',
    time: '09:00 AM – 06:00 PM IST',
    venue: 'MITAOE Main Auditorium & Innovation Hub',
    attendees: '180+ Participants • 45 Teams',
    registeredCount: 38,
    maxCapacity: 45,
    image: '/images/card-brand-battle-hires.png',
    gallery: [
      '/images/card-brand-battle-hires.png',
      '/images/hero-collage-perfect.png',
    ],
    registrationOpen: true,
    registrationDeadline: 'November 14, 2026',
    registrationFee: 'Free for MITAOE students • ₹250/team external',
    prizePool: '₹50,000 Cash Pool & Incubation Credits',
    eligibility: 'Open to all engineering, design, and management students in teams of 2 to 4.',
    keyHighlights: [
      'Live brand crisis turnaround pitch before executive CMOs',
      'Hands-on mentorship from senior branding agency directors',
      'Fast-track interview for E-Cell brand lead positions',
      'Certified participation credits from CIIE MITAOE'
    ],
    schedule: [
      { time: '09:00 AM', activity: 'Registration & Case Study Reveal', speakerOrVenue: 'Main Auditorium' },
      { time: '10:30 AM', activity: 'Phase 1: Brand Autopsy & Market Gap Diagnosis', speakerOrVenue: 'Innovation Pods' },
      { time: '01:00 PM', activity: 'Working Lunch & Mentor Office Hours', speakerOrVenue: 'Cafeteria & Lounge' },
      { time: '02:30 PM', activity: 'Phase 2: Strategy Pitch Deck Creation', speakerOrVenue: 'Media Lab' },
      { time: '04:30 PM', activity: 'Final Jury Presentations & Q&A', speakerOrVenue: 'Main Auditorium' },
      { time: '05:45 PM', activity: 'Awards Ceremony & Networking', speakerOrVenue: 'Auditorium Foyer' }
    ],
    speakers: [
      { name: 'Rohan Deshmukh', role: 'Head of Growth', company: 'OmniBrand Labs' },
      { name: 'Dr. Sunita Kulkarni', role: 'Dean of Innovation & Incubation', company: 'MITAOE' }
    ]
  },
  {
    id: 'entrepreneurship-workshop',
    slug: 'entrepreneurship-workshop',
    title: 'Entrepreneurship Workshop',
    category: 'WORKSHOP',
    status: 'upcoming',
    tagline: 'Learn, build and interact with industry experts.',
    description: 'Learn, build and interact with industry experts.',
    fullDescription:
      'A practical, intensive sprint designed to take students from rough concept to minimum viable prototype (MVP). Participants will unpack customer discovery interviews, unit economics modeling, low-code prototype building, and venture storytelling.',
    date: 'December 04, 2026',
    time: '10:00 AM – 04:30 PM IST',
    venue: 'MITAOE Design Thinking Studio',
    attendees: '250+ Students',
    registeredCount: 142,
    maxCapacity: 180,
    image: '/images/card-workshop-hires.png',
    gallery: [
      '/images/card-workshop-hires.png',
      '/images/hero-collage-perfect.png',
    ],
    registrationOpen: true,
    registrationDeadline: 'December 01, 2026',
    registrationFee: 'Free (Registration required)',
    prizePool: 'AWS Cloud Credits ($5,000 per team)',
    eligibility: 'Open to all MITAOE students with curiosity in engineering ventures.',
    keyHighlights: [
      'Interactive rapid prototype sprints with modern web tools',
      'Financial model spreadsheets and cap table teardowns',
      '1-on-1 feedback on student venture ideas',
      'Access to E-Cell incubator co-working space'
    ],
    schedule: [
      { time: '10:00 AM', activity: 'Framing Real Customer Pain Points', speakerOrVenue: 'Studio 1' },
      { time: '11:45 AM', activity: 'Rapid No-Code MVP Architecture', speakerOrVenue: 'Lab 4' },
      { time: '01:30 PM', activity: 'Unit Economics: Pricing & CAC vs LTV', speakerOrVenue: 'Studio 1' },
      { time: '03:15 PM', activity: 'Investor Deck Teardown & Live Pitch Practice', speakerOrVenue: 'Auditorium' }
    ],
    speakers: [
      { name: 'Aditya Mehta', role: 'Co-Founder & CTO', company: 'HyperScale AI' }
    ]
  },
  {
    id: 'startup-showcase',
    slug: 'startup-showcase',
    title: 'Startup Showcase',
    category: 'INITIATIVE',
    status: 'upcoming',
    tagline: 'Student ideas. Real conversations. Bigger possibilities.',
    description: 'Student ideas. Real conversations. Bigger possibilities.',
    fullDescription:
      'The premier annual demo day of MITAOE where the top 30 student and alumni startups exhibit prototypes to angel syndicates, institutional venture capitalists, and industry leaders.',
    date: 'January 22, 2027',
    time: '11:00 AM – 07:00 PM IST',
    venue: 'MITAOE Innovation & Technology Arena',
    attendees: '500+ Attendees • 30+ Startups',
    registeredCount: 28,
    maxCapacity: 35,
    image: '/images/card-showcase-hires.png',
    gallery: [
      '/images/card-showcase-hires.png',
      '/images/hero-collage-perfect.png',
    ],
    registrationOpen: true,
    registrationDeadline: 'January 10, 2027',
    registrationFee: 'Free exhibition booth for verified student startups',
    prizePool: '₹2,00,000 Seed Grant & Angel Match Pool',
    eligibility: 'Student-founded startups with working prototype or early revenue.',
    keyHighlights: [
      '30+ Live physical startup exhibition booths',
      'Curated private angel investor matchmaking sessions',
      'Coverage in regional entrepreneurship publications',
      'Seed grant evaluation by CIIE Investment Committee'
    ],
    schedule: [
      { time: '11:00 AM', activity: 'Exhibition Arena Inauguration', speakerOrVenue: 'Main Arena' },
      { time: '01:00 PM', activity: 'Angel Investor Walkthroughs', speakerOrVenue: 'Booths 1-30' },
      { time: '03:30 PM', activity: 'Top 8 Pitch Shootout on Stage', speakerOrVenue: 'Center Stage' },
      { time: '06:00 PM', activity: 'Grant Awards Announcement & Networking', speakerOrVenue: 'VIP Lounge' }
    ],
    speakers: [
      { name: 'Vikram Joshi', role: 'Partner', company: 'Pune Angels Syndicate' },
      { name: 'Neha Ranade', role: 'Investment Principal', company: 'Bharat Seed Fund' }
    ]
  }
];

export const allEvents: EventItem[] = [
  ...signatureEvents,
  {
    id: 'e-summit-2027',
    slug: 'e-summit-2027',
    title: 'E-Summit MITAOE 2027',
    category: 'CONCLAVE',
    status: 'upcoming',
    tagline: 'Maharashtra’s premier annual entrepreneurship conclave.',
    description: '3 days of keynote stages, national hackathons, and investor deal-making.',
    fullDescription:
      'The landmark flagship summit gathering 2,500+ delegates, 40+ prominent founders, policy architects, and angel investors to celebrate and fund youth entrepreneurship.',
    date: 'February 14–16, 2027',
    time: '09:00 AM Daily',
    venue: 'MITAOE Campus, Alandi Pune',
    attendees: '2,500+ Delegates',
    registeredCount: 620,
    maxCapacity: 2500,
    image: '/images/hero-collage-perfect.png',
    registrationOpen: true,
    registrationDeadline: 'February 08, 2027',
    registrationFee: 'Student Pass: ₹199 • General: ₹499',
    prizePool: '₹5,00,000 Prize & Grant Pool',
    eligibility: 'Open to college students nationwide.',
    keyHighlights: [
      '20+ Keynote speakers and Unicorn founders',
      'National 36-hour B-Plan & Product Hackathon',
      'Venture funding lounge with 30+ angel investors'
    ]
  },
  {
    id: 'hack-the-future-2026',
    slug: 'hack-the-future-2026',
    title: 'Hack The Future: Climate & Hardware Sprint',
    category: 'COMPETITION',
    status: 'past',
    tagline: 'Building IoT and sustainability hardware in 36 hours.',
    description: 'A multi-disciplinary sprint for clean energy, IoT, and smart mobility.',
    fullDescription:
      'Teams built physical and digital prototypes addressing localized municipal waste, EV fleet telematics, and solar microgrid monitoring.',
    date: 'August 24–25, 2026',
    venue: 'MITAOE Makerspace & FabLab',
    attendees: '120 Engineers',
    image: '/images/event-card-1.png',
    registrationOpen: false,
    prizePool: '₹75,000 Cash + Incubation Offer',
    keyHighlights: [
      'Hardware component kits provided by industrial sponsors',
      '3 winning teams accepted into CIIE Pre-Incubation Cohort',
      'Patents filed for 2 novel sensor architectures'
    ]
  },
  {
    id: 'speaker-series-unicorns',
    slug: 'speaker-series-unicorns',
    title: 'Fireside Chat: From Engineering Grad to Series B',
    category: 'SPEAKER SESSION',
    status: 'past',
    tagline: 'An honest discussion on the first 1,000 days of startup survival.',
    description: 'Alumni founder shares real pitfalls, hiring mistakes, and fundraising realities.',
    fullDescription:
      'An intimate interactive session with MITAOE alumni discussing the harsh realities of founder mental health, cap table dilution, and pivoting during tough market conditions.',
    date: 'September 12, 2026',
    venue: 'Auditorium 2',
    attendees: '320 Students',
    image: '/images/event-card-2.png',
    registrationOpen: false,
    keyHighlights: [
      'Unfiltered Q&A covering bootstrapping vs VC funding',
      'Resume teardown for student founder applications'
    ]
  }
];

export function getEventBySlug(slug: string): EventItem | undefined {
  return allEvents.find((e) => e.slug === slug);
}
