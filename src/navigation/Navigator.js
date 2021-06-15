import { createAppContainer, createSwitchNavigator } from "react-navigation";
import AuthScreen from "../screens/AuthScreen";
import DriverHome from "../screens/DriverHome";
import HomeScreen from "../screens/HomeScreen";
import Drawer from "./Drawer";
import Drawer2 from "./Drawer2";

const Navigator = createSwitchNavigator(
  {
    Auth: { screen: AuthScreen },
    Home: { screen: Drawer },
    DriverHome: { screen: Drawer2 },
  },
  {
    initialRouteName: "Auth",
  }
);

export default AppContainer = createAppContainer(Navigator);
