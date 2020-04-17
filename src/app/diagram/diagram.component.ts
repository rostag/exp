import { Component, OnInit, HostListener } from '@angular/core';
import * as d3 from 'd3';
import { sources, destinations, flowEntries } from './data-mocks';

export interface FlowEntry {
    source: string,
    destination: string,
    intent: string,
    label: string,
    selected?: boolean,
}

export interface ResourceGroup {
    id: string
    label: string,
    type: string
}

@Component({
    selector: 'app-diagram',
    templateUrl: './diagram.component.html',
    styleUrls: ['./diagram.component.scss']
})
export class DiagramComponent implements OnInit {

    public sources = sources;
    public destinations = destinations;
    public flowEntries = flowEntries;

    barHeight = 24;

    // Flow line
    flowCapColor = 'rgba(195, 195, 195, 1)';
    flowStrokeColor = '#ccc';
    flowStrokeOpacity = .5;
    flowStrokeColorSelected = '#2c0';
    flowStrokeWidth = 2;
    flowStrokeWidthSelected = 7;
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

    private drawChart() {

        // Clean up before re-rendering
        d3.select('.chart-container').selectAll('*').remove();

        const chartContainer = d3.select('.chart-container');
        const chartContainerWidth = (chartContainer.node() as HTMLElement).getBoundingClientRect().width;
        const chart = chartContainer
            .append('svg')
            .attr('class', 'chart')
            .style('fill', '#fafafa');
        const chartRect = (chart.node() as any).getBoundingClientRect();

        const chartWidth = chartContainerWidth;

        const x = d3
            .scaleLinear()
            .range([0, chartWidth]);

        chart
            .attr('width', chartWidth)
            .attr('height', this.barHeight * this.flowEntries.length + 200);

        this.flowEntries.forEach((gate: FlowEntry) => {
            const controlRatio = 3;
            const coords = [];
            const srcEl = (d3.select(`#${gate.source}`).node() as HTMLElement);
            const dstEl = (d3.select(`#${gate.destination}`).node() as HTMLElement);

            var srcRect = srcEl.getBoundingClientRect();
            var dstRect = dstEl.getBoundingClientRect();

            const startX = srcRect.right - chartRect.left;
            const startY = srcRect.top - chartRect.top + srcRect.height / 2;

            const endX = dstRect.left - chartRect.left;
            const endY = dstRect.top - chartRect.top + dstRect.height / 2;

            const distX = endX - startX;
            const distY = endY - startY;

            const control1X = startX + (distX / controlRatio);
            const control1Y = startY;

            const control2X = endX - (distX / controlRatio);
            const control2Y = endY;

            const midX = startX + distX / 2;
            const midY = startY + distY / 2;

            coords.push([startX, startY]);
            coords.push([control1X, control1Y]);
            coords.push([midX, midY]);
            coords.push([control2X, control2Y]);
            coords.push([endX, endY]);

            this.drawConnectorLine(coords, gate);
        });

        // var bar = chart
        //     .append('g')
        //     .data(data)
        //     .enter().append('g')
        //     .attr('transform', (d, i) => { return 'translate(0,' + i * this.barHeight + ')'; });

        // bar.append('rect')
        //     .style('fill', this.groupBgColor)
        //     .attr('width', '10px')
        //     .attr('height', this.barHeight - 1);
    }

    private drawConnectorLine(data, gate) {
        const lineGenerator = d3.line().curve(d3.curveBasis);
        const points: [number, number][] = data;
        const pathData = gate.intent === 'ALLOW' ? lineGenerator(points) : lineGenerator(points.slice(0,3));
        const chart = d3.select('.chart');

        // Draw rectangles
        chart
            .append('rect')
            .style('fill', this.flowCapColor)
            .attr('x', data[0][0])
            .attr('y', data[0][1] - this.barHeight / 2)
            .attr('width', this.flowCapWidth)
            .attr('height', this.barHeight - 1);

        chart
            .append('rect')
            .style('fill', this.flowCapColor)
            .attr('x', data[4][0] - this.flowCapWidth)
            .attr('y', data[4][1] - this.barHeight / 2)
            .attr('width', this.flowCapWidth)
            .attr('height', this.barHeight - 1);

        // Line
        chart
            .append('path')
            .style('fill', 'none')
            .style('stroke', gate.selected ? this.flowStrokeColorSelected : this.flowStrokeColor)
            .style('opacity', gate.selected ? 1 : this.flowStrokeOpacity)
            .style('stroke-width', gate.selected ? this.flowStrokeWidthSelected : this.flowStrokeWidth)
            .attr('d', pathData);

        chart
            .append('circle')
            .data([points[2]])
            .style('fill', gate.intent === 'ALLOW' ? this.gateAllowFillColor : this.gateDenyFillColor)
            .style('stroke', this.gateStrokeColor)
            .attr('cx', function (d) {
                return d[0];
            })
            .attr('cy', function (d) {
                return d[1];
            })
            .attr('r', this.gateWidth / 2);

        chart
            .append('text')
            .style('fill', this.gateLabelColor)
            .attr('font-size', this.gateFontSize)
            .attr('x', points[2][0])
            .attr('y', points[2][1])
            .attr('dy', ".45em")
            .text(function (d) { return gate.label; });

    }

    public byType(collection, type) {
        return collection.filter(item => item.type === type);
    }

    public selectFlow(item) {
        console.log('Sel:', this.selectedItem, item);
        
        this.selectedItem.selected = false;
        this.selectedItem = item;
        this.selectedItem.selected = true;

        this.drawChart();
    }

    private testChart() {
        // node.append("text")
        //     .attr("x", function (d: any) { return d.x0 - 6; })
        //     .attr("y", function (d: any) { return (d.y1 + d.y0) / 2; })
        //     .attr("dy", "0.35em")
        //     .attr("text-anchor", "end")
        //     .text(function (d: any) { return d.name; })
        //     .filter(function (d: any) { return d.x0 < width / 2; })
        //     .attr("x", function (d: any) { return d.x1 + 6; })
        //     .attr("text-anchor", "start");
    }
}
