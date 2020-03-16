import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import FavouritesScreen from "./../screens/FavouritesScreen";
import RecipieDetail from "./../components/RecipieDetail";
import RecipeDetailPadded from "./../components/RecipeDetailPadded";

const Stack = createStackNavigator();

const FavourtieScreenNavigator = ({ navigation }) => {
  return (
    <Stack.Navigator mode="modal" headerMode="none">
      <Stack.Screen name="Favourite" component={FavouritesScreen} />
      <Stack.Screen name="DetailPadded" component={RecipeDetailPadded} />
    </Stack.Navigator>
  );
};

export default FavourtieScreenNavigator;
