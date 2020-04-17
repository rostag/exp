import { ResourceGroup, FlowEntry } from './diagram.component';

export const sources: ResourceGroup[] = [
  {
    label: 'All External Users',
    id: 'source-1',
    type: 'user',
  },
  {
    label: 'VIP Internal',
    id: 'source-2',
    type: 'user',
  },
  {
    label: 'US_Users',
    id: 'source-3',
    type: 'user',
  },
  {
    label: 'Europe Users',
    id: 'source-4',
    type: 'user',
  },
  {
    label: 'Users_Germany',
    id: 'source-5',
    type: 'user',
  },
  {
    label: 'Beta Customers',
    id: 'source-6',
    type: 'user',
  },
  {
    label: 'Users_France',
    id: 'source-7',
    type: 'user',
  },
  {
    label: 'All VIP',
    id: 'source-8',
    type: 'user',
  },
  {
    label: 'Security_Admin',
    id: 'source-9',
    type: 'user',
  },
  {
    label: 'GNS-02_Admin',
    id: 'source-10',
    type: 'user',
  },
  {
    label: 'GNS-01_Admin',
    id: 'source-11',
    type: 'user',
  },
  {
    label: 'Project Alpha Team',
    id: 'source-12',
    type: 'user',
  },
  {
    label: 'Ops Team',
    id: 'source-13',
    type: 'user',
  },
  {
    label: 'privilege_prod_services',
    id: 'source-14',
    type: 'service',
  },
  {
    label: 'All Services',
    id: 'source-15',
    type: 'service',
  },
  {
    label: 'Singleton Services',
    id: 'source-16',
    type: 'service',
  },
  {
    label: 'Critical SLO Services',
    id: 'source-17',
    type: 'service',
  },
  {
    label: 'Frankfurt Nodes',
    id: 'source-18',
    type: 'node',
  },
  {
    label: 'Las Vegas Nodes',
    id: 'source-19',
    type: 'node',
  },
  {
    label: 'Tokyo Nodes',
    id: 'source-20',
    type: 'node',
  },
  {
    label: 'High Latency Nodes',
    id: 'source-21',
    type: 'node',
  },
  {
    label: '4x-large Nodes',
    id: 'source-22',
    type: 'node',
  },
  {
    label: 'C5 Instances',
    id: 'source-23',
    type: 'node',
  },
  {
    label: 'Other nodes',
    id: 'source-24',
    type: 'node',
  },
];

export const destinations: ResourceGroup[] = [
  {
    label: 'Level-2 Data',
    id: 'destination-1',
    type: 'data',
  },
  {
    label: 'Primary Databases',
    id: 'destination-2',
    type: 'data',
  },
  {
    label: 'Low Latency Data',
    id: 'destination-3',
    type: 'data',
  },
  {
    label: 'Level-4 Critical Data',
    id: 'destination-4',
    type: 'data',
  },
  {
    label: 'Level-3 HIRD Data',
    id: 'destination-5',
    type: 'data',
  },
  {
    label: 'High Latency Data',
    id: 'destination-6',
    type: 'data',
  },
  {
    label: 'HIPPA Data',
    id: 'destination-7',
    type: 'data',
  },
  {
    label: 'Level-1 Data',
    id: 'destination-8',
    type: 'data',
  },
  {
    label: 'EU Data',
    id: 'destination-9',
    type: 'data',
  },
];

export const flowEntries: FlowEntry[] = [
  {
    source: 'source-1',
    destination: 'destination-1',
    intent: 'DENY',
    label: 'Internet Users',
  },
  {
    source: 'source-3',
    destination: 'destination-1',
    intent: 'DENY',
    label: 'Data Compliance Policy',
  },
  {
    source: 'source-4',
    destination: 'destination-2',
    intent: 'ALLOW',
    label: 'User-Data Requests',
    selected: true,
  },
  {
    source: 'source-4',
    destination: 'destination-5',
    intent: 'ALLOW',
    label: 'User-Data Requests',
    selected: true,
  },
  {
    source: 'source-5',
    destination: 'destination-9',
    intent: 'DENY',
    label: 'Unknown Policy Name',
  },
  {
    source: 'source-6',
    destination: 'destination-9',
    intent: 'ALLOW',
    label: '3rd Part Service Data Ingestion',
  },
  {
    source: 'source-1',
    destination: 'destination-8',
    intent: 'ALLOW',
    label: 'Test Policy 3',
  },
  {
    source: 'source-3',
    destination: 'destination-7',
    intent: 'ALLOW',
    label: 'VIP Data',
  },
  {
    source: 'source-4',
    destination: 'destination-9',
    intent: 'ALLOW',
    label: 'Privileged',
  },
  {
    source: 'source-1',
    destination: 'destination-8',
    intent: 'DENY',
    label: 'DENY',
  },
  {
    source: 'source-5',
    destination: 'destination-9',
    intent: 'DENY',
    label: 'DENY',
  },
  {
    source: 'source-10',
    destination: 'destination-9',
    intent: 'ALLLOW',
    label: 'Normal Traffic',
  },
  {
    source: 'source-11',
    destination: 'destination-9',
    intent: 'ALLOW',
    label: 'Allow incoming',
  },
  {
    source: 'source-12',
    destination: 'destination-9',
    intent: 'DENY',
    label: 'DENY',
  },
  {
    source: 'source-15',
    destination: 'destination-9',
    intent: 'DENY',
    label: 'DENY',
  },
  {
    source: 'source-18',
    destination: 'destination-9',
    intent: 'ALLOW',
    label: 'Frankfurt Allowed',
  },
  {
    source: 'source-21',
    destination: 'destination-9',
    intent: 'Allow',
    label: 'DENY',
  },
  {
    source: 'source-24',
    destination: 'destination-9',
    intent: 'ALLOW',
    label: 'Allow Traffic',
  },
];
