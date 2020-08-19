import React, { useContext } from 'react';

import './CourseTablePeriod.scss';
import { FileContext } from '../../context/FileContext';

function CourseTablePeriod(props) {
    const { courses } = props;

    const { selectedCourses,
            selectedTeachers,
            isolatedSearch,
            taskAlloFilter,
            teacherAlloFilter,
            teacherHover,
            setCourseHover,
            grayCourseFilter,
            courseHighlighting,
            courseClickedHandler
        } = useContext(FileContext);

    const getFocus = (course, teachers) => {
        // When "highlighting" is disabled return
        if(!courseHighlighting)
            return '';

        // Nothing hovered, no selected courses, no selected teachers (or seleceted teachers but search is isolated) -> neutral state 
        const check = (isolatedSearch) || (!isolatedSearch && selectedTeachers.length === 0)
        if(!teacherHover && selectedCourses.length === 0 && check)
            return '';

        // Teacher hovere is priority #1
        if(teacherHover) {
            if(teacherHover.includes(course))
                return ' focus';
        }
        // Selected Courses is priority #2
        else if(selectedCourses.length !== 0 || selectedTeachers.length !== 0) {
            // If isolatedSearch -> only match courses with selected Courses
            if(isolatedSearch) {
                if(selectedCourses.includes(course))
                    return ' focus';
            }
            // If NOT isolatedSearch -> match with selected Courses AND selected Teachers
            else {
                if(selectedCourses.includes(course) || teachers.some( t => selectedTeachers.includes(t)))
                    return ' focus';
            }
        }

        return ' noFocus';
    }

    let timer = null;
    
    const filterCourses = (color, code, cName, teachers) => {
        const noFilter = !taskAlloFilter && !teacherAlloFilter && !grayCourseFilter;
        const redFilter = taskAlloFilter && color === 'Red';
        const yellowFilter = teacherAlloFilter && color === 'Yellow';
        const grayFilter = grayCourseFilter && color === 'Gray';


        if(noFilter || redFilter || yellowFilter || grayFilter)
            return (
                <button 
                    key={code} 
                    className={cName}
                    onMouseEnter={() => {
                        clearTimeout(timer);
                        setCourseHover(teachers)
                    }}
                    onMouseLeave={() => timer = setTimeout( () => setCourseHover(null), 200)}
                    onClick={()=> courseClickedHandler(code)}
                >
                {code}
                </button>
            )
    }
   
    return (
        <td className='courseTablePeriod'>
            {courses.map( course => {
                const focus = getFocus(course.code, course.teachers);
                const cName = `courseTablePeriod__course courseTablePeriod__course--${course.color}${focus}`
                return filterCourses(course.color, course.code, cName, course.teachers); 
            })}
        </td>
    )
}

export default CourseTablePeriod;