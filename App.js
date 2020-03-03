import React, { useEffect } from "react";
import * as Font from "expo-font";

import HomeScreen from "./src/screens/HomeScreen";
import RootNavigator from "./src/navigators/RootNavigator";
import { combineReducers, createStore, applyMiddleware } from "redux";
import ReduxThunk from "redux-thunk";
import authReducers from "./store/reducers/authReducers";
import { Provider } from "react-redux";

import { YellowBox } from "react-native";
import _ from "lodash";
import inputReducers from "./store/reducers/inputReducers";
import recipeReducers from "./store/reducers/recipeReducers";
import userReducers from "./store/reducers/userReducers";

YellowBox.ignoreWarnings(["Setting a timer"]);
const _console = _.clone(console);
console.warn = message => {
  if (message.indexOf("Setting a timer") <= -1) {
    _console.warn(message);
  }
};

const rootReducer = combineReducers({
  auth: authReducers,
  input: inputReducers,
  recipe: recipeReducers,
  user: userReducers
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default function App() {
  useEffect(() => {
    Font.loadAsync({
      "mont-reg": require("./assets/fonts/Montserrat-Regular.ttf"),
      "poppins-bold": require("./assets/fonts/Poppins-Bold.ttf"),
      "poppins-reg": require("./assets/fonts/Poppins-Regular.ttf")
    });
  }, [Font]);

  return (
    <Provider store={store}>
      <RootNavigator />
    </Provider>
  );
}
