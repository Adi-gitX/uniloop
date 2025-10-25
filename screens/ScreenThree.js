import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import {View, Text, Button} from "react-native";


// Not Doing prop drilling -> Mainting the State using Async Storage
// Issue with this -> Async nature, fs module interaction by each component, time consuming -> 
// Solution -> Global Storage / container
// Difficult to maintain the State among the Different Components
const ScreenThree = () => {
    const [user, setUser] = useState("");
    const [refresh, setRefresh] = useState(true);

    useEffect(function() {
        AsyncStorage.getItem('user').then(function(data) {
            if(data) {
                setUser(data);
                return
            }

            setUser('Not found');
        })
    }, [refresh]);



    return (
        <View>
            <Text>
                {user ? user : <Text>Loading...</Text>}
            </Text>
            
            <Button title="Refresh" onPress={() => {
                setRefresh(val => !val);
            }} />
        </View>
    )
}

export default ScreenThree;