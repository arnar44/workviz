import React, { useContext } from 'react';

import './OverviewControls.scss';
import { FileContext } from '../../context/FileContext';
import Toggler from '../toggler/Toggler';
import MultiSearch from '../multiSearch/MultiSearch';

function OverviewControls(props) {
    const { sessionTOData,
            courseSessionData,
            selectedTeachers,
            selectedCourses,
            tmpDataIncluded,
            teacherSearchHandler,
            courseSearchHandler,
            onIncludeTempToggle,
            allowPopup,
            isolatedSearch,
            setIsolatedSearch
    } = useContext(FileContext);

    // Creates options for MultiSearch - Teachers
    const getTeacherSearchProps = (teachers) => {
        return teachers.map( obj => {
            return {
                key: obj.name,
                value: obj.name,
                text: obj.name
            }
        })
    };

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

    const isolatedSearchInfo = ['Allows user to decide if searches are isolated to their domain.',
                                'If checked, searching for courses will only search for courses, if not it will also filter on teachers that are involved in the searched course. Same goes for the teacher search'];

    const teacherOptions = getTeacherSearchProps(sessionTOData);
    const courseOptions = getCourseSearchProps(courseSessionData);

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
                    options={courseOptions} 
                    placeholder='Select Courses'
                    value={selectedCourses}
                    handler={courseSearchHandler}
                    cn='courseSearchId'
                />
            </div>
            <div className='Overview-controls__toggler-container'>
                <div className='Overview-controls__toggler-container Overview-controls__toggler-container--toggler'>
                    <Toggler 
                        label='Include Temp Teachers' 
                        handler={onIncludeTempToggle}
                        checked={tmpDataIncluded}
                        withPopup={allowPopup}
                        popupHeader='Info'
                        popupText={includeTempInfo}
                    />
                </div>
                <div className='Overview-controls__toggler-container Overview-controls__toggler-container--toggler'>
                    <Toggler 
                        label='Isolated Search' 
                        handler={(e ,d) => setIsolatedSearch(d.checked)}
                        checked={isolatedSearch}
                        withPopup={allowPopup}
                        popupHeader='Info'
                        popupText={isolatedSearchInfo}
                    />
                </div>
            </div>
        </div>
    )
}

export default OverviewControls;
