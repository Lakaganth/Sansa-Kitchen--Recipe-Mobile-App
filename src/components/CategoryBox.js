import React from "react";
import { Dimensions, ImageBackground } from "react-native";
import styled from "styled-components";
import { TouchableNativeFeedback } from "react-native";

const screenWidth = Dimensions.get("window").width;

let cardWidth = screenWidth - 40;
if (screenWidth >= 400) {
  cardWidth = (screenWidth - 60) / 2;
}

const CategoryBox = ({ title, img, navigation, catID }) => {
  return (
    <TouchableNativeFeedback
      onPress={() => navigation.navigate("CategoryRecipe", { cID: catID })}
    >
      <Container style={{ width: cardWidth }}>
        <ImageBackground
          source={{ uri: img }}
          style={{ width: "100%", height: "100%" }}
        >
          {/* <Image source={require("../../assets/images/smoothie.png")} /> */}
          <TitleContainer>
            <Title>{title}</Title>
          </TitleContainer>
        </ImageBackground>
      </Container>
    </TouchableNativeFeedback>
  );
};

export default CategoryBox;

const Container = styled.View`
  height: 249px;
  elevation: 6;
  background: #f687b3;
  border-radius: 15px;
  overflow: hidden;
  position: relative;

  margin: 10px 10px;
`;
const Image = styled.Image`
  width: 150px;
  height: 150px;
  margin-top: 25px;
  align-self: center;
`;
const TitleContainer = styled.View`
  background: rgba(0, 0, 0, 0.6);
  height: 42px;
  position: absolute;
  width: 100%;
  bottom: 0;
  left: 0;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
  justify-content: center;
`;
const Title = styled.Text`
  font-weight: 600;
  font-size: 20px;
  line-height: 30px;
  letter-spacing: 0.04px;
  color: #ffffff;
  align-self: center;
  text-transform: capitalize;
`;
