export interface StatMetric {
  id: string;
  iconName: 'calendar' | 'users' | 'userCheck' | 'award';
  placeholderValue: string;
  verifiedValue: string;
  label: string;
  description: string;
}

export const statsData: StatMetric[] = [
  {
    id: 'events',
    iconName: 'calendar',
    placeholderValue: 'XX+',
    verifiedValue: '28+',
    label: 'Events Organized',
    description: 'Annual hackathons, pitch fests, conclaves & bootcamps'
  },
  {
    id: 'participants',
    iconName: 'users',
    placeholderValue: 'XXX+',
    verifiedValue: '5,400+',
    label: 'Participants Engaged',
    description: 'Students, founders, and creators across colleges'
  },
  {
    id: 'members',
    iconName: 'userCheck',
    placeholderValue: 'XX+',
    verifiedValue: '65+',
    label: 'Student Members',
    description: 'Active organizers across 6 functional departments'
  }
];

export const statsQuote = 'Creating opportunities today for a bolder tomorrow.';
