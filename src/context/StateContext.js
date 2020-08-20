import React, { useState } from "react";
import styles from '../StyleConfig.scss';

const StateContext = React.createContext({});

const StateProvider = ({children}) => {

    // HoverContext
    const [ teacherHover, setTeacherHover ] = useState(null);
    const [ courseHover, setCourseHover ] = useState(null);

    // Setting Context -> toggler states 
    const [ showAllInTable, setShowAllInTable ] = useState(false);
    const [ allowPopup, setAllowPopup ] = useState(false);
    const [ courseHighlighting, setCourseHighlighting ] = useState(true);
    const [ isolatedSearch, setIsolatedSearch ] = useState(false);

    // Red, Yellow and Gray filter for course overview
    const [ taskAlloFilter, setTaskAlloFilter ] = useState(false);
    const [ teacherAlloFilter, setTeacherAlloFilter ] = useState(false);
    const [ grayCourseFilter, setGrayCourseFilter ] = useState(false);

    // View on display context
    // const ... detailview
    const [ teacherIsTopView, setTeacherIsTopView ] = useState(true);

    // Create Props for "Switch Overview Positions" Buttons
    const overviewSwitcherButtonProps = {
        handler: () => setTeacherIsTopView(prev => !prev),
        style: [
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
        ],
        text: '\u2193\u2191 Switch Views',
        styleNum: false
    }

    return (
        <StateContext.Provider value={{
            teacherHover,
            setTeacherHover,
            courseHover,
            setCourseHover,
            showAllInTable,
            setShowAllInTable,
            allowPopup,
            courseHighlighting,
            setCourseHighlighting,
            isolatedSearch,
            setIsolatedSearch,
            taskAlloFilter,
            setTaskAlloFilter,
            teacherAlloFilter,
            setTeacherAlloFilter,
            grayCourseFilter,
            setGrayCourseFilter,
            teacherIsTopView,
            overviewSwitcherButtonProps,
        }}>
            {children}
        </StateContext.Provider>
    );
};

const StateConsumer = StateContext.Consumer;
export { StateContext, StateProvider, StateConsumer };
