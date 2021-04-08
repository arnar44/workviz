import React from 'react';

import './DoubleButton.scss'

function DoubleButton(props) {

    const { buttonProps } = props;

    return (
        <div className='doubleButton'>
            {buttonProps.map( p => {
                const cn = p.active ? 'dButton' : 'dButton__disabled';
                return (
                    <button 
                        className={cn}
                        onClick={p.handler}
                        key={p.text}
                    >
                        {p.text}
                    </button>
                ) 
            })}
        </div>
    )
}

export default DoubleButton;