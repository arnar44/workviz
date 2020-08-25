import React, { useRef, useEffect } from 'react';
import * as d3 from "d3";
import './ProgressBar.scss';

import styles from '../../StyleConfig.scss';

function ProgressBar(props) {

    const { barProps, h } = props;
    const { label, bHours, aHours, uHours, percentageBA, percentageUA } = barProps;
    const svgRef = useRef(null);

    const height = h ? h : 100;
    const width = h ? h : 100;
    const arcWidth = height * 0.045;
    const arcOuterOuterRadious = width / 2.5 + arcWidth;
    const arcOuterRadius = width / 2.5;
    const arcInnerRadius = width / 2.5 - arcWidth;

    const arcGenerator = d3.arc()
        .startAngle(0)
        .cornerRadius(5);

    const progressArc = (inner, outer, value) =>
        arcGenerator({
            innerRadius: inner,
            outerRadius: outer,
            endAngle: 2 * Math.PI * value
        });

    const getColor = (p) => {
        return p < 1 ? styles.redColor : styles.greenColor;
    }

    const draw = () => {
        d3.select(svgRef.current).html(null);

        const svg = d3.select(svgRef.current)
            .style("width", width)
            .style("height", height);

        // Circle inside progress bar
        const circle = svg.append("circle")
            .style('cx', '50%')
            .style('cy', '50%')
            .style('r', height * 0.30)

        // Text in center
        const text = bHours > 0 ? `${aHours} / ${bHours}` : '0';
        const xPos = bHours === 0 ? '47%' : aHours < 9 ? '40%' : aHours > 9 && aHours < 100 ? '30%' : '27%';
        const tSize = bHours > 999 ? '0.6rem' : '0.8rem';

        // Text indicating % inside progress bar
        svg.append('text')
            .text(text)
            .attr('id', 'percentageText')
            .attr('dx', xPos)
            .attr('dy', '55%')
            .style('font-weight', 'bold')
            .style('font-size', tSize);

        // Set border dashed and inner color to none if no budgeted hours
        if (bHours <= 0) {
            circle.style('fill', 'none')
                .style('stroke', 'black')
                .style('stroke-width', 2)
                .style('stroke-dasharray', 3);
        }
        // Otherwise fill the progressbar
        else {
            // Circle in middle -> fill orange if no allocated hours, else no fill and only numbers
            if (bHours > 0 && aHours === 0)
                circle.style('fill', styles.redColor)
            else
                circle.style("fill", 'none');

            // Grey contrainer bar (grey bar indicating budgeted hours)
            const progressContainer = svg.append("g")
                .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")")
                .append("path")
                .style("opacity", 0.5)
                .style("fill", 'grey');
            
            // Transition for container progress
            progressContainer.transition()
                .duration(1000)
                .attrTween('d', () => {
                    return (t) => {
                        return progressArc(arcInnerRadius + 3, arcOuterRadius, 1 * t);
                    }
                });

            // Percentage bar, shows percentage of allocated hours 
            const progress = svg.append("g")
                .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")")
                .append("path")
                .style("fill", getColor(percentageBA));

            // Transition for inner progress
            progress.transition()
                .duration(1000)
                .attrTween('d', () => {
                    return (t) => {
                        return progressArc(arcInnerRadius - 1, arcOuterRadius + 1, percentageBA * t);
                    }
                });


            // If allocated hours > budgeted then add the extra outer line
            if (percentageBA > 1) {
                const toMuchAllo = svg.append("g")
                    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")")
                    .append("path")
                    .style("fill", styles.darkGreenColor);

                // Transition for toMuchAllo
                toMuchAllo.transition()
                    .duration(1000)
                    .attrTween('d', () => {
                        return (t) => {
                            return progressArc(arcInnerRadius, arcOuterRadius, (percentageBA - 1) * t);
                        }
                    });
            }

           
            // Outer Yellow line is only displayed if there are missing teacher hours or there are assigned UNKNOWN MID hours
            // Do not need to display both, only display the one that is the "bigger" problem
            if ( percentageUA > 0 && !(bHours > 0 && aHours === 0)) {
                const outerProgress = svg.append("g")
                    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")")
                    .append("path")
                    .style("fill", styles.yellowColor);

                // Transition for outer progress
                outerProgress.transition()
                    .duration(1000)
                    .attrTween('d', () => {
                        return (t) => {
                            return progressArc(arcOuterRadius, arcOuterOuterRadious, percentageUA * t);
                        }
                    });

            }
        }
    };

    useEffect( () => {
        draw();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [svgRef, label, bHours, aHours, uHours, percentageBA, percentageUA]);



    return (
        <div className='progress-col'>
            <svg className='progress-col__bar' ref={svgRef}/>
            <h5 className='progress-col__label'>{label}</h5>
            {uHours > 0 && 
                <p className='progress-col__unknown'>{`UNKNOWN MID: ${uHours} (h)`}</p>
            }
        </div>
    )
}

export default ProgressBar;