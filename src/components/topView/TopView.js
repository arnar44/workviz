import React, { useRef, useState, useContext } from 'react';
import * as d3 from 'd3';

import './TopView.scss';
import TopViewControls from '../topViewControls/TopViewControls';
import BarChartOverview from '../barChartOverview/BarChartOverview';
import TableOverview from '../tableOverview/TableOverview';
import { FileContext } from '../../context/FileContext';


function TopView() {

    const { 
        barchartData,
        setBarchartData,
        variableOnDisplay,
        setVariableOnDisplay
    } = useContext(FileContext);

    const [ view, setView ] = useState('Table');
    const topViewRef = useRef(null);

    const getViewSwitchProps = () => {

        const selectionHandler = (e, d) => setView(d.value);

        const options = [
            {
                key: 'Table',
                icon: 'table',
                text: 'Table',
                value: 'Table',
                content: 'Table'
            },
            {
                key: 'Barchart',
                icon: 'chart bar outline',
                text: 'Barchart',
                value: 'Barchart',
                content: 'Barchart'
            }
        ]

        const defaultValue = options[0].value;
        const header = 'Select view';
        const iconName = 'eye';

        return {
            iconName,
            inline: true,
            header,
            options,
            defaultValue,
            handler: selectionHandler
        }


    }

    const getVariableSwitchProps = () => {

        const selectionHandler = (e, d) => {
            setBarchartData(prevData => {
                return prevData.sort( (a,b) => d3.descending(a[d.value], b[d.value]));
            })
            setVariableOnDisplay(d.value);
        };

        const options = [
            {
                key: 'Balance',
                icon: 'search',
                text: 'Balance (%)',
                value: 'Balance',
                content: 'Balance (%)'
            },
            {
                key: 'EOY Balance',
                icon: 'search',
                text: 'EOY Balance (%)',
                value: 'EOY Balance',
                content: 'End-of-Year Balance (%)'
            },
            {
                key: 'BOY Balance',
                icon: 'search',
                text: 'BOY Balance (%)',
                value: 'BOY Balance',
                content: 'Beginning-of-Year Balance (%)'
            },
        ];

        const defaultValue = variableOnDisplay;
        const header = 'Select Data on Display';
        const iconName = 'database';

        return {
            iconName,
            inline: true,
            header,
            options,
            defaultValue,
            handler: selectionHandler
        }
    }

    const viewSwitchProps = getViewSwitchProps();
    const variableSwitchProps = getVariableSwitchProps();
    return (
        <div className='TopView' ref={topViewRef}>
            <TopViewControls
                view={view}
                viewSwitchProps={viewSwitchProps}
                variableSwitchProps={variableSwitchProps} 
            />
            {   view === 'Barchart' && 
                    <BarChartOverview 
                        topViewRef={topViewRef}
                        variableOnDisplay={variableOnDisplay}
                        setVariableOnDisplay={setVariableOnDisplay}
                        data={barchartData}
                    />
            }
            {   view === 'Table' && 
                    <TableOverview /> 
            }
        </div>
    )
}

export default TopView;