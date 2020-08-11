import React, { useContext } from 'react';

import './BottomViewControls.scss';
import CButton from '../cButton/CButton';
import styles from '../../StyleConfig.scss';
import { FileContext } from '../../context/FileContext';

function BottomViewControls(props) {

    const { taskFilterHandler, teacherFilterHandler, grayFilterHandler } = props;
    const { taskAlloFilter, teacherAlloFilter, grayCourseFilter } = useContext(FileContext);
  
    const getStyles = (color) => {
        return [
            {
                border: `1px solid ${color}`,
                backgroundColor: 'white',
                color: color
            },
            {
                border: `1px solid ${color}`,
                backgroundColor: color,
                color: 'white'
            }
        ];

    }

    return (
        <div className='bottomView-Controls'>
            <div className='bottomView-Controls__val'>
                <CButton 
                    handler={taskFilterHandler}
                    text='Task Allocation Needed'
                    style={getStyles(styles.redColor)}
                    styleNum={taskAlloFilter}
                />
            </div>
            <div className='bottomView-Controls__val'>
                <CButton 
                    handler={teacherFilterHandler}
                    text='Teacher Allocation Needed'
                    style={getStyles(styles.yellowColor)}
                    styleNum={teacherAlloFilter}
                />
            </div>
            <div className='bottomView-Controls__val'>
                <CButton 
                    handler={grayFilterHandler}
                    text='Courses On Schedule'
                    style={getStyles(styles.grayColor)}
                    styleNum={grayCourseFilter}
                />
            </div>
        </div>    
           
    )
}

export default BottomViewControls;
