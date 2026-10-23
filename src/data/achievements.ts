export interface MilestoneItem {
  year: string;
  quarter?: string;
  title: string;
  category: 'CAMPUS' | 'NATIONAL' | 'STARTUP' | 'POLICY';
  summary: string;
  impactMetrics: string;
  documentationUrl?: string;
}

export interface PastReport {
  year: string;
  title: string;
  fileSize: string;
  summary: string;
  downloadUrl: string;
}

export const milestonesTimeline: MilestoneItem[] = [
  {
    year: '2026',
    quarter: 'Q3',
    title: 'CIIE DeepTech Pre-Incubation Cohort Launched',
    category: 'POLICY',
    summary: 'Established structured ₹25 Lakhs pre-seed support fund with institutional approval for student patent fee reimbursement.',
    impactMetrics: '12 Startups Selected • 4 Patents Filed',
  },
  {
    year: '2026',
    quarter: 'Q1',
    title: 'E-Summit 2026 Sets Record Attendance',
    category: 'CAMPUS',
    summary: 'Gathered 2,400+ delegates from across 35 institutions in Maharashtra with 42 corporate partners.',
    impactMetrics: '2,400+ Delegates • ₹4.5L Cash Prizes Awarded',
  },
  {
    year: '2025',
    quarter: 'Q4',
    title: 'National E-Cell Excellence Recognition',
    category: 'NATIONAL',
    summary: 'Ranked among top collegiate innovation ecosystems in the western region for student-led venture density.',
    impactMetrics: 'Top 10 Regional Innovation Chapter',
  },
  {
    year: '2025',
    quarter: 'Q2',
    title: 'First Alum Startup Raises Institutional Seed',
    category: 'STARTUP',
    summary: 'AeroGrid Robotics, conceptualized inside MITAOE Makerspace, closed a $750,000 seed round.',
    impactMetrics: '$750k Seed Capital • 18 Jobs Created',
  },
  {
    year: '2024',
    quarter: 'Q3',
    title: 'Inauguration of 24/7 Innovation Co-Working Pods',
    category: 'CAMPUS',
    summary: 'Dedicated 3,500 sq ft prototyping hub with 3D printers, laser cutters, and gigabit fiber for student founders.',
    impactMetrics: '3,500 sq ft Space • 65+ Daily Builders',
  }
];

export const annualReports: PastReport[] = [
  {
    year: '2025–2026',
    title: 'E-Cell MITAOE Annual Impact & Audited Venture Report',
    fileSize: '4.2 MB PDF',
    summary: 'Comprehensive audit of organized events, participant demographics, grant allocations, and venture milestones.',
    downloadUrl: '#'
  },
  {
    year: '2024–2025',
    title: 'Entrepreneurship Ecosystem Review & Financial Statement',
    fileSize: '3.6 MB PDF',
    summary: 'Annual overview of E-Summit, Brand Battle turnaround case studies, and corporate sponsorship reconciliation.',
    downloadUrl: '#'
  }
];
