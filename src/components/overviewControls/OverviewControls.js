import React, { useContext } from 'react';
<<<<<<< HEAD
=======
import * as d3 from 'd3';
>>>>>>> 45c14bbbb7e50e1f69a68c00fab39d635e2ad191

import './OverviewControls.scss';
import { FileContext } from '../../context/FileContext';
import Toggler from '../toggler/Toggler';
import MultiSearch from '../multiSearch/MultiSearch';

<<<<<<< HEAD
function OverviewControls(props) {
    const { sessionTOData,
            courseSessionData,
            selectedTeachers,
            selectedCourses,
            tmpDataIncluded,
            teacherSearchHandler,
            courseSearchHandler,
            onIncludeTempToggle,
            allowPopup
    } = useContext(FileContext);

    // Creates options for MultiSearch - Teachers
=======

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
>>>>>>> 45c14bbbb7e50e1f69a68c00fab39d635e2ad191
    const getTeacherSearchProps = (teachers) => {
        return teachers.map( obj => {
            return {
                key: obj.name,
                value: obj.name,
                text: obj.name
            }
        })
    };

<<<<<<< HEAD
    // Create options for MultiSearch - Courses
    const getCourseSearchProps = (courses) => {
        return Object.entries(courses).map( c => {
            return {
                key: c[0],
                value: c[0],
                text: `${c[0]} - ${c[1]['Short Name']}`
            }
        })
    }

    const includeTempInfo = ['Allows user to alter the data; showing/not showing temp teachers in data.',
                            'If a temp teacher is "Selected" and data set to not include temp teachers, teacher will de-selected'];

    const teacherOptions = getTeacherSearchProps(sessionTOData);
    const courseOptions = getCourseSearchProps(courseSessionData);
=======
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
>>>>>>> 45c14bbbb7e50e1f69a68c00fab39d635e2ad191
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
<<<<<<< HEAD
                    options={courseOptions} 
=======
                    options={teacherOptions} 
>>>>>>> 45c14bbbb7e50e1f69a68c00fab39d635e2ad191
                    placeholder='Select Courses'
                    value={selectedCourses}
                    handler={courseSearchHandler}
                    cn='courseSearchId'
                />
            </div>
            <div className='Overview-controls__toggler'>
                <Toggler 
                    label='Include Temp Teachers' 
<<<<<<< HEAD
                    handler={onIncludeTempToggle}
                    checked={tmpDataIncluded}
                    withPopup={allowPopup}
                    popupHeader='Info'
                    popupText={includeTempInfo}
=======
                    handler={onToggle}
                    checked={tmpDataIncluded}
>>>>>>> 45c14bbbb7e50e1f69a68c00fab39d635e2ad191
                />
            </div>
        </div>
           
    )
}

export default OverviewControls;
