import React, { useState } from 'react';

import './Editable.scss';

function Editable(props) {

    const { text, placeHolder, children } = props;

    const [ isEditing, setIsEditing ] = useState(false);

    return (
        <section {...props}>
            {isEditing ? 
                (
                    <div onBlur={ () => setIsEditing(false)} >
                        {children}
                    </div>
                )
                :
                (
                    <div onClick={ () => setIsEditing(true)}>
                        <span>
                            {text || placeHolder || 'Insert here'}
                        </span>
                    </div>
                )
            }
        </section>
    )
}

export default Editable;