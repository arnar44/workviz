import React from 'react';

import './CourseDetailsViewController.scss'
import CourseDetailsViewInfo from '../courseDetailsViewInfo/CourseDetailsViewInfo';
import ProgressBarController from '../progressBarController/ProgressBarController';
import CourseEditController from '../courseEditController/CourseEditController';

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
                <div className='Course-Details__column Course-Details__column--topRow'>
                    <ProgressBarController course={course}/>
                </div>
                <div className='Course-Details__column Course-Details__column--bottomRow'>
                    <CourseEditController course={course} />
                </div>
            </div>
        </div>
    )
}

export default CourseDetailsViewController;