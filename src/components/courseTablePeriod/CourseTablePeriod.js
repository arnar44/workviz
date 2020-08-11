import React, { useContext } from 'react';

import './CourseTablePeriod.scss';
import { FileContext } from '../../context/FileContext';

function CourseTablePeriod(props) {
    const { courses } = props;
    const { selectedCourses,
            taskAlloFilter,
            teacherAlloFilter,
            grayCourseFilter } = useContext(FileContext);

    const getFocus = (course) => {
        if(selectedCourses.length === 0)
            return '';

        if(selectedCourses.includes(course))
            return ' focus';

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

    // Yellow
    // Gray
    // Red

    return (
        <div className="courseTablePeriod">
            {courses.map( course => {
                const focus = getFocus(course.code);
                const cName = `courseTablePeriod__course courseTablePeriod__course--${course.color}${focus}`
                return filterCourses(course.color, course.code, cName); 
            })}
        </div>
    )
}

export default CourseTablePeriod;