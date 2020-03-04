import "react-native-gesture-handler";
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreenNavigator from "./HomeScreenNavigator";
import { TabNavigator } from "./TabNavigator";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

const RootNavigator = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <TabNavigator />
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default RootNavigator;
