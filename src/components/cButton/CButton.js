import React, { useState } from 'react';

import './CButton.scss';

function CButton(props) {
    const { handler, text, style, styleNum } = props;
    const [ isHovered, setIsHovered ] = useState(0);
    let index = 0;
    
    if(isHovered || styleNum)
        index = 1;

    return (
        <button 
            className='cButton'
            onClick={handler}
            onMouseEnter={() => setIsHovered(1)}
            onMouseLeave={() => setIsHovered(0)}
            style={style[index]}
        >
            {text}
        </button> 
    )
}

export default CButton;
