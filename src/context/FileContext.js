import React, { useState, useEffect } from "react";
import * as d3 from 'd3';
import firebase from '../Config'; 

const FileContext = React.createContext();

const DataProvider = props => {

    const [ teacherData, setTeacherData ] = useState(null);
    const [ courseData, setCourseData ] = useState(null);
    const [ courseTableData, setCourseTableData ] = useState(null);
    const [ sessionTOData, setSessionTOData ] = useState(null);
    const [ sessionTODataBoth, setSessionTODataBoth ] = useState(null);
    const [ barchartData, setBarchartData ] = useState(null);
    const [ barchartDataBoth, setBarchartDataBoth ] = useState(null);
    const [ loading, setLoading ] = useState(true);
    const [ error, setError ] = useState(false);
    const [ selectedTeachers, setSelectedTeachers ] = useState([]);
    const [ selectedCourses, setSelectedCourses ] = useState([]);
    const [ variableOnDisplay, setVariableOnDisplay ] = useState('Balance');
    const [ removedVariables, setRemovedVariables ] = useState([]);
    const [ removedPositions, setRemovedPositions ] = useState([]);
    const [ removedDepartments, setRemovedDepartments ] = useState([]);
    const [ colorCodeControl, setColorCodeControl ] = useState([]);
    const [ konteringMinMax, setKonteringMinMax ] = useState([]);
    const [ konteringMinMaxSet, setKonteringMinMaxSet ] = useState([]);
    const [ bemannadMinMaxSet, setBemannadMinMaxSet ] = useState([]);
    const [ bemannadMinMax, setBemannadMinMax ] = useState([]);
    const [ htMinMax, setHtMinMax ] = useState([]);
    const [ htMinMaxSet, setHtMinMaxSet ] = useState([]);
    const [ vtMinMax, setVtMinMax ] = useState([]);
    const [ vtMinMaxSet, setVtMinMaxSet ] = useState([]);
    const [ selfDevMinMax, setSelfDevMinMax ] = useState([]);
    const [ selfDevMinMaxSet, setSelfDevMinMaxSet ] = useState([]);
    const [ balanceMinMax, setBalanceMinMax ] = useState([]);
    const [ balanceMinMaxSet, setBalanceMinMaxSet ] = useState([]);
    const [ boyBalanceMinMax, setBoyBalanceMinMax ] = useState([]);
    const [ boyBalanceMinMaxSet, setBoyBalanceMinMaxSet ] = useState([]);
    const [ eoyBalanceMinMax, setEoyBalanceMinMax ] = useState([]);
    const [ eoyBalanceMinMaxSet, setEoyBalanceMinMaxSet ] = useState([]);
    const [ colorByLine, setColorByLine ] = useState(false);
    const [ tmpDataIncluded, setTmpDataIncluded ] = useState(false);


    const filterTemp = (data) => {
        const tempTeachers = [
            'Lab handl Teknolog MID',
            'Lab handl Teknolog TMH',
            'Lab handl Teknolog CST',
            'UNKNOWN MID',
            'Fo Extern MID',
            'NN Doktorand'
        ];

        return Object.keys(data)
            .filter(key => !tempTeachers.includes(key))
            .reduce( (obj, key) => {
                obj[key] = data[key];
                return obj;
            }, {});
    }

    const getBarchartData = (teacherData) => {
        return Object.entries(teacherData)
            .map(p => {
                return {
                    'name': p[0],
                    'Balance': p[1]['Balance (%)'],
                    'BOY Balance': p[1]['BOY Balance'],
                    'EOY Balance': p[1]['EOY Balance'],
                    'dep': p[1]['Department'],
                    'pos': p[1]['Position']
                }
            })
            .sort( (a,b) => d3.descending(a['Balance'], b['Balance']));

    }

    const getTeacherSessionData = (teachers) => {
        return Object.entries(teachers)
                    .map( t => {
                        return {
                            name: t[0],
                            position: t[1]['Position'],
                            department: t[1]['Department'],
                            kontering: t[1]['Kontering HCT (%)'],
                            bemannad: t[1]['Bemnnad HCT Gru (%)'],
                            ht: t[1]['Gru HT (%)'],
                            vt: t[1]['Gru VT (%)'],
                            selfDev: t[1]['Self-development & Friskvard (%)'],
                            extra: t[1]['Extra (%)'],
                            balance: t[1]['Balance (%)'],
                            boyBalance: t[1]['BOY Balance'],
                            eoyBalance: t[1]['EOY Balance'],
                        }
                    })
    }
    
    const hasMin = (arr, attrib) => {
        const checker = (o, i) => typeof(o) === 'object' && (o[i] || o[i] === 0);
        return (arr.length && arr.reduce( (prev, curr) => {
            const prevOk = checker(prev, attrib);
            const currOk = checker(curr, attrib);
            if( !prevOk && !currOk ) return {};
            if( !prevOk ) return curr;
            if( !currOk ) return prev;
            return prev[attrib] < curr[attrib] ? prev : curr;
        })) || null;
    }

    const hasMax = (arr, attrib) => {
        const checker = (o, i) => typeof(o) === 'object' && (o[i] || o[i] === 0);
        return (arr.length && arr.reduce( (prev, curr) => {
            const prevOk = checker(prev, attrib);
            const currOk = checker(curr, attrib);
            if( !prevOk && !currOk ) return {};
            if( !prevOk ) return curr;
            if( !currOk ) return prev;
            return prev[attrib] > curr[attrib] ? prev : curr;
        })) || null;
    };

    const setMinMax = (data, value, oSetter, sSetter) => {
        const minVal = hasMin(data, value);
        const maxVal = hasMax(data, value);

        oSetter([minVal[value], maxVal[value]]);
        sSetter([minVal[value], maxVal[value]]);
    }

    const getCourseColor = (c) => {

        if(c['Totalt Budgeted'] === 0)
            return 'Red';

        const budgetCols = ['Forelasning (Frl) Budgeted', 'Ovning (Ovn) Budgeted', 'Laboration (La) Budgeted',
            'Handledning (Ha) Budgeted', 'Examination (Ex) Budgeted', 'Kursutveckling (Ku) Budgeted',
            'Administration (Adm) Budgeted', 'Totalt Budgeted'];
        const allocatedCols = ['Forelasning (Frl) Allocated', 'Ovning (Ovn) Allocated', 'Laboration (La) Allocated',
            'Handledning (Ha) Allocated', 'Examination (Ex) Allocated', 'Kursutveckling (Ku) Allocated',
            'Administration (Adm) Allocated', 'Totalt Allocated'];


        for(let i=0; i<budgetCols.length; i++) {
            if(c[budgetCols[i]] > c[allocatedCols[i]])
                return 'Red';
        }

        
        if ('UNKNOWN MID' in c['Teachers']) 
            return 'Yellow';
        
        
        let teachersSum = 0;
        const totalAllo = c['Totalt Allocated'];
        const teachers = Object.keys(c['Teachers']);
        for(const teacher of teachers) {
            const roles = Object.keys(c['Teachers'][teacher]);
            for(const role of roles) {
                teachersSum += c['Teachers'][teacher][role];
            }
        }

        if (teachersSum < totalAllo)
            return 'Yellow';


        return 'Gray';

    }

    const setCourseOverviewData = (courses) => {

        let per1 = [], per2 = [], per3 = [], per4 = [], per12 = [], per34 = [], per14 = [], perOther = [];

        // eslint-disable-next-line array-callback-return
        Object.entries(courses).map(c => {

            // Create course Object
            const tableObj = {
                code: c[0],
                shortName: c[1]['Short Name'],
                color: getCourseColor(c[1]),
            };

            // Group periods
            if(c[1].Period.length === 4)
                per14.push(tableObj);
            else if(c[1].Period.length === 2 && c[1].Period[0] === '1')
                per12.push(tableObj);
            else if(c[1].Period.length === 2 && c[1].Period[0] === '3')
                per34.push(tableObj);
            else if(c[1].Period.length === 1 && c[1].Period[0] === '1')
                per1.push(tableObj);
            else if(c[1].Period.length === 1 && c[1].Period[0] === '2')
                per2.push(tableObj);
            else if(c[1].Period.length === 1 && c[1].Period[0] === '3')
                per3.push(tableObj);
            else if(c[1].Period.length === 1 && c[1].Period[0] === '4')
                per4.push(tableObj);
            else
                perOther.push(tableObj);
        });

        return {
            per1,
            per2,
            per3,
            per4,
            per12,
            per34,
            per14,
            perOther
        }

        // Add sorting in alphabetical order?

    }


    useEffect(() => {
        if (loading) {
            firebase.database().ref('/')
                .on('value', 
                    snapshot => {
                        const { data1920 } = snapshot.val();
                        const { courses, teachers } = data1920;
                        setTeacherData(teachers);
                        setCourseData(courses);

                        const filteredTeachers = filterTemp(teachers);
                        
                        // Barchart Data - Teachers
                        const barchartDataFiltered = getBarchartData(filteredTeachers);
                        setBarchartData(barchartDataFiltered);
                        setBarchartDataBoth([barchartDataFiltered, getBarchartData(teachers)]);

                        // Teacher Overview Data (Table) - Teachers
                        const sessionDataFiltered = getTeacherSessionData(filteredTeachers);
                        const sessionDataUF = getTeacherSessionData(teachers);
                        setSessionTOData(sessionDataFiltered);
                        setSessionTODataBoth([sessionDataFiltered, sessionDataUF]);

                        // Course Overview Data - Courses
                        setCourseTableData(setCourseOverviewData(courses));


                        // Get and set Min/Max values for Range slider data filtering (Table Settings)
                        setMinMax(sessionDataUF, 'kontering', setKonteringMinMax, setKonteringMinMaxSet);
                        setMinMax(sessionDataUF, 'bemannad', setBemannadMinMax, setBemannadMinMaxSet);
                        setMinMax(sessionDataUF, 'ht', setHtMinMax, setHtMinMaxSet);
                        setMinMax(sessionDataUF, 'vt', setVtMinMax, setVtMinMaxSet);
                        setMinMax(sessionDataUF, 'selfDev', setSelfDevMinMax, setSelfDevMinMaxSet);
                        setMinMax(sessionDataUF, 'balance', setBalanceMinMax, setBalanceMinMaxSet);
                        setMinMax(sessionDataUF, 'boyBalance', setBoyBalanceMinMax, setBoyBalanceMinMaxSet);
                        setMinMax(sessionDataUF, 'boyBalance', setEoyBalanceMinMax, setEoyBalanceMinMaxSet);

                        setLoading(false);
                    },
                    errorObj => {
                        setError(true);
                        setLoading(false);
                        console.log('Error readin Firebase database');
                        console.log(errorObj);
                    }
                )
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [loading]);


    return (
        <FileContext.Provider value={{
            loading,
            error,
            teacherData,
            courseData,
            sessionTOData,
            sessionTODataBoth,
            setSessionTOData,
            barchartData,
            barchartDataBoth,
            setBarchartData,
            selectedTeachers,
            setSelectedTeachers,
            selectedCourses,
            setSelectedCourses,
            variableOnDisplay,
            setVariableOnDisplay,
            removedVariables,
            setRemovedVariables,
            colorCodeControl,
            setColorCodeControl,
            removedPositions,
            setRemovedPositions,
            removedDepartments,
            setRemovedDepartments,
            konteringMinMax,
            setKonteringMinMax,
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
            setColorByLine,
            tmpDataIncluded,
            setTmpDataIncluded,
            courseTableData
            }}
        >
            {props.children}
        </FileContext.Provider>
    );
};

const DataConsumer = FileContext.Consumer;
export { DataProvider, DataConsumer, FileContext };