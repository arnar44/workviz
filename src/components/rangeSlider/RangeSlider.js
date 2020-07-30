import React from 'react';

import './RangeSlider.scss';
import { Slider } from 'react-semantic-ui-range';



function RangeSlider(props) {
    const { original, session, setter, color } = props;

    const settings = {
        start: session,
        min: original[0],
        max: original[1],
        step: 0.5,
        onChange: (val) => setter(val)
    }
    
    const selColor = color ? color : 'red';
    return (
           <div>
               <div className='slider'>
                    <Slider 
                        multiple color={selColor} 
                        settings={settings}
                        />
               </div>
               <div className='slider-labels'>
                <label className='slider-labels__min'>{`Min: ${session[0]}%`}</label>
                <label className='slider-labels__max'>{`Max: ${session[1]}%`}</label>
               </div>
           </div>
    )
}

export default RangeSlider;
