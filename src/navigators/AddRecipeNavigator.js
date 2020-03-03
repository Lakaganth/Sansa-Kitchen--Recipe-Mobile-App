import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import AddRecipeScreen from "./../screens/AddRecipeScreen";

const Stack = createStackNavigator();

const AddRecipeNavigator = ({ navigation }) => {
  return (
    <>
      <Stack.Navigator mode="modal" headerMode="none">
        <Stack.Screen name="AddRecipe" component={AddRecipeScreen} />
        {/* <Stack.Screen name="Detail" component={RecipieDetail} /> */}
      </Stack.Navigator>
    </>
  );
};

export default AddRecipeNavigator;
