import React from 'react';
<<<<<<< HEAD
import { Checkbox, Popup, Header } from 'semantic-ui-react'
=======
import { Checkbox } from 'semantic-ui-react'
>>>>>>> 45c14bbbb7e50e1f69a68c00fab39d635e2ad191

import './Toggler.scss'

function Toggler(props) {
<<<<<<< HEAD
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
=======
    const { label, handler, checked } = props;


    return (
        <Checkbox 
            label={label}
            onClick={handler}
            checked={checked}
        />
    )
>>>>>>> 45c14bbbb7e50e1f69a68c00fab39d635e2ad191
}

export default Toggler;
