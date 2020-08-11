<<<<<<< HEAD
import React, { useContext } from 'react';

import './BottomView.scss';
import CourseOverView from '../courseOverView/CourseOverView';
import BottomViewControls from '../bottomViewControls/BottomViewControls';
import { FileContext } from '../../context/FileContext';

function BottomView(props) {

    const { setTaskAlloFilter, setTeacherAlloFilter, setGrayCourseFilter } = useContext(FileContext);

    const taskFilterHandler = () => {
        setTaskAlloFilter( prev => !prev);
        setTeacherAlloFilter(false);
        setGrayCourseFilter(false);
    }

    const teacherFilterHandler = () => {
        setTeacherAlloFilter(prev => !prev);
        setTaskAlloFilter(false);
        setGrayCourseFilter(false);
    }

    const grayFilterHandler = () => {
        setGrayCourseFilter(prev => !prev);
        setTaskAlloFilter(false);
        setTeacherAlloFilter(false);
    }

=======
import React from 'react';

import './BottomView.scss';
import CourseOverView from '../courseOverView/CourseOverView';

function BottomView(props) {

>>>>>>> 45c14bbbb7e50e1f69a68c00fab39d635e2ad191

    /*
        First take:
            1) Courses -> Overview
            2) Detail view
                i. Tabs -> color or symbol indicates if teachers or courses 
    */
    return (
        <div className='BottomView'>
<<<<<<< HEAD
            <BottomViewControls 
                taskFilterHandler={taskFilterHandler}
                teacherFilterHandler={teacherFilterHandler}
                grayFilterHandler={grayFilterHandler}
            />
=======
>>>>>>> 45c14bbbb7e50e1f69a68c00fab39d635e2ad191
            <CourseOverView />
        </div>
    )
}

export default BottomView;