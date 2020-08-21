import React, { useContext } from 'react';

import { FileContext } from '../../context/FileContext';
import CourseDetailsViewController from '../courseDetailsViewController/CourseDetailsViewController';
import TeacherDetailsViewController from '../teacherDetailsViewController/TeacherDetailsViewController';

function DetailViewController(props) {

    const { teacher, course } = props;
    const { teacherData, courseData } = useContext(FileContext);
    
    const viewSelector = () => {
        if(teacher)
            return <TeacherDetailsViewController name={teacher} teacher={teacherData[teacher]} />
        
        return <CourseDetailsViewController code={course} course={courseData[course]} />
    }
    
    return (
        <div className='DetailView' >
            {viewSelector()}
        </div>
    )
}

export default DetailViewController;