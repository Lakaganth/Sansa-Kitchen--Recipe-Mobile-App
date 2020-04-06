import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import RecipieDetail from "./../components/RecipieDetail";
import AllRecipeScreen from "./../screens/AllRecipeScreen";
import EditRecipe from "../components/inputs/EditRecipe";

const Stack = createStackNavigator();

const AllRecipeScreenNavigator = () => {
  return (
    <Stack.Navigator mode="modal" headerMode="none">
      <Stack.Screen name="Allrecipe" component={AllRecipeScreen} />
      <Stack.Screen name="Detail" component={RecipieDetail} />
      <Stack.Screen name="Edit" component={EditRecipe} />
    </Stack.Navigator>
  );
};

export default AllRecipeScreenNavigator;
