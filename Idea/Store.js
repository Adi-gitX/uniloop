import { createContext, useState } from "react";

const DataContext = createContext();

const DataProvider = ({children}) => {
    const [screenThreeData, setScreenThreeData] = useState('');

    return (
        <DataContext value={{
            setScreenThreeData,
            screenThreeData
        }}>
            {children}
        </DataContext>
    )
}

export {
    DataProvider,
    DataContext
};