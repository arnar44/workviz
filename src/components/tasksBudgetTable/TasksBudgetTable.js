import React from 'react';

import './TasksBudgetTable.scss'

function TaskBudgetTable(props) {

    const { tableData } = props;

    return (
                <table className='courseTable'>
                    <thead>
                        <tr>
                            <th>Tasks</th>
                            <th>Budgeted</th>
                            <th>Allocated</th>
                            <th>Allocated %</th>
                            <th>% of Allocation is TMP</th>
                        </tr>
                    </thead>
                    <tbody>
                       {tableData.map( row => {
                           return (
                               <tr key={row.task}>
                                   <td>{row.task}</td>
                                   <td><input type='text' placeholder={row.budgeted} /></td>
                                   <td>{row.allocated}</td>
                                   <td>{row.percentage}%</td>
                                   <td>{row.tmpPercentage}%</td>
                               </tr>
                           )
                       })}         
                    </tbody>
                </table>
    )
}

export default TaskBudgetTable;