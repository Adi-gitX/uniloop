import React, {useContext, useEffect, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, Text } from "react-native";
import { DataContext } from "./Store";
import ScreenThree from "./ScreenThree";

const ScreenOne = () => {
    const [screenTwoData, setScreenTwoData] = useState('Passing this string Data from screen 1 to screen 2');

    const { setScreenThreeData, screenThreeData } = useContext(DataContext);

    // const [screenFourData, setScreenFourData] = useState('Passing this string data from screen 1 to screen 4 using Props drilling')

    useEffect(() => {
        AsyncStorage.setItem('ScreenTwoData', screenTwoData);

        setScreenThreeData('Passing this string Data from screen 1 to screen 3 using createCntext')
    })

    return (
        <View style={{
            flex: 1,
            gap: 20
        }}>
            <Text>
                {screenTwoData}
            </Text>

            <Text>
                {screenThreeData}
            </Text>

            {/* <Text>
                {screenFourData}
            </Text> */}
        </View>
    )
}


export default ScreenOne;