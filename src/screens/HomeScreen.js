import React, { useEffect, useCallback } from "react";
import styled from "styled-components";
import {
  Platform,
  StatusBar,
  Buttton,
  ScrollView,
  TouchableOpacity,
  TouchableNativeFeedback
} from "react-native";
import SpecialsCard from "../components/SpecialsCard";

import LoginModal from "../components/LoginModal";
import { useSelector, useDispatch } from "react-redux";
import * as RecipeActions from "../../store/actions/recipeActions";

const HomeScreen = ({ navigation }) => {
  const recipesRedux = useSelector(state => state.recipe.recipes);
  const dispatch = useDispatch();

  useEffect(() => {
    StatusBar.setBarStyle("dark-content", true);
    getRecipes();
    // StatusBar.setHidden(true);
  }, [dispatch]);

  const getRecipes = useCallback(async () => {
    await dispatch(RecipeActions.getRecipes());
  });
  return (
    <Container
      style={{
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight + 40 : 0
      }}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <TitleContainer>
          <ScreenTitle>Sansa's Kitchen</ScreenTitle>
        </TitleContainer>
        <SubtitleContainer>
          <Subtitle>Trending</Subtitle>
        </SubtitleContainer>
        <SubtitleContainer>
          <Subtitle>Today's Specials</Subtitle>
        </SubtitleContainer>

        {recipesRedux.map(r => (
          <SpecialsCard
            key={r.rID}
            recipe={r}
            title={r.title}
            description={r.desc}
            splImg={r.image}
            navigation={navigation}
          />
        ))}
      </ScrollView>
    </Container>
  );
};

export default HomeScreen;

const Container = styled.View`
  flex: 1;
  background-color: #f7f7f7;
`;
const TitleContainer = styled.View`
  width: 100%;
  height: 30px;
  align-items: center;
`;
const ScreenTitle = styled.Text`
  font-weight: 500;
  font-size: 24px;
  color: #f56565;
`;
const SubtitleContainer = styled.Text`
  width: 100%;
  height: 36px;
  margin-top: 20px;
  padding-left: 20px;
`;
const Subtitle = styled.Text`
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 36px;
  color: #161c2b;
`;

const SpecialsScrollContainer = styled.View`
  width: 100%;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`;
const TouchView = styled.View`
  width: 100%;
`;
