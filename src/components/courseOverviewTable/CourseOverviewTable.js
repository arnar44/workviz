import React, { useContext, useState } from 'react';

import './CourseOverviewTable.scss';
import CourseOverviewTableRow from '../courseOverviewTableRow/CourseOverviewTableRow';
import { FileContext } from '../../context/FileContext';
import { StateContext } from '../../context/StateContext';

function CourseOverviewTable(props) {

    const [ localCourseHover, setLocalCourseHover ] = useState(null);
    const { courseTableData } = useContext(FileContext);
    const { setCourseHover } = useContext(StateContext);

    let timer = null;

    const timerFunc = (global, local) => {
        setCourseHover(global);
        setLocalCourseHover(local);
    }

    const mouseEnterHandler = (teachers, course) => {
        clearTimeout(timer);
        timer = setTimeout( () => timerFunc(teachers, course), 300)
    }

    const mouseLeaveHandler = () => {
        clearTimeout(timer);
        timer = setTimeout( () => timerFunc(null, null), 300)
    }

    const { per1, per2, per3, per4, per12, per34, per14 } = courseTableData;
    
    return (
        <div className='course-table'>
            <table className='course-table__table'>
                <thead>
                    <tr>
                        <th className='course-table__head'>Period 1</th>
                        <th className='course-table__head'>Period 2</th>
                        <th className='course-table__head'>Period 3</th>
                        <th className='course-table__head'>Period 4</th>
                    </tr>
                </thead>
                <tbody>
                    <CourseOverviewTableRow
                        row={[per1, per2, per3, per4]}
                        meHandler={mouseEnterHandler}
                        mlHandler={mouseLeaveHandler}
                        localHover={localCourseHover}
                    />
                    <CourseOverviewTableRow
                        row={[per12, per12, per34, per34]}
                        meHandler={mouseEnterHandler}
                        mlHandler={mouseLeaveHandler}
                        localHover={localCourseHover}
                    />
                    <CourseOverviewTableRow
                        row={[per14, per14, per14, per14]}
                        meHandler={mouseEnterHandler}
                        mlHandler={mouseLeaveHandler}
                        localHover={localCourseHover}
                    />
                </tbody>
            </table>
        </div>
    )
}

export default CourseOverviewTable;