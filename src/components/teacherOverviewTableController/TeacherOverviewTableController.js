import React, { Fragment, useContext, useEffect, useState } from 'react';
import * as d3 from 'd3';

import { FileContext } from '../../context/FileContext';
import { StateContext } from '../../context/StateContext';
import TeacherOverviewTable from '../teacherOverviewTable/TeacherOverviewTable';

function TeacherOverviewTableController() {
    const { 
        sessionTOData,
        selectedTeachers,
        selectedCourses,
        colorCodeControl,
        removedVariables,
        removedPositions,
        removedDepartments,
        konteringMinMax,
        konteringMinMaxSet,
        bemannadMinMax,
        bemannadMinMaxSet,
        htMinMax,
        htMinMaxSet,
        vtMinMax,
        vtMinMaxSet,
        selfDevMinMaxSet,
        selfDevMinMax,
        balanceMinMaxSet,
        balanceMinMax,
        boyBalanceMinMaxSet,
        boyBalanceMinMax,
        eoyBalanceMinMaxSet,
        eoyBalanceMinMax,
        colorByLine,
        teacherClickedHandler,
    } = useContext(FileContext);

    const { setTeacherHover, courseHover, showAllInTable, allowPopup, isolatedSearch } = useContext(StateContext);

    const [ data, setData ] = useState(sessionTOData);
    const [ hoverData, setHoverData ] = useState(null);
    const [ orderCol, setOrderCol ] = useState(['none', false]);

    const onHeaderClickHandler = (e) => {
        e.persist();
        setOrderCol(prevOrder => {
            let  newOrder = [e.target.id, false];
            if(prevOrder[0] === newOrder[0]) {
                newOrder[1] = !prevOrder[1];
            }

            if(newOrder[1]) {
                setData(prevData => prevData.sort( (a,b) => d3.descending(a[newOrder[0]], b[newOrder[0]])))
            } else {
                setData(prevData => prevData.sort( (a,b) => d3.ascending(a[newOrder[0]], b[newOrder[0]])))
            }
            
            return newOrder; 
        });
    }

    const headers = [
        {
            label: 'Name',
            value: 'name',
            handler: onHeaderClickHandler
        },
        {
            label: 'Position',
            value: 'position',
            handler: onHeaderClickHandler
        },
        {
            label: 'Department',
            value: 'department',
            handler: onHeaderClickHandler
        },
        {
            label: 'Kontering',
            value: 'kontering',
            handler: onHeaderClickHandler
        },
        {
            label: 'Bemannad',
            value: 'bemannad',
            handler: onHeaderClickHandler
        },
        {
            label: 'GRU HT',
            value: 'ht',
            handler: onHeaderClickHandler
        },
        {
            label: 'GRU VT',
            value: 'vt',
            handler: onHeaderClickHandler
        },
        {
            label: 'Self-Dev',
            value: 'selfDev',
            handler: onHeaderClickHandler
        },
        {
            label: 'Extra',
            value: 'extra',
            handler: onHeaderClickHandler
        },
        {
            label: 'Balance',
            value: 'balance',
            handler: onHeaderClickHandler
        },
        {
            label: 'BOY Balance',
            value: 'boyBalance',
            handler: onHeaderClickHandler
        },
        {
            label: 'EOY Balance',
            value: 'eoyBalance',
            handler: onHeaderClickHandler
        }
    ];

    const rangeCheck = (original, session, value, data) => {
        if(original[0] !== session[0] || original[1] !== session[1]) {
            data = data.filter(obj => obj[value] >= session[0] && obj[value] <= session[1]);
        }
        return data;
    }

    const getNameWithSymbols = (label, val) => {
        const arroD = '\u2193';
        const arroU = '\u2191';
        let hText = label;

        // Check if sorted By this column -> Add arrow
        if(val === orderCol[0]) 
            hText += orderCol[1] ? `  ${arroD}` : `  ${arroU}`;

        let filterCheck = false;

        // Check if Column has been filtered -> Add asteric
        if(label === 'Position') 
            filterCheck = removedPositions.length !== 0;
        else if(label === 'Department') 
            filterCheck = removedDepartments.length !== 0;
        else if(label === 'Kontering') 
            filterCheck = konteringMinMax[0] !== konteringMinMaxSet[0] || konteringMinMax[1] !== konteringMinMaxSet[1];
        else if(label === 'Bemannad')
            filterCheck = bemannadMinMax[0] !== bemannadMinMaxSet[0] || bemannadMinMax[1] !== bemannadMinMaxSet[1];
        else if(label === 'GRU HT')
            filterCheck = htMinMax[0] !== htMinMaxSet[0] || htMinMax[1] !== htMinMaxSet[1];
        else if(label === 'GRU VT') 
            filterCheck = vtMinMax[0] !== vtMinMaxSet[0] || vtMinMax[1] !== vtMinMaxSet[1];
        else if(label === 'Self-Dev')
            filterCheck = selfDevMinMax[0] !== selfDevMinMaxSet[0] || selfDevMinMax[1] !== selfDevMinMaxSet[1];
        else if(label === 'Balance')
            filterCheck = balanceMinMax[0] !== balanceMinMaxSet[0] || balanceMinMax[1] !== balanceMinMaxSet[1];
        else if(label === 'BOY Balance') 
            filterCheck = boyBalanceMinMax[0] !== boyBalanceMinMaxSet[0] || boyBalanceMinMax[1] !== boyBalanceMinMaxSet[1];
        else if(label === 'EOY Balance')
            filterCheck = eoyBalanceMinMax[0] !== eoyBalanceMinMaxSet[0] || eoyBalanceMinMax[1] !== eoyBalanceMinMaxSet[1];

        hText += filterCheck ? '  *' : '';

        return hText;
    }

    // Handles course hover
    useEffect(() => {
        if(courseHover)
            setHoverData(sessionTOData.filter( tObj => courseHover.includes(tObj.name))); 
        else
            setHoverData(null);
    }, [courseHover, sessionTOData]);

    // Handles filters and Selection (in top view)
    useEffect(() => {
        let tmpData = sessionTOData;

        // Filter data on selected teachers (and selected courses)
        if(!showAllInTable) {
            // Filter on only selected teachers
            const check = isolatedSearch || (!isolatedSearch && selectedCourses.length === 0);
            if( selectedTeachers.length !== 0 && check)
                tmpData = sessionTOData.filter( teacherObj => selectedTeachers.includes(teacherObj.name));
            
            // Filter on only selected courses
            if ( selectedTeachers.length === 0 && !isolatedSearch && selectedCourses.length !== 0)
                tmpData = sessionTOData.filter( teacherObj => teacherObj.courses.some( c => selectedCourses.includes(c)));
                
            // Filter on both selected teachers/courses
            if( selectedTeachers.length !== 0 && !isolatedSearch && selectedCourses.length !== 0)
                tmpData = sessionTOData.filter( teacherObj => teacherObj.courses.some( c => selectedCourses.includes(c)) || selectedTeachers.includes(teacherObj.name) );
        }

        // Filter data on removed Positions
        if(removedPositions.length !== 0) {
            tmpData = tmpData.filter(teacherObj => !removedPositions.includes(teacherObj.position));
        }

        // Filter data on removed Departments
        if(removedDepartments.length !== 0) {
            tmpData = tmpData.filter(teacherObj => !removedDepartments.includes(teacherObj.department));
        }

        // Filter data on Ranges set in settings
        tmpData = rangeCheck(konteringMinMax, konteringMinMaxSet, 'kontering', tmpData);
        tmpData = rangeCheck(bemannadMinMax, bemannadMinMaxSet, 'bemannad', tmpData);
        tmpData = rangeCheck(htMinMax, htMinMaxSet, 'ht', tmpData);
        tmpData = rangeCheck(vtMinMax, vtMinMaxSet, 'vt', tmpData);
        tmpData = rangeCheck(selfDevMinMax, selfDevMinMaxSet, 'selfDev', tmpData);
        tmpData = rangeCheck(balanceMinMax, balanceMinMaxSet, 'balance', tmpData);
        tmpData = rangeCheck(boyBalanceMinMax, boyBalanceMinMaxSet, 'boyBalance', tmpData);
        tmpData = rangeCheck(eoyBalanceMinMax, eoyBalanceMinMaxSet, 'eoyBalance', tmpData);

        // Sort data on column selected
        if(orderCol[0] !== 'none') {
            if(orderCol[1]) {
                tmpData.sort( (a,b) => d3.descending(a[orderCol[0]], b[orderCol[0]]));
            } else {
                tmpData.sort( (a,b) => d3.ascending(a[orderCol[0]], b[orderCol[0]]));
            }
        }

        setData(tmpData);
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sessionTOData, selectedTeachers, removedPositions, removedDepartments, isolatedSearch,
        konteringMinMaxSet, bemannadMinMaxSet, htMinMaxSet, vtMinMaxSet, selectedCourses,
        selfDevMinMaxSet, balanceMinMaxSet, boyBalanceMinMaxSet, eoyBalanceMinMaxSet, showAllInTable]);

    return (
        <Fragment>
            <TeacherOverviewTable
                headers={headers}
                data={ hoverData === null ? data : hoverData}
                colorCodeControl={colorCodeControl}
                removedVariables={removedVariables}
                colorByLine={colorByLine}
                nameSetter={getNameWithSymbols}
                onClickHandler={teacherClickedHandler}
                showAll={showAllInTable}
                selected={selectedTeachers}
                selectedC={selectedCourses}
                isIso={isolatedSearch}
                allowPopup={allowPopup}
                mouseEnterHandler={(c) => setTeacherHover(c) }
                mouseLeaveHandler={() => setTeacherHover(null) }
            />
        </Fragment>
    )
}

export default TeacherOverviewTableController;