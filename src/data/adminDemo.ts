export interface AdminMember {
  id: string;
  name: string;
  prn: string;
  email: string;
  department: string;
  position: string;
  year: string;
  status: 'active' | 'alumni' | 'inactive';
  joinedDate: string;
  phone: string;
}

export interface AdminEventRecord {
  id: string;
  title: string;
  category: string;
  date: string;
  venue: string;
  status: 'published' | 'draft' | 'completed';
  registeredCount: number;
  capacity: number;
  budgetAllocated: string;
  coordinator: string;
}

export interface AdminParticipant {
  id: string;
  name: string;
  prn: string;
  email: string;
  college: string;
  eventTitle: string;
  eventId: string;
  checkInStatus: 'Checked In' | 'Registered' | 'Absent';
  registeredAt: string;
}

export interface AdminApplication {
  id: string;
  fullName: string;
  prn: string;
  email: string;
  year: string;
  branch: string;
  departmentTrack: string;
  status: 'Pending' | 'Reviewing' | 'Shortlisted' | 'Accepted' | 'Rejected';
  interviewScore?: number;
  appliedDate: string;
  statement: string;
}

export interface AdminDocument {
  id: string;
  title: string;
  category: 'MOU' | 'REPORT' | 'BUDGET' | 'APPROVAL';
  year: string;
  uploadedBy: string;
  fileSize: string;
  date: string;
}

export interface AuditLogItem {
  id: string;
  action: string;
  user: string;
  timestamp: string;
  details: string;
}

export const initialAdminMembers: AdminMember[] = [
  {
    id: 'm-1',
    name: 'Sumit Sayam',
    prn: 'MIT2023CS014',
    email: 'sumit.sayam@mitaoe.ac.in',
    department: 'Leadership',
    position: 'President',
    year: 'Final Year (BE)',
    status: 'active',
    joinedDate: 'August 2023',
    phone: '+91 98230 45671'
  },
  {
    id: 'm-2',
    name: 'Ananya Sharma',
    prn: 'MIT2023IT029',
    email: 'ananya.sharma@mitaoe.ac.in',
    department: 'Leadership',
    position: 'Vice President',
    year: 'Final Year (BE)',
    status: 'active',
    joinedDate: 'August 2023',
    phone: '+91 97654 32109'
  },
  {
    id: 'm-3',
    name: 'Aditya Patil',
    prn: 'MIT2024ET041',
    email: 'aditya.patil@mitaoe.ac.in',
    department: 'Leadership',
    position: 'General Secretary',
    year: 'Third Year (TE)',
    status: 'active',
    joinedDate: 'August 2024',
    phone: '+91 98901 23456'
  },
  {
    id: 'm-4',
    name: 'Varun Kulkarni',
    prn: 'MIT2024CS088',
    email: 'varun.k@mitaoe.ac.in',
    department: 'Technical & Development',
    position: 'Tech Lead',
    year: 'Third Year (TE)',
    status: 'active',
    joinedDate: 'September 2024',
    phone: '+91 91234 56789'
  },
  {
    id: 'm-5',
    name: 'Riddhi Joshi',
    prn: 'MIT2025AI019',
    email: 'riddhi.j@mitaoe.ac.in',
    department: 'Technical & Development',
    position: 'Frontend Developer',
    year: 'Second Year (SE)',
    status: 'active',
    joinedDate: 'September 2025',
    phone: '+91 93456 78901'
  },
  {
    id: 'm-6',
    name: 'Tanvi Shinde',
    prn: 'MIT2024ME052',
    email: 'tanvi.shinde@mitaoe.ac.in',
    department: 'Corporate Relations',
    position: 'Department Lead',
    year: 'Third Year (TE)',
    status: 'active',
    joinedDate: 'August 2024',
    phone: '+91 95678 90123'
  },
  {
    id: 'm-7',
    name: 'Siddharth Rao',
    prn: 'MIT2024DS011',
    email: 'siddharth.rao@mitaoe.ac.in',
    department: 'Design & Media',
    position: 'Brand & Visual Lead',
    year: 'Third Year (TE)',
    status: 'active',
    joinedDate: 'August 2024',
    phone: '+91 96789 01234'
  },
  {
    id: 'm-8',
    name: 'Gaurav Jadhav',
    prn: 'MIT2024CV034',
    email: 'gaurav.j@mitaoe.ac.in',
    department: 'Events & Operations',
    position: 'Operations Lead',
    year: 'Third Year (TE)',
    status: 'active',
    joinedDate: 'September 2024',
    phone: '+91 97890 12345'
  },
  {
    id: 'm-9',
    name: 'Isha More',
    prn: 'MIT2024CH007',
    email: 'isha.more@mitaoe.ac.in',
    department: 'Startup Incubation',
    position: 'Incubation Associate',
    year: 'Third Year (TE)',
    status: 'active',
    joinedDate: 'October 2024',
    phone: '+91 98901 23457'
  }
];

export const initialAdminEvents: AdminEventRecord[] = [
  {
    id: 'ev-1',
    title: 'Brand Battle 2026',
    category: 'COMPETITION',
    date: 'November 18, 2026',
    venue: 'MITAOE Main Auditorium',
    status: 'published',
    registeredCount: 38,
    capacity: 45,
    budgetAllocated: '₹35,000',
    coordinator: 'Tanvi Shinde'
  },
  {
    id: 'ev-2',
    title: 'Entrepreneurship Bootcamp & MVP Sprint',
    category: 'WORKSHOP',
    date: 'December 04, 2026',
    venue: 'Design Thinking Studio',
    status: 'published',
    registeredCount: 142,
    capacity: 180,
    budgetAllocated: '₹20,000',
    coordinator: 'Varun Kulkarni'
  },
  {
    id: 'ev-3',
    title: 'Startup Showcase & Demo Day',
    category: 'INITIATIVE',
    date: 'January 22, 2027',
    venue: 'Innovation Arena',
    status: 'published',
    registeredCount: 28,
    capacity: 35,
    budgetAllocated: '₹75,000',
    coordinator: 'Isha More'
  },
  {
    id: 'ev-4',
    title: 'E-Summit MITAOE 2027',
    category: 'CONCLAVE',
    date: 'February 14–16, 2027',
    venue: 'Entire Campus',
    status: 'published',
    registeredCount: 620,
    capacity: 2500,
    budgetAllocated: '₹3,50,000',
    coordinator: 'Sumit Sayam'
  },
  {
    id: 'ev-5',
    title: 'Angel Syndicate Closed Investor Mixer',
    category: 'INITIATIVE',
    date: 'March 05, 2027',
    venue: 'Conference Hall 1',
    status: 'draft',
    registeredCount: 0,
    capacity: 30,
    budgetAllocated: '₹15,000',
    coordinator: 'Ananya Sharma'
  }
];

export const initialAdminParticipants: AdminParticipant[] = [
  {
    id: 'p-1',
    name: 'Aarav Deshmukh',
    prn: 'MIT2025CS044',
    email: 'aarav.d@mitaoe.ac.in',
    college: 'MITAOE Pune',
    eventTitle: 'Brand Battle',
    eventId: 'ev-1',
    checkInStatus: 'Checked In',
    registeredAt: 'Oct 20, 2026'
  },
  {
    id: 'p-2',
    name: 'Neha Phadke',
    prn: 'MIT2024IT071',
    email: 'neha.p@mitaoe.ac.in',
    college: 'MITAOE Pune',
    eventTitle: 'Brand Battle',
    eventId: 'ev-1',
    checkInStatus: 'Checked In',
    registeredAt: 'Oct 21, 2026'
  },
  {
    id: 'p-3',
    name: 'Kunal Verma',
    prn: 'COEP2024ET012',
    email: 'kunal.v@coep.ac.in',
    college: 'COEP Tech University',
    eventTitle: 'Entrepreneurship Bootcamp & MVP Sprint',
    eventId: 'ev-2',
    checkInStatus: 'Registered',
    registeredAt: 'Oct 22, 2026'
  },
  {
    id: 'p-4',
    name: 'Pooja Gaikwad',
    prn: 'MIT2025ME028',
    email: 'pooja.g@mitaoe.ac.in',
    college: 'MITAOE Pune',
    eventTitle: 'Startup Showcase & Demo Day',
    eventId: 'ev-3',
    checkInStatus: 'Registered',
    registeredAt: 'Oct 23, 2026'
  }
];

export const initialAdminApplications: AdminApplication[] = [
  {
    id: 'app-1',
    fullName: 'Rahul Kadam',
    prn: 'MIT2026CS102',
    email: 'rahul.kadam@mitaoe.ac.in',
    year: 'First Year (FE)',
    branch: 'Computer Engineering',
    departmentTrack: 'Technical & Development',
    status: 'Shortlisted',
    interviewScore: 8.5,
    appliedDate: 'Oct 19, 2026',
    statement: 'Experienced with Next.js, Tailwind, and Git. Built a campus lost-and-found portal and want to build the E-Cell web suite.'
  },
  {
    id: 'app-2',
    fullName: 'Meera Sen',
    prn: 'MIT2025ET063',
    email: 'meera.sen@mitaoe.ac.in',
    year: 'Second Year (SE)',
    branch: 'Electronics & Telecomm',
    departmentTrack: 'Corporate Relations',
    status: 'Pending',
    appliedDate: 'Oct 21, 2026',
    statement: 'Strong interpersonal skills, debate champion. Interested in connecting startup founders with tech sponsors.'
  },
  {
    id: 'app-3',
    fullName: 'Akash Salunkhe',
    prn: 'MIT2025ME033',
    email: 'akash.s@mitaoe.ac.in',
    year: 'Second Year (SE)',
    branch: 'Mechanical Engineering',
    departmentTrack: 'Events & Operations',
    status: 'Reviewing',
    appliedDate: 'Oct 22, 2026',
    statement: 'Managed logistics for college annual fest of 3,000 students. Ready to coordinate stage equipment and VIP logistics.'
  }
];

export const initialAdminDocuments: AdminDocument[] = [
  {
    id: 'doc-1',
    title: 'E-Summit 2026 Title Sponsorship Agreement - TechCorp',
    category: 'MOU',
    year: '2026',
    uploadedBy: 'Tanvi Shinde',
    fileSize: '1.8 MB PDF',
    date: 'Aug 14, 2026'
  },
  {
    id: 'doc-2',
    title: 'Annual Audited Financial Statement & CIIE Grant Allocation',
    category: 'BUDGET',
    year: '2025-26',
    uploadedBy: 'Sumit Sayam',
    fileSize: '2.4 MB PDF',
    date: 'Jun 30, 2026'
  },
  {
    id: 'doc-3',
    title: 'Institutional Permissions for Makerspace 24/7 Night Access',
    category: 'APPROVAL',
    year: '2026',
    uploadedBy: 'Aditya Patil',
    fileSize: '650 KB PDF',
    date: 'Sep 02, 2026'
  }
];

export const initialAuditLogs: AuditLogItem[] = [
  {
    id: 'log-1',
    action: 'Event Published',
    user: 'Sumit Sayam (President)',
    timestamp: '2026-10-23 18:30:12',
    details: 'Published Brand Battle 2026 with 45 team slots'
  },
  {
    id: 'log-2',
    action: 'Candidate Shortlisted',
    user: 'Varun Kulkarni (Tech Lead)',
    timestamp: '2026-10-22 14:15:00',
    details: 'Moved Rahul Kadam to Shortlisted for Technical track'
  },
  {
    id: 'log-3',
    action: 'Document Uploaded',
    user: 'Tanvi Shinde (Corp Relations)',
    timestamp: '2026-10-20 11:22:45',
    details: 'Uploaded sponsorship MOU agreement with TechCorp'
  }
];
