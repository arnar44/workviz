import React, { useState, useContext, Fragment } from 'react';
import * as d3 from 'd3';

import TeacherOverviewControls from '../teacherOverviewControls/TeacherOverviewControls';
import BarChartOverview from '../barChartOverview/BarChartOverview';
import TeacherOverviewTableController from '../teacherOverviewTableController/TeacherOverviewTableController';
import { FileContext } from '../../context/FileContext';

function TeacherOverviewController(props) {

    const { topViewRef } = props;

    const { 
        barchartData,
        setBarchartData,
        variableOnDisplay,
        setVariableOnDisplay
    } = useContext(FileContext);

    const [ view, setView ] = useState('Table');

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
        <Fragment>
            <TeacherOverviewControls
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
                    <TeacherOverviewTableController /> 
            }
        </Fragment>
    )
}

export default TeacherOverviewController;