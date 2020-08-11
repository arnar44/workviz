<<<<<<< HEAD
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
=======
import React from 'react';

import './CourseTablePeriod.scss';

function CourseTablePeriod(props) {
    const { courses } = props;

    // `Max ${MAX_SEARCH_SELECTION} can be selected`

    // teacher-table__head teacher-table__head--row
>>>>>>> 45c14bbbb7e50e1f69a68c00fab39d635e2ad191

    return (
        <div className="courseTablePeriod">
            {courses.map( course => {
<<<<<<< HEAD
                const focus = getFocus(course.code);
                const cName = `courseTablePeriod__course courseTablePeriod__course--${course.color}${focus}`
                return filterCourses(course.color, course.code, cName); 
=======
                return (
                    <button 
                        key={course.code}
                        className={`courseTablePeriod__course courseTablePeriod__course--${course.color}`}
                    >
                        {course.code}
                    </button>
                )
>>>>>>> 45c14bbbb7e50e1f69a68c00fab39d635e2ad191
            })}
        </div>
    )
}

export default CourseTablePeriod;