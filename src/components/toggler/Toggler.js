import React from 'react';
import { Checkbox } from 'semantic-ui-react'

import './Toggler.scss'

function Toggler(props) {
    const { label, handler, checked, disabled } = props;

    return (
        <Checkbox 
            label={label}
            onClick={handler}
            checked={checked}
            disabled={disabled}
        />
    )
}

export default Toggler;
