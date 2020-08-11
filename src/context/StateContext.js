import React, { useState } from "react";

const StateContext = React.createContext({});

const StateProvider = ({children}) => {
    const [ isTeacherOverview, setIsTeacherOverview ] = useState(null);
    const [ lastHoveredTeacher, setLastHoveredTeacher ] = useState(-1);

    return (
        <StateContext.Provider value={{
            isTeacherOverview,
            setIsTeacherOverview,
            lastHoveredTeacher,
            setLastHoveredTeacher,
        }}>
            {children}
        </StateContext.Provider>
    );
};

const StateConsumer = StateContext.Consumer;
export { StateContext, StateProvider, StateConsumer };
