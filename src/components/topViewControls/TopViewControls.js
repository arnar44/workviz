<<<<<<< HEAD
import React, { useContext, useEffect, useState } from 'react';
=======
import React from 'react';
>>>>>>> 45c14bbbb7e50e1f69a68c00fab39d635e2ad191

import './TopViewControls.scss';
import Selection from '../selection/Selection';
import TableSettings from '../tableSettings/TableSettings';
<<<<<<< HEAD
import Toggler from '../toggler/Toggler';
import { FileContext } from '../../context/FileContext';
=======
>>>>>>> 45c14bbbb7e50e1f69a68c00fab39d635e2ad191

function TopViewControls(props) {
    const {
        view,
        viewSwitchProps,
        variableSwitchProps 
    } = props;
<<<<<<< HEAD

    const { 
        selectedTeachers,
        selectedCourses,
        showAllInTable,
        setShowAllInTable,
        allowPopup
    } = useContext(FileContext);

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
=======
>>>>>>> 45c14bbbb7e50e1f69a68c00fab39d635e2ad191
    
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
<<<<<<< HEAD
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
=======
>>>>>>> 45c14bbbb7e50e1f69a68c00fab39d635e2ad191
        </div>    
           
    )
}

export default TopViewControls;
