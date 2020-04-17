import { Component, OnInit, HostListener } from '@angular/core';
import * as d3 from 'd3';
import * as d3Sankey from 'd3-sankey';

@Component({
    selector: 'app-diagram',
    templateUrl: './diagram.component.html',
    styleUrls: ['./diagram.component.scss']
})
export class DiagramComponent implements OnInit {

    barHeight = 30;
    groupBgColor = '#333';
    groupTextColor = '#ddd';
    trafficStrokeColor = '#2c0';
    policyStrokeColor = '#ccc';

    rectWidth = 5;

    @HostListener('window:resize', ['$event'])
    onResize(event) {
        this.drawChart(event);
    }

    ngOnInit(): void {
        this.drawChart(null);
        // this.logExample();
    }

    private drawChart(evt) {

        const data = [];

        interface FlowEntry {
            source: string,
            destination: string
        }

        const policyEntries: FlowEntry[] = [
            {
                source: 'source-1',
                destination: 'destination-1'
            },
            {
                source: 'source-3',
                destination: 'destination-3'
            },
            {
                source: 'source-4',
                destination: 'destination-10'
            }
        ]

        // Clean up before re-rendering
        d3.select('.chart-container').selectAll('*').remove();

        const chartContainer = d3.select('.chart-container');
        const chartContainerWidth = (chartContainer.node() as HTMLElement).getBoundingClientRect().width;
        const chart = chartContainer
            .append('svg')
            .attr('class', 'chart');
        const chartRect = (chart.node() as any).getBoundingClientRect();

        const chartWidth = chartContainerWidth;

        const x = d3
            .scaleLinear()
            .range([0, chartWidth]);

        chart
            .attr('width', chartWidth)
            .attr('height', this.barHeight * policyEntries.length + 200);

        policyEntries.forEach((policy: FlowEntry) => {
            const controlRatio = 3;
            const coords = [];
            const srcEl = (d3.select(`#${policy.source}`).node() as HTMLElement);
            const dstEl = (d3.select(`#${policy.destination}`).node() as HTMLElement);

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

            this.drawConnectorLine(coords);
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

        // bar.append("text")
        //     .style("fill", this.groupTextColor)
        //     .attr("x", function (d) { return '.45em' })
        //     .attr("y", this.barHeight / 2)
        //     .attr("dy", ".45em")
        //     .text(function (d) { return d.value; });
    }

    private drawConnectorLine(data) {
        const lineGenerator = d3.line().curve(d3.curveBasis);
        const points: [number, number][] = data;
        const pathData = lineGenerator(points);
        const chart = d3.select('.chart');

        // Draw rectangles
        chart
            .append('rect')
            .style('fill', this.groupBgColor)
            .attr('width', this.rectWidth)
            .attr('height', this.barHeight - 1);

        chart
            .append('rect')
            .style('fill', this.groupBgColor)
            .attr('x', data[4][0] - this.rectWidth)
            .attr('width', this.rectWidth)
            .attr('height', this.barHeight - 1);

        chart
            .append('path')
            .style('fill', 'none')
            .style('stroke', this.trafficStrokeColor)
            .attr('d', pathData);

        chart
            .append('circle')
            .data([points[2]])
            .style('fill', 'none')
            .style('stroke', this.policyStrokeColor)
            .attr('cx', function (d) {
                return d[0];
            })
            .attr('cy', function (d) {
                return d[1];
            })
            .attr('r', 3);
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

    private DrawChart() {

        let k = 1;

        var svg = d3.select("#sankey"),
            width = +svg.attr("width"),
            height = +svg.attr("height");

        var formatNumber = d3.format(",.0f"),
            format = function (d: any) { return formatNumber(d) + " TWh"; },
            color = d3.scaleOrdinal(d3.schemeCategory10);

        var sankey = d3Sankey.sankey()
            .nodeWidth(15)
            .nodePadding(10)
            .extent([[1, 1], [width - 1, height - 6]]);

        var link = svg.append("g")
            .attr("class", "links")
            .attr("fill", "none")
            .attr("stroke", "#000")
            .attr("stroke-opacity", 0.2)
            .selectAll("path");

        var node = svg.append("g")
            .attr("class", "nodes")
            .attr("font-family", "sans-serif")
            .attr("font-size", 10)
            .selectAll("g");

        function getRandomLink(min, max, volume) {
            const link = {
                source: min + Math.round(Math.random() * max),
                target: min + Math.floor(Math.random() * max),
                value: 1 + Math.floor(Math.random() * volume),
                uom: 'Widget(s)'
            }

            if (link.target === link.source) {
                link.target = link.source > 0 ? link.target - 1 : 1;
            }

            return link;
        }

        function getRandomLinks(min, max, linkCount, volume) {
            const links = [];
            for (let i = 0; i < linkCount; i++) {
                links.push(getRandomLink(min, max, volume));
            }
            return links;
        }

        let dataset;
        let datasets: DAG[] = null;

        function getNodes() {
            return dataset;
        }

        function getNodesByCount(nodeCount, linkCount) {
            const data: DAG = {
                nodes: [],
                links: getRandomLinks(0, nodeCount, linkCount, 1)
            }
            for (let n = 0; n < nodeCount; n++) {
                data.nodes.push({
                    nodeId: n,
                    name: "N" + n
                });
            }
            return data;
        }

        link = link
            .data(dataset.links)
            .enter().append("path")
            .attr("d", d3Sankey.sankeyLinkHorizontal())
            .attr("stroke-width", function (d: any) { return Math.max(1, d.width); });

        link.append("title")
            .text(function (d: any) { return d.source.name + " → " + d.target.name + "\n" + format(d.value); });

        node = node
            .data(dataset.nodes)
            .enter().append("g");

        node.append("rect")
            .attr("x", function (d: any) { return d.x0; })
            .attr("y", function (d: any) { return d.y0; })
            .attr("height", function (d: any) { return d.y1 - d.y0; })
            .attr("width", function (d: any) { return d.x1 - d.x0; })
            .attr("fill", function (d: any) { return color(d.name.replace(/ .*/, "")); })
            .attr("stroke", "#000");

        node.append("text")
            .attr("x", function (d: any) { return d.x0 - 6; })
            .attr("y", function (d: any) { return (d.y1 + d.y0) / 2; })
            .attr("dy", "0.35em")
            .attr("text-anchor", "end")
            .text(function (d: any) { return d.name; })
            .filter(function (d: any) { return d.x0 < width / 2; })
            .attr("x", function (d: any) { return d.x1 + 6; })
            .attr("text-anchor", "start");

        node.append("title")
            .text(function (d: any) { return d.name + "\n" + format(d.value); });
        //});
    }
}

interface SNodeExtra {
    nodeId: number;
    name: string;
}

interface SLinkExtra {
    source: number;
    target: number;
    value: number;
    uom: string;
}
type SNode = d3Sankey.SankeyNode<SNodeExtra, SLinkExtra>;
type SLink = d3Sankey.SankeyLink<SNodeExtra, SLinkExtra>;

interface DAG {
    nodes: SNode[];
    links: SLink[];
}