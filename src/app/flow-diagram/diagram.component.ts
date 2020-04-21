import { Component, OnInit, HostListener, Input, AfterViewInit } from '@angular/core';
import * as d3 from 'd3';
import { sources, destinations, streams, gates, config, defaultGate } from './dataset';
import {
  RESOURCE_GROUP_TYPE,
  Gate,
  POLICY_INTENT,
  RenderModel,
  Stream,
  ResourceGroup,
  Coordinates,
} from './data-model';

@Component({
  selector: 'app-flow-diagram',
  templateUrl: './diagram.component.html',
  styleUrls: ['./diagram.component.scss'],
})
export class FlowDiagramComponent implements OnInit, AfterViewInit {
  @Input() set srcType(type: RESOURCE_GROUP_TYPE) {
    this.settings.srcType = type;
    this.renderFilters();
  }
  get srcType(): RESOURCE_GROUP_TYPE {
    return this.settings.srcType as RESOURCE_GROUP_TYPE;
  }

  private settings = {
    srcType: RESOURCE_GROUP_TYPE.ALL,
    dstType: RESOURCE_GROUP_TYPE.ALL,
  };

  @Input() dstType: RESOURCE_GROUP_TYPE = RESOURCE_GROUP_TYPE.DATA;

  public cnf = config;
  public sources = sources;
  public destinations = destinations;
  public streams = streams;
  public gates = gates;

  private rawSources = sources;
  private rawDestinations = destinations;
  private rawStreams = streams;
  private rawGates = gates;

  private defaultGate = defaultGate;
  private selectedSource: ResourceGroup;
  private selectedDestination: ResourceGroup;
  private selectedGate: Gate;
  private chartContainer;

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.drawChart();
  }

  ngOnInit(): void {
    this.renderFilters();
  }

  ngAfterViewInit(): void {
    this.drawChart();
    this.selectSource(this.sources[1]);
  }

  public byType(collection: ResourceGroup[], type: string): ResourceGroup[] {
    return collection.filter((item: ResourceGroup) => item.type === type);
  }

  public selectGate(gate: Gate) {
    this.selectedGate = gate;
  }

  public selectSource(src: ResourceGroup) {
    // Select related streams
    this.streams.forEach(stream => (stream.selected = false));
    this.getStreamsBySource(src).forEach(stream => (stream.selected = true));
    this.drawChart();
  }

  public setSource(src: ResourceGroup) {
    if (this.selectedSource) {
      this.selectedSource.selected = false;
    }
    this.selectedSource = src;
    this.selectedSource.selected = true;
    this.drawChart();
  }

  public selectDestination(destination: ResourceGroup) {
    // Select related streams
    this.streams.forEach(stream => (stream.selected = false));
    this.getStreamsByDestination(destination).forEach(stream => (stream.selected = true));
    this.drawChart();
  }

  public setDestination(src: ResourceGroup) {
    if (this.selectedDestination) {
      this.selectedDestination.selected = false;
    }
    this.selectedDestination = src;
    this.selectedDestination.selected = true;
    this.drawChart();
  }

  private renderFilters() {
    this.gates.push(this.defaultGate);

    this.sources = this.rawSources.concat();
    this.destinations = this.rawDestinations.concat();
    this.gates = this.rawGates.concat();
    this.streams = this.rawStreams.concat();

    const filteredBySource: RenderModel = this.filterBySource(this.srcType);
    this.sources = filteredBySource.sources.concat();
    this.destinations = filteredBySource.destinations.concat();
    this.gates = filteredBySource.gates.concat();
    this.streams = filteredBySource.streams.concat();
  }

  private drawChart() {
    this.chartContainer = d3.select('.chart-container');
    this.chartContainer.selectAll('*').remove();

    const chartContainerRect = (this.chartContainer.node() as HTMLElement).getBoundingClientRect();
    const chartWidth = chartContainerRect.width;
    const chartHeight = chartContainerRect.height;

    const chart = this.chartContainer
      .append('svg')
      .attr('width', chartWidth)
      .attr('height', chartHeight)
      .attr('class', 'chart')
      .style('fill', '#fafafa');

    const streamGroup = chart.append('g');
    const gateGroup = chart.append('g');

    const chartRect = (chart.node() as any).getBoundingClientRect();

    this.drawGates(chart, gateGroup);

    this.streams.forEach((stream: Stream) => {
      const controlRatio = 3;
      const gateControlRatio = 9;
      const coords: Coordinates = [];
      const srcEl = d3.select(`#${stream.srcId}`).node() as HTMLElement;
      const dstEl = d3.select(`#${stream.dstId}`).node() as HTMLElement;

      const gate: Gate = this.getGateByStream(stream) || this.defaultGate;
      const gateSelection = d3.select(`#${gate.id}`);

      const gateX = parseFloat(gateSelection.attr('cx'));
      const gateY = parseFloat(gateSelection.attr('cy'));

      const srcRect = srcEl.getBoundingClientRect();
      const dstRect = dstEl.getBoundingClientRect();

      const startX = srcRect.right - chartRect.left;
      const startY = srcRect.top - chartRect.top + srcRect.height / 2;

      const endX = dstRect.left - chartRect.left;
      const endY = dstRect.top - chartRect.top + dstRect.height / 2;

      const distX = endX - startX;
      const distY = endY - startY;

      const distGateX = gateX - startX;
      const distGateY = gateY - startY;

      const control1X =
        gate.intent === POLICY_INTENT.ALLOW ? startX + distX / controlRatio : startX + distGateX / controlRatio;
      const control1Y = startY;

      const control2X =
        gate.intent === POLICY_INTENT.ALLOW ? endX - distX / controlRatio : gateX - distGateX / controlRatio;
      const control2Y = gate.intent === POLICY_INTENT.ALLOW ? endY : gateY;

      if (gate.intent === POLICY_INTENT.ALLOW) {
        coords.push([startX, startY]);
        coords.push([control1X, control1Y]);
        coords.push([gateX - distX / gateControlRatio, gateY]);
        coords.push([gateX, gateY]);
        coords.push([gateX + distX / gateControlRatio, gateY]);
        coords.push([control2X, control2Y]);
        coords.push([endX, endY]);
      } else {
        coords.push([startX, startY]);
        coords.push([control1X, control1Y]);
        coords.push([control2X, control2Y]);
        coords.push([gateX, gateY]);
      }

      const lineGenerator = d3.line().curve(d3.curveBasis);
      const pathData = lineGenerator(coords);

      this.drawStream(coords, pathData, stream, streamGroup);
    });
  }

  private drawStream(coords: Coordinates, pathData: any, stream: Stream, streamGroup) {
    streamGroup
      .append('path')
      .style('fill', 'none')
      .style('stroke', stream.selected ? this.cnf.stream.flowStrokeColorSelected : this.cnf.stream.flowStrokeColor)
      .style('stroke-width', stream.srcVolume || this.cnf.stream.flowStrokeWidth)
      .style('stroke-dasharray', !isNaN(stream.srcVolume) && stream.srcVolume > 0 ? '0' : '5,5')
      .attr('d', pathData);
  }

  private drawGates(chart, gateGroup) {
    const gateMarginTop = 100;
    const gateOuterHeight = 50;
    const gateLabelOffset = 10;
    const chartWidth = (this.chartContainer.node() as HTMLElement).getBoundingClientRect().width;

    const layout = 'SINGLE';

    const singleLayoutX = i => chartWidth / 2 - this.cnf.gate.gateWidth / 8;
    const singleLayoutY = i => i * gateOuterHeight + gateMarginTop;

    const multiLayoutX = i => chartWidth / 2 - this.cnf.gate.gateWidth / 8;
    const multiLayoutY = i => i * gateOuterHeight + gateMarginTop;

    const layoutX = i => (layout === 'SINGLE' ? singleLayoutX(i) : multiLayoutX(i));
    const layoutY = i => (layout === 'SINGLE' ? singleLayoutY(i) : multiLayoutY(i));

    for (let i = 0; i < gates.length; i++) {
      const gate = gates[i];
      gateGroup
        .append('circle')
        .data([gate])
        .style(
          'fill',
          gate.intent === POLICY_INTENT.ALLOW ? this.cnf.gate.gateAllowFillColor : this.cnf.gate.gateDenyFillColor
        )
        .style('stroke', this.cnf.gate.gateStrokeColor)
        .attr('cx', layoutX(i))
        .attr('cy', layoutY(i))
        .attr('r', this.cnf.gate.gateWidth / 2)
        .attr('id', gate.id);

      gateGroup
        .append('text')
        .style('fill', this.cnf.gate.gateLabelColor)
        .attr('font-size', this.cnf.gate.gateFontSize)
        .attr('text-anchor', 'middle')
        .attr('x', layoutX(i))
        .attr('y', layoutY(i) + gateLabelOffset)
        .attr('dy', '20px')
        .text(gate.label)
        .attr('id', gate.id + '-label');
    }
  }

  private getGateByStream(stream: Stream): Gate {
    return this.gates.find(gate => gate.srcId === stream.srcId && gate.dstId === stream.dstId);
  }

  private filterBySource(type: RESOURCE_GROUP_TYPE): RenderModel {
    const filteredSources = this.sources.filter(
      source => source.type === type || this.srcType === RESOURCE_GROUP_TYPE.ALL
    );
    // Take only gates which has at least one source of the given type - or DEFAULT gate
    const filteredGates = this.gates.filter(
      gate =>
        gate.srcId === '*' || this.getSourceById(gate.srcId).type === type || this.srcType === RESOURCE_GROUP_TYPE.ALL
    );
    // Take only flow entries which has filtered sources
    const filteredStreams = this.streams.filter(
      flow => this.getSourceById(flow.srcId).type === type || this.srcType === RESOURCE_GROUP_TYPE.ALL
    );
    // Take only destinations which
    const filteredDestinations = this.destinations;
    return {
      sources: filteredSources,
      gates: filteredGates,
      streams: filteredStreams,
      destinations: filteredDestinations,
    };
  }

  private getSourceById(srcId: string): ResourceGroup {
    return this.sources.find(src => src.id === srcId);
  }

  private filterByGate(type: string): ResourceGroup[] {
    return null;
  }

  private getStreamsBySource(src: ResourceGroup): Stream[] {
    return this.streams.filter(stream => stream.srcId === src.id);
  }

  private getStreamsByDestination(dst: ResourceGroup): Stream[] {
    return this.streams.filter(stream => stream.dstId === dst.id);
  }
}
