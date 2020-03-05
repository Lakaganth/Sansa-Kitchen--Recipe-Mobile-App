import React from "react";
import styled from "styled-components";
import RecipieDetail from "./../RecipieDetail";
import { Animated } from "react-native";

const RecipeCard = ({ title, img, desc }) => {
  return (
    <Container>
      <Cover>
        <Image source={{ uri: img }} resizeMode="cover" />
      </Cover>
      <Title>{title}</Title>
      <Subtitle>{desc}</Subtitle>
    </Container>
  );
};

export default RecipeCard;

const Container = styled.View`
  width: 300px;
  height: 400px;
  border-radius: 14px;
  background-color: white;
  elevation: 6;
  overflow: hidden;
`;

const Cover = styled.View`
  height: 290px;
`;

const Image = styled.Image`
  width: 100%;
  height: 250px;
`;

const Title = styled.Text`
  font-size: 32px;
  color: #f56565;
  padding-left: 20px;
  margin-bottom: 10px;
  text-transform: capitalize;
`;

const Subtitle = styled.Text`
  font-style: normal;
  padding-left: 20px;
  font-weight: 600;
  font-size: 20px;

  color: #161c2b;
`;
