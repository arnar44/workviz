import React from 'react';

import './BottomView.scss';
import CourseOverviewController from '../courseOverviewController/CourseOverviewController'

function BottomView() {

    return (
        <div className='BottomView'>
           <CourseOverviewController /> 
        </div>
    )
}

export default BottomView;