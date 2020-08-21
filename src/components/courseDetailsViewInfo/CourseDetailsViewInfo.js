import React from 'react';

import './CourseDetailsViewInfo.scss';

function CourseDetailsViewInfo(props) {

    const { code, 
            shortName,
            //responsible, TODO: Add to data
            periods,
            students,
            credits,
            // userComments, TODO: Add semantic ui for this?
            // adminComments
    } = props;

    return (
        <div className='Course-Info' >
            <p>{code}</p>
            <p>{shortName}</p>
            {periods.map( per => <p key={per}>{per}</p> )}
            <p>{students}</p>
            <p>{credits}</p>

        </div>
    )
}

export default CourseDetailsViewInfo;