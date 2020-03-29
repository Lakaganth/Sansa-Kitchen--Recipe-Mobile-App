import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Dimensions } from "react-native";

import AddRecipeScreen from "./../screens/AddRecipeScreen";
import CameraScreen from "./../components/recipieScreens/CameraScreen";

const Stack = createStackNavigator();

const AddRecipeNavigator = ({ navigation }) => {
  return (
    <>
      <Stack.Navigator
        mode="modal"
        headerMode="none"
        initialRouteName="AddRecipe"
        screenOptions={{
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontWeight: "bold",
            width: Dimensions.get("window").width / 1.2,
            textAlign: "center"
          }
        }}
      >
        <Stack.Screen name="AddRecipe" component={AddRecipeScreen} />
        <Stack.Screen name="Camera" component={CameraScreen} />
        {/* <Stack.Screen name="Detail" component={RecipieDetail} /> */}
      </Stack.Navigator>
    </>
  );
};

export default AddRecipeNavigator;
