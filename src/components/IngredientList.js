import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  TouchableOpacity
} from "react-native";
import styled from "styled-components";
import { Ionicons } from "@expo/vector-icons";

const IngredientList = ({ ing }) => {
  const [checked, setChecked] = useState(false);

  return (
    <ListContainer>
      <IngConatiner>
        <Ingredients>{ing.ingredientName}</Ingredients>
        <IngredientsQuant>{ing.ingredientQuantity}</IngredientsQuant>
      </IngConatiner>
      <TouchableOpacity onPress={() => setChecked(!checked)}>
        {checked ? (
          <Ionicons name="ios-checkmark-circle" size={23} color="#f56565" />
        ) : (
          <Ionicons name="ios-checkmark-circle-outline" size={23} />
        )}
      </TouchableOpacity>
    </ListContainer>
  );
};

export default IngredientList;

const ListContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 5px;
`;

const IngConatiner = styled.View`
  position: relative;
  width: 70%;
`;

const Ingredients = styled.Text`
  font-weight: 500;
  font-size: 18px;
  color: rgba(0, 0, 0, 0.6);
  /* height: 40px; */
  text-transform: capitalize;
  /* width: 70px; */
`;

const IngredientsQuant = styled.Text`
  font-weight: 500;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.6);
  text-transform: capitalize;
  position: absolute;
  top: 0;
  right: 0;
`;
