import React, { useContext } from 'react';

import './CourseTablePeriod.scss';
import { FileContext } from '../../context/FileContext';

function CourseTablePeriod(props) {
    const { courses } = props;

    const { selectedCourses,
            taskAlloFilter,
            teacherAlloFilter,
            teacherHover,
            setCourseHover,
            grayCourseFilter,
            courseHighlighting
        } = useContext(FileContext);

    const getFocus = (course) => {
        // When "highlighting" is disabled return
        if(!courseHighlighting)
            return '';

        // No Courses selected and no teacher hovered -> return
        if(!teacherHover && selectedCourses.length === 0)
            return '';

        // Teacher hovere is priority #1
        if(teacherHover) {
            if(teacherHover.includes(course))
                return ' focus';
        }
        // Selected Courses is priority #2
        else if(selectedCourses.length !== 0) {
            if(selectedCourses.includes(course))
                return ' focus';
        }

        return ' noFocus';
    }

    let timer = null;
    
    const filterCourses = (color, code, cName, teachers) => {
        const noFilter = !taskAlloFilter && !teacherAlloFilter && !grayCourseFilter;
        const redFilter = taskAlloFilter && color === 'Red';
        const yellowFilter = teacherAlloFilter && color === 'Yellow';
        const grayFilter = grayCourseFilter && color === 'Gray';


        if(noFilter || redFilter || yellowFilter || grayFilter)
            return (
                <button 
                    key={code} 
                    className={cName}
                    onMouseEnter={() => {
                        clearTimeout(timer);
                        setCourseHover(teachers)
                    }}
                    onMouseLeave={() => timer = setTimeout( () => setCourseHover(null), 200)}
                >
                {code}
                </button>
            )
    }
   
    return (
        <td className='courseTablePeriod'>
            {courses.map( course => {
            const focus = getFocus(course.code);
            const cName = `courseTablePeriod__course courseTablePeriod__course--${course.color}${focus}`
            return filterCourses(course.color, course.code, cName, course.teachers); 

            })}
        </td>
    )
}

export default CourseTablePeriod;