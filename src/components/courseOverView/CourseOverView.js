import React, { useContext } from 'react';

import './CourseOverView.scss';
import CourseTableColumn from '../courseTableColumn/CourseTableColumn';
import { FileContext } from '../../context/FileContext';

function CourseOverView(props) {

    const { courseTableData } = useContext(FileContext);


    
    return (
        <div className="courseTable">
            <CourseTableColumn 
                title='Period 1' 
                row1={courseTableData.per1} 
                row2={courseTableData.per12} 
                row3={courseTableData.per14}
            />
            <CourseTableColumn 
                title='Period 2' 
                row1={courseTableData.per2} 
                row2={courseTableData.per12} 
                row3={courseTableData.per14}
            />
            <CourseTableColumn 
                title='Period 3' 
                row1={courseTableData.per3} 
                row2={courseTableData.per34} 
                row3={courseTableData.per14}
            />
            <CourseTableColumn 
                title='Period 4' 
                row1={courseTableData.per4} 
                row2={courseTableData.per34} 
                row3={courseTableData.per14}
            />
        </div>
    )
}

export default CourseOverView;