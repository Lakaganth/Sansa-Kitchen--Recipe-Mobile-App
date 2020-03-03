import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./../screens/HomeScreen";
import RecipieDetail from "../components/RecipieDetail";
import ProfileScreen from "./../screens/ProfileScreen";

const Stack = createStackNavigator();

const ProfileScreenNavigator = ({ navigation }) => {
  return (
    <>
      <Stack.Navigator mode="modal" headerMode="none">
        <Stack.Screen name="Profile" component={ProfileScreen} />
      </Stack.Navigator>
    </>
  );
};

export default ProfileScreenNavigator;
