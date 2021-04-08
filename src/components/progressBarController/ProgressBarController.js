import React, { Fragment } from 'react';

import ProgressBar from '../progressBar/ProgressBar';
import { Popup, Header } from 'semantic-ui-react';
import styles from '../../StyleConfig.scss';

function ProgressBarController(props) {

    const { course } = props;

    const keys = [
        ['Frl', 'Forelasning (Frl) Budgeted', 'Forelasning (Frl) Allocated', 'Forelasning'],
        ['Ovn', 'Ovning (Ovn) Budgeted', 'Ovning (Ovn) Allocated', 'Ovning'],
        ['Lab', 'Laboration (La) Budgeted', 'Laboration (La) Allocated', 'Laboration'],
        ['Ha', 'Handledning (Ha) Budgeted', 'Handledning (Ha) Allocated', 'Handledning'],
        ['Ex', 'Examination (Ex) Budgeted', 'Examination (Ex) Allocated', 'Examination'],
        ['Ku', 'Kursutveckling (Ku) Budgeted', 'Kursutveckling (Ku) Allocated', 'Kursutveckling'],
        ['Adm', 'Administration (Adm) Budgeted', 'Administration (Adm) Allocated', 'Administration']
    ];

    const getStyle = (bStyle) => {
        return {
            padding: '10px',
            marginRight: '10px',
            border: bStyle,
            borderRadius: '15px',
            maxHeight: '10px'
        }
    }

    const legendVals = [
        { key: 'green', border: `3px solid ${styles.greenColor}`, text:'Allication matches budget'},
        { key: 'Darkgreen', border: `3px solid ${styles.darkGreenColor}`, text:'Allocation exceeds budget'},
        { key: 'red', border: `3px solid ${styles.redColor}`, text:'Missing allocation'},
        { key: 'yellow', border: `3px solid ${styles.yellowColor}`, text:'Allocation includes UNKNOWN MID'},
        { key: 'dotted', border: '3px dashed black', text:'Not budgeted'}
    ]

    const getValues = (role, bKey, aKey, label) => {
        
        const bHours = course[bKey];
        const aHours = course[aKey];
        
        // percentage, role allo/unknown mid in role
        const uHours =  course['Teachers']['UNKNOWN MID'] && course['Teachers']['UNKNOWN MID'][role] ? 
                        course['Teachers']['UNKNOWN MID'][role] : 0;
        
        const percentageUA = uHours === 0 ? 0 : uHours / aHours;

        return {
            label,
            bHours,
            aHours,
            uHours,
            percentageBA: aHours/bHours,
            percentageUA
        }
    }

    const getLegend = (border, text, key) => {
        return (
            <div key={key} style={{display: 'flex', marginBottom: '5px', alignItems:'center'}}>
                <div style={getStyle(border)}></div>
                <p>{text}</p>
            </div>
        );
    }

    return (
        <Fragment>
            <div style={{paddingTop: '10px'}}>
                <Popup trigger={<button style={{padding: '2px 5px'}}>?</button>}>
                    <Header as='h5' content='Progress Legend' />
                    {legendVals.map( lObj => getLegend(lObj.border, lObj.text, lObj.key))}
                </Popup>
            </div>
            {keys.map( keyArr => <ProgressBar key={keyArr[0]} barProps={getValues(keyArr[0], keyArr[1], keyArr[2], keyArr[3])}/>)}
        </Fragment>
    )
}

export default ProgressBarController;