import React, { useContext } from 'react';

import './BottomView.scss';
import CourseOverView from '../courseOverView/CourseOverView';
import BottomViewControls from '../bottomViewControls/BottomViewControls';
import { StateContext } from '../../context/StateContext';

function BottomView(props) {

    const { setTaskAlloFilter, setTeacherAlloFilter, setGrayCourseFilter } = useContext(StateContext);

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