import React, { useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import SpecialsCard from "./../SpecialsCard";
import {
  Platform,
  Buttton,
  ScrollView,
  TouchableOpacity,
  TouchableNativeFeedback,
  StatusBar
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import * as RecipeActions from "../../../store/actions/recipeActions";

const CategoryRecipe = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const cID = route.params.cID;
  const catRedux = useSelector(state => state.recipe.categories);
  const recipieRedux = useSelector(state => state.recipe.recipes);

  useEffect(() => {
    StatusBar.setBarStyle("dark-content", true);
    getRecipes();
    // StatusBar.setHidden(true);
  }, [dispatch]);

  const getRecipes = async () => {
    await dispatch(RecipeActions.getRecipes());
  };

  const resCat = catRedux.filter(c => c.cID == cID);
  const selectedCatObj = resCat[0];
  // console.log("CAt", catRedux);

  const resRecipes = recipieRedux.filter(r => r.categoryRecipe.cID == cID);

  return (
    <Container>
      <ScrollView showsVerticalScrollIndicator={false}>
        <TitleContainer>
          <BackIcon>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Entypo
                name="chevron-with-circle-left"
                size={28}
                color="rgba(0, 0, 0, 0.4)"
              />
            </TouchableOpacity>
          </BackIcon>
          {/* <ScreenTitle>{selectedCatObj.catName}</ScreenTitle> */}
        </TitleContainer>

        <SubtitleContainer>
          <Subtitle>Recipe List</Subtitle>
        </SubtitleContainer>

        {resRecipes
          ? resRecipes.map(r => (
              <SpecialsCard
                key={r.rID}
                recipe={r}
                title={r.title}
                description={r.desc}
                splImg={r.image}
                navigation={navigation}
              />
            ))
          : null}
      </ScrollView>
    </Container>
  );
};

export default CategoryRecipe;

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: #f7f7f7;
  padding-top: ${Platform.OS === "android"
    ? StatusBar.currentHeight + 20
    : 0}px;
`;
const TitleContainer = styled.View`
  width: 100%;
  height: 30px;
  position: relative;
  align-items: center;
  justify-content: center;
  /* flex-direction: row;
  align-items: center;
  justify-content: space-between; */
`;
const BackIcon = styled.View`
  position: absolute;
  top: 5px;
  left: 20px;
`;
const ScreenTitle = styled.Text`
  font-weight: 500;
  font-size: 32px;
  color: #f56565;
  text-transform: capitalize;
  text-align: center;
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
