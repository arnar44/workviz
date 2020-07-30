import React from 'react';
import { Button } from 'semantic-ui-react';

import './Button.scss'

function Toggler(props) {

    const {
        icon,
        text,
        handler
    } = props;

    return (
        <Button 
            icon={icon}
            content={text}
            onClick={handler}
        />
    )
}

export default Toggler;
