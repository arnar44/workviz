import React, { useContext, Fragment } from 'react';

import CourseOverviewTable from '../courseOverviewTable/CourseOverviewTable';
import CourseOverviewControls from '../courseOverviewControls/CourseOverviewControls';
import { StateContext } from '../../context/StateContext';

function CourseOverviewController() {

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
        <Fragment>
            <CourseOverviewControls 
                taskFilterHandler={taskFilterHandler}
                teacherFilterHandler={teacherFilterHandler}
                grayFilterHandler={grayFilterHandler}
                />
            <CourseOverviewTable />
        </Fragment>
    )
}

export default CourseOverviewController;