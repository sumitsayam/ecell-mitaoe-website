export interface EventItem {
  id: string;
  title: string;
  category: 'COMPETITION' | 'WORKSHOP' | 'INITIATIVE' | 'CONCLAVE' | 'SPEAKER SESSION';
  description: string;
  fullDescription: string;
  tagline: string;
  date: string;
  venue: string;
  attendees: string;
  image: string;
  registrationOpen: boolean;
  prizePool?: string;
  keyHighlights: string[];
}

export const signatureEvents: EventItem[] = [
  {
    id: 'brand-battle',
    title: 'Brand Battle',
    category: 'COMPETITION',
    tagline: 'A one-day team branding battle. Think. Rebuild. Conquer.',
    description: 'A one-day team branding battle. Think. Rebuild. Conquer.',
    fullDescription:
      'Brand Battle challenges student teams to analyze legacy brand missteps, reinvent marketing positioning, and pitch turnaround strategies to real marketing CMOs and venture builders. Participants tackle live case studies and stress tests in real time.',
    date: 'November 18, 2026',
    venue: 'MITAOE Main Auditorium & Innovation Hub',
    attendees: '180+ Participants • 45 Teams',
    image: '/images/card-brand-battle-hires.png',
    registrationOpen: true,
    prizePool: '₹50,000 Cash Pool & Incubation Credits',
    keyHighlights: [
      'Live brand crisis turnaround pitch',
      'Mentorship from top agency marketing directors',
      'Fast-track interview for E-Cell brand lead positions'
    ]
  },
  {
    id: 'entrepreneurship-workshop',
    title: 'Entrepreneurship Workshop',
    category: 'WORKSHOP',
    tagline: 'Learn, build and interact with industry experts.',
    description: 'Learn, build and interact with industry experts.',
    fullDescription:
      'A hands-on, high-intensity bootcamp designed to take students from problem statement validation to minimal viable product (MVP) architecture, unit economics modeling, and early customer acquisition.',
    date: 'December 04, 2026',
    venue: 'MITAOE Design Thinking Studio',
    attendees: '250+ Students',
    image: '/images/card-workshop-hires.png',
    registrationOpen: true,
    prizePool: 'Free Cloud Credits ($5,000 per team)',
    keyHighlights: [
      'No-code prototype sprint & user research tools',
      'Financial modeling & investor pitch deck teardowns',
      'Certificate of Completion & Incubation Support'
    ]
  },
  {
    id: 'startup-showcase',
    title: 'Startup Showcase',
    category: 'INITIATIVE',
    tagline: 'Student ideas. Real conversations. Bigger possibilities.',
    description: 'Student ideas. Real conversations. Bigger possibilities.',
    fullDescription:
      'The flagship annual demo day where the most promising MITAOE student startups and alumni founders present their traction, prototype demonstrations, and vision to angel investors, venture capitalists, and ecosystem leaders.',
    date: 'January 22, 2027',
    venue: 'MITAOE Innovation & Technology Arena',
    attendees: '500+ Attendees • 30+ Startups',
    image: '/images/card-showcase-hires.png',
    registrationOpen: false,
    prizePool: '₹2,00,000 Grant Support & Seed Access',
    keyHighlights: [
      '30+ Live startup exhibition booths',
      'Curated 1-on-1 investor matchmaking sessions',
      'Press coverage and angel investor network access'
    ]
  }
];

export const allEvents: EventItem[] = [
  ...signatureEvents,
  {
    id: 'e-summit-2027',
    title: 'E-Summit MITAOE 2027',
    category: 'CONCLAVE',
    tagline: 'The premier annual entrepreneurship conclave of Pune.',
    description: 'Keynotes, panel debates, startup expo, and venture funding rounds.',
    fullDescription:
      'The flagship 3-day entrepreneurship summit gathering visionary founders, prominent investors, government policymakers, and 2,500+ ambitious student entrepreneurs across Maharashtra.',
    date: 'February 14-16, 2027',
    venue: 'MITAOE Campus, Alandi Pune',
    attendees: '2,500+ Delegates',
    image: '/images/hero-collage-perfect.png',
    registrationOpen: true,
    prizePool: '₹5,00,000 Prize & Grant Pool',
    keyHighlights: [
      'Over 20+ keynote speakers and Unicorn founders',
      'National Hackathon & B-Plan competition',
      'Networking lounge with 40+ angel investors'
    ]
  }
];
