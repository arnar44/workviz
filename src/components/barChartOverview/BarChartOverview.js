import React, { Fragment, useContext, useEffect } from 'react';

import { FileContext } from '../../context/FileContext';
import { StateContext } from '../../context/StateContext';
import BarChart from '../barChart/BarChart';

function BarChartOverview(props) {

    const { 
        topViewRef,
        variableOnDisplay,
        data       
    } = props;

    const { selectedTeachers, teacherClickedHandler, selectedCourses } = useContext(FileContext);
    const { setTeacherHover, courseHover, isolatedSearch } = useContext(StateContext);
    
    const getChartProps = () => {


        const checkFocus = (d, i, l) => {
            const check = isolatedSearch || (!isolatedSearch && selectedCourses.length === 0);
            
            // Hover is priority #1
            if(courseHover) {
                if(courseHover.includes(d.name))
                    return 1;

                return 0.4;
            }
            // If teachers selected but should not highlight teachers from courses selected
            else if(selectedTeachers.length !== 0 && check) {
                if(selectedTeachers.includes(d.name))
                    return 1;
                
                return 0.4; 
            }
            // If teachers from courses AND teachers selected should be highlighted
            else if(selectedTeachers.length !== 0 && !isolatedSearch && selectedCourses.length !== 0) {
                if(selectedTeachers.includes(d.name) || d.courses.some( c => selectedCourses.includes(c)))
                    return 1;

                return 0.4;
            }
            // IF teachers only from courses selected should be highlighted
            else if(selectedTeachers.length === 0 && !isolatedSearch && selectedCourses.length !== 0) {
                if(d.courses.some( c => selectedCourses.includes(c)))
                    return 1;
                
                return 0.4;
            }

            return 1;
        }
        
        //const data = getTeacherData(sessionTeachers, false, toVisualize);
        const chartProps = {
            margin: { top: 15, left: 30, bottom: 15, right: 30 },
            smallBarLimit: 2,
            checkFocus: checkFocus,
            onHover: setTeacherHover,
            onClick: teacherClickedHandler

        }

        return chartProps;
    }
   
    useEffect( () => {
        return () => {
            setTeacherHover(null);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    const chartProps = getChartProps();
    return (
        <Fragment>
            <BarChart 
                chartProps={chartProps} 
                data={data}
                parentRef={topViewRef}
                value={variableOnDisplay}
            />
        </Fragment>
    )
}

export default BarChartOverview;