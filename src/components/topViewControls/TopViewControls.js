import React from 'react';

import './TopViewControls.scss';
import Selection from '../selection/Selection';
import TableSettings from '../tableSettings/TableSettings';

function TopViewControls(props) {
    const {
        view,
        viewSwitchProps,
        variableSwitchProps 
    } = props;
    
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
        </div>    
           
    )
}

export default TopViewControls;
