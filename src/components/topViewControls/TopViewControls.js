import React, { useContext, useEffect, useState } from 'react';

import './TopViewControls.scss';
import Selection from '../selection/Selection';
import TableSettings from '../tableSettings/TableSettings';
import Toggler from '../toggler/Toggler';
import { FileContext } from '../../context/FileContext';

function TopViewControls(props) {
    const {
        view,
        viewSwitchProps,
        variableSwitchProps 
    } = props;

    const { 
        selectedTeachers,
        selectedCourses,
        showAllInTable,
        setShowAllInTable
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
                    />
                </div>
            }
        </div>    
           
    )
}

export default TopViewControls;
