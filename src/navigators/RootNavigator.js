import "react-native-gesture-handler";
import React, { useEffect, useCallback } from "react";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreenNavigator from "./HomeScreenNavigator";
import { TabNavigator } from "./TabNavigator";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import * as RecipeActions from "../../store/actions/recipeActions";
import firebase from "../../config";

const RootNavigator = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    getRecipes();
    getCategories();
  }, [dispatch]);

  const getRecipes = useCallback(async () => {
    await dispatch(RecipeActions.getRecipes());
  });
  const getCategories = async () => {
    await dispatch(RecipeActions.getCategories());
  };
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <TabNavigator />
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default RootNavigator;
