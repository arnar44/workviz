import React from 'react';

import { Checkbox, Popup, Header } from 'semantic-ui-react'
import './Toggler.scss'

function Toggler(props) {
    const { label, handler, checked, disabled, withPopup, popupHeader, popupText } = props;

    const cb = () => {
        return(
            <Checkbox 
                label={label}
                onClick={handler}
                checked={checked}
                disabled={disabled}
            />
        )
    } 

    if(withPopup) {
        return (
            <Popup
                trigger={cb()}
                position='bottom center'
            >
                <>
                    <Header as='h4' content={popupHeader} />
                    {popupText.map( txt => <p>{txt}</p>)}
                </>
            </Popup>
        );
    }

    return cb()
}

export default Toggler;
