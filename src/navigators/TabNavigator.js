import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./../screens/HomeScreen";
import HomeScreenNavigator from "./HomeScreenNavigator";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import CategoryScreenNavigator from "./CategoryScreenNavigator";
import FavourtieScreenNavigator from "./FavouritesScreenNavigator";
import ProfileScreenNavigator from "./ProfileScreenNavigator";
import AddRecipeNavigator from "./AddRecipeNavigator";
import { useSelector } from "react-redux";
import AllRecipeTabNavigator from "./AllRecipeTabNavigator";

const Tab = createBottomTabNavigator();

export const TabNavigator = () => {
  const currentUser = useSelector((state) => state.user.currentUser);

  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        activeTintColor: "#F56565",

        // inactiveTintColor: "#b8bece",

        inactiveTintColor: "grey",
        showLabel: false,
        showIcon: true,
        keyboardHidesTabBar: true,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreenNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="md-home" size={23} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Category"
        component={CategoryScreenNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <Entypo name="open-book" size={23} color={color} />
          ),
        }}
      />
      {currentUser ? (
        <Tab.Screen
          name="Add"
          component={AddRecipeNavigator}
          options={{
            tabBarIcon: ({ color }) => (
              <Ionicons name="md-add" size={28} color={color} />
            ),
          }}
        />
      ) : null}

      <Tab.Screen
        name="Favourites"
        component={AllRecipeTabNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="md-heart" size={23} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profie"
        component={ProfileScreenNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="md-person" size={23} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
