import React from 'react';

import './CourseTablePeriod.scss';

function CourseTablePeriod(props) {
    const { courses } = props;

    // `Max ${MAX_SEARCH_SELECTION} can be selected`

    // teacher-table__head teacher-table__head--row

    return (
        <div className="courseTablePeriod">
            {courses.map( course => {
                return (
                    <button 
                        key={course.code}
                        className={`courseTablePeriod__course courseTablePeriod__course--${course.color}`}
                    >
                        {course.code}
                    </button>
                )
            })}
        </div>
    )
}

export default CourseTablePeriod;