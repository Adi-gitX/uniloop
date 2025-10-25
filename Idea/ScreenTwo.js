import React, {useEffect, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, Text } from "react-native";

const ScreenTwo = () => {
    const [screenTwoData, setScreenTwoData] = useState('');

    useEffect(() => {
        AsyncStorage.getItem('ScreenTwoData').then(data => {
            setScreenTwoData(data);
        });
    })

    return (
        <View>
            <Text>
                {screenTwoData}
            </Text>
        </View>
    )
}


export default ScreenTwo;