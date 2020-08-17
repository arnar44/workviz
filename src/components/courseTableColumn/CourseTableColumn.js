import React, { useContext } from 'react';

import './CourseTableColumn.scss';
import CourseTablePeriod from '../courseTablePeriod/CourseTablePeriod';
import { StateContext } from '../../context/StateContext';


function CourseTableColumn(props) {

    const { title, row1, row2, row3, r1Ref, r2Ref } = props;

    const {
            singlesRowHeight,
            doublesRowHeight,
    } = useContext(StateContext);


    return (
        <div className="courseTableColumn">
            <h5 className='courseTableColumn__title'>{title}</h5>
            <div className='courseTableColumn__period'>
                <CourseTablePeriod 
                    courses={row1}
                    minH={singlesRowHeight}
                    colRef={r1Ref}
                />
                <CourseTablePeriod 
                    courses={row2}
                    minH={doublesRowHeight}
                    colRef={r2Ref}
                />
                { row3.length > 0 &&
                    <CourseTablePeriod courses={row3}/>
                }
            </div>
        </div>
    )
}

export default CourseTableColumn;