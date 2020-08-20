import React, { useRef, useContext } from 'react';

import './TopView.scss';
import TeacherOverviewController from '../teacherOverviewController/TeacherOverviewController';
import CourseOverviewController from '../courseOverviewController/CourseOverviewController';
import { StateContext } from '../../context/StateContext';

function TopView() {

    const { teacherIsTopView } = useContext(StateContext);
    const topViewRef = useRef(null);

    return (
        <div className='TopView' ref={topViewRef}>
            { teacherIsTopView && <TeacherOverviewController topViewRef={topViewRef} /> }
            { !teacherIsTopView && <CourseOverviewController /> }
        </div>
    )
}

export default TopView;