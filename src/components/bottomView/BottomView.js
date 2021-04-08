import React, { useRef, useContext } from 'react';

import './BottomView.scss';
import CourseOverviewController from '../courseOverviewController/CourseOverviewController';
import TeacherOverviewController from '../teacherOverviewController/TeacherOverviewController';
import { StateContext } from '../../context/StateContext';

function BottomView() {

    const { teacherIsTopView } = useContext(StateContext);
    const bottoViewRef = useRef(null);

    return (
        <div className='BottomView' ref={bottoViewRef} >
            { teacherIsTopView && <CourseOverviewController /> }
            { !teacherIsTopView && <TeacherOverviewController topViewRef={bottoViewRef} /> }
        </div>
    )
}

export default BottomView;