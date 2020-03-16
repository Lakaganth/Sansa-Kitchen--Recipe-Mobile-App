import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import FavourtieScreenNavigator from "./FavouritesScreenNavigator";
import AllRecipeScreenNavigator from "./AllRecipeScreenNavigator";
import styled from "styled-components";
import { Platform, StatusBar } from "react-native";
import { useSelector } from "react-redux";
import RecipeCardScreen from "../screens/RecipeCardScreen";

const Tab = createMaterialTopTabNavigator();

const AllRecipeTabNavigator = () => {
  const currentUser = useSelector(state => state.user.currentUser);

  return (
    <Container>
      <Tab.Navigator>
        <Tab.Screen name="All" component={AllRecipeScreenNavigator} />
        {/* <Tab.Screen name="All" component={RecipeCardScreen} /> */}
        {currentUser ? (
          <Tab.Screen name="Favs" component={FavourtieScreenNavigator} />
        ) : null}
      </Tab.Navigator>
    </Container>
  );
};

export default AllRecipeTabNavigator;

const Container = styled.SafeAreaView`
  flex: 1;
  padding-top: ${Platform.OS === "android"
    ? StatusBar.currentHeight + 20
    : 0}px;
`;
