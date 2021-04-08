import React, { useContext } from 'react';

import './TeacherOverviewTableSettings.scss';
import { Modal, Button } from 'semantic-ui-react';
import { FileContext } from '../../context/FileContext';
import MultiSearch from '../multiSearch/MultiSearch';
import RangeSlider from '../rangeSlider/RangeSlider';
import Toggler from '../toggler/Toggler';

function TeacherOverviewTableSettings() {

    const { 
        colorCodeControl,
        setColorCodeControl,
        removedVariables,
        setRemovedVariables,
        removedPositions,
        setRemovedPositions,
        removedDepartments,
        setRemovedDepartments,
        konteringMinMax,
        konteringMinMaxSet,
        setKonteringMinMaxSet,
        bemannadMinMax,
        bemannadMinMaxSet,
        setBemannadMinMaxSet,
        htMinMax,
        htMinMaxSet,
        setHtMinMaxSet,
        vtMinMax,
        vtMinMaxSet,
        setVtMinMaxSet,
        selfDevMinMax,
        selfDevMinMaxSet,
        setSelfDevMinMaxSet,
        balanceMinMax,
        balanceMinMaxSet,
        setBalanceMinMaxSet,
        boyBalanceMinMax,
        boyBalanceMinMaxSet,
        setBoyBalanceMinMaxSet,
        eoyBalanceMinMax,
        eoyBalanceMinMaxSet,
        setEoyBalanceMinMaxSet,
        colorByLine,
        setColorByLine
    } = useContext(FileContext);


    // Options and handler for which colums to color code
    const colorCodingSearchHandler = (e, d) => setColorCodeControl(d.value);
    const colorCodingSearchOptions = [
        {
            key: 'Balance',
            value: 'Balance',
            text: 'Balance'
        },
        {
            key: 'BOY Balance',
            value: 'BOY Balance',
            text: 'BOY Balance'
        },
        {
            key: 'EOY Balance',
            value: 'EOY Balance',
            text: 'EOY Balance'
        },
    ]

    // Options and handler for which variables to remove from table
    const removingVariableHandler = (e, d) => setRemovedVariables(d.value);
    const removeVarOptions = [
        {
            key: 'Name',
            value: 'Name',
            text: 'Name'
        },
        {
            key: 'Position',
            value: 'Position',
            text: 'Position'
        },
        {
            key: 'Department',
            value: 'Department',
            text: 'Department'
        },
        {
            key: 'Kontering',
            value: 'Kontering',
            text: 'Kontering'
        },
        {
            key: 'Bemannad',
            value: 'Bemannad',
            text: 'Bemannad'
        },
        {
            key: 'GRU HT',
            value: 'GRU HT',
            text: 'GRU HT'
        },
        {
            key: 'GRU VT',
            value: 'GRU VT',
            text: 'GRU VT'
        },
        {
            key: 'Self-Dev',
            value: 'Self-Dev',
            text: 'Self-Dev'
        },
        {
            key: 'Extra',
            value: 'Extra',
            text: 'Extra'
        },
        {
            key: 'Balance',
            value: 'Balance',
            text: 'Balance'
        },
        {
            key: 'BOY Balance',
            value: 'BOY Balance',
            text: 'BOY Balance'
        },
        {
            key: 'EOY Balance',
            value: 'EOY Balance',
            text: 'EOY Balance'
        },
    ];

    // Options and handler for which "Positions" to filter from data
    const removingPostionHandler = (e, d) => setRemovedPositions(d.value);
    const positionList = ['Professor', 'Lektor', 'Doktorand', 'Adjunkt', 'Bitr Lektor', 'External', 'Forskare', 'Teknolog', 'Postdoc'];
    const removePosOptions = positionList.map( pos => {
        return {
            key: pos,
            value: pos,
            text: pos
        }
    })

    // Options and handler for which "Department" to filter from data
    const removingDepartmentHandler = (e, d) => setRemovedDepartments(d.value);
    const departmentList = ['MID', 'External', 'TMH', 'RPL', 'CST', 'COS', 'SCS'];
    const removeDepOptions = departmentList.map( dep => {
        return {
            key: dep,
            value: dep,
            text: dep
        }
    });

    const colorByLineToggleHandler = (e,d) => setColorByLine(d.checked);
    
    return (
        <Modal trigger={<Button>Table Settings</Button>}>
            <Modal.Header>Table Settings</Modal.Header>
            <Modal.Content>
                <div className='settings-section'>
                    <h4>Color-Coding Settings</h4>
                    <div className='settings-section__item'>
                        <Toggler 
                            label='Color Code by Line (Colored based on Balanace Variable)' 
                            handler={colorByLineToggleHandler} 
                            checked={colorByLine}
                        />
                    </div>
                    <div className='settings-section__item'>
                        <label>Remove color-coding from variables</label>
                        <MultiSearch
                            options={colorCodingSearchOptions}
                            placeholder='Select Variables That Should Not be Color-Coded'
                            value={colorCodeControl}
                            handler={colorCodingSearchHandler}
                            cn='colorCodingSearchId'
                            disabled={colorByLine}
                        />
                    </div>
                </div>
                <div className='settings-section'>
                    <h4>Remove Columns - Filter Data</h4>
                    <div className='settings-section__item'>
                        <label>Remove variables to make table less crowded</label>
                        <MultiSearch
                            options={removeVarOptions}
                            placeholder='Select Variables to Exclude from Table'
                            value={removedVariables}
                            handler={removingVariableHandler}
                            cn='removeVarSearchId'
                        />
                    </div>
                    <div className='settings-section__item'>
                        <label>Filter Out Positions</label>
                        <MultiSearch
                            options={removePosOptions}
                            placeholder='Filter Positions from Data'
                            value={removedPositions}
                            handler={removingPostionHandler}
                            cn='removePosSearchId'
                        />
                    </div>
                    <div className='settings-section__item'>
                        <label>Filter Out Departments</label>
                        <MultiSearch
                            options={removeDepOptions}
                            placeholder='Filter Departments from Data'
                            value={removedDepartments}
                            handler={removingDepartmentHandler}
                            cn='removeDepSearchId'
                        />
                    </div>
                </div>
                <div className='settings-section'>
                    <h4>Filter Data on Number Ranges</h4>
                    <div className='settings-section__item'>
                        <label>Filter on Kontering Range</label>
                        <RangeSlider 
                            original={konteringMinMax}
                            session={konteringMinMaxSet}
                            setter={setKonteringMinMaxSet}
                        />
                    </div>
                    <div className='settings-section__item'>
                        <label>Filter on Bemannad Range</label>
                        <RangeSlider
                            original={bemannadMinMax}
                            session={bemannadMinMaxSet}
                            setter={setBemannadMinMaxSet}
                        />
                    </div>
                    <div className='settings-section__item'>
                        <label>Filter on GRU HT Range</label>
                        <RangeSlider
                            original={htMinMax}
                            session={htMinMaxSet}
                            setter={setHtMinMaxSet}
                        />
                    </div>
                    <div className='settings-section__item'>
                        <label>Filter on GRU VT Range</label>
                        <RangeSlider
                            original={vtMinMax}
                            session={vtMinMaxSet}
                            setter={setVtMinMaxSet}
                        />
                    </div>
                    <div className='settings-section__item'>
                        <label>Filter on Self-Dev Range</label>
                        <RangeSlider
                            original={selfDevMinMax}
                            session={selfDevMinMaxSet}
                            setter={setSelfDevMinMaxSet}
                        />
                    </div>
                    <div className='settings-section__item'>
                        <label>Filter on Balance Range</label>
                        <RangeSlider
                            original={balanceMinMax}
                            session={balanceMinMaxSet}
                            setter={setBalanceMinMaxSet}
                        />
                    </div>
                    <div className='settings-section__item'>
                        <label>Filter on Beginning-of-Year Balance Range</label>
                        <RangeSlider
                            original={boyBalanceMinMax}
                            session={boyBalanceMinMaxSet}
                            setter={setBoyBalanceMinMaxSet}
                        />
                    </div>
                    <div className='settings-section__item'>
                        <label>Filter on End-of-Year Balance Range</label>
                        <RangeSlider
                            original={eoyBalanceMinMax}
                            session={eoyBalanceMinMaxSet}
                            setter={setEoyBalanceMinMaxSet}
                        />
                    </div>
                </div>
            </Modal.Content>
        </Modal> 
           
    )
}

export default TeacherOverviewTableSettings;
