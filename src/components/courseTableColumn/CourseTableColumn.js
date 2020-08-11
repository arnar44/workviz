import React from 'react';

import './CourseTableColumn.scss';
import CourseTablePeriod from '../courseTablePeriod/CourseTablePeriod';

function CourseTableColumn(props) {

    const { title, row1, row2, row3 } = props;

    
    return (
        <div className="courseTableColumn">
            <h5 className='courseTableColumn__title'>{title}</h5>
            <div className='courseTableColumn__period'>
                <CourseTablePeriod courses={row1}/>
                <CourseTablePeriod courses={row2}/>
                <CourseTablePeriod courses={row3}/>
            </div>
        </div>
    )
}

export default CourseTableColumn;