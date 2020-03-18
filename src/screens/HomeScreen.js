import React, { useEffect, useCallback, useState } from "react";
import styled from "styled-components";
import {
  Platform,
  StatusBar,
  Buttton,
  ScrollView,
  TouchableOpacity,
  TouchableNativeFeedback,
  FlatList
} from "react-native";
import SpecialsCard from "../components/SpecialsCard";
import firebase from "../../config";

import LoginModal from "../components/LoginModal";
import { useSelector, useDispatch } from "react-redux";
import * as RecipeActions from "../../store/actions/recipeActions";
import TrendingBox from "../components/TrendingBox";

const HomeScreen = ({ navigation }) => {
  const recipesReduxs = useSelector(state => state.recipe.recipes);
  const dispatch = useDispatch();
  const [recipesRedux, setRecipesRedux] = useState(recipesReduxs);

  useEffect(() => {
    StatusBar.setBarStyle("dark-content", true);
    getRecipes();
    // StatusBar.setHidden(true);
    const addedRecipeListner = firebase
      .firestore()
      .collection("allRecipes")
      .onSnapshot(async querySnapshot => {
        let recipeObj = [];
        querySnapshot.forEach(async doc => {
          recipeObj.push({ rID: doc.id, ...doc.data() });
        });
        // console.log(recipeObj, "recipeObj");
        await dispatch(RecipeActions.allRecipeListner(recipeObj));
        setRecipesRedux(recipeObj);
      });

    return () => {
      addedRecipeListner();
    };
  }, []);

  const getRecipes = useCallback(async () => {
    await dispatch(RecipeActions.getRecipes());
    console.log("Running");
  }, [dispatch]);

  console.log("COMPONENT", recipesRedux.length);

  const homeHeaderComp = () => (
    <>
      <TitleContainer>
        <ScreenTitle>Sansa's Kitchen</ScreenTitle>
      </TitleContainer>
      <SubtitleContainer>
        <Subtitle>Trending</Subtitle>
      </SubtitleContainer>
      <FlatList
        data={recipesRedux}
        keyExtractor={item => item.rID}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <TrendingBox recipe={item} navigation={navigation} />
        )}
      />
      <SubtitleContainer>
        <Subtitle>Today's Specials</Subtitle>
      </SubtitleContainer>
    </>
  );

  return (
    <Container
      style={{
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight + 40 : 0
      }}
    >
      {recipesRedux.length > 0 ? (
        <FlatList
          data={recipesRedux}
          keyExtractor={item => item.rID}
          ListHeaderComponent={homeHeaderComp}
          showsVerticalScrollIndicator={true}
          renderItem={({ item }) => (
            <SpecialsCard
              recipe={item}
              title={item.title}
              description={item.desc}
              splImg={item.image}
              navigation={navigation}
            />
          )}
        />
      ) : null}
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
  width: 100%;
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
