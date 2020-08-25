import React from 'react';

import './CourseDetailsViewController.scss'
import CourseDetailsViewInfo from '../courseDetailsViewInfo/CourseDetailsViewInfo';
import ProgressBarController from '../progressBarController/ProgressBarController';

function CourseDetailsViewController(props) {

    const { code, course } = props;

    return (
        <div className='Course-Details' >
            <CourseDetailsViewInfo 
                code={code}
                shortName={course['Short Name']}
                responsible={course['Responsible']}
                periods={course.Period}
                students={course['KTH-Students']}
                credits={course.Credits}
            />
            <div className='Course-Details__column'>
                <div className='Course-Details__column Course-Details__column--row'>
                    <ProgressBarController course={course}/>
                </div>
                <div className='Course-Details__column Course-Details__column--row'>
                    <p>Bottomhalf</p>
                </div>
            </div>
        </div>
    )
}

export default CourseDetailsViewController;