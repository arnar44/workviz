import React, { useContext } from 'react';
import * as d3 from 'd3';

import './OverviewControls.scss';
import { FileContext } from '../../context/FileContext';
import Toggler from '../toggler/Toggler';
import MultiSearch from '../multiSearch/MultiSearch';


function OverviewControls(props) {
    const { sessionTODataBoth,
            sessionTOData,
            setSessionTOData,
            barchartDataBoth,
            setBarchartData,
            selectedTeachers,
            setSelectedTeachers,
            selectedCourses,
            setSelectedCourses,
            variableOnDisplay,
            tmpDataIncluded,
            setTmpDataIncluded
    } = useContext(FileContext);

    // Max values that can be selected in the Multi search (teacher+courses)
    const MAX_SEARCH_SELECTION = 5;

    // Handles toggle of "include temp data" y/n
    const onToggle = (e,d) => {
        const i = d.checked ? 1 : 0;
        setTmpDataIncluded(d.checked);
        setSessionTOData(sessionTODataBoth[i]);
        setBarchartData(barchartDataBoth[i].sort( (a,b) => d3.descending(a[variableOnDisplay], b[variableOnDisplay])));

        // If tmp teacher selected but user switched to "Include tmp teachers = false"
        if(!d.checked) {
            const tempTeachers = [
                'Lab handl Teknolog MID',
                'Lab handl Teknolog TMH',
                'Lab handl Teknolog CST',
                'UNKNOWN MID',
                'Fo Extern MID',
                'NN Doktorand'
            ];
            
            setSelectedTeachers(prevTeachers => prevTeachers.filter( tn => !tempTeachers.includes(tn)));
        }
    };

    // Creates options for MultiSearch
    const getTeacherSearchProps = (teachers) => {
        return teachers.map( obj => {
            return {
                key: obj.name,
                value: obj.name,
                text: obj.name
            }
        })
    };

    // Handles teacher search/selection
    const teacherSearchHandler = (e,d) => {
        if(d.value.length <= MAX_SEARCH_SELECTION)
            setSelectedTeachers(d.value);
        else
            window.alert(`Max ${MAX_SEARCH_SELECTION} can be selected`);
    }
 
    // Handles course search/selection
    const courseSearchHandler = (e,d) => {
        if(d.value.length <= MAX_SEARCH_SELECTION)
            setSelectedCourses(d.value);
        else
            window.alert(`Max ${MAX_SEARCH_SELECTION} can be selected`);
    }

    const teacherOptions = getTeacherSearchProps(sessionTOData);
    return (
        <div className='Overview-controls'>
            <div className='Overview-controls__searches'>
                <MultiSearch 
                    options={teacherOptions} 
                    placeholder='Select Teachers'
                    value={selectedTeachers}
                    handler={teacherSearchHandler}
                    cn='teacherSearchId'
                />
                <MultiSearch 
                    options={teacherOptions} 
                    placeholder='Select Courses'
                    value={selectedCourses}
                    handler={courseSearchHandler}
                    cn='courseSearchId'
                />
            </div>
            <div className='Overview-controls__toggler'>
                <Toggler 
                    label='Include Temp Teachers' 
                    handler={onToggle}
                    checked={tmpDataIncluded}
                />
            </div>
        </div>
           
    )
}

export default OverviewControls;
