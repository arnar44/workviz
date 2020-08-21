import React, { useRef, useContext, useEffect, useState } from 'react';

import './TopView.scss';
import TeacherOverviewController from '../teacherOverviewController/TeacherOverviewController';
import CourseOverviewController from '../courseOverviewController/CourseOverviewController';
import DetailViewController from '../detailViewController/DetailViewController';
import { Tab } from 'semantic-ui-react';
import { StateContext } from '../../context/StateContext';
import { FileContext } from '../../context/FileContext';

function TopView() {

    const { teacherIsTopView } = useContext(StateContext);
    const { selectedTeachers, selectedCourses  } = useContext(FileContext);
    const topViewRef = useRef(null);

    const getOverview = () => {
        if(teacherIsTopView) 
            return <TeacherOverviewController topViewRef={topViewRef} />
        
        return <CourseOverviewController />
    }

    const getPanes = () => {
        let panesTmp = [
            { menuItem: `${teacherIsTopView ? 'Teachers' : 'Courses'}`, render: getOverview }
        ];

        selectedTeachers.map( teacher => {
            panesTmp.push({ menuItem: teacher, render: () => <DetailViewController teacher={teacher} /> })
        });

        selectedCourses.map( course => {
            panesTmp.push({ menuItem: course, render: () => <DetailViewController course={course} /> });
        });
        
        return panesTmp;
    }

    const [ panes, setPanes ] = useState(getPanes());

    useEffect( () => {
        setPanes(getPanes()); 
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedTeachers, selectedCourses, teacherIsTopView]);
    
    return (
        <div className='TopView' ref={topViewRef}>
            <Tab panes={panes} /> 
        </div>
    )
}

export default TopView;