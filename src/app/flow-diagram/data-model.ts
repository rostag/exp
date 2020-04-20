export enum POLICY_INTENT {
    ALLOW = 'ALLOW', 
    DENY = 'DENY'
  }
  
  export enum RESOURCE_GROUP_TYPE {
    USER = 'USER', 
    NODE = 'NODE',
    SERVICE = 'SERVICE',
    DATA = 'DATA',
    ALL = '*'
  }
  
  export interface Stream {
    source: string;
    destination: string;
    label: string;
    selected?: boolean;
  }
  
  export interface ResourceGroup {
    id: string;
    label: string;
    type: string;
  }
  
  export interface Gate {
    source: string;
    destination: string;
    intent: string;
    label: string;
    id: string;
    selected?: boolean;
  }
  
  export interface RenderModel {
    sources: ResourceGroup[];
    gates: Gate[];
    streams: Stream[];
    destinations: ResourceGroup[];
  }
  
  export interface Coordinates extends Array<[number, number]> {
      
  };