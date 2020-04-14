import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import * as d3Sankey from 'd3-sankey';

@Component({
    selector: 'app-diagram',
    templateUrl: './diagram.component.html'
})
export class DiagramComponent implements OnInit {
    constructor() {
    };

    ngOnInit(): void {

        this.drawLine();

        // d3.select("#blueish").style("color", "red").style('border', '1px solid #fc0');

        // const elementHeight = 20;

        // const data = [[10, 60], [40, 90], [60, 10], [190, 10]];

        // var width = 420;

        // const x = d3.scaleLinear()
        //     .range([0, width]);

        // const lines = d3.select("#lines")
        //     .attr("width", width);

        //     lines.attr("height", elementHeight * data.length)

        // const sources = lines.selectAll("g")
        //     .data(data)
        //     .enter()
        //     .append("g")
        //     .attr("transform", function (d, i) { return "translate(0," + i * elementHeight + ")"; });

        // lines.append("rect")
        //     .attr("width", x)
        //     .attr("height", elementHeight - 1);

        // lines.append("text")
        //     .attr("x", function (d) { return x(d.v) - 3; })
        //     .attr("y", elementHeight / 2)
        //     .attr("dy", ".35em")
        //     .text("OK");

        this.drawChart();
    }

    private drawChart() {
        var width = 420,
            barHeight = 20;

        var x = d3.scaleLinear()
            .range([0, width]);

        var chart = d3.select(".chart")
            .attr("width", width);

        // d3.tsv("data.tsv", type, function (error, data) {
            // x.domain([0, d3.max(data, function (d) { return d.value; })]);

            const data = [{value: 1},{value: 10},{value: 30},{value: 100},{value: 300}];

            chart.attr("height", barHeight * data.length);

            var bar = chart.selectAll("g")
                .data(data)
                .enter().append("g")
                .attr("transform", function (d, i) { return "translate(0," + i * barHeight + ")"; });

            bar.append("rect")
                .attr("width", function (d) { return x(d.value); })
                .attr("height", barHeight - 1);

            bar.append("text")
                .attr("x", function (d) { return x(d.value) - 3; })
                .attr("y", barHeight / 2)
                .attr("dy", ".35em")
                .text(function (d) { return d.value; });
        // });

        var dataset = d3.range(10);


        d3.select("body").selectAll("div")
            .call(log,"body")
            .data(dataset)
            .call(log,"dataset")
            .enter()
            .call(log,"enter")
            .append("div")
            .call(log,"div")
            .attr("class", "bar")
            .call(log,"bar");

        function log(sel,msg) {
        console.log(msg,sel);
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
        let datasets: DAG[] = [{
            nodes: [{
                nodeId: 0,
                name: "A"
            }, {
                nodeId: 1,
                name: "B"
            }, {
                nodeId: 2,
                name: "C"
            }, {
                nodeId: 3,
                name: "D"
            }, {
                nodeId: 4,
                name: "E"
            }],
            links: [{
                source: 0,
                target: 2,
                value: 2 * k,
                uom: 'Widget(s)'
            }, {
                source: 1,
                target: 2,
                value: 3 * k,
                uom: 'Widget(s)'
            }, {
                source: 1,
                target: 3,
                value: 4 * k,
                uom: 'Widget(s)'
            }, {
                source: 0,
                target: 4,
                value: 5 * k,
                uom: 'Widget(s)'
            }, {
                source: 2,
                target: 3,
                value: 3 * k,
                uom: 'Widget(s)'
            }, {
                source: 2,
                target: 4,
                value: 2 * k,
                uom: 'Widget(s)'
            }, {
                source: 3,
                target: 4,
                value: 1 * k,
                uom: 'Widget(s)'
            }]
        },
        // Narrowing:
        {
            "nodes": [
                {
                    "nodeId": 0,
                    "name": "N0"
                },
                {
                    "nodeId": 1,
                    "name": "N1"
                },
                {
                    "nodeId": 2,
                    "name": "N2"
                },
                {
                    "nodeId": 3,
                    "name": "N3"
                },
                {
                    "nodeId": 4,
                    "name": "N4"
                },
                {
                    "nodeId": 5,
                    "name": "N5"
                },
                {
                    "nodeId": 6,
                    "name": "N6"
                },
                {
                    "nodeId": 7,
                    "name": "N7"
                },
                {
                    "nodeId": 8,
                    "name": "N8"
                },
                {
                    "nodeId": 9,
                    "name": "N9"
                },
                {
                    "nodeId": 10,
                    "name": "N10"
                },
                {
                    "nodeId": 11,
                    "name": "N11"
                },
                {
                    "nodeId": 12,
                    "name": "N12"
                },
                {
                    "nodeId": 13,
                    "name": "N13"
                },
                {
                    "nodeId": 14,
                    "name": "N14"
                },
                {
                    "nodeId": 15,
                    "name": "N15"
                },
                {
                    "nodeId": 16,
                    "name": "N16"
                },
                {
                    "nodeId": 17,
                    "name": "N17"
                },
                {
                    "nodeId": 18,
                    "name": "N18"
                },
                {
                    "nodeId": 19,
                    "name": "N19"
                },
                {
                    "nodeId": 20,
                    "name": "N20"
                },
                {
                    "nodeId": 21,
                    "name": "N21"
                },
                {
                    "nodeId": 22,
                    "name": "N22"
                },
                {
                    "nodeId": 23,
                    "name": "N23"
                },
                {
                    "nodeId": 24,
                    "name": "N24"
                },
                {
                    "nodeId": 25,
                    "name": "N25"
                },
                {
                    "nodeId": 26,
                    "name": "N26"
                },
                {
                    "nodeId": 27,
                    "name": "N27"
                },
                {
                    "nodeId": 28,
                    "name": "N28"
                },
                {
                    "nodeId": 29,
                    "name": "N29"
                }
            ],
            "links": [
                {
                    "source": 16,
                    "target": 0,
                    "value": 1,
                    "uom": "Widget(s)"
                },
                {
                    "source": 17,
                    "target": 22,
                    "value": 1,
                    "uom": "Widget(s)"
                },
                {
                    "source": 18,
                    "target": 10,
                    "value": 1,
                    "uom": "Widget(s)"
                },
                {
                    "source": 28,
                    "target": 12,
                    "value": 1,
                    "uom": "Widget(s)"
                },
                {
                    "source": 5,
                    "target": 3,
                    "value": 1,
                    "uom": "Widget(s)"
                },
                {
                    "source": 6,
                    "target": 9,
                    "value": 1,
                    "uom": "Widget(s)"
                },
                {
                    "source": 12,
                    "target": 11,
                    "value": 1,
                    "uom": "Widget(s)"
                },
                {
                    "source": 1,
                    "target": 10,
                    "value": 1,
                    "uom": "Widget(s)"
                },
                {
                    "source": 28,
                    "target": 17,
                    "value": 1,
                    "uom": "Widget(s)"
                },
                {
                    "source": 29,
                    "target": 27,
                    "value": 1,
                    "uom": "Widget(s)"
                },
                {
                    "source": 5,
                    "target": 15,
                    "value": 1,
                    "uom": "Widget(s)"
                },
                {
                    "source": 28,
                    "target": 16,
                    "value": 1,
                    "uom": "Widget(s)"
                },
                {
                    "source": 11,
                    "target": 4,
                    "value": 1,
                    "uom": "Widget(s)"
                },
                {
                    "source": 24,
                    "target": 22,
                    "value": 1,
                    "uom": "Widget(s)"
                },
                {
                    "source": 6,
                    "target": 5,
                    "value": 1,
                    "uom": "Widget(s)"
                },
                {
                    "source": 26,
                    "target": 21,
                    "value": 1,
                    "uom": "Widget(s)"
                },
                {
                    "source": 26,
                    "target": 7,
                    "value": 1,
                    "uom": "Widget(s)"
                },
                {
                    "source": 21,
                    "target": 9,
                    "value": 1,
                    "uom": "Widget(s)"
                },
                {
                    "source": 8,
                    "target": 20,
                    "value": 1,
                    "uom": "Widget(s)"
                },
                {
                    "source": 10,
                    "target": 9,
                    "value": 1,
                    "uom": "Widget(s)"
                },
                {
                    "source": 17,
                    "target": 12,
                    "value": 1,
                    "uom": "Widget(s)"
                },
                {
                    "source": 28,
                    "target": 9,
                    "value": 1,
                    "uom": "Widget(s)"
                },
                {
                    "source": 0,
                    "target": 3,
                    "value": 1,
                    "uom": "Widget(s)"
                },
                {
                    "source": 27,
                    "target": 16,
                    "value": 1,
                    "uom": "Widget(s)"
                },
                {
                    "source": 3,
                    "target": 4,
                    "value": 1,
                    "uom": "Widget(s)"
                },
                {
                    "source": 0,
                    "target": 14,
                    "value": 1,
                    "uom": "Widget(s)"
                },
                {
                    "source": 24,
                    "target": 12,
                    "value": 1,
                    "uom": "Widget(s)"
                },
                {
                    "source": 9,
                    "target": 0,
                    "value": 1,
                    "uom": "Widget(s)"
                },
                {
                    "source": 26,
                    "target": 2,
                    "value": 1,
                    "uom": "Widget(s)"
                },
                {
                    "source": 20,
                    "target": 18,
                    "value": 1,
                    "uom": "Widget(s)"
                }
            ]
        },
        // Wave-up
        {
            "nodes": [
                {
                    "nodeId": 0,
                    "name": "N0"
                },
                {
                    "nodeId": 1,
                    "name": "N1"
                },
                {
                    "nodeId": 2,
                    "name": "N2"
                },
                {
                    "nodeId": 3,
                    "name": "N3"
                },
                {
                    "nodeId": 4,
                    "name": "N4"
                },
                {
                    "nodeId": 5,
                    "name": "N5"
                },
                {
                    "nodeId": 6,
                    "name": "N6"
                },
                {
                    "nodeId": 7,
                    "name": "N7"
                },
                {
                    "nodeId": 8,
                    "name": "N8"
                },
                {
                    "nodeId": 9,
                    "name": "N9"
                },
                {
                    "nodeId": 10,
                    "name": "N10"
                },
                {
                    "nodeId": 11,
                    "name": "N11"
                },
                {
                    "nodeId": 12,
                    "name": "N12"
                },
                {
                    "nodeId": 13,
                    "name": "N13"
                },
                {
                    "nodeId": 14,
                    "name": "N14"
                },
                {
                    "nodeId": 15,
                    "name": "N15"
                },
                {
                    "nodeId": 16,
                    "name": "N16"
                },
                {
                    "nodeId": 17,
                    "name": "N17"
                },
                {
                    "nodeId": 18,
                    "name": "N18"
                },
                {
                    "nodeId": 19,
                    "name": "N19"
                },
                {
                    "nodeId": 20,
                    "name": "N20"
                },
                {
                    "nodeId": 21,
                    "name": "N21"
                },
                {
                    "nodeId": 22,
                    "name": "N22"
                },
                {
                    "nodeId": 23,
                    "name": "N23"
                },
                {
                    "nodeId": 24,
                    "name": "N24"
                },
                {
                    "nodeId": 25,
                    "name": "N25"
                },
                {
                    "nodeId": 26,
                    "name": "N26"
                },
                {
                    "nodeId": 27,
                    "name": "N27"
                },
                {
                    "nodeId": 28,
                    "name": "N28"
                },
                {
                    "nodeId": 29,
                    "name": "N29"
                },
                {
                    "nodeId": 30,
                    "name": "N30"
                },
                {
                    "nodeId": 31,
                    "name": "N31"
                },
                {
                    "nodeId": 32,
                    "name": "N32"
                },
                {
                    "nodeId": 33,
                    "name": "N33"
                },
                {
                    "nodeId": 34,
                    "name": "N34"
                },
                {
                    "nodeId": 35,
                    "name": "N35"
                },
                {
                    "nodeId": 36,
                    "name": "N36"
                },
                {
                    "nodeId": 37,
                    "name": "N37"
                },
                {
                    "nodeId": 38,
                    "name": "N38"
                },
                {
                    "nodeId": 39,
                    "name": "N39"
                },
                {
                    "nodeId": 40,
                    "name": "N40"
                },
                {
                    "nodeId": 41,
                    "name": "N41"
                },
                {
                    "nodeId": 42,
                    "name": "N42"
                },
                {
                    "nodeId": 43,
                    "name": "N43"
                },
                {
                    "nodeId": 44,
                    "name": "N44"
                },
                {
                    "nodeId": 45,
                    "name": "N45"
                },
                {
                    "nodeId": 46,
                    "name": "N46"
                },
                {
                    "nodeId": 47,
                    "name": "N47"
                },
                {
                    "nodeId": 48,
                    "name": "N48"
                },
                {
                    "nodeId": 49,
                    "name": "N49"
                }
            ],
            "links": [
                {
                    "source": 4,
                    "target": 39,
                    "value": 0.25,
                    "uom": "Widget(s)"
                },
                {
                    "source": 4,
                    "target": 7,
                    "value": 0.25,
                    "uom": "Widget(s)"
                },
                {
                    "source": 12,
                    "target": 49,
                    "value": 0.25,
                    "uom": "Widget(s)"
                },
                {
                    "source": 25,
                    "target": 4,
                    "value": 0.25,
                    "uom": "Widget(s)"
                },
                {
                    "source": 21,
                    "target": 23,
                    "value": 0.25,
                    "uom": "Widget(s)"
                },
                {
                    "source": 46,
                    "target": 10,
                    "value": 0.25,
                    "uom": "Widget(s)"
                },
                {
                    "source": 39,
                    "target": 34,
                    "value": 0.25,
                    "uom": "Widget(s)"
                },
                {
                    "source": 44,
                    "target": 46,
                    "value": 0.25,
                    "uom": "Widget(s)"
                },
                {
                    "source": 26,
                    "target": 33,
                    "value": 0.25,
                    "uom": "Widget(s)"
                },
                {
                    "source": 8,
                    "target": 36,
                    "value": 0.25,
                    "uom": "Widget(s)"
                },
                {
                    "source": 20,
                    "target": 0,
                    "value": 0.25,
                    "uom": "Widget(s)"
                },
                {
                    "source": 33,
                    "target": 4,
                    "value": 0.25,
                    "uom": "Widget(s)"
                },
                {
                    "source": 37,
                    "target": 49,
                    "value": 0.25,
                    "uom": "Widget(s)"
                },
                {
                    "source": 47,
                    "target": 10,
                    "value": 0.25,
                    "uom": "Widget(s)"
                },
                {
                    "source": 17,
                    "target": 9,
                    "value": 0.25,
                    "uom": "Widget(s)"
                },
                {
                    "source": 12,
                    "target": 42,
                    "value": 0.25,
                    "uom": "Widget(s)"
                },
                {
                    "source": 19,
                    "target": 33,
                    "value": 0.25,
                    "uom": "Widget(s)"
                },
                {
                    "source": 47,
                    "target": 14,
                    "value": 0.25,
                    "uom": "Widget(s)"
                },
                {
                    "source": 29,
                    "target": 7,
                    "value": 0.25,
                    "uom": "Widget(s)"
                },
                {
                    "source": 39,
                    "target": 0,
                    "value": 0.25,
                    "uom": "Widget(s)"
                },
                {
                    "source": 7,
                    "target": 44,
                    "value": 0.25,
                    "uom": "Widget(s)"
                },
                {
                    "source": 16,
                    "target": 29,
                    "value": 0.25,
                    "uom": "Widget(s)"
                },
                {
                    "source": 45,
                    "target": 38,
                    "value": 0.25,
                    "uom": "Widget(s)"
                },
                {
                    "source": 9,
                    "target": 19,
                    "value": 0.25,
                    "uom": "Widget(s)"
                },
                {
                    "source": 17,
                    "target": 12,
                    "value": 0.25,
                    "uom": "Widget(s)"
                },
                {
                    "source": 39,
                    "target": 30,
                    "value": 0.25,
                    "uom": "Widget(s)"
                },
                {
                    "source": 32,
                    "target": 24,
                    "value": 0.25,
                    "uom": "Widget(s)"
                },
                {
                    "source": 41,
                    "target": 3,
                    "value": 0.25,
                    "uom": "Widget(s)"
                },
                {
                    "source": 9,
                    "target": 8,
                    "value": 0.25,
                    "uom": "Widget(s)"
                },
                {
                    "source": 15,
                    "target": 46,
                    "value": 0.25,
                    "uom": "Widget(s)"
                }
            ]
        },
        {
            "nodes": [
                {
                    "nodeId": 0,
                    "name": "N0"
                },
                {
                    "nodeId": 1,
                    "name": "N1"
                },
                {
                    "nodeId": 2,
                    "name": "N2"
                },
                {
                    "nodeId": 3,
                    "name": "N3"
                },
                {
                    "nodeId": 4,
                    "name": "N4"
                },
                {
                    "nodeId": 5,
                    "name": "N5"
                },
                {
                    "nodeId": 6,
                    "name": "N6"
                },
                {
                    "nodeId": 7,
                    "name": "N7"
                },
                {
                    "nodeId": 8,
                    "name": "N8"
                },
                {
                    "nodeId": 9,
                    "name": "N9"
                },
                {
                    "nodeId": 10,
                    "name": "N10"
                },
                {
                    "nodeId": 11,
                    "name": "N11"
                },
                {
                    "nodeId": 12,
                    "name": "N12"
                },
                {
                    "nodeId": 13,
                    "name": "N13"
                },
                {
                    "nodeId": 14,
                    "name": "N14"
                },
                {
                    "nodeId": 15,
                    "name": "N15"
                },
                {
                    "nodeId": 16,
                    "name": "N16"
                },
                {
                    "nodeId": 17,
                    "name": "N17"
                },
                {
                    "nodeId": 18,
                    "name": "N18"
                },
                {
                    "nodeId": 19,
                    "name": "N19"
                },
                {
                    "nodeId": 20,
                    "name": "N20"
                },
                {
                    "nodeId": 21,
                    "name": "N21"
                },
                {
                    "nodeId": 22,
                    "name": "N22"
                },
                {
                    "nodeId": 23,
                    "name": "N23"
                },
                {
                    "nodeId": 24,
                    "name": "N24"
                },
                {
                    "nodeId": 25,
                    "name": "N25"
                },
                {
                    "nodeId": 26,
                    "name": "N26"
                },
                {
                    "nodeId": 27,
                    "name": "N27"
                },
                {
                    "nodeId": 28,
                    "name": "N28"
                },
                {
                    "nodeId": 29,
                    "name": "N29"
                }
            ],
            "links": [
                {
                    "source": 14,
                    "target": 10,
                    "value": 2,
                    "uom": "Widget(s)"
                },
                {
                    "source": 22,
                    "target": 21,
                    "value": 2,
                    "uom": "Widget(s)"
                },
                {
                    "source": 7,
                    "target": 27,
                    "value": 2,
                    "uom": "Widget(s)"
                },
                {
                    "source": 14,
                    "target": 25,
                    "value": 1,
                    "uom": "Widget(s)"
                },
                {
                    "source": 19,
                    "target": 0,
                    "value": 2,
                    "uom": "Widget(s)"
                },
                {
                    "source": 23,
                    "target": 9,
                    "value": 1,
                    "uom": "Widget(s)"
                },
                {
                    "source": 24,
                    "target": 21,
                    "value": 2,
                    "uom": "Widget(s)"
                },
                {
                    "source": 1,
                    "target": 13,
                    "value": 2,
                    "uom": "Widget(s)"
                },
                {
                    "source": 22,
                    "target": 18,
                    "value": 1,
                    "uom": "Widget(s)"
                },
                {
                    "source": 25,
                    "target": 26,
                    "value": 2,
                    "uom": "Widget(s)"
                },
                {
                    "source": 18,
                    "target": 20,
                    "value": 1,
                    "uom": "Widget(s)"
                },
                {
                    "source": 22,
                    "target": 17,
                    "value": 1,
                    "uom": "Widget(s)"
                },
                {
                    "source": 11,
                    "target": 6,
                    "value": 2,
                    "uom": "Widget(s)"
                },
                {
                    "source": 21,
                    "target": 18,
                    "value": 2,
                    "uom": "Widget(s)"
                },
                {
                    "source": 10,
                    "target": 19,
                    "value": 1,
                    "uom": "Widget(s)"
                },
                {
                    "source": 25,
                    "target": 2,
                    "value": 2,
                    "uom": "Widget(s)"
                },
                {
                    "source": 0,
                    "target": 9,
                    "value": 2,
                    "uom": "Widget(s)"
                },
                {
                    "source": 12,
                    "target": 18,
                    "value": 2,
                    "uom": "Widget(s)"
                },
                {
                    "source": 8,
                    "target": 26,
                    "value": 1,
                    "uom": "Widget(s)"
                },
                {
                    "source": 27,
                    "target": 17,
                    "value": 2,
                    "uom": "Widget(s)"
                },
                {
                    "source": 21,
                    "target": 1,
                    "value": 1,
                    "uom": "Widget(s)"
                },
                {
                    "source": 15,
                    "target": 8,
                    "value": 1,
                    "uom": "Widget(s)"
                },
                {
                    "source": 2,
                    "target": 9,
                    "value": 2,
                    "uom": "Widget(s)"
                },
                {
                    "source": 12,
                    "target": 1,
                    "value": 1,
                    "uom": "Widget(s)"
                },
                {
                    "source": 8,
                    "target": 20,
                    "value": 1,
                    "uom": "Widget(s)"
                },
                {
                    "source": 21,
                    "target": 6,
                    "value": 2,
                    "uom": "Widget(s)"
                },
                {
                    "source": 6,
                    "target": 20,
                    "value": 1,
                    "uom": "Widget(s)"
                },
                {
                    "source": 25,
                    "target": 26,
                    "value": 2,
                    "uom": "Widget(s)"
                },
                {
                    "source": 17,
                    "target": 15,
                    "value": 1,
                    "uom": "Widget(s)"
                },
                {
                    "source": 27,
                    "target": 17,
                    "value": 2,
                    "uom": "Widget(s)"
                }
            ]
        },
        // flow
        {
            "nodes": [
                {
                    "nodeId": 0,
                    "name": "N0"
                },
                {
                    "nodeId": 1,
                    "name": "N1"
                },
                {
                    "nodeId": 2,
                    "name": "N2"
                },
                {
                    "nodeId": 3,
                    "name": "N3"
                },
                {
                    "nodeId": 4,
                    "name": "N4"
                },
                {
                    "nodeId": 5,
                    "name": "N5"
                },
                {
                    "nodeId": 6,
                    "name": "N6"
                },
                {
                    "nodeId": 7,
                    "name": "N7"
                },
                {
                    "nodeId": 8,
                    "name": "N8"
                },
                {
                    "nodeId": 9,
                    "name": "N9"
                },
                {
                    "nodeId": 10,
                    "name": "N10"
                },
                {
                    "nodeId": 11,
                    "name": "N11"
                },
                {
                    "nodeId": 12,
                    "name": "N12"
                },
                {
                    "nodeId": 13,
                    "name": "N13"
                },
                {
                    "nodeId": 14,
                    "name": "N14"
                },
                {
                    "nodeId": 15,
                    "name": "N15"
                },
                {
                    "nodeId": 16,
                    "name": "N16"
                },
                {
                    "nodeId": 17,
                    "name": "N17"
                },
                {
                    "nodeId": 18,
                    "name": "N18"
                },
                {
                    "nodeId": 19,
                    "name": "N19"
                },
                {
                    "nodeId": 20,
                    "name": "N20"
                },
                {
                    "nodeId": 21,
                    "name": "N21"
                },
                {
                    "nodeId": 22,
                    "name": "N22"
                },
                {
                    "nodeId": 23,
                    "name": "N23"
                },
                {
                    "nodeId": 24,
                    "name": "N24"
                },
                {
                    "nodeId": 25,
                    "name": "N25"
                },
                {
                    "nodeId": 26,
                    "name": "N26"
                },
                {
                    "nodeId": 27,
                    "name": "N27"
                },
                {
                    "nodeId": 28,
                    "name": "N28"
                },
                {
                    "nodeId": 29,
                    "name": "N29"
                }
            ],
            "links": [
                {
                    "source": 14,
                    "target": 10,
                    "value": 2,
                    "uom": "Widget(s)"
                },
                {
                    "source": 22,
                    "target": 21,
                    "value": 2,
                    "uom": "Widget(s)"
                },
                {
                    "source": 7,
                    "target": 27,
                    "value": 2,
                    "uom": "Widget(s)"
                },
                {
                    "source": 14,
                    "target": 25,
                    "value": 1,
                    "uom": "Widget(s)"
                },
                {
                    "source": 19,
                    "target": 0,
                    "value": 2,
                    "uom": "Widget(s)"
                },
                {
                    "source": 23,
                    "target": 9,
                    "value": 1,
                    "uom": "Widget(s)"
                },
                {
                    "source": 24,
                    "target": 21,
                    "value": 2,
                    "uom": "Widget(s)"
                },
                {
                    "source": 1,
                    "target": 13,
                    "value": 2,
                    "uom": "Widget(s)"
                },
                {
                    "source": 22,
                    "target": 18,
                    "value": 1,
                    "uom": "Widget(s)"
                },
                {
                    "source": 25,
                    "target": 26,
                    "value": 2,
                    "uom": "Widget(s)"
                },
                {
                    "source": 18,
                    "target": 20,
                    "value": 1,
                    "uom": "Widget(s)"
                },
                {
                    "source": 22,
                    "target": 17,
                    "value": 1,
                    "uom": "Widget(s)"
                },
                {
                    "source": 11,
                    "target": 6,
                    "value": 2,
                    "uom": "Widget(s)"
                },
                {
                    "source": 21,
                    "target": 18,
                    "value": 2,
                    "uom": "Widget(s)"
                },
                {
                    "source": 10,
                    "target": 19,
                    "value": 1,
                    "uom": "Widget(s)"
                },
                {
                    "source": 25,
                    "target": 2,
                    "value": 2,
                    "uom": "Widget(s)"
                },
                {
                    "source": 0,
                    "target": 9,
                    "value": 2,
                    "uom": "Widget(s)"
                },
                {
                    "source": 12,
                    "target": 18,
                    "value": 2,
                    "uom": "Widget(s)"
                },
                {
                    "source": 8,
                    "target": 26,
                    "value": 1,
                    "uom": "Widget(s)"
                },
                {
                    "source": 27,
                    "target": 17,
                    "value": 2,
                    "uom": "Widget(s)"
                },
                {
                    "source": 21,
                    "target": 1,
                    "value": 1,
                    "uom": "Widget(s)"
                },
                {
                    "source": 15,
                    "target": 8,
                    "value": 1,
                    "uom": "Widget(s)"
                },
                {
                    "source": 2,
                    "target": 9,
                    "value": 2,
                    "uom": "Widget(s)"
                },
                {
                    "source": 12,
                    "target": 1,
                    "value": 1,
                    "uom": "Widget(s)"
                },
                {
                    "source": 8,
                    "target": 20,
                    "value": 1,
                    "uom": "Widget(s)"
                },
                {
                    "source": 21,
                    "target": 6,
                    "value": 2,
                    "uom": "Widget(s)"
                },
                {
                    "source": 6,
                    "target": 20,
                    "value": 1,
                    "uom": "Widget(s)"
                },
                {
                    "source": 25,
                    "target": 26,
                    "value": 2,
                    "uom": "Widget(s)"
                },
                {
                    "source": 17,
                    "target": 15,
                    "value": 1,
                    "uom": "Widget(s)"
                },
                {
                    "source": 27,
                    "target": 17,
                    "value": 2,
                    "uom": "Widget(s)"
                }
            ]
        }
        ];

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