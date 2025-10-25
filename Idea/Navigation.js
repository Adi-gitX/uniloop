import { createStaticNavigation } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ScreenOne from "./ScreenOne";
import ScreenTwo from "./ScreenTwo";
import ScreenThree from "./ScreenThree";
import { DataProvider } from "./Store";

const Tabs = createBottomTabNavigator({
    initialRouteName: 'ScreenOne',
    screens: {
        'ScreenOne': ScreenOne,
        'ScreenTwo': ScreenTwo,
        'ScreenThree': ScreenThree,
    }
})


const Navigation = createStaticNavigation(Tabs);

const Routes = () => {
    return (
        <DataProvider>
            <Navigation/>
        </DataProvider>
    )
}

export default Routes;