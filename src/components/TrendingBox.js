import React, { useEffect, useCallback } from "react";
import styled from "styled-components";
import { ImageBackground } from "react-native";

const TrendingBox = ({ recipe, navigation }) => {
  return (
    <Container
      onPress={() =>
        navigation.navigate("Detail", {
          dish: recipe
        })
      }
    >
      <ImageBackground
        source={{ uri: recipe.image }}
        style={{ width: "100%", height: "100%" }}
      >
        <Name>{recipe.title}</Name>
      </ImageBackground>
    </Container>
  );
};

export default TrendingBox;

const Container = styled.TouchableOpacity`
  width: 250px;
  height: 150px;
  margin: 10px 20px;
  background-color: #fff;
  border-radius: 10px;
  elevation: 6;
  overflow: hidden;
`;

const Name = styled.Text`
  font-weight: 500;
  font-size: 24px;
  color: #f56565;
  text-align: center;
  background-color: rgba(0, 0, 0, 0.7);
  position: absolute;
  width: 100%;
  bottom: 0;
  left: 0;
`;
