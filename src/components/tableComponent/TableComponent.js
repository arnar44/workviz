import React from 'react';

import './TableComponent.scss';


function TableComponent(props) {
    const { 
        headers,
        data,
        colorCodeControl,
        removedVariables,
        colorByLine,
        nameSetter
    } = props;

    const getColor = (val, col) => {
        if(colorByLine || colorCodeControl.includes(col))
            return '';
        if(val > 2) 
            return 'red';
        if(val <= -2)
            return 'blue';
        
        return 'green';
    }

    const getRowColor = val => {
        if(!colorByLine)
            return '';
        if(val > 2)
            return 'red';
        if(val <= -2)
            return 'blue';
        return 'green'
    }  
    
    return (
        <div className='table-wrapper'>
            <table className='teacher-table'>
                <thead className='teacher-table__head'>
                    <tr className='teacher-table__head teacher-table__head--row'>
                        {   
                            headers.map( headerObj => {
                                if(removedVariables.includes(headerObj.label))
                                    return

                                return (
                                    <th 
                                        className='teacher-table__head--col'
                                        onClick={headerObj.handler}
                                        key={headerObj.label}
                                        id={headerObj.value}
                                    >
                                    {nameSetter(headerObj.label, headerObj.value)}
                                    </th>
                                    )
                                })
                            }
                    </tr>
                </thead>
                <tbody className='teacher-table__body'>
                    {
                        data.map( obj => {
                            return (
                                <tr 
                                    className={`teacher-table__body--row ${getRowColor(obj['balance'])}`}
                                    key={obj.name}
                                >
                                    { !removedVariables.includes('Name') && 
                                        <td className='teacher-table__body--col'>{obj.name}</td>
                                    }
                                    { !removedVariables.includes('Position') && 
                                        <td className='teacher-table__body--col'>{obj.position}</td>
                                    }
                                    { !removedVariables.includes('Department') && 
                                        <td className='teacher-table__body--col'>{obj.department}</td>
                                    }
                                    { !removedVariables.includes('Kontering') && 
                                        <td className='teacher-table__body--col'>{obj.kontering}</td>
                                    }
                                    { !removedVariables.includes('Bemannad') && 
                                        <td className='teacher-table__body--col'>{obj.bemannad}</td>
                                    }
                                    { !removedVariables.includes('GRU HT') && 
                                        <td className='teacher-table__body--col'>{obj.ht}</td>
                                    }
                                    { !removedVariables.includes('GRU VT') && 
                                        <td className='teacher-table__body--col'>{obj.vt}</td>
                                    }
                                    { !removedVariables.includes('Self-Dev') && 
                                        <td className='teacher-table__body--col'>{obj.selfDev}</td>
                                    }
                                    { !removedVariables.includes('Extra') && 
                                        <td className='teacher-table__body--col'>{obj.extra}</td>
                                    }
                                    { !removedVariables.includes('Balance') && 
                                        <td className={`teacher-table__body--col ${getColor(obj.balance, 'Balance')}`}>{obj.balance}</td>
                                    }
                                    { !removedVariables.includes('BOY Balance') && 
                                        <td className={`teacher-table__body--col ${getColor(obj.boyBalance, 'BOY Balance')}`}>{obj.boyBalance}</td>
                                    }
                                    { !removedVariables.includes('EOY Balance') && 
                                        <td className={`teacher-table__body--col ${getColor(obj.eoyBalance, 'EOY Balance')}`}>{obj.eoyBalance}</td>
                                    }
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
           
    )
}

export default TableComponent;