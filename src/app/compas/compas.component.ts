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
        const abetkaStr = 'А а 	Б б 	В в 	Г г 	Ґ ґ 	Д д 	Е е 	Є є 	Ж ж 	З з 	И и 	І і 	Ї ї 	Й й 	К к 	Л л 	М м 	Н н 	О о 	П п 	Р р 	С с 	Т т 	У у 	Ф ф 	Х х 	Ц ц 	Ч ч 	Ш ш 	Щ щ 	Ь ь 	Ю ю 	Я я';
        const abetka = abetkaStr.split(' 	');
        const capitals = abetka.map((pair, index) => pair.substr(0, 1) + '-' + index); 
        console.log('Abetka:', abetka);
        console.log('Capitals:', capitals);

        this.doc = d3.select('#svg-element');
        this.renderProps();
    }

    ngAfterViewInit(): void {
        setInterval(() => { this.redraw() }, 10);
        this.redraw();
    }

    private tick = 0;

    private redraw() {
        const xOffset = 300;
        const yOffset = 200;
        const vRatio = 150;
        
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
        const zrx = (v, index) => {
            return v / this.tick + 30;
        }
        const zry = (v, index) => {
            return v / this.tick + 20;
        }
        const zrr = (v, index) => {
            return v / (this.tick + 500);
        }
        const zopacity = (v, index) => {
            return this.tick / (v / 100) + .4;
        }

        const frx = (v, index) => {
            const rs = index;
            return (v / vRatio) * (rs % 2) * (rs % 4 ? 1 : -1) + xOffset;
        }
        const fry = (v, index) => {
            const rs = index + 1;
            return (v / vRatio) * (rs % 2) * (rs % 4 ? 1 : -1) + yOffset;
        }
        const frr = (v, index) => {
            return 1;
        }
        this.doc.selectAll('*').remove();
        const fibo = [1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610, 987, 1597, 2584, 4181, 6765, 10946, 17711, 28657, 46368, 75025, 121393, 196418, 317811];
        
        fibo.forEach((value, index) => {
            this.doc
                .append('circle')
                .attr('cx', frx(value, index))
                .attr('cy', fry(value, index))
                .attr('r', frr(value, index))
                .style('opacity', zopacity(value, index))

            this.doc
                .append('text')
                .attr('x', frx(value, index))
                .attr('y', fry(value, index))
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
