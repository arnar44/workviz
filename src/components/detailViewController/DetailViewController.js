import React, { useContext } from 'react';

import { FileContext } from '../../context/FileContext';

function DetailViewController(props) {

    const { teacher, course } = props;
    const { teacherData, courseData } = useContext(FileContext);
    /*
    let detailData = null;

    if(teacher) 
        detailData = teacherData[teacher];
    else
        detailData = courseData[course];
    */

    return (
        <div className='DetailView' >
            <p>Detail View!</p>
        </div>
    )
}

export default DetailViewController;