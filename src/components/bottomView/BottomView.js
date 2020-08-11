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


    /*
        First take:
            1) Courses -> Overview
            2) Detail view
                i. Tabs -> color or symbol indicates if teachers or courses 
    */
    return (
        <div className='BottomView'>
            <BottomViewControls 
                taskFilterHandler={taskFilterHandler}
                teacherFilterHandler={teacherFilterHandler}
                grayFilterHandler={grayFilterHandler}
            />
            <CourseOverView />
        </div>
    )
}

export default BottomView;