import React, { createContext, useContext, useState } from "react";
import {View, Text, Button} from "react-native";



const UserContext = createContext();

// Provider will use the createContext
const UserProvider = ({ children }) => {

    const [user, setUser] = useState('Vaibhav Chawla');
    const [darkMode, setDarkMode]= useState(false);

    return (
        <UserContext.Provider value={{
            user, 
            darkMode,
            setDarkMode
        }}>
            {children}
        </UserContext.Provider>
    )
}

const ScreenFour = () => {
    return (
        <UserProvider>
            <User />
            {/* <Mode/> */}
            {/* <ChangeMode /> */}
        </UserProvider>
    )
}

const User = () => {
    const {user} = useContext(UserContext);

    return (
        <View>
            <Text>
                {user}
            </Text>
        </View>
    )
}

const Mode = () => {
    const {darkMode} = useContext(UserContext);

    return (
        <Text>
            {darkMode ? 'DarkMode' : 'Light Mode'}
        </Text>
    )
}

const ChangeMode = () => {
    const {darkMode, setDarkMode} = useContext(UserContext);

    return (
        <Button title={darkMode ? 'Change to light mode': 'change to dark mode'} onPress={() => {
            setDarkMode(!darkMode);
        }} />
    )
}

export default ScreenFour;