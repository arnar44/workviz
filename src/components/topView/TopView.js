import React, { useRef, useContext, useEffect, useState } from 'react';

import './TopView.scss';
import TeacherOverviewController from '../teacherOverviewController/TeacherOverviewController';
import CourseOverviewController from '../courseOverviewController/CourseOverviewController';
import DetailViewController from '../detailViewController/DetailViewController';
import { Tab, Menu } from 'semantic-ui-react';
import { StateContext } from '../../context/StateContext';
import { FileContext } from '../../context/FileContext';

function TopView() {

    const { teacherIsTopView } = useContext(StateContext);
    const { selectedTeachers, selectedCourses, setSelectedCourses, setSelectedTeachers } = useContext(FileContext);
    const topViewRef = useRef(null);
    const [ activeIndex, setActiveIndex ] = useState(0);

    const getMenuItem = (label, handler) => {
        return (
            <Menu.Item key={label}>
                {label}
                <button className='tab-button' onClick={() => handler(prev => prev.filter( obj => obj !== label))}>
                    {'\u292b'}
                </button>
            </Menu.Item>
        )
    }

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
            panesTmp.push({ menuItem: getMenuItem(teacher, setSelectedTeachers), render: () => <DetailViewController teacher={teacher} /> })
        });

        selectedCourses.map( course => {
            panesTmp.push({ menuItem: getMenuItem(course, setSelectedCourses), render: () => <DetailViewController course={course} /> });
        });
        
        return panesTmp;
    }

    const [ panes, setPanes ] = useState(getPanes());

    useEffect( () => {
        const tabs = selectedCourses.length + selectedTeachers.length;
        if(activeIndex > tabs)
            setActiveIndex(tabs);
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeIndex, selectedCourses, selectedTeachers])

    useEffect( () => {
        setPanes(getPanes()); 
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedTeachers, selectedCourses, teacherIsTopView]);
    
    return (
        <div className='TopView' ref={topViewRef}>
            <Tab 
                panes={panes}
                activeIndex={activeIndex}
                onTabChange={ (e, { activeIndex }) => setActiveIndex( activeIndex ) }
            /> 
        </div>
    )
}

export default TopView;