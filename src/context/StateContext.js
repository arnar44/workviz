import React, { useState } from "react";

const StateContext = React.createContext({});

const StateProvider = ({children}) => {
    const [isTeacherOverview, setIsTeacherOverview] = useState(null);

    return (
        <StateContext.Provider value={{isTeacherOverview}}>
            {children}
        </StateContext.Provider>
    );
};

const StateConsumer = StateContext.Consumer;
export { StateContext, StateProvider, StateConsumer };
