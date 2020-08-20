import React, { useContext, useEffect, useState } from 'react';

import './TopViewControls.scss';
import Selection from '../selection/Selection';
import TableSettings from '../tableSettings/TableSettings';
import Toggler from '../toggler/Toggler';
import { FileContext } from '../../context/FileContext';
import { StateContext } from '../../context/StateContext';

function TopViewControls(props) {
    const {
        view,
        viewSwitchProps,
        variableSwitchProps 
    } = props;

    const { selectedTeachers, selectedCourses } = useContext(FileContext);
    const { showAllInTable, setShowAllInTable, allowPopup } = useContext(StateContext);

    const [ togglerDisabled, setTogglerDisabled ] = useState(true);

    const toggleHandler = (e,d) => {
        if(!togglerDisabled)
            setShowAllInTable(d.checked);
    }; 

    useEffect(() => {   
        if(selectedCourses.length > 0 || selectedTeachers.length > 0)
            setTogglerDisabled(false);
        else
            setTogglerDisabled(true);
    }, [selectedCourses, selectedTeachers])

    const showAllInfo = ['Allows user to switch between showing all/selected teachers in table.',
                        'If "Show All" is enabled, selected teachers are highlighted in table.',
                        'Setting can only be toggled if a teacher is selected.']
    
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
                    <TableSettings />
                </div>
            }
            { view === 'Table' &&
                <div className='topview-Controls__val'>
                    <Toggler 
                        label='Show All' 
                        handler={toggleHandler}
                        checked={showAllInTable}
                        disabled={togglerDisabled}
                        withPopup={allowPopup}
                        popupHeader='Info'
                        popupText={showAllInfo}
                    />                    
                </div>
            }
        </div>    
           
    )
}

export default TopViewControls;
