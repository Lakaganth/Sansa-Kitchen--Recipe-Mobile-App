import React from "react";
import styled from "styled-components";
import { Dimensions, TouchableNativeFeedback } from "react-native";

const screenWidth = Dimensions.get("window").width;
const cardWidth = screenWidth - 40;
const imageWidth = cardWidth - 220;

const SpecialsCard = props => {
  const { favouriteScreen } = props;
  return (
    <>
      {favouriteScreen ? (
        <TouchableNativeFeedback
          onPress={() =>
            props.navigation.navigate("DetailPadded", {
              dish: props.recipe,
              setPaddings: props.setPaddings,
              favouriteScreen: props.favouriteScreen
            })
          }
        >
          <Container
            style={{
              width: cardWidth
            }}
          >
            <ImageContainer
              source={{ uri: props.splImg }}
              style={{ width: imageWidth }}
              resizeMode="cover"
            />
            <Content>
              <Title>{props.title}</Title>
              <Description>{props.description}</Description>
            </Content>
          </Container>
        </TouchableNativeFeedback>
      ) : (
        <TouchableNativeFeedback
          onPress={() =>
            props.navigation.navigate("Detail", {
              dish: props.recipe,
              setPaddings: props.setPaddings,
              favouriteScreen: props.favouriteScreen
            })
          }
        >
          <Container
            style={{
              width: cardWidth
            }}
          >
            <ImageContainer
              source={{ uri: props.splImg }}
              style={{ width: imageWidth }}
              resizeMode="cover"
            />
            <Content>
              <Title>{props.title}</Title>
              <Description>{props.description}</Description>
            </Content>
          </Container>
        </TouchableNativeFeedback>
      )}
    </>
  );
};

export default SpecialsCard;

const Container = styled.View`
  height: 120px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  elevation: 6;
  background-color: #fff;
  border-radius: 15px;
  overflow: hidden;

  margin: 20px 10px 20px 20px;
`;

const ImageContainer = styled.Image`
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
`;

const Content = styled.View`
  width: 100%;
  padding-left: 170px;
`;

const Title = styled.Text`
  font-size: 18px;
  color: #161c2b;
  line-height: 23px;
  margin-bottom: 10px;
  text-transform: capitalize;
`;

const Description = styled.Text`
  font-size: 16px;
  font-weight: 600;
  line-height: 20px;
  letter-spacing: 0.03px;
  color: #161c2b;
`;
