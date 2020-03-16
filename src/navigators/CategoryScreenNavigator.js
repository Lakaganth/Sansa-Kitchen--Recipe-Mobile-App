import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import CategoryScreen from "./../screens/CategoryScreen";
import CategoryRecipe from "../components/recipieScreens/CategoryRecipe";
import RecipieDetail from "./../components/RecipieDetail";

const Stack = createStackNavigator();

const CategoryScreenNavigator = () => {
  return (
    <>
      <Stack.Navigator headerMode="none">
        <Stack.Screen name="Category" component={CategoryScreen} />
        <Stack.Screen
          name="CategoryRecipe"
          component={CategoryRecipe}
          options={{ animationTypeForReplace: "push" }}
        />
        <Stack.Screen name="Detail" component={RecipieDetail} />
      </Stack.Navigator>
    </>
  );
};

export default CategoryScreenNavigator;
