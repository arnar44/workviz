import React, { useState } from "react";

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
            setGrayCourseFilter
        }}>
            {children}
        </StateContext.Provider>
    );
};

const StateConsumer = StateContext.Consumer;
export { StateContext, StateProvider, StateConsumer };
