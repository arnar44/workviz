import React, { useEffect } from 'react';
import { Dropdown } from 'semantic-ui-react';

import './MultiSearch.scss';

function MultiSearch(props) {
    const { options, placeholder, value, handler, cn, disabled } = props;

    const MAX_SEARCH_CHARACTERS = 24;
    
    const keyListener = (e) => {
        if (String.fromCharCode(e.keyCode).match(/(\w|\s)/g) && e.target.value.length >= MAX_SEARCH_CHARACTERS) {
            e.preventDefault();
        }
    }     

    useEffect(() => {

        const searchControls = document.getElementsByClassName(cn)[0];
        const inp = searchControls.firstChild;

        inp.addEventListener('keydown', keyListener, true);

        return () => {
            inp.removeEventListener('keydown', keyListener, true);
        }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Dropdown 
            clearable
            fluid
            multiple
            value={value}
            search
            selection
            options={options}
            placeholder={placeholder}
            onChange={handler}
            className={cn}
            disabled={disabled}
        />
    )
}

export default MultiSearch;