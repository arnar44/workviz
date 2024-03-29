import React from 'react';

import { Popup, Header } from 'semantic-ui-react';
import './TeacherOverviewTable.scss';

function TeacherOverviewTable(props) {
    const { 
        headers,
        data,
        colorCodeControl,
        removedVariables,
        colorByLine,
        nameSetter,
        onClickHandler,
        selected,
        selectedC,
        isIso,
        showAll,
        allowPopup,
        mouseEnterHandler,
        mouseLeaveHandler
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

    const tableHeadComp = () => {
        return (
            <tr className='teacher-table__head teacher-table__head--row'>
                {   
                    headers
                        .filter( hObj => !removedVariables.includes(hObj.label))
                        .map( headerObj => { 
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
        )
    }

    const headPopupDecider = () => {
        if(allowPopup) {
            return (
                <Popup 
                    trigger={tableHeadComp()}
                    position='top center'
                >
                    <>
                        <Header as='h4' content='Table Info'/>
                        {tableInfo.map( txt => <p>{txt}</p> )}
                    </>
                </Popup>
            )
        }
        else {
            return tableHeadComp();
        }
    }

    const tableInfo = ['Click to sort as/des.', 'Arrows \u2193 and \u2191 indicate as/des sorting on variable.',
                        '* symbol indicates a filter has been applied to variable in "Table Settings".'];
    
    return (
        <div className='table-wrapper'>
            <table className='teacher-table'>
                <thead className='teacher-table__head'>
                    {headPopupDecider()}
                </thead>
                <tbody className='teacher-table__body'>
                    {
                        data.map( obj => {
                            let selectedCN = 'teacher-table__body--col';
                            let selectedName = obj.name;

                            if(showAll) {
                                const check = selected.includes(obj.name) || (!isIso && obj.courses.some( c => selectedC.includes(c)))
                                if(check) {
                                    selectedCN += ' selected';
                                    selectedName += ' *'; 
                                }
                            }

                            return (
                                <tr 
                                    className={`teacher-table__body--row ${getRowColor(obj['balance'])}`}
                                    key={obj.name}
                                    onClick={() => onClickHandler(obj)}
                                    onMouseEnter={ () => mouseEnterHandler(obj.courses)}
                                    onMouseLeave={ () => mouseLeaveHandler()}
                                >
                                    { !removedVariables.includes('Name') && 
                                        <td className={selectedCN}>{selectedName}</td>
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

export default TeacherOverviewTable;
