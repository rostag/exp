import { ResourceGroup } from './diagram.component';

export const sources: ResourceGroup[] = [
    {
        label: 'All External Users',
        id: 'source-1',
        type: 'user'
    },
    {
        label: 'VIP Internal',
        id: 'source-2',
        type: 'user'
    },
    {
        label: 'US_Users',
        id: 'source-3',
        type: 'user'
    },
    {
        label: 'Europe Users',
        id: 'source-4',
        type: 'user'
    },
    {
        label: 'Users_Germany',
        id: 'source-5',
        type: 'user'
    },
    {
        label: 'Beta Customers',
        id: 'source-6',
        type: 'user'
    },
    {
        label: 'Users_France',
        id: 'source-6',
        type: 'user'
    },
    {
        label: 'All VIP',
        id: 'source-6',
        type: 'user'
    },
    {
        label: 'Security_Admin',
        id: 'source-6',
        type: 'user'
    },
    {
        label: 'GNS-02_Admin',
        id: 'source-6',
        type: 'user'
    },
    {
        label: 'GNS-01_Admin',
        id: 'source-6',
        type: 'user'
    },
    {
        label: 'Project Alpha Team',
        id: 'source-6',
        type: 'user'
    },
    {
        label: 'Ops Team',
        id: 'source-6',
        type: 'user'
    },
    {
        label: 'privilege_prod_services',
        id: 'source-6',
        type: 'service'
    },
    {
        label: 'All Services',
        id: 'source-6',
        type: 'service'
    },
    {
        label: 'Singleton Services',
        id: 'source-6',
        type: 'service'
    },
    {
        label: 'Critical SLO Services',
        id: 'source-6',
        type: 'service'
    },
    {
        label: 'Frankfurt Nodes',
        id: 'source-6',
        type: 'node'
    },
    {
        label: 'Las Vegas Nodes',
        id: 'source-6',
        type: 'node'
    },
    {
        label: 'Tokyo Nodes',
        id: 'source-6',
        type: 'node'
    },
    {
        label: 'High Latency Nodes',
        id: 'source-6',
        type: 'node'
    },
    {
        label: '4x-large Nodes',
        id: 'source-6',
        type: 'node'
    },
    {
        label: 'C5 Instances',
        id: 'source-6',
        type: 'node'
    },
    {
        label: 'Other nodes',
        id: 'source-6',
        type: 'node'
    },
]

export const destinations: ResourceGroup[] = [
    {
        label: 'Level-2 Data', 
        id: 'destination-1',
        type: 'data'
    },
    {
        label: 'Primary Databases', 
        id: 'destination-2',
        type: 'data'
    },
    {
        label: 'Low Latency Data', 
        id: 'destination-3',
        type: 'data'
    },
    {
        label: 'Level-4 Critical Data', 
        id: 'destination-4',
        type: 'data'
    },
    {
        label: 'Level-3 HIRD Data', 
        id: 'destination-5',
        type: 'data'
    },
    {
        label: 'High Latency Data', 
        id: 'destination-6',
        type: 'data'
    },
    {
        label: 'HIPPA Data', 
        id: 'destination-7',
        type: 'data'
    },
    {
        label: 'Level-1 Data', 
        id: 'destination-8',
        type: 'data'
    },
    {
        label: 'EU Data', 
        id: 'destination-9',
        type: 'data'
    }            
];    