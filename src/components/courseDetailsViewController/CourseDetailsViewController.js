import React from 'react';

import CourseDetailsViewInfo from '../courseDetailsViewInfo/CourseDetailsViewInfo';

function CourseDetailsViewController(props) {

    const { code, course } = props;

    return (
        <div className='Course-Details' >
            <CourseDetailsViewInfo 
                code={code}
                shortName={course['Short Name']}
                periods={course.Period}
                students={course['KTH-Students']}
                credits={course.Credits}
            />
        </div>
    )
}

export default CourseDetailsViewController;