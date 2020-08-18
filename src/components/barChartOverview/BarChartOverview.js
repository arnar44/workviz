import React, { Fragment, useContext, useEffect } from 'react';

import { FileContext } from '../../context/FileContext';
import BarChart from '../barChart/BarChart';

function BarChartOverview(props) {

    const { 
        topViewRef,
        variableOnDisplay,
        data       
    } = props;

    const { 
        selectedTeachers,
        setTeacherHover,
        teacherClickedHandler,
        courseHover
    } = useContext(FileContext);
    
    const getChartProps = () => {


        const checkFocus = (d, i, l) => {
            if(courseHover) {
                if(courseHover.includes(d.name))
                    return 1;

                return 0.4;
            }
            else if(selectedTeachers.length !== 0) {
                if(selectedTeachers.includes(d.name))
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