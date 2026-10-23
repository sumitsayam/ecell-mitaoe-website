export interface InitiativeItem {
  id: string;
  slug: string;
  title: string;
  category: 'INCUBATION' | 'WORKSHOP' | 'COMPETITION' | 'COLLABORATION' | 'FUNDING';
  headline: string;
  description: string;
  fullOverview: string;
  deliverables: string[];
  metrics: string;
  whoIsItFor: string;
  iconType: 'cpu' | 'layers' | 'building' | 'handshake' | 'sparkles' | 'lightbulb';
}

export const initiativesData: InitiativeItem[] = [
  {
    id: 'incubation-studio',
    slug: 'incubation-studio',
    title: 'Venture Incubation Studio',
    category: 'INCUBATION',
    headline: 'From Dorm-Room Hypothesis to Scalable Reality',
    description:
      'A structured 12-week acceleration program providing selected MITAOE student ventures with co-working pods, legal incorporation guidance, AWS and Google Cloud credits, and patent filing support.',
    fullOverview:
      'The Venture Incubation Studio bridges the gap between academic engineering projects and commercially viable technology startups. Run in collaboration with the MITAOE Centre for Innovation, Incubation and Entrepreneurship (CIIE), this cohort-based sprint takes founders through market testing, legal frameworks, customer discovery, unit economics, and seed pitch preparation.',
    deliverables: [
      'Dedicated co-working pods in the MITAOE Innovation Hub',
      'Up to $10,000 in cloud credits (AWS Activate, Google Cloud for Startups)',
      'Subsidized patent and trademark application filing assistance',
      'Bi-weekly advisory check-ins with VC venture partners'
    ],
    metrics: '14 Startups Incubated • 2 Patents Granted • ₹45L Raised in Grants',
    whoIsItFor: 'MITAOE student teams with a validated prototype or early proof-of-concept.',
    iconType: 'cpu'
  },
  {
    id: 'e-summit',
    slug: 'e-summit',
    title: 'E-Summit MITAOE',
    category: 'COMPETITION',
    headline: 'Maharashtra’s Premier Student Entrepreneurship Summit',
    description:
      'Three days of high-stakes pitching, national hackathons, masterclasses with unicorn founders, and curated networking lounges for over 2,500 aspiring student entrepreneurs.',
    fullOverview:
      'E-Summit is the annual flagship convergence of youth innovation in Pune. It features multiple high-octane competitive tracks including Brand Battle, the 36-Hour B-Plan Hackathon, and Shark Pitch Arena. In addition, delegates attend panels on deep-tech commercialization, climate-tech, and the future of Indian venture capital.',
    deliverables: [
      'National B-Plan competition with ₹5,00,000+ total prize pool',
      'Curated 1-on-1 angel investor pitch lounges',
      'Keynote addresses from prominent Indian tech leaders',
      'Startup expo with 50+ company showcase booths'
    ],
    metrics: '2,500+ Annual Delegates • 40+ Colleges • ₹5L+ Cash Prizes',
    whoIsItFor: 'Students, innovators, developers, and early-stage startup enthusiasts nationwide.',
    iconType: 'layers'
  },
  {
    id: 'founder-network',
    slug: 'founder-network',
    title: 'Campus Founder Angel Network',
    category: 'FUNDING',
    headline: 'Early-Stage Micro Grants & Angel Backing',
    description:
      'A bridge between high-potential student ventures and institutional seed capital, angel networks, alumni investors, and government grants including NIDHI-EIR and Startup India.',
    fullOverview:
      'Securing first institutional capital is often the hardest hurdle for collegiate entrepreneurs. The Campus Founder Angel Network prepares founders for rigorous investor due diligence, establishes clean capitalization tables, and facilitates warm introductions to active angel syndicates in Pune, Mumbai, and Bengaluru.',
    deliverables: [
      'Investor readiness audit and cap table advisory',
      'Direct pipeline to Startup India Seed Fund Scheme (SISFS)',
      'Pitch deck and financial model scrubbing sessions',
      'Private closed-door Demo Day presentations'
    ],
    metrics: '₹1.2 Cr Total Capital Catalyzed • 8 Angel Syndicate Partners',
    whoIsItFor: 'Pre-seed and seed-stage ventures with measurable user traction or revenue.',
    iconType: 'building'
  },
  {
    id: 'industry-challenges',
    slug: 'industry-challenges',
    title: 'Corporate Innovation Challenges',
    category: 'COLLABORATION',
    headline: 'Solving Real Industry Problem Statements',
    description:
      'Strategic partnerships with enterprise technology firms and manufacturing corporations that bring sponsored challenge briefs, proprietary datasets, and pre-placement interviews to campus.',
    fullOverview:
      'Through Corporate Innovation Challenges, industrial partners submit stubborn operational, automation, or software bottlenecks. Student teams compete in hackathon formats to engineer working prototypes, with winners receiving deployment contracts, cash prizes, and recruitment offers.',
    deliverables: [
      'Real-world industrial data sets and problem statements',
      'Direct mentorship from corporate engineering VPs',
      'Fast-track Pre-Placement Interviews (PPIs) for top performers',
      'Proof-of-concept pilot deployment opportunities'
    ],
    metrics: '12 Corporate Partners • ₹15L Corporate Grants • 24 PPIs Awarded',
    whoIsItFor: 'Multi-disciplinary student teams (Computer Science, Mechanical, Electronics, Chemical).',
    iconType: 'handshake'
  },
  {
    id: 'masterclass-series',
    slug: 'masterclass-series',
    title: 'Founder Bootcamps & Masterclasses',
    category: 'WORKSHOP',
    headline: 'Practical Skills Beyond the Textbook Curriculum',
    description:
      'Hands-on weekend workshops covering no-code MVP development, unit economics, term-sheet negotiations, customer acquisition frameworks, and AI for early-stage teams.',
    fullOverview:
      'Traditional engineering curriculum provides deep technical depth but rarely covers company building. Our masterclasses are taught exclusively by active practitioners—founders who have shipped products, raised rounds, or built sustainable revenue engines.',
    deliverables: [
      'Tactical workshops with live case studies',
      'Take-home Notion playbooks, financial sheets, and templates',
      'Small cohort sizes with interactive Q&A',
      'Certificate of Entrepreneurial Competency from MITAOE'
    ],
    metrics: '20+ Masterclasses Conducted • 1,800+ Students Certified',
    whoIsItFor: 'Any student seeking practical venture building and product management skills.',
    iconType: 'lightbulb'
  }
];
