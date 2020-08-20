import React, { useContext, useState } from 'react';

import './CourseOverView.scss';
import CourseTablePeriod from '../courseTablePeriod/CourseTablePeriod';
import { FileContext } from '../../context/FileContext';
import { StateContext } from '../../context/StateContext';

function CourseOverView(props) {

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
                    <tr>
                        <CourseTablePeriod 
                            courses={courseTableData.per1}
                            meHandler={mouseEnterHandler}
                            mlHandler={mouseLeaveHandler}
                            localHover={localCourseHover}
                        />
                        <CourseTablePeriod 
                            courses={courseTableData.per2}
                            meHandler={mouseEnterHandler}
                            mlHandler={mouseLeaveHandler}
                            localHover={localCourseHover}
                        />
                        <CourseTablePeriod 
                            courses={courseTableData.per3}
                            meHandler={mouseEnterHandler}
                            mlHandler={mouseLeaveHandler}
                            localHover={localCourseHover}
                        />
                        <CourseTablePeriod 
                            courses={courseTableData.per4}
                            meHandler={mouseEnterHandler}
                            mlHandler={mouseLeaveHandler}
                            localHover={localCourseHover}
                        />  
                    </tr>
                    <tr>
                        <CourseTablePeriod 
                            courses={courseTableData.per12}
                            meHandler={mouseEnterHandler}
                            mlHandler={mouseLeaveHandler}
                            localHover={localCourseHover}
                        />  
                        <CourseTablePeriod 
                            courses={courseTableData.per12}
                            meHandler={mouseEnterHandler}
                            mlHandler={mouseLeaveHandler}
                            localHover={localCourseHover}
                        />  
                        <CourseTablePeriod 
                            courses={courseTableData.per34}
                            meHandler={mouseEnterHandler}
                            mlHandler={mouseLeaveHandler}
                            localHover={localCourseHover}
                        />  
                        <CourseTablePeriod 
                            courses={courseTableData.per34}
                            meHandler={mouseEnterHandler}
                            mlHandler={mouseLeaveHandler}
                            localHover={localCourseHover}
                        />  
                    </tr>
                    <tr>
                        <CourseTablePeriod 
                            courses={courseTableData.per14}
                            meHandler={mouseEnterHandler}
                            mlHandler={mouseLeaveHandler}
                            localHover={localCourseHover}
                        />  
                        <CourseTablePeriod 
                            courses={courseTableData.per14}
                            meHandler={mouseEnterHandler}
                            mlHandler={mouseLeaveHandler}
                            localHover={localCourseHover}
                        />  
                        <CourseTablePeriod 
                            courses={courseTableData.per14}
                            meHandler={mouseEnterHandler}
                            mlHandler={mouseLeaveHandler}
                            localHover={localCourseHover}
                        />  
                        <CourseTablePeriod 
                            courses={courseTableData.per14}
                            meHandler={mouseEnterHandler}
                            mlHandler={mouseLeaveHandler}
                            localHover={localCourseHover}
                        />  
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default CourseOverView;