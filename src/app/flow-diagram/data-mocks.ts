import { ResourceGroup, FlowEntry, Policy, RESOURCE_GROUP_TYPE, POLICY_INTENT } from './data-model';

export const sources: ResourceGroup[] = [
  {
    label: 'All External Users',
    id: 'source-1',
    type: RESOURCE_GROUP_TYPE.USER,
  },
  {
    label: 'VIP Internal',
    id: 'source-2',
    type: RESOURCE_GROUP_TYPE.USER,
  },
  {
    label: 'US_Users',
    id: 'source-3',
    type: RESOURCE_GROUP_TYPE.USER,
  },
  {
    label: 'Europe Users',
    id: 'source-4',
    type: RESOURCE_GROUP_TYPE.USER,
  },
  {
    label: 'Users_Germany',
    id: 'source-5',
    type: RESOURCE_GROUP_TYPE.USER,
  },
  {
    label: 'Beta Customers',
    id: 'source-6',
    type: RESOURCE_GROUP_TYPE.USER,
  },
  {
    label: 'Users_France',
    id: 'source-7',
    type: RESOURCE_GROUP_TYPE.USER,
  },
  {
    label: 'All VIP',
    id: 'source-8',
    type: RESOURCE_GROUP_TYPE.USER,
  },
  {
    label: 'Security_Admin',
    id: 'source-9',
    type: RESOURCE_GROUP_TYPE.USER,
  },
  {
    label: 'GNS-02_Admin',
    id: 'source-10',
    type: RESOURCE_GROUP_TYPE.USER,
  },
  {
    label: 'GNS-01_Admin',
    id: 'source-11',
    type: RESOURCE_GROUP_TYPE.USER,
  },
  {
    label: 'Project Alpha Team',
    id: 'source-12',
    type: RESOURCE_GROUP_TYPE.USER,
  },
  {
    label: 'Ops Team',
    id: 'source-13',
    type: RESOURCE_GROUP_TYPE.USER,
  },
  {
    label: 'privilege_prod_services',
    id: 'source-14',
    type: RESOURCE_GROUP_TYPE.SERVICE,
  },
  {
    label: 'All Services',
    id: 'source-15',
    type: RESOURCE_GROUP_TYPE.SERVICE,
  },
  {
    label: 'Singleton Services',
    id: 'source-16',
    type: RESOURCE_GROUP_TYPE.SERVICE,
  },
  {
    label: 'Critical SLO Services',
    id: 'source-17',
    type: RESOURCE_GROUP_TYPE.SERVICE,
  },
  {
    label: 'Frankfurt Nodes',
    id: 'source-18',
    type: RESOURCE_GROUP_TYPE.NODE,
  },
  {
    label: 'Las Vegas Nodes',
    id: 'source-19',
    type: RESOURCE_GROUP_TYPE.NODE,
  },
  {
    label: 'Tokyo Nodes',
    id: 'source-20',
    type: RESOURCE_GROUP_TYPE.NODE,
  },
  {
    label: 'High Latency Nodes',
    id: 'source-21',
    type: RESOURCE_GROUP_TYPE.NODE,
  },
  {
    label: '4x-large Nodes',
    id: 'source-22',
    type: RESOURCE_GROUP_TYPE.NODE,
  },
  {
    label: 'C5 Instances',
    id: 'source-23',
    type: RESOURCE_GROUP_TYPE.NODE,
  },
  {
    label: 'Other nodes',
    id: 'source-24',
    type: RESOURCE_GROUP_TYPE.NODE,
  },
];

export const destinations: ResourceGroup[] = [
  {
    label: 'Level-2 Data',
    id: 'destination-1',
    type: RESOURCE_GROUP_TYPE.DATA,
  },
  {
    label: 'Primary Databases',
    id: 'destination-2',
    type: RESOURCE_GROUP_TYPE.DATA,
  },
  {
    label: 'Low Latency Data',
    id: 'destination-3',
    type: RESOURCE_GROUP_TYPE.DATA,
  },
  {
    label: 'Level-4 Critical Data',
    id: 'destination-4',
    type: RESOURCE_GROUP_TYPE.DATA,
  },
  {
    label: 'Level-3 HIRD Data',
    id: 'destination-5',
    type: RESOURCE_GROUP_TYPE.DATA,
  },
  {
    label: 'High Latency Data',
    id: 'destination-6',
    type: RESOURCE_GROUP_TYPE.DATA,
  },
  {
    label: 'HIPPA Data',
    id: 'destination-7',
    type: RESOURCE_GROUP_TYPE.DATA,
  },
  {
    label: 'Level-1 Data',
    id: 'destination-8',
    type: RESOURCE_GROUP_TYPE.DATA,
  },
  {
    label: 'EU Data',
    id: 'destination-9',
    type: RESOURCE_GROUP_TYPE.DATA,
  },
];

export const flowEntries: FlowEntry[] = [
  {
    source: 'source-1',
    destination: 'destination-1',
    label: 'Internet Users',
  },
  {
    source: 'source-3',
    destination: 'destination-1',
    label: 'Data Compliance Policy',
  },
  {
    source: 'source-4',
    destination: 'destination-2',
    label: 'User-Data Requests',
    selected: true,
  },
  {
    source: 'source-4',
    destination: 'destination-5',
    label: 'User-Data Requests',
    selected: true,
  },
  {
    source: 'source-5',
    destination: 'destination-9',
    label: 'Unknown Policy Name',
  },
  {
    source: 'source-6',
    destination: 'destination-9',
    label: '3rd Part Service Data Ingestion',
  },
  {
    source: 'source-1',
    destination: 'destination-8',
    label: 'Test Policy 3',
  },
  {
    source: 'source-3',
    destination: 'destination-7',
    label: 'VIP Data',
  },
  {
    source: 'source-4',
    destination: 'destination-9',
    label: 'Privileged',
  },
  {
    source: 'source-1',
    destination: 'destination-8',
    label: POLICY_INTENT.DENY,
  },
  {
    source: 'source-11',
    destination: 'destination-9',
    label: 'Allow incoming',
  },
  {
    source: 'source-12',
    destination: 'destination-9',
    label: POLICY_INTENT.DENY,
  },
  {
    source: 'source-18',
    destination: 'destination-9',
    label: 'Frankfurt Allowed',
  },
  {
    source: 'source-21',
    destination: 'destination-9',
    label: POLICY_INTENT.DENY,
  },
  {
    source: 'source-14',
    destination: 'destination-9',
    label: POLICY_INTENT.DENY,
  },
  {
    source: 'source-24',
    destination: 'destination-9',
    label: 'Allow Traffic',
  },
];

export const gates: Policy[] = [
  {
    source: 'source-1',
    destination: 'destination-1',
    intent: POLICY_INTENT.DENY,
    label: 'Internet Users',
    id: 'gate-1'
  },
  {
    source: 'source-3',
    destination: 'destination-1',
    intent: POLICY_INTENT.DENY,
    label: 'Data Compliance Policy',
    id: 'gate-2'
  },
  {
    source: 'source-4',
    destination: 'destination-2',
    intent: POLICY_INTENT.ALLOW,
    label: 'User-Data Requests',
    id: 'gate-3',
    selected: true,
  },
  {
    source: 'source-4',
    destination: 'destination-5',
    intent: POLICY_INTENT.ALLOW,
    label: 'User-Data Requests',
    id: 'gate-4',
  },
  {
    source: 'source-5',
    destination: 'destination-9',
    intent: POLICY_INTENT.DENY,
    label: 'Unknown Policy Name',
    id: 'gate-5',
  },
  {
    source: 'source-6',
    destination: 'destination-9',
    intent: POLICY_INTENT.ALLOW,
    label: '3rd Part Service Data Ingestion',
    id: 'gate-6'
  }
];
