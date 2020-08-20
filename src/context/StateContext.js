import React, { useState } from "react";

const StateContext = React.createContext({});

const StateProvider = ({children}) => {
    const MIN_ROW_HEIGHT = 46;
    const [ singlesRowHeight, setSinglesRowHeight ] = useState(MIN_ROW_HEIGHT);
    const [ doublesRowHeight, setDoublesRowHeight ] = useState(MIN_ROW_HEIGHT);
    
    const rowHeightChangeHandler = (newHeight, row) => {
        if(row === 1)
            setSinglesRowHeight(newHeight);
        else if(row === 2)
            setDoublesRowHeight(newHeight);
    }

    const rowHeightInit = () => {
        setSinglesRowHeight(MIN_ROW_HEIGHT);
        setDoublesRowHeight(MIN_ROW_HEIGHT);
    }

    return (
        <StateContext.Provider value={{
            singlesRowHeight,
            doublesRowHeight,
            rowHeightChangeHandler,
            rowHeightInit,
            setSinglesRowHeight,
            setDoublesRowHeight
        }}>
            {children}
        </StateContext.Provider>
    );
};

const StateConsumer = StateContext.Consumer;
export { StateContext, StateProvider, StateConsumer };
