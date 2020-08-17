import React, { useContext, useEffect, useRef } from 'react';

import './CourseOverView.scss';
import CourseTableColumn from '../courseTableColumn/CourseTableColumn';
import { FileContext } from '../../context/FileContext';
import { StateContext } from '../../context/StateContext';

function CourseOverView(props) {

    const { courseTableData,
            taskAlloFilter,
            teacherAlloFilter,
            grayCourseFilter
    } = useContext(FileContext);
    const { setSinglesRowHeight ,setDoublesRowHeight } = useContext(StateContext);

    const p1Ref = useRef(null);
    const p2Ref = useRef(null);
    const p3Ref = useRef(null);
    const p4Ref = useRef(null);
    const p12Ref = useRef(null);
    const p34Ref = useRef(null);


    useEffect(() => {
        if(p1Ref.current && p2Ref.current && p3Ref.current && p4Ref.current) {
            setSinglesRowHeight(Math.max(
                p1Ref.current.clientHeight,
                p2Ref.current.clientHeight,
                p3Ref.current.clientHeight,
                p4Ref.current.clientHeight,
            ));
        }
    }, [p1Ref, p2Ref, p3Ref, p4Ref, setSinglesRowHeight, taskAlloFilter, teacherAlloFilter, grayCourseFilter]);
 
    useEffect(() => {
        if(p12Ref.current && p34Ref.current ) {
            setDoublesRowHeight(Math.max(
                p12Ref.current.clientHeight,
                p34Ref.current.clientHeight,
            ));
        }
    }, [p12Ref, p34Ref, setDoublesRowHeight, taskAlloFilter, teacherAlloFilter, grayCourseFilter]);

    
    return (
        <div className="courseTable">
            <CourseTableColumn 
                title='Period 1' 
                row1={courseTableData.per1} 
                row2={courseTableData.per12} 
                row3={courseTableData.per14}
                r1Ref={p1Ref}
                r2Ref={p12Ref}
            />
            <CourseTableColumn 
                title='Period 2' 
                row1={courseTableData.per2} 
                row2={courseTableData.per12} 
                row3={courseTableData.per14}
                r1Ref={p2Ref}
            />
            <CourseTableColumn 
                title='Period 3' 
                row1={courseTableData.per3} 
                row2={courseTableData.per34} 
                row3={courseTableData.per14}
                r1Ref={p3Ref}
                r2Ref={p34Ref}
            />
            <CourseTableColumn 
                title='Period 4' 
                row1={courseTableData.per4} 
                row2={courseTableData.per34} 
                row3={courseTableData.per14}
                r1Ref={p4Ref}
            />
        </div>
    )
}

export default CourseOverView;