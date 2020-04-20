import { Component, OnInit, HostListener } from '@angular/core';
import * as d3 from 'd3';
import { sources, destinations, flowEntries, gates } from './data-mocks';

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
  id: string;
  intent: string;
  label: string;
}

@Component({
  selector: 'app-flow-diagram',
  templateUrl: './diagram.component.html',
  styleUrls: ['./diagram.component.scss'],
})
export class FlowDiagramComponent implements OnInit {
  public sources = sources;
  public destinations = destinations;
  public flowEntries = flowEntries;
  public gates = gates;

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

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.drawChart();
  }

  ngOnInit(): void {
    this.selectedItem = flowEntries[3];
  }

  ngAfterViewInit(): void {
    this.drawChart();
  }

  public policyByConnectionId(connId: string) {
    return null
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

    this.flowEntries.forEach((gate: FlowEntry) => {
      const controlRatio = 3;
      const coords = [];
      const srcEl = d3.select(`#${gate.source}`).node() as HTMLElement;
      const dstEl = d3.select(`#${gate.destination}`).node() as HTMLElement;

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

      const midX = startX + distX / 2;
      const midY = startY + distY / 2;

      coords.push([startX, startY]);
      coords.push([control1X, control1Y]);
      coords.push([midX, midY]);
      coords.push([control2X, control2Y]);
      coords.push([endX, endY]);

      this.drawStream(coords, gate);
    });

    this.drawGates(chart);
  }

  private drawStream(coords, gate) {
    const lineGenerator = d3.line().curve(d3.curveBasis);
    const pathData = gate.intent === 'ALLOW' ? lineGenerator(coords) : lineGenerator(coords.slice(0, 3));
    const chart = d3.select('.chart');

    // Line
    chart
      .append('path')
      .style('fill', 'none')
      .style('stroke', gate.selected ? this.flowStrokeColorSelected : this.flowStrokeColor)
      .style('opacity', gate.selected ? 1 : this.flowStrokeOpacity)
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
      const gate = gates[i];
      chart
        .append('circle')
        .data([gate])
        .style('fill', gate.intent === 'ALLOW' ? this.gateAllowFillColor : this.gateDenyFillColor)
        .style('stroke', this.gateStrokeColor)
        .attr('cx', layoutX(i))
        .attr('cy', layoutY(i))
        .attr('r', this.gateWidth / 2);

      chart
        .append('text')
        .style('fill', this.gateLabelColor)
        .attr('font-size', this.gateFontSize)
        .attr('text-anchor', 'middle')
        .attr('x', layoutX(i))
        .attr('y', layoutY(i) + gateLabelOffset)
        .attr('dy', '20px')
        .text(gate.label);

    }
  }

  public byType(collection, type) {
    return collection.filter(item => item.type === type);
  }

  public selectGate(gate) {
    console.log('Select gate:', gate);
  }

  public getGates() {
    console.log('get gates', this.gates);
    return this.gates;
  }

  public selectFlow(item) {
    console.log('Sel:', this.selectedItem, item);

    this.selectedItem.selected = false;
    this.selectedItem = item;
    this.selectedItem.selected = true;

    this.drawChart();
  }
}
