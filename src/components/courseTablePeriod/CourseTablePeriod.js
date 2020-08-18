import React, { useContext } from 'react';

import './CourseTablePeriod.scss';
import { FileContext } from '../../context/FileContext';

function CourseTablePeriod(props) {
    const { courses } = props;

    const { selectedCourses,
            taskAlloFilter,
            teacherAlloFilter,
            teacherHover,
            grayCourseFilter } = useContext(FileContext);

    const getFocus = (course) => {
        // No Courses selected and no teacher hovered -> No
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

    const filterCourses = (color, code, cName) => {
        if(!taskAlloFilter && !teacherAlloFilter && !grayCourseFilter) 
            return <button key={code} className={cName}>{code}</button>
            
        if(taskAlloFilter && color === 'Red')
            return <button key={code} className={cName}>{code}</button>
            
        if(teacherAlloFilter && color === 'Yellow')
            return <button key={code} className={cName}>{code}</button>
            
        if(grayCourseFilter && color === 'Gray')
            return <button key={code} className={cName}>{code}</button>
    }
   
    return (
        <td className='courseTablePeriod'>
            {courses.map( course => {
            const focus = getFocus(course.code);
            const cName = `courseTablePeriod__course courseTablePeriod__course--${course.color}${focus}`
            return filterCourses(course.color, course.code, cName); 

            })}
        </td>
    )
}

export default CourseTablePeriod;