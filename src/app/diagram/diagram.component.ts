import { Component, OnInit, HostListener } from '@angular/core';
import * as d3 from 'd3';

export interface FlowEntry {
    source: string,
    destination: string,
    intent: string,
    label: string
}

export interface ResourceGroup {
    id: string
    label: string,
    type: string
}

export const flowEntries: FlowEntry[] = [
    {
        source: 'source-1',
        destination: 'destination-1',
        intent: 'DENY',
        label: 'Internet Users'
    },
    {
        source: 'source-2',
        destination: 'destination-1',
        intent: 'ALLOW',
        label: 'Svc-Svc Blocks'
    },
    {
        source: 'source-3',
        destination: 'destination-1',
        intent: 'DENY',
        label: 'Data Compliance Policy'
    },
    {
        source: 'source-4',
        destination: 'destination-1',
        intent: 'ALLOW',
        label: 'User-Data Requests'
    },
    {
        source: 'source-5',
        destination: 'destination-1',
        intent: 'DENY',
        label: 'Unknown Policy Name'
    },
    {
        source: 'source-6',
        destination: 'destination-1',
        intent: 'ALLOW',
        label: '3rd Part Service Data Ingestion'
    },
    {
        source: 'source-1',
        destination: 'destination-2',
        intent: 'ALLOW',
        label: 'Test Policy 3'
    },
    {
        source: 'source-3',
        destination: 'destination-2',
        intent: 'ALLOW',
        label: 'VIP Data'
    },
    {
        source: 'source-4',
        destination: 'destination-2',
        intent: 'ALLOW',
        label: 'Privileged'
    },
    {
        source: 'source-5',
        destination: 'destination-2',
        intent: 'ALLOW',
        label: 'Default DENY'
    },
    {
        source: 'source-6',
        destination: 'destination-2',
        intent: 'ALLOW',
        label: ''
    },
    {
        source: 'source-3',
        destination: 'destination-3',
        intent: 'ALLOW',
        label: ''
    }
];

@Component({
    selector: 'app-diagram',
    templateUrl: './diagram.component.html',
    styleUrls: ['./diagram.component.scss']
})
export class DiagramComponent implements OnInit {

    public sources: ResourceGroup[] = [
        {
            id: 'source-1',
            label: 'All External Users',
            type: 'user'
        },
        {
            id: 'source-2',
            label: 'VIP Internal',
            type: 'user'
        },
        {
            id: 'source-3',
            label: 'US_Users',
            type: 'user'
        },
        {
            id: 'source-4',
            label: 'Europe Users',
            type: 'user'
        },
        {
            id: 'source-5',
            label: 'Users_Germany',
            type: 'user'
        },
        {
            id: 'source-6',
            label: 'Beta Customers',
            type: 'user'
        },
    ]

    public destinations: ResourceGroup[] = [
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

    barHeight = 30;

    // Flow line
    flowCapColor = 'rgba(255, 255, 255, 0.31)';
    flowStrokeColor = '#ccc';
    flowStrokeOpacity = .5;
    flowStrokeColorSelected = '#2c0';
    flowStrokeWidth = 5;
    flowCapWidth = 5;

    // Gate
    gateStrokeColor = 'rgba(255, 255, 255, 0.7)';
    gateDenyFillColor = '#C22100';
    gateAllowFillColor = '#59961C';
    gateWidth = 23;
    gateHeight = 23;
    gateLabelColor = '#ddd';
    gateFontSize = 10;

    @HostListener('window:resize', ['$event'])
    onResize(event) {
        this.drawChart(event);
    }

    ngOnInit(): void {
        // this.logExample();
    }    

    ngAfterViewInit(): void {
        this.drawChart(null);
    }    

    private drawChart(evt) {

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
            .attr('height', this.barHeight * flowEntries.length + 200);

        flowEntries.forEach((gate: FlowEntry) => {
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

        chart
            .append('path')
            .style('fill', 'none')
            .style('stroke', this.flowStrokeColor)
            .style('opacity', this.flowStrokeOpacity)
            .style('stroke-width', this.flowStrokeWidth)
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

    private logExample() {
        var dataset = d3.range(10);

        d3.select("body").selectAll("div")
            .call(log, "body")
            .data(dataset)
            .call(log, "dataset")
            .enter()
            .call(log, "enter")
            .append("div")
            .call(log, "div")
            .attr("class", "bar")
            .call(log, "bar");

        function log(sel, msg) {
            console.log(msg, sel);
        }
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
