export interface ResourceItem {
  id: string;
  title: string;
  category: 'PLAYBOOK' | 'TEMPLATE' | 'LEGAL' | 'GRANT' | 'TOOLKIT';
  description: string;
  format: string;
  readTimeOrSize: string;
  downloadUrl: string;
  tags: string[];
}

export const resourcesList: ResourceItem[] = [
  {
    id: 'founder-playbook-2026',
    title: 'The MITAOE Student Founder Playbook (2026 Edition)',
    category: 'PLAYBOOK',
    description: 'The definitive blueprint for taking a college engineering project from hypothesis to first paying customer while balancing academics.',
    format: 'PDF Guide',
    readTimeOrSize: '36 Pages • 5.1 MB',
    downloadUrl: '#',
    tags: ['Customer Discovery', 'Prototyping', 'Academics & Startups']
  },
  {
    id: 'seed-pitch-deck-template',
    title: 'Standard Seed Pitch Deck Architecture',
    category: 'TEMPLATE',
    description: 'Tested 12-slide investor deck structure tailored for Indian angel networks and collegiate grant committees.',
    format: 'Figma & PPTX',
    readTimeOrSize: '12 Slides • 8.4 MB',
    downloadUrl: '#',
    tags: ['Pitching', 'Fundraising', 'Deck Design']
  },
  {
    id: 'startup-india-guide',
    title: 'DPIIT Recognition & Startup India Tax Exemption Step-by-Step',
    category: 'LEGAL',
    description: 'Comprehensive navigation guide for collegiate ventures applying for DPIIT startup recognition, Section 80-IAC tax benefits, and government tenders.',
    format: 'Checklist & Guide',
    readTimeOrSize: '18 Pages • 2.8 MB',
    downloadUrl: '#',
    tags: ['DPIIT', 'Govt Schemes', 'Compliance']
  },
  {
    id: 'cap-table-unit-economics',
    title: 'Pre-Seed Financial Model & Cap Table Spreadsheet',
    category: 'TOOLKIT',
    description: 'Clean Google Sheets spreadsheet model calculating CAC, LTV, monthly burn rate, dilution curves, and founder equity splits.',
    format: 'Google Sheets / Excel',
    readTimeOrSize: 'Spreadsheet Template',
    downloadUrl: '#',
    tags: ['Unit Economics', 'Cap Table', 'Finance']
  },
  {
    id: 'nidhi-eir-application-handbook',
    title: 'NIDHI-EIR & SISFS Grant Application Playbook',
    category: 'GRANT',
    description: 'Breakdown of successful grant applications submitted by MITAOE founders to Department of Science and Technology (DST) incubators.',
    format: 'PDF Handbook',
    readTimeOrSize: '24 Pages • 3.4 MB',
    downloadUrl: '#',
    tags: ['NIDHI-EIR', 'Govt Grants', 'Non-Dilutive Funding']
  }
];
