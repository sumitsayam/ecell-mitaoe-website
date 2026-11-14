export interface InsightItem {
  id: string;
  slug: string;
  title: string;
  category: 'FOUNDER STORIES' | 'STARTUP FUNDAMENTALS' | 'PRODUCT THINKING' | 'FINANCE' | 'INNOVATION';
  summary: string;
  author: {
    name: string;
    role: string;
    avatar?: string;
  };
  publishedAt: string;
  readTime: string;
  content: string[];
  keyTakeaways: string[];
}

export const insightsData: InsightItem[] = [
  {
    id: 'dorm-to-seed-journey',
    slug: 'dorm-to-seed-journey',
    title: 'From Campus Project to Seed Round: Lessons from MITAOE Student Founders',
    category: 'FOUNDER STORIES',
    summary:
      'How three third-year engineering students turned their final-year IoT project into an agritech hardware startup, securing ₹15L in initial grant funding.',
    author: {
      name: 'E-Cell Editorial Desk',
      role: 'Research & Content Cell',
    },
    publishedAt: 'October 18, 2024',
    readTime: '6 min read',
    content: [
      'In collegiate ecosystems, hundreds of impressive capstone projects are built each semester. Yet fewer than 2% survive past graduation. The barrier is rarely technical capability; it is almost always customer discovery and distribution.',
      'When the team began testing their sensor-based soil monitoring device in Alandi and Khed taluka, they discovered that farmers did not want complex mobile dashboards. They needed SMS alerts in Marathi and simple WhatsApp triggers. That single pivot shifted their validation trajectory.',
      'Working closely with the MITAOE Centre for Innovation, Incubation and Entrepreneurship (CIIE), the team incorporated their private limited entity, filed a provisional patent for their low-power sensor architecture, and accessed the NIDHI-EIR grant pool.',
      'The lesson for student builders is unequivocal: build in the field, not in isolation. A working prototype that solves an acute pain point in a 20-kilometer radius is worth ten pitch decks describing hypothetical billion-dollar markets.'
    ],
    keyTakeaways: [
      'Validate pain points with real users within a 20-day sprint',
      'Leverage campus incubation facilities early for patent filing and cloud credits',
      'Simplicity of interface beats technical complexity for real-world adoption',
      'Government schemes like NIDHI-EIR offer non-dilutive capital for collegiate teams'
    ]
  },
  {
    id: 'first-twenty-customers',
    slug: 'first-twenty-customers',
    title: 'Finding Your First 20 Paying Users Without a Marketing Budget',
    category: 'STARTUP FUNDAMENTALS',
    summary:
      'A practical playbook for student entrepreneurs looking to validate demand and generate initial revenue before seeking external investment.',
    author: {
      name: 'Sumit Sayam',
      role: 'President, E-Cell MITAOE',
    },
    publishedAt: 'September 24, 2024',
    readTime: '5 min read',
    content: [
      'Most first-time founders believe they need an ad budget, a brand identity, and a polished website to start selling. In reality, early customer discovery requires the exact opposite: direct, unscalable manual outreach.',
      'Start by identifying a hyper-specific cluster. If your product helps student designers find freelance gigs, don’t target all freelancers across India. Target the 40 design students in your own college and neighboring campuses in Pune.',
      'Conduct 15-minute diagnostic conversations, not sales pitches. Ask open-ended questions about how they currently solve the problem, how much time they lose, and what workarounds they have built.',
      'If five people tell you they are willing to pre-pay or test an unpolished beta today, you have directional signal. If nobody is willing to spend time or money, no amount of marketing will fix the underlying value proposition.'
    ],
    keyTakeaways: [
      'Do things that don’t scale in the first 60 days',
      'Ask about past behavior rather than hypothetical future interest',
      'Pre-orders and deposits are the only unambiguous validation of demand',
      'Start with a tight campus-level geographic niche before attempting pan-India distribution'
    ]
  },
  {
    id: 'mvp-architecture-guide',
    slug: 'mvp-architecture-guide',
    title: 'Architecting an MVP in 72 Hours: The Lean Tech Stack for 2026',
    category: 'PRODUCT THINKING',
    summary:
      'How to leverage modern serverless infrastructure, Next.js, Supabase, and AI APIs to ship functional software prototypes over a single weekend.',
    author: {
      name: 'Tech & Innovation Cell',
      role: 'E-Cell MITAOE',
    },
    publishedAt: 'November 02, 2024',
    readTime: '7 min read',
    content: [
      'Speed to market is the primary comparative advantage of a student startup. Large enterprises move in quarters; agile student teams can build, deploy, and iterate over a 72-hour hackathon weekend.',
      'The recommended stack for 2026 focuses on reducing boilerplate: Next.js App Router for frontend and SSR, Tailwind CSS for rapid atomic styling, Supabase for authentication and Postgres database, and Vercel for zero-config global edge deployments.',
      'Resist the temptation to over-engineer microservices or Kubernetes clusters before you have your first 100 daily active users. Monoliths are faster to debug, deploy, and pivot when customer feedback dictates a radical change in direction.'
    ],
    keyTakeaways: [
      'Optimize for iteration velocity rather than hypothetical hyperscale',
      'Use managed backend services to focus 90% of development effort on user experience',
      'Deploy to production on day one with continuous deployment triggers',
      'Instrument basic event tracking (PostHog or Mixpanel) to measure actual user retention'
    ]
  }
];

