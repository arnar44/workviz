import React, { useContext } from 'react';

import './TeacherOverviewControls.scss';
import Selection from '../selection/Selection';
import TeacherOverviewTableSettings from '../teacherOverviewTableSettings/TeacherOverviewTableSettings';
import Toggler from '../toggler/Toggler';
import CButton from '../cButton/CButton';
import { StateContext } from '../../context/StateContext';

function TeacherOverviewControls(props) {
    const {
        view,
        viewSwitchProps,
        variableSwitchProps 
    } = props;

    const { showAllInTable, 
            setShowAllInTable, 
            allowPopup,
            overviewSwitcherButtonProps
        } = useContext(StateContext);

    const toggleHandler = (e,d) => setShowAllInTable(d.checked);


    const showAllInfo = ['Allows user to switch between showing all/selected teachers in table.',
                        'If "Show All" is enabled, selected teachers are highlighted in table.']
    
    return (
        <div className='topview-Controls'>
            <div className='topview-Controls__val'>
                <Selection selectionProps={viewSwitchProps} />
            </div>
            { view === 'Barchart' &&
                <div className='topview-Controls__val'>
                    <Selection selectionProps={variableSwitchProps} />
                </div>
            }
            { view === 'Table' &&
                <div className='topview-Controls__val'>
                    <TeacherOverviewTableSettings />
                </div>
            }
            { view === 'Table' &&
                <div className='topview-Controls__val'>
                    <Toggler 
                        label='Show All' 
                        handler={toggleHandler}
                        checked={showAllInTable}
                        withPopup={allowPopup}
                        popupHeader='Info'
                        popupText={showAllInfo}
                    />                    
                </div>
            }
            <div className='topview-Controls__last'>
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

export default TeacherOverviewControls;
