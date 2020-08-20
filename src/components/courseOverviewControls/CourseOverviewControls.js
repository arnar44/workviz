import React, { useContext } from 'react';

import './CourseOverviewControls.scss';
import CButton from '../cButton/CButton';
import Toggler from '../toggler/Toggler';
import styles from '../../StyleConfig.scss';
import { StateContext } from '../../context/StateContext';

function CourseOverviewControls(props) {

    const { taskFilterHandler, teacherFilterHandler, grayFilterHandler } = props;
    const { allowPopup, 
            courseHighlighting,
            setCourseHighlighting,
            taskAlloFilter,
            teacherAlloFilter,
            grayCourseFilter ,
            overviewSwitcherButtonProps
        } = useContext(StateContext);

    const togglerHandler = (e,d) => {
        setCourseHighlighting(d.checked);
    }

    const togglerPopupInfo = ['Allows users to decide if highlightin is allowed.',
                        'If "Allow Highlighting" is disabled, courses will not be highlighted on hovering teachers or when teachers/courses are selected in the top controls']
  
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
            <div className='bottomView-Controls__val'>
                <Toggler 
                    label='Allow Highlighting' 
                    handler={togglerHandler}
                    checked={courseHighlighting}
                    withPopup={allowPopup}
                    popupHeader='Info'
                    popupText={togglerPopupInfo}
                />
            </div>
            <div className='bottomView-Controls__last'>
                <CButton 
                    handler={overviewSwitcherButtonProps.handler}
                    text={overviewSwitcherButtonProps.text}
                    style={overviewSwitcherButtonProps.style}
                    styleNum={overviewSwitcherButtonProps.styleNum}
                />                   
            </div>
        </div>    
           
    )
}

export default CourseOverviewControls;
