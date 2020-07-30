import React from 'react';
import { Checkbox } from 'semantic-ui-react'

import './Toggler.scss'

function Toggler(props) {
    const { label, handler, checked } = props;


    return (
        <Checkbox 
            label={label}
            onClick={handler}
            checked={checked}
        />
    )
}

export default Toggler;
