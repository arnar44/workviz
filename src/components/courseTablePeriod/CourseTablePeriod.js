import React, { useContext } from 'react';

import './CourseTablePeriod.scss';
import { FileContext } from '../../context/FileContext';


function CourseTablePeriod(props) {
    const { courses } = props;
    const { selectedCourses } = useContext(FileContext);

    const getFocus = (course) => {
        if(selectedCourses.length === 0)
            return '';

        if(selectedCourses.includes(course))
            return ' focus';

        return ' noFocus';
    }

    return (
        <div className="courseTablePeriod">
            {courses.map( course => {
                const focus = getFocus(course.code);
                return (
                    <button 
                        key={course.code}
                        className={`courseTablePeriod__course courseTablePeriod__course--${course.color}${focus}`}
                    >
                        {course.code}
                    </button>
                )
            })}
        </div>
    )
}

export default CourseTablePeriod;