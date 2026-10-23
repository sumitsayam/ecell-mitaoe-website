export interface TeamMember {
  id: string;
  name: string;
  role: string;
  department: 'Leadership' | 'Technical' | 'Corporate Relations' | 'Design & Media' | 'Events & Operations' | 'Startup Incubation' | 'Faculty Advisory' | 'Alumni Mentors';
  branchAndYear?: string;
  bio: string;
  linkedin?: string;
  github?: string;
  email?: string;
  image?: string;
}

export const teamData: TeamMember[] = [
  // Faculty Advisory
  {
    id: 'faculty-1',
    name: 'Dr. Sunita Kulkarni',
    role: 'Dean, Innovation & Incubation (CIIE)',
    department: 'Faculty Advisory',
    bio: 'Guiding MITAOE’s entrepreneurial vision and institutional policies. 20+ years of academic research and startup mentorship.',
    linkedin: 'https://linkedin.com',
    email: 'ciie@mitaoe.ac.in',
  },
  {
    id: 'faculty-2',
    name: 'Prof. Rajesh Deshmukh',
    role: 'Faculty Convener, E-Cell MITAOE',
    department: 'Faculty Advisory',
    bio: 'Oversees student chapter governance, inter-college partnerships, and national entrepreneurship accreditation.',
    linkedin: 'https://linkedin.com',
    email: 'ecell.convener@mitaoe.ac.in',
  },

  // Student Leadership
  {
    id: 'lead-1',
    name: 'Sumit Sayam',
    role: 'President & Head of Operations',
    department: 'Leadership',
    branchAndYear: 'B.Tech Computer Engineering (Final Year)',
    bio: 'Directs overall E-Cell strategy, annual budget allocations, and inter-departmental synergy across campus initiatives.',
    linkedin: 'https://linkedin.com',
    github: 'https://github.com',
    email: 'sumit.sayam@mitaoe.ac.in',
  },
  {
    id: 'lead-2',
    name: 'Ananya Sharma',
    role: 'Vice President & Strategy Lead',
    department: 'Leadership',
    branchAndYear: 'B.Tech IT (Final Year)',
    bio: 'Spearheads strategic venture partnerships, E-Summit keynote invitations, and community expansion.',
    linkedin: 'https://linkedin.com',
    email: 'ananya.sharma@mitaoe.ac.in',
  },
  {
    id: 'lead-3',
    name: 'Aditya Patil',
    role: 'General Secretary',
    department: 'Leadership',
    branchAndYear: 'B.Tech Electronics & Telecomm (Third Year)',
    bio: 'Manages official institutional correspondence, event permissions, and cross-council liaisoning.',
    linkedin: 'https://linkedin.com',
    email: 'aditya.patil@mitaoe.ac.in',
  },

  // Technical & AI
  {
    id: 'tech-1',
    name: 'Varun Kulkarni',
    role: 'Technical Lead',
    department: 'Technical',
    branchAndYear: 'B.Tech Computer Engineering (Third Year)',
    bio: 'Architecting digital platforms, registration engines, and the internal E-Cell management suite.',
    linkedin: 'https://linkedin.com',
    github: 'https://github.com',
    email: 'varun.k@mitaoe.ac.in',
  },
  {
    id: 'tech-2',
    name: 'Riddhi Joshi',
    role: 'Fullstack Developer',
    department: 'Technical',
    branchAndYear: 'B.Tech AI & Data Science (Second Year)',
    bio: 'Building modern web interfaces, dashboard analytics, and automated participant check-in portals.',
    linkedin: 'https://linkedin.com',
    github: 'https://github.com',
  },

  // Corporate Relations
  {
    id: 'corp-1',
    name: 'Tanvi Shinde',
    role: 'Head of Corporate Relations & Sponsorship',
    department: 'Corporate Relations',
    branchAndYear: 'B.Tech Mechanical (Third Year)',
    bio: 'Connecting student initiatives with corporate partners, securing title sponsorships and angel networks.',
    linkedin: 'https://linkedin.com',
  },
  {
    id: 'corp-2',
    name: 'Pranav Nair',
    role: 'Outreach Manager',
    department: 'Corporate Relations',
    branchAndYear: 'B.Tech Computer Engineering (Second Year)',
    bio: 'Fostering alumni founder connections and organizing closed-door investor meetups.',
    linkedin: 'https://linkedin.com',
  },

  // Design & Media
  {
    id: 'design-1',
    name: 'Siddharth Rao',
    role: 'Creative Director & Brand Lead',
    department: 'Design & Media',
    branchAndYear: 'B.Des / B.Tech (Third Year)',
    bio: 'Guardian of the E-Cell visual identity, editorial publication aesthetics, and campaign art direction.',
    linkedin: 'https://linkedin.com',
  },

  // Events & Operations
  {
    id: 'ops-1',
    name: 'Gaurav Jadhav',
    role: 'Head of Events & Logistics',
    department: 'Events & Operations',
    branchAndYear: 'B.Tech Civil (Third Year)',
    bio: 'Executing flawless auditorium logistics, stage operations, hospitality, and crowd security.',
    linkedin: 'https://linkedin.com',
  },

  // Startup Incubation
  {
    id: 'incub-1',
    name: 'Isha More',
    role: 'Incubation & Research Lead',
    department: 'Startup Incubation',
    branchAndYear: 'B.Tech Chemical (Third Year)',
    bio: 'Tracking student startup milestones, patent paperwork, and incubator co-working allocations.',
    linkedin: 'https://linkedin.com',
  },

  // Alumni Mentors
  {
    id: 'alumni-1',
    name: 'Ketan Bapat (Batch 2021)',
    role: 'Founder, CloudFlow Logistics (Raised $2.5M)',
    department: 'Alumni Mentors',
    bio: 'Provides seed capital guidance, enterprise sales mentorship, and connects MITAOE teams with Y Combinator alumni.',
    linkedin: 'https://linkedin.com',
  },
  {
    id: 'alumni-2',
    name: 'Pooja Verma (Batch 2022)',
    role: 'Product Lead, FinStack AI',
    department: 'Alumni Mentors',
    bio: 'Mentors collegiate ventures on user acquisition, product positioning, and early customer discovery.',
    linkedin: 'https://linkedin.com',
  }
];

export const departments = [
  'All Departments',
  'Leadership',
  'Technical',
  'Corporate Relations',
  'Design & Media',
  'Events & Operations',
  'Startup Incubation',
  'Faculty Advisory',
  'Alumni Mentors'
] as const;
