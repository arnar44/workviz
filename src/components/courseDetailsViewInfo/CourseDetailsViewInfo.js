import React, { useState } from 'react';

import './CourseDetailsViewInfo.scss';
import Editable from '../editable/Editable';
import CButton from '../cButton/CButton';
import styles from '../../StyleConfig.scss';


function CourseDetailsViewInfo(props) {

    const { code, 
            shortName,
            responsible, 
            periods,
            students,
            credits,
            // userComments, TODO: Add semantic ui for this?    
            // adminComments
    } = props;


    // TODO: Don't use here, create editing modal instead
    /*
    const [ cCode, setCCode ] = useState(code);
    const [ cShortName, setCShortName ] = useState(shortName);

    const getInput = (name, placeholder, value, handler) => {
        return (
            <input
                type='text'
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={ e => handler(e.target.value)}
                autoFocus
            />
        )
    }
        <div className='Course-Info' >
            <h4>Course</h4>
            <Editable text={cCode} placeHolder='Code'>
                {getInput('code', 'Code', cCode, setCCode)}   
            </Editable>
            <Editable text={cShortName} placeHolder='Short Name'>
                {getInput('shortName', 'Short Name', cShortName, setCShortName)}   
            </Editable>
            <h4>Period(s)</h4>
            {periods.map( per => <p key={per}>{per}</p> )}
            <h4>KTH-Students</h4>
            <p>{students}</p>
            <h4>Course Credits</h4>
            <p>{credits}</p>

        </div>
    */

    const editInfoHandler = () => console.log('pressed');
    const editInfoButtonStyle = [
        {
            border: `1px solid ${styles.grayColor}`,
            backgroundColor: 'white',
            color: styles.grayColor
        },
        {
            border: `1px solid ${styles.grayColor}`,
            backgroundColor: styles.grayColor,
            color: 'white'
        }
    ]

    return (
        <div className='Course-Info' >
        <h4>Course</h4>
        <p>{code}</p>
        <p>{shortName}</p>
        <h4>Responsible</h4>
        {responsible.map( teach => <p key={teach}>{teach}</p> )}
        <h4>Period(s)</h4>
        {periods.map( per => <p key={per}>{per}</p> )}
        <h4>KTH-Students</h4>
        <p>{students}</p>
        <h4>Course Credits</h4>
        <p>{credits}</p>
        <CButton
            handler={editInfoHandler}
            text='Edit Info'
            style={editInfoButtonStyle}
            styleNum={false}
        />

    </div>
    )
}

export default CourseDetailsViewInfo;