import React from 'react';

import './BottomView.scss';
import CourseOverView from '../courseOverView/CourseOverView';

function BottomView(props) {


    /*
        First take:
            1) Courses -> Overview
            2) Detail view
                i. Tabs -> color or symbol indicates if teachers or courses 
    */
    return (
        <div className='BottomView'>
            <CourseOverView />
        </div>
    )
}

export default BottomView;