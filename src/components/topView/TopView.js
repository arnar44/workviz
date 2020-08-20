import React, { useRef } from 'react';

import './TopView.scss';
import TeacherOverviewController from '../teacherOverviewController/TeacherOverviewController';


function TopView() {

    const topViewRef = useRef(null);

    return (
        <div className='TopView' ref={topViewRef}>
            <TeacherOverviewController topViewRef={topViewRef} />
        </div>
    )
}

export default TopView;