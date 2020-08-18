import React, { useRef, useEffect, useState, useContext } from 'react';
import * as d3 from 'd3';
import { FileContext } from '../../context/FileContext';

import './BarChart.scss';

function addLegend(legend, cn, text, cY, tY) {
    // Add color
    legend
        .append('rect')
        .attr('class', cn)
        .attr('x', -20)
        .attr('y', cY)
        .attr('height', 10)
        .attr('width', 10);

    // Add text
    legend
        .append('text')
        .attr('class', 'legend-text')
        .attr('x', -5)
        .attr('y', tY)
        .text(text);
}

function editStyleOnHover(styleString, opSet, swSet) {

    // Edit Opacity
    const op = 'opacity';
    const opI = styleString.indexOf(op) + op.length + 2;
    const opVal = parseInt(styleString[opI]) + opSet;
    const edit1 = styleString.substr(0, opI) + opVal + styleString.substr(opI+('' + opVal).length);
    
    // Edit stroke-width
    const sw = 'stroke-width';
    const swI = edit1.indexOf(sw) + sw.length + 2;
    const edit2 = edit1.substr(0, swI) + swSet + edit1.substr(swI + ('' + swSet).length);
    
    return edit2;

}

function addTooltip(svg, height, name, val, dVal) {
    svg.select('.tooltip').remove();
    const tooltip = svg
        .append('g')
        .attr('class', 'tooltip')
        .attr('transform', `translate(${30},${height - 50})`);

    tooltip.append('text')
        .text(`${name}`);
    
    tooltip.append('text')
        .attr('y', 20)
        .text(`${val}: ${dVal}%`);
}

function BarChart(props) {
    const {
        margin,
        smallBarLimit,
        onHover,
        onClick,
        checkFocus,
    } = props.chartProps;

    const { data, parentRef, value } = props;
    const { selectedTeachers, courseHover } = useContext(FileContext);


    const [height, setHeight] = useState(0);
    const [width, setWidth] = useState(0);
    const axisOffset = 15;
    const svgRef = useRef(null);

    const x = d3.scaleBand()
                .range([0, width - margin.left - margin.right])
                .domain(data.map(x => x.name))
                .padding(0.1);

    const max = d3.max(data, d=> {
        return d[value];
    });

    const y = d3.scaleLinear()
                .range([axisOffset + margin.top, height - axisOffset - margin.bottom])
                .domain([-max, max]);

    const draw = () => {
        const svg = d3.select(svgRef.current)
                        .style('width', width)
                        .style('height', height)
                        .html(null);

        const g = svg.append('g')
                        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
                        .attr('class', 'bars');

        const rectY = d => {
            let val = d[value];
            if (Math.abs(val) < smallBarLimit) {
                return height - y(smallBarLimit);
            }
            return d[value] < 0 ? y(0) + axisOffset : height - y(d[value]) - axisOffset;
        };

        const rectHeight = d => {
            let val = d[value];
            if (Math.abs(val) < smallBarLimit) {
              return y(2 * smallBarLimit) - y(0);
            }
            return d[value] < 0 ? y(0) - y(d[value]) : y(d[value]) - y(0);
        };

        const fillBars = d => {     
            const check = 'unfocus';
      
            if (d[value] > smallBarLimit) {
              return `Positive ${check}`;
            } else if (d[value] <= -smallBarLimit) {
              return `Negative ${check}`;
            }
            return `Small ${check}`;
        };

        // Performance var, only fire setters if hover is X long
        let timer = null;

        // Bars
        g.selectAll('barchart')
            .data(data)
            .join('rect')
            .attr('id', d => `bar${d.name.replace(' ', '')}`)
            .attr('x', d => {
                return x(d.name);
            })
            .attr('y', d => rectY(d))
            .attr('width', x.bandwidth())
            .attr('height', d => rectHeight(d))
            .attr('class', fillBars)
            .style('opacity', checkFocus)
            .style('stroke', '#000')
            .style('stroke-width', 0)
            .on('click', d => {
                onClick(d);
            })
            .on('mouseenter', (d, i, l) => {
                // Only fire setter (onHover) if hover is > 200 millisek
                timer = setTimeout( () => onHover(d.courses), 200);
                addTooltip(svg, height, d.name, value, d[value]);
                const styleStr = editStyleOnHover(l[i].getAttribute('style'), 1, '2px;');
                l[i].setAttribute('style', styleStr);
            })
            .on('mouseleave', (d, i, l) => {
                clearTimeout(timer);
                onHover(null);
                svg.select('.tooltip').remove();
                const styleStr = editStyleOnHover(l[i].getAttribute('style'), -1, '0px;');
                l[i].setAttribute('style', styleStr);
            });

        const legend = svg
            .append('g')
            .attr('class', 'legend')
            .attr('transform', `translate(${width - 220},0)`);
    
        let offset = 10;

        let line = `M ${margin.left} ${y(0) + axisOffset + margin.top} H ${width -
            margin.right} `;
        let line2 = `M ${margin.left} ${y(0) - axisOffset + margin.top} H ${width -
            margin.right} `;

        // Add legends for each of the 3 different value types
        addLegend(legend, 'Positive', `High ${value} %`, 25, 25 + offset);
        addLegend(legend, 'Small', `${value} within +/- 2%`, 45, 45 + offset);
        addLegend(legend, 'Negative', `Low ${value} %`, 65, 65 + offset);

        svg
            .append('g')
            .append('path')
            .attr('fill', 'none')
            .attr('stroke', 'black')
            .attr('stroke-width', '1px')
            .attr('d', line)
            .style('stroke-dasharray', '3,3');

        svg
            .append('g')
            .append('path')
            .attr('fill', 'none')
            .attr('stroke', 'black')
            .attr('stroke-width', '1px')
            .attr('d', line2)
            .style('stroke-dasharray', '3,3');
    };
    
    useEffect(() => {

        const resizeHandler = () => {
            setHeight(parentRef.current.offsetHeight - 57);
            setWidth(parentRef.current.offsetWidth);
        }

        resizeHandler();
        window.addEventListener('resize', resizeHandler, true);
        
        return () => {
            window.removeEventListener('resize', resizeHandler, true);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);

    useEffect(() => {
        if(height > 0 && width > 0) {
            draw();
            return () => {
              d3.selectAll('g')
                .exit()
                .remove();
            };
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [data, height, width, value, selectedTeachers, courseHover]);

    
    return (
        <div className='TeacherBarChart' id='TeacherBarChart'>
            <svg className='BarChartOverview' ref={svgRef}></svg>
        </div>
    )
}

export default BarChart;