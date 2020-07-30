import React from 'react';
import { Dropdown, Header, Icon } from 'semantic-ui-react'

import './Selection.scss';

function Selection(props) {
    const { iconName, inline, header, options, defaultValue, handler} = props.selectionProps;

    return (
        
        <Header as='h5'>
            <Icon name={iconName} />
            <Header.Content>
                <Dropdown 
                    inline={inline}
                    header={header}
                    options={options}
                    defaultValue={defaultValue}
                    onChange={handler}
                />
            </Header.Content>
        </Header>       
    )
}

export default Selection;
