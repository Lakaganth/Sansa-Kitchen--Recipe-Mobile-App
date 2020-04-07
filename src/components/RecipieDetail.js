import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import {
  FlatList,
  Platform,
  StatusBar,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import styled from "styled-components";
import IngredientList from "./IngredientList";
import { SafeAreaView } from "react-native";
import { FontAwesome, Entypo } from "@expo/vector-icons";
import InstructionsList from "./InstructionsList";
import * as UserActions from "../../store/actions/userActions";
import * as RecipeActions from "../../store/actions/recipeActions";
import { useDispatch, useSelector } from "react-redux";

const screenWidth = Dimensions.get("window").width;
const InsctructionWidth = screenWidth - 40;

const RecipieDetail = ({ navigation, route }) => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  const dish = route.params.dish;
  const setPaddings = route.params.setPaddings;
  const favouriteScreen = route.params.favouriteScreen;

  const [heart, setHeart] = useState(
    currentUser ? currentUser.favourites.includes(dish.rID) : null
  );
  const [showIngredient, setShowIngredient] = useState(false);

  const setFavourites = async () => {
    setHeart(!heart);
    await dispatch(UserActions.addToFavourites(dish.rID, currentUser));
    await dispatch(RecipeActions.addFavouritedBy(currentUser.id, dish.rID));
  };

  return (
    <Container
      style={{
        paddingTop: !setPaddings
          ? Platform.OS === "android"
            ? StatusBar.currentHeight + 30
            : 0
          : null,
      }}
    >
      <SafeAreaView>
        <ScrollView showsVerticalScrollIndicator={false}>
          <TitleContainer>
            <ScreenTitle>{dish.title}</ScreenTitle>
            <CloseIcon>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Ionicons
                  name="ios-close-circle-outline"
                  size={32}
                  color="rgba(0, 0, 0, 0.4)"
                />
              </TouchableOpacity>
            </CloseIcon>
          </TitleContainer>
          <BannerImage source={{ uri: dish.image }} resizeMode="cover" />
          <Content style={{ width: InsctructionWidth }}>
            <Title>{dish.title}</Title>
            {currentUser ? (
              <IconContainer>
                <TouchableOpacity onPress={setFavourites}>
                  {heart ? (
                    <Ionicons name="ios-heart" size={32} color="#f56565" />
                  ) : (
                    <Ionicons
                      name="ios-heart-empty"
                      size={32}
                      color="#f56565"
                    />
                  )}
                </TouchableOpacity>
              </IconContainer>
            ) : null}

            <IngredientContainer>
              <TouchableOpacity
                onPress={() => setShowIngredient(!showIngredient)}
              >
                <IngerdientContent>
                  <IngredientTitle>Ingredients</IngredientTitle>

                  {showIngredient ? (
                    <Ionicons
                      name="md-arrow-dropright"
                      size={24}
                      style={{ paddingTop: 5 }}
                    />
                  ) : (
                    <Ionicons
                      name="md-arrow-dropdown"
                      size={24}
                      style={{ paddingTop: 10 }}
                    />
                  )}
                </IngerdientContent>
              </TouchableOpacity>
              {showIngredient ? (
                <SafeAreaView style={{ marginBottom: 10 }}>
                  {dish.ingredients.map((ing, index) => (
                    <IngredientList ing={ing} key={index} />
                  ))}
                </SafeAreaView>
              ) : null}
            </IngredientContainer>
            <InstructionTitle>Instructions</InstructionTitle>
            {dish.instructions
              ? dish.instructions.map((ins, index) => (
                  <InstructionsList ins={ins} key={index} />
                ))
              : null}

            <Instructions>{dish.instruction1}</Instructions>
          </Content>
        </ScrollView>
      </SafeAreaView>
    </Container>
  );
};

export default RecipieDetail;

const Container = styled.View`
  flex: 1;
  width: 100%;
  height: 1000px;

  /* background-color: #2d132c; */
`;

const TitleContainer = styled.View`
  width: 100%;
  height: 30px;
  align-items: center;
  /* flex-direction: row; */
`;
const ScreenTitle = styled.Text`
  font-weight: 500;
  font-size: 32px;
  color: #f56565;
  text-transform: capitalize;
`;
const CloseIcon = styled.View`
  position: absolute;
  top: 10px;
  right: 10px;
`;

const BannerImage = styled.Image`
  width: 100%;
  height: 250px;
  margin-top: 20px;
`;
const IconContainer = styled.View`
  width: 100%;
  height: 50px;
`;

const Content = styled.View`
  padding-left: 20px;
`;
const Title = styled.Text`
  font-size: 36px;
  line-height: 54px;
  text-transform: capitalize;
`;

const IngredientContainer = styled.View``;
const IngerdientContent = styled.View`
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 20px;
`;
const IngredientTitle = styled.Text`
  margin-right: 10px;
  font-size: 24px;
  /* color: #ee4540; */
`;

const InstructionTitle = styled.Text`
  font-size: 24px;
`;

const Instructions = styled.Text`
  font-size: 20px;
  line-height: 26px;
  font-weight: 400;
  color: grey;
  margin: 10px 0 0;
  text-align: justify;
`;
