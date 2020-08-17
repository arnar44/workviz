import React, { useContext } from 'react';

import './CourseOverView.scss';
import CourseTablePeriod from '../courseTablePeriod/CourseTablePeriod';
import { FileContext } from '../../context/FileContext';

function CourseOverView(props) {

    const { courseTableData } = useContext(FileContext);

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
                        <CourseTablePeriod courses={courseTableData.per1}/>
                        <CourseTablePeriod courses={courseTableData.per2}/>
                        <CourseTablePeriod courses={courseTableData.per3}/>
                        <CourseTablePeriod courses={courseTableData.per4}/>  
                    </tr>
                    <tr>
                        <CourseTablePeriod courses={courseTableData.per12}/>  
                        <CourseTablePeriod courses={courseTableData.per12}/>  
                        <CourseTablePeriod courses={courseTableData.per34}/>  
                        <CourseTablePeriod courses={courseTableData.per34}/>  
                    </tr>
                    <tr>
                        <CourseTablePeriod courses={courseTableData.per14}/>  
                        <CourseTablePeriod courses={courseTableData.per14}/>  
                        <CourseTablePeriod courses={courseTableData.per14}/>  
                        <CourseTablePeriod courses={courseTableData.per14}/>  
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default CourseOverView;