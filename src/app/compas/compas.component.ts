import { Component, OnInit, HostListener, AfterViewInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
    selector: 'app-compas',
    templateUrl: './compas.component.html',
    styleUrls: ['./compas.component.scss'],
})
export class CompasComponent implements OnInit, AfterViewInit {

    private doc;

    @HostListener('window:resize', ['$event'])
    onResize() {
        this.redraw();
    }

    ngOnInit(): void {
        this.doc = d3.select('#svg-element');
        this.renderProps();
    }

    ngAfterViewInit(): void {
        setInterval(() => { this.redraw() }, 10);
        this.redraw();
    }

    private tick = 0;

    private redraw() {
        this.tick++;
        const rx = (v) => {
            return Math.random() * 1000 * v;
        }
        const ry = (v) => {
            return Math.random() * 500 * v;
        }
        const rr = (v) => {
            return Math.random() * 50 * v;
        }
        const zrx = (v) => {
            return v / this.tick + 30;
        }
        const zry = (v) => {
            return v / this.tick + 20;
        }
        const zrr = (v) => {
            return v / (this.tick + 500);
        }
        this.doc.selectAll('*').remove();
        const fibo = [1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610, 987, 1597, 2584, 4181, 6765, 10946, 17711, 28657, 46368, 75025, 121393, 196418, 317811];
        fibo.forEach(value => {
            this.doc
                .append('circle')
                .attr('cx', zrx(value))
                .attr('cy', zry(value))
                .attr('r', zrr(value))
                .style('opacity', this.tick / (value / 100) + .4)

            this.doc
                .append('text')
                .attr('x', zrx(value))
                .attr('y', zry(value))
                .text(() => `${value}`)
                .attr("font-family", "sans-serif")
                .attr("font-size", `${2 + value / 1000}px`)
                .attr("fill", "red");
        });

    }

    private renderProps() {
        console.log('render props:');
    }
}
