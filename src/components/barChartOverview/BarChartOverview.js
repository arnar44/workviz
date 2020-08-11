<<<<<<< HEAD
import React, { Fragment, useContext, useEffect } from 'react';
=======
import React, { Fragment, useContext, useState, useEffect } from 'react';
>>>>>>> 45c14bbbb7e50e1f69a68c00fab39d635e2ad191
import { FileContext } from '../../context/FileContext';

import BarChart from '../barChart/BarChart';

function BarChartOverview(props) {
<<<<<<< HEAD

    const { 
        topViewRef,
        variableOnDisplay,
        data       
    } = props;

    const { 
        selectedTeachers,
        setTeacherHover,
        teacherClickedHandler
    } = useContext(FileContext);
    
    const getChartProps = () => {

=======
    const { topViewRef,
            variableOnDisplay,
            data       
    } = props;
    const { selectedTeachers } = useContext(FileContext);
    const [ teacherHover, setTeacherHover ] = useState(null);
    
    const getChartProps = () => {

        const mouseEnterHandler = (data, index, list) => {

            data.obj = list[index]    
            list[index].setAttribute('style', list[index].getAttribute('style') + 'stroke-width: 2px; opacity: 1;');
            setTeacherHover(prevData => {
                // Re-entering same teacher - do nothing
                if(prevData !== null && prevData.name === data.name) 
                    return prevData;

                // Remove hover from former hover
                if(prevData !== null && prevData.obj !== null) {
                    let style = prevData.obj.getAttribute('style') + 'stroke-width: 0; opacity: ';
                    const opacity = selectedTeachers.length === 0 ? '1;'
                                    : selectedTeachers.includes(prevData.name) 
                                    ? '1;'
                                    : '0.4;';
                    prevData.obj.setAttribute('style', style+opacity); 
                }

                return data;
            });
        }

        const checkHover = (d, i, l) => {
            if(teacherHover && d.name === teacherHover.name) {
                d.obj = l[i];
                setTeacherHover(d);
                return 2;
            }
    
            return 0;

        }
>>>>>>> 45c14bbbb7e50e1f69a68c00fab39d635e2ad191
        
        const checkFocus = (d, i, l) => {
            if(selectedTeachers.length === 0)
                return 1;
            
<<<<<<< HEAD
            else if(selectedTeachers.includes(d.name))
=======
            if(selectedTeachers.includes(d.name))
                return 1;

            if(teacherHover && d.name === teacherHover.name)
>>>>>>> 45c14bbbb7e50e1f69a68c00fab39d635e2ad191
                return 1;
            
            return 0.4;
        }
        
        //const data = getTeacherData(sessionTeachers, false, toVisualize);
        const chartProps = {
            margin: { top: 15, left: 30, bottom: 15, right: 30 },
            smallBarLimit: 2,
<<<<<<< HEAD
            checkFocus: checkFocus,
            onHover: setTeacherHover,
            onClick: teacherClickedHandler
=======
            checkHover: checkHover,
            checkFocus: checkFocus,
            onHover: mouseEnterHandler
>>>>>>> 45c14bbbb7e50e1f69a68c00fab39d635e2ad191
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
<<<<<<< HEAD
                cleanup={setTeacherHover}
=======
                activeHover={teacherHover}
>>>>>>> 45c14bbbb7e50e1f69a68c00fab39d635e2ad191
            />
        </Fragment>
    )
}

export default BarChartOverview;