import React, { useState } from "react";

const FileContext = React.createContext();

const DataProvider = props => {
    const [loading, setLoading] = useState(true);

    return (
        <FileContext.Provider value={{loading}}>
            {props.children}
        </FileContext.Provider>
    );
};

const DataConsumer = FileContext.Consumer;
export { DataProvider, DataConsumer, FileContext };