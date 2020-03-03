import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./../screens/HomeScreen";
import RecipieDetail from "../components/RecipieDetail";

const Stack = createStackNavigator();

const HomeScreenNavigator = ({ navigation }) => {
  return (
    <>
      <Stack.Navigator mode="modal" headerMode="none">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Detail" component={RecipieDetail} />
      </Stack.Navigator>
    </>
  );
};

export default HomeScreenNavigator;
