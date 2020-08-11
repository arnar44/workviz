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
            allowPopup
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
            <div className='Overview-controls__toggler'>
                <Toggler 
                    label='Include Temp Teachers' 
                    handler={onIncludeTempToggle}
                    checked={tmpDataIncluded}
                    withPopup={allowPopup}
                    popupHeader='Info'
                    popupText={includeTempInfo}
                />
            </div>
        </div>
    )
}

export default OverviewControls;
