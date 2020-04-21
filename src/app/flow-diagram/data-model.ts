export enum POLICY_INTENT {
  ALLOW = 'ALLOW',
  DENY = 'DENY',
}

export enum RESOURCE_GROUP_TYPE {
  USER = 'USER',
  NODE = 'NODE',
  SERVICE = 'SERVICE',
  DATA = 'DATA',
  ALL = '*',
}

export interface Stream {
  srcId: string;
  dstId: string;
  label: string;
  selected?: boolean;
  srcVolume?: number;
  gatedVolume?: number;
}

export interface ResourceGroup {
  id: string;
  label: string;
  type: string;
  selected?: boolean;
  expanded?: boolean;
  items?: any[];
}

export interface Gate {
  srcId: string;
  dstId: string;
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

export type Coordinates = Array<[number, number]>;
