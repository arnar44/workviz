import React, { Fragment, useState } from 'react';

import { taskKeys, labelMapFull, labelMapShort } from '../../utils/keyMap';
import DoubleButton from '../doubleButton/DoubleButton';
import TaskBudgetTable from '../tasksBudgetTable/TasksBudgetTable';
import './CourseEditController.scss'

function CourseEditController(props) {

    const { course } = props;

    const [ isBudgetEdit, setIsBudgetEdit ] = useState(true);
    const [ isTaskEdit, setIsTaskEdit ] = useState(true);

    const budgetButtonProps = [
        {
            text: 'Budget',
            active: isBudgetEdit,
            handler: () => setIsBudgetEdit(true)
        },
        {   
            text: 'Allocation',
            active: !isBudgetEdit,
            handler: () => setIsBudgetEdit(false)
        }
    ];

    const teacherButtonProps = [
        {
            text: 'Task',
            active: !isBudgetEdit && isTaskEdit,
            handler: () => setIsTaskEdit(true)
        },
        {
            text: 'Teachers',
            active: !isBudgetEdit && !isTaskEdit,
            handler: () => setIsTaskEdit(false)
        }
    ]

    const getBudgetData = () => {
        return taskKeys.map( t => {
            const budgetKey = `${t} Budgeted`;
            const alloKey = `${t} Allocated`;
            const shortKey = labelMapShort[t];

            const task = labelMapFull[t];
            const budgeted = course[budgetKey];
            const allocated = course[alloKey];

            // Find % of allocated that is tmp teacher allocation
            let tmpPercentage = 0;
            let percentage = 0;
            if(allocated !== 0) {
                percentage = allocated / budgeted;
                
                if('UNKNOWN MID' in course.Teachers && shortKey in course.Teachers['UNKNOWN MID']) {
                    const tmpHours = course.Teachers['UNKNOWN MID'][shortKey];
                    tmpPercentage = tmpHours === 0 ? 0 : tmpHours / allocated; 
                }
            }

            tmpPercentage *= 100;
            percentage *= 100;

            tmpPercentage = tmpPercentage.toFixed(1);
            percentage = percentage.toFixed(1);

            return {
                task,
                budgeted,
                allocated,
                percentage,
                tmpPercentage,
            }    
        })
    }

    //console.log(course);
    //console.log(getBudgetData());

    const editHeading = isBudgetEdit ? 'Budget' : 'Allocation';
    const detailHeading = isTaskEdit ? 'Tasks' : 'Teachers';

    return (
        <Fragment>
            <div className='courseDetail-controls'>
                <h3 className='courseDetail-controls__heading'>Edit Course - Controls</h3>
                <div className='button-group'>
                    <DoubleButton buttonProps={budgetButtonProps} />
                    <DoubleButton buttonProps={teacherButtonProps} />
                    <div className='button-group__singles'>
                        <button className='button-group__singles--button'>Add Teacher</button>
                        <button className='button-group__singles--button'>Stage Changes</button>
                    </div>
                </div>
            </div>
            <div className='courseDetail-view'>
                <div className='course-edit'>
                    <h3 className='course-edit__heading'>Course Edit - {editHeading}</h3>
                    <div className='course-edit__table'>
                        <TaskBudgetTable tableData={getBudgetData()}/>
                    </div>
                </div>
            </div>
            { !isBudgetEdit &&
                <div className='courseDetail-details'>
                    <div className='course-details'>
                        <h3 className='course-details__heading'>{detailHeading}</h3>
                        <div className='course-details__table'>
                            Hey
                        </div>
                    </div>
                </div>
            }
        </Fragment>
    )
}

export default CourseEditController;