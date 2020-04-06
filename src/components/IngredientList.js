import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import styled from "styled-components";
import { Ionicons } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

const IngredientList = ({ ing }) => {
  const [checked, setChecked] = useState(false);

  return (
    <ListContainer onPress={() => setChecked(!checked)}>
      <Ingredients>{ing.ingredientName}</Ingredients>
      <IngredientsQuant>{ing.ingredientQuantity}</IngredientsQuant>
      <IconContainer>
        {checked ? (
          <Ionicons name="ios-checkmark-circle" size={23} color="#f56565" />
        ) : (
          <Ionicons name="ios-checkmark-circle-outline" size={23} />
        )}
      </IconContainer>
    </ListContainer>
  );
};

export default IngredientList;

const ListContainer = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: ${width}px;
  margin-bottom: 5px;
`;

const Ingredients = styled.Text`
  font-weight: 500;
  font-size: 18px;
  color: rgba(0, 0, 0, 0.6);
  text-transform: capitalize;
  width: 60%;
  flex: 2;
`;

const IngredientsQuant = styled.Text`
  font-weight: 500;
  font-size: 14px;
  flex: 1;
  color: rgba(0, 0, 0, 0.6);
  text-transform: capitalize;
  /* position: absolute;
  top: 0;
  right: 0; */
`;

const IconContainer = styled.View`
  flex: 1;
  padding-left: ${width / 3.5}px;
`;
