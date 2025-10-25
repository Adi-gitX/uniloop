import React, {useContext, useEffect, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, Text } from "react-native";
import { DataContext } from "./Store";

const ScreenThree = () => {
    const {screenThreeData} = useContext(DataContext);

    useEffect(() => {
        AsyncStorage.getItem('ScreenTwoData').then(data => {
            setScreenTwoData(data);
        });
    })

    return (
        <View>
            <Text>
                {screenThreeData}
            </Text>
        </View>
    )
}


export default ScreenThree;