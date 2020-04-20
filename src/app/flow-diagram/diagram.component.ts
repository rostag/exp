import { Component, OnInit, HostListener, Input } from '@angular/core';
import * as d3 from 'd3';
import { sources, destinations, flowEntries, gates } from './data-mocks';

export enum POLICY_INTENT {
  ALLOW = 'ALLOW', 
  DENY = 'DENY'
}

export enum RESOURCE_GROUP_TYPE {
  USER = 'USER', 
  NODE = 'NODE',
  SERVICE = 'SERVICE',
  DATA = 'DATA'
}

export interface FlowEntry {
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

export interface Policy {
  source: string;
  destination: string;
  intent: string;
  label: string;
  id: string;
  selected?: boolean;
}

export interface RenderModel {
  sources: ResourceGroup[];
  gates: Policy[];
  connections: FlowEntry[];
  destinations: ResourceGroup[]
}

@Component({
  selector: 'app-flow-diagram',
  templateUrl: './diagram.component.html',
  styleUrls: ['./diagram.component.scss'],
})
export class FlowDiagramComponent implements OnInit {

  @Input('srcType') srcType: string = RESOURCE_GROUP_TYPE.USER;
  @Input('destinationType') dstType: string =  = RESOURCE_GROUP_TYPE.DATA;

  public sources = sources;
  public destinations = destinations;
  public flowEntries = flowEntries;
  public gates = gates;

  public rawSources = sources.concat();
  public rawDestinations = destinations.concat();
  public rawFlowEntries = flowEntries.concat();
  public rawGates = gates.concat();

  barHeight = 24;

  // Flow line
  flowCapColor = 'rgba(195, 195, 195, 1)';
  flowStrokeColor = '#ccc';
  flowStrokeOpacity = 0.5;
  flowStrokeColorSelected = '#2c0';
  flowStrokeWidth = 1;
  flowCapWidth = 5;

  // Gate
  gateStrokeColor = 'rgba(255, 255, 255, 0.7)';
  gateDenyFillColor = '#C22100';
  gateAllowFillColor = '#59961C';
  gateWidth = 23;
  gateHeight = 23;
  gateLabelColor = '#ddd';
  gateFontSize = 10;
  selectedItem: any;

  private chartContainer;

  private defaultGate: Policy = {
    id: 'default-gate',
    intent: POLICY_INTENT.ALLOW,
    source: '*',
    destination: '*',
    label: 'Default ALLOW'
  };

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.drawChart();
  }

  ngOnInit(): void {
    this.renderFilters();

    this.selectedItem = flowEntries[3];
  }

  ngAfterViewInit(): void {
    this.drawChart();
  }

  private renderFilters() {
    this.gates.push(this.defaultGate);

    const filteredBySource: RenderModel = this.filterBySource(this.srcType);
    this.sources = filteredBySource.sources.concat();
    this.destinations = filteredBySource.destinations.concat();
    this.gates = filteredBySource.gates.concat();
    this.flowEntries = filteredBySource.connections.concat();
  }

  private drawChart() {
    this.chartContainer = d3.select('.chart-container');

    // Clean up before re-rendering
    this.chartContainer
      .selectAll('*')
      .remove();

    const chartContainerWidth = (this.chartContainer.node() as HTMLElement).getBoundingClientRect().width;
    const chart = this.chartContainer
      .append('svg')
      .attr('class', 'chart')
      .style('fill', '#fafafa');
    const chartRect = (chart.node() as any).getBoundingClientRect();

    const chartWidth = chartContainerWidth;

    chart.attr('width', chartWidth).attr('height', this.barHeight * this.flowEntries.length + 500);

    this.drawGates(chart);

    this.flowEntries.forEach((connection: FlowEntry) => {
      const controlRatio = 3;
      const coords = [];
      const srcEl = d3.select(`#${connection.source}`).node() as HTMLElement;
      const dstEl = d3.select(`#${connection.destination}`).node() as HTMLElement;
      
      const srcRect = srcEl.getBoundingClientRect();
      const dstRect = dstEl.getBoundingClientRect();

      const startX = srcRect.right - chartRect.left;
      const startY = srcRect.top - chartRect.top + srcRect.height / 2;

      const endX = dstRect.left - chartRect.left;
      const endY = dstRect.top - chartRect.top + dstRect.height / 2;

      const distX = endX - startX;
      const distY = endY - startY;

      const control1X = startX + distX / controlRatio;
      const control1Y = startY;

      const control2X = endX - distX / controlRatio;
      const control2Y = endY;

      const gate: Policy = this.getGateByConnection(connection) || this.defaultGate;
      const gateSelection = d3.select(`#${gate.id}`);

      const gateX = gateSelection.attr('cx');
      const gateY = gateSelection.attr('cy');

      coords.push([startX, startY]);
      coords.push([control1X, control1Y]);
      coords.push([gateX, gateY]);
      coords.push([control2X, control2Y]);
      coords.push([endX, endY]);

      this.drawStream(coords, gate, connection);
    });
  }

  private drawStream(coords, gate: Policy, connection: FlowEntry) {
    const lineGenerator = d3.line().curve(d3.curveBasis);
    const pathData = gate.intent === POLICY_INTENT.ALLOW ? lineGenerator(coords) : lineGenerator(coords.slice(0, 3));
    const chart = d3.select('.chart');

    chart
      .append('path')
      .style('fill', 'none')
      .style('stroke', connection.selected ? this.flowStrokeColorSelected : this.flowStrokeColor)
      .style('opacity', connection.selected ? 1 : this.flowStrokeOpacity)
      .style('stroke-width', this.flowStrokeWidth + Math.floor(Math.random() * 15))
      .attr('d', pathData)
  }

  public drawGates(chart) {
    const gateMarginTop = 100;
    const gateOuterHeight = 50;
    const gateLabelOffset = 10;
    const chartWidth = (this.chartContainer.node() as HTMLElement).getBoundingClientRect().width;

    const layout = 'SINGLE';

    const singleLayoutX = i => chartWidth / 2 - this.gateWidth / 8;
    const singleLayoutY = i => i * gateOuterHeight + gateMarginTop;

    const multiLayoutX = i => chartWidth / 2 - this.gateWidth / 8;
    const multiLayoutY = i => i * gateOuterHeight + gateMarginTop;

    const layoutX = i => layout === 'SINGLE' ? singleLayoutX(i) : multiLayoutX(i);
    const layoutY = i => layout === 'SINGLE' ? singleLayoutY(i) : multiLayoutY(i);

    for (let i = 0; i < gates.length; i++) {
      let gate = gates[i];
      chart
        .append('circle')
        .data([gate])
        .style('fill', gate.intent === POLICY_INTENT.ALLOW ? this.gateAllowFillColor : this.gateDenyFillColor)
        .style('stroke', this.gateStrokeColor)
        .attr('cx', layoutX(i))
        .attr('cy', layoutY(i))
        .attr('r', this.gateWidth / 2)
        .attr('id', gate.id);

      chart
        .append('text')
        .style('fill', this.gateLabelColor)
        .attr('font-size', this.gateFontSize)
        .attr('text-anchor', 'middle')
        .attr('x', layoutX(i))
        .attr('y', layoutY(i) + gateLabelOffset)
        .attr('dy', '20px')
        .text(gate.label)
        .attr('id', gate.id + '-label');
    }
  }

  public byType(collection, type) {
    return collection.filter(item => item.type === type);
  }

  public selectGate(gate) {
    console.log('Select gate:', gate);
  }

  public getGates() {
    return this.gates;
  }

  private getGateByConnection(connection): Policy {
    const gate: Policy = this.gates.find(gate => gate.source === connection.source && gate.destination === connection.destination);
    return gate;
  }

  public selectFlow(item) {
    console.log('Sel:', this.selectedItem, item);

    this.selectedItem.selected = false;
    this.selectedItem = item;
    this.selectedItem.selected = true;

    this.drawChart();
  }

  private filterBySource(type: string): RenderModel {
    const filteredSources = this.sources.filter(source => source.type === type)
    // Take only gates which has at least one source of the given type - or DEFAULT gate
    const filteredGates = this.gates.filter(gate => gate.source === '*' || this.getSourceById(gate.source).type === type);
    // Take only flow entries which has filtered sources
    const filteredConnections = this.flowEntries.filter(flow => this.getSourceById(flow.source).type === type);
    // Take only destinations which 
    const filteredDestinations = this.destinations; //.filter(flow => this.getSourcesByGate(gate).filter(src => src.type === type ) )
    return {
      sources: filteredSources,
      gates: filteredGates,
      connections: filteredConnections,
      destinations: filteredDestinations
    };
  }

  private getSourcesByGate(gate): ResourceGroup[] {
    const result = this.sources.filter(src => src.id === gate.source);
    return result;
  }

  private getSourceById(srcId: string): ResourceGroup {
    const result = this.sources.find(src => src.id === srcId);
    return result;
  }

  private filterByDestination(type: string): RenderModel {
    const filteredSources = this.sources;
    const filteredGates = this.gates;
    const filteredConnections = this.flowEntries;
    const filteredDestinations = this.destinations.filter(destination => destination.type === type);
    return {
      sources: filteredSources,
      gates: filteredGates,
      connections: filteredConnections,
      destinations: filteredDestinations
    };
  }

  private filterByGate(type: string): ResourceGroup[] {
    return null;
  }
}
