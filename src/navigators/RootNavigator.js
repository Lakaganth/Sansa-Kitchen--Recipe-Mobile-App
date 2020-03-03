import "react-native-gesture-handler";
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreenNavigator from "./HomeScreenNavigator";
import { TabNavigator } from "./TabNavigator";

const RootNavigator = () => {
  return (
    <NavigationContainer>
      <TabNavigator />
    </NavigationContainer>
  );
};

export default RootNavigator;
