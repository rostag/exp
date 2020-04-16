import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import * as d3Sankey from 'd3-sankey';

@Component({
    selector: 'app-diagram',
    templateUrl: './diagram.component.html',
    styleUrls: ['./diagram.component.scss']
})
export class DiagramComponent implements OnInit {
    constructor() {
    };

    ngOnInit(): void {

        this.drawLine();

        this.drawChart();

        // this.logExample();
    }

    private drawChart() {

        const groupBgColor = '#333';
        const groupTextColor = '#fff';

        var width = 600,
            barHeight = 30;

        var x = d3.scaleLinear()
            .range([0, width]);

        var chart = d3.select(".chart")
            .attr("width", width);

        const data = [{ value: .1 }, { value: .2 }, { value: .3 }, { value: .4 }, { value: .3 }];

        chart.attr("height", barHeight * data.length);

        var bar = chart.selectAll("g")
            .data(data)
            .enter().append("g")
            .attr("transform", function (d, i) { return "translate(0," + i * barHeight + ")"; });

        bar.append("rect")
            .style('fill', groupBgColor)
            .attr("width", function (d) {
                // console.log('width:', d, d.value, x(d.value) );
                return x(d.value);
            })
            .attr("height", barHeight - 1);

        bar.append("text")
            .style("fill", groupTextColor)
            .attr("x", function (d) { return '.45em' })
            .attr("y", barHeight / 2)
            .attr("dy", ".45em")
            .text(function (d) { return d.value; });

        const lineGenerator = d3.line()
            .curve(d3.curveCardinal);

        const points: [number, number][] = [
            [100, 90],
            [100, 100],
            [200, 30],
            [300, 50],
            [400, 40],
            [500, 80]
        ];

        const pathData = lineGenerator(points);

        d3.select('path')
	        .attr('d', pathData);

        // bar.append("path")
        //     .attr("d", d3.line()([[10, 60], [40, 90], [60, 10], [190, 10]]))
        //     .attr("stroke", "black")
        //     .attr("fill", 'transparent')

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

    private drawLine() {
        const lines = d3.select("#lines")
            .append("path")
            .attr("d", d3.line()([[10, 60], [40, 90], [60, 10], [190, 10]]))
            .attr("stroke", "black")
            .attr("fill", 'transparent')
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

        // d3.json("./dataset.json", function (error, dataset: any) {});
        //if (error) throw error;

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
            // console.log(nodes);
            return data;
        }

        let san;

        function sankeyDo() {
            dataset = getNodesByCount(20, 20);
            // dataset = datasets[2];
            console.log('JSON.stringify(dataset)');
            console.log(JSON.stringify(dataset, null, '  '));
            sankey(dataset);
            clearInterval(san);
        }

        sankeyDo();

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