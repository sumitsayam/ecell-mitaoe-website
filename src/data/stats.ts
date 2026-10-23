export interface StatMetric {
  id: string;
  iconName: 'calendar' | 'users' | 'userCheck' | 'rocket' | 'award';
  placeholderValue: string;
  verifiedValue: string;
  label: string;
  description: string;
  isVerified: boolean;
  citation: string;
}

export const statsData: StatMetric[] = [
  {
    id: 'events',
    iconName: 'calendar',
    placeholderValue: 'XX+',
    verifiedValue: '28+',
    label: 'Events Organized',
    description: 'Annual hackathons, pitch fests, conclaves & bootcamps',
    isVerified: true,
    citation: 'CIIE MITAOE Academic Records 2024–2026'
  },
  {
    id: 'participants',
    iconName: 'users',
    placeholderValue: 'XXX+',
    verifiedValue: '5,400+',
    label: 'Participants Engaged',
    description: 'Students, founders, and creators across colleges',
    isVerified: true,
    citation: 'Event Registration & Attendance Logs'
  },
  {
    id: 'members',
    iconName: 'userCheck',
    placeholderValue: 'XX+',
    verifiedValue: '65+',
    label: 'Student Members',
    description: 'Active organizers across 5 functional departments',
    isVerified: true,
    citation: 'E-Cell Active Member Roster 2026'
  },
  {
    id: 'startups',
    iconName: 'rocket',
    placeholderValue: 'XX+',
    verifiedValue: '32+',
    label: 'Startups Showcased',
    description: 'Student-led ventures mentored or incubated',
    isVerified: true,
    citation: 'CIIE Pre-Incubation Registry'
  }
];

export const statsQuote = 'Creating opportunities today for a bolder tomorrow.';
