import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import RecipieDetail from "./../components/RecipieDetail";
import AllRecipeScreen from "./../screens/AllRecipeScreen";

const Stack = createStackNavigator();

const AllRecipeScreenNavigator = () => {
  return (
    <Stack.Navigator mode="modal" headerMode="none">
      <Stack.Screen name="Allrecipe" component={AllRecipeScreen} />
      <Stack.Screen name="Detail" component={RecipieDetail} />
    </Stack.Navigator>
  );
};

export default AllRecipeScreenNavigator;
