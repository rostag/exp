import { ResourceGroup, Stream, Gate, RESOURCE_GROUP_TYPE, POLICY_INTENT } from './data-model';

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

export const streams: Stream[] = [
  {
    srcId: 'source-1',
    dstId: 'destination-1',
    label: 'Internet Users',
    srcVolume: 15,
    gatedVolume: 5,
  },
  {
    srcId: 'source-1',
    dstId: 'destination-4',
    label: 'Internet Users',
  },
  {
    srcId: 'source-2',
    dstId: 'destination-9',
    label: 'Data Compliance Policy',
    srcVolume: 18,
  },
  {
    srcId: 'source-2',
    dstId: 'destination-5',
    label: 'Data Compliance Policy',
    srcVolume: 6,
  },
  {
    srcId: 'source-2',
    dstId: 'destination-6',
    label: 'Data Compliance Policy',
    srcVolume: 2,
  },
  {
    srcId: 'source-3',
    dstId: 'destination-1',
    label: 'Data Compliance Policy',
    srcVolume: 9,
  },
  {
    srcId: 'source-4',
    dstId: 'destination-2',
    label: 'User-Data Requests',
    srcVolume: 2,
  },
  {
    srcId: 'source-4',
    dstId: 'destination-5',
    label: 'User-Data Requests',
    srcVolume: 12,
  },
  {
    srcId: 'source-5',
    dstId: 'destination-9',
    label: 'Unknown Policy Name',
    srcVolume: 19,
  },
  {
    srcId: 'source-5',
    dstId: 'destination-5',
    label: 'Unknown Policy Name',
  },
  {
    srcId: 'source-6',
    dstId: 'destination-9',
    label: '3rd Part Service Data Ingestion',
    srcVolume: 5,
  },
  {
    srcId: 'source-7',
    dstId: 'destination-2',
    label: '3rd Part Service Data Ingestion',
    srcVolume: 5,
  },
  {
    srcId: 'source-8',
    dstId: 'destination-2',
    label: '3rd Part Service Data Ingestion',
    srcVolume: 2,
  },
  {
    srcId: 'source-9',
    dstId: 'destination-2',
    label: '3rd Part Service Data Ingestion',
    srcVolume: 15,
  },
  {
    srcId: 'source-1',
    dstId: 'destination-8',
    label: 'Test Policy 3',
    srcVolume: 4,
  },
  {
    srcId: 'source-3',
    dstId: 'destination-7',
    label: 'VIP Data',
    srcVolume: 3,
  },
  {
    srcId: 'source-4',
    dstId: 'destination-9',
    label: 'Privileged',
    srcVolume: 2,
  },
  {
    srcId: 'source-1',
    dstId: 'destination-8',
    label: POLICY_INTENT.DENY,
    srcVolume: 8,
  },
  {
    srcId: 'source-11',
    dstId: 'destination-9',
    label: 'Allow incoming',
    srcVolume: 7,
  },
  {
    srcId: 'source-12',
    dstId: 'destination-9',
    label: POLICY_INTENT.DENY,
    srcVolume: 2,
  },
  {
    srcId: 'source-18',
    dstId: 'destination-9',
    label: 'Frankfurt Allowed',
    srcVolume: 6,
  },
  {
    srcId: 'source-21',
    dstId: 'destination-9',
    label: POLICY_INTENT.DENY,
  },
  {
    srcId: 'source-14',
    dstId: 'destination-9',
    label: POLICY_INTENT.DENY,
    srcVolume: 8,
  },
  {
    srcId: 'source-24',
    dstId: 'destination-9',
    label: 'Allow Traffic',
    srcVolume: 2,
  },
  {
    srcId: 'source-16',
    dstId: 'destination-1',
    label: 'Allow Traffic',
  },
  {
    srcId: 'source-16',
    dstId: 'destination-5',
    label: 'Allow Traffic',
    srcVolume: 2,
  },
];

export const gates: Gate[] = [
  {
    srcId: 'source-1',
    dstId: 'destination-1',
    intent: POLICY_INTENT.DENY,
    label: 'Internet Users',
    id: 'gate-1',
  },
  {
    srcId: 'source-3',
    dstId: 'destination-1',
    intent: POLICY_INTENT.DENY,
    label: 'Svc-Svc Blocks',
    id: 'gate-2',
  },
  {
    srcId: 'source-3',
    dstId: 'destination-1',
    intent: POLICY_INTENT.DENY,
    label: 'Data Compliance Policy',
    id: 'gate-3',
  },
  {
    srcId: 'source-4',
    dstId: 'destination-2',
    intent: POLICY_INTENT.ALLOW,
    label: 'User-Data Requests',
    id: 'gate-4',
  },
  {
    srcId: 'source-5',
    dstId: 'destination-9',
    intent: POLICY_INTENT.ALLOW,
    label: 'Unknown Policy Name',
    id: 'gate-5',
  },
  {
    srcId: 'source-6',
    dstId: 'destination-9',
    intent: POLICY_INTENT.ALLOW,
    label: '3rd Part Service Data Ingestion',
    id: 'gate-6',
  },
  {
    srcId: 'source-4',
    dstId: 'destination-5',
    intent: POLICY_INTENT.ALLOW,
    label: 'Test Policy 3',
    id: 'gate-7',
  },
  {
    srcId: 'source-4',
    dstId: 'destination-5',
    intent: POLICY_INTENT.ALLOW,
    label: 'VIP Data',
    id: 'gate-8',
  },
  {
    srcId: 'source-4',
    dstId: 'destination-5',
    intent: POLICY_INTENT.ALLOW,
    label: 'Privileged',
    id: 'gate-9',
  },
];

export const config = {
  bar: {
    height: 24
  },
  stream: {
    flowStrokeColor: 'rgba(255, 255, 255, 0.08)',
    flowStrokeOpacity: 1,
    flowStrokeColorSelected: 'rgba(89, 150, 28, 0.77)',
    flowStrokeWidth: 2,
    flowCapWidth: 5,
  },
  gate: {
    gateStrokeColor: 'rgba(255, 255, 255, 0.7)',
    gateDenyFillColor: '#C22100',
    gateAllowFillColor: '#59961C',
    gateWidth: 23,
    gateHeight: 23,
    gateLabelColor: '#ddd',
    gateFontSize: 10
  }
};

export const defaultGate: Gate = {
  id: 'default-gate',
  intent: POLICY_INTENT.ALLOW,
  srcId: '*',
  dstId: '*',
  label: 'Default ALLOW',
}
