import React, { useState, useEffect, useCallback } from "react";

import styled from "styled-components";
import { Picker, ScrollView, FlatList } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import SpecialsCard from "../components/SpecialsCard";
import * as RecipeActions from "../../store/actions/recipeActions";

const AllRecipeScreen = ({ navigation }) => {
  const recipes = useSelector(state => state.recipe.recipes);
  const dispatch = useDispatch();

  useEffect(() => {
    getRecipes();
  }, [dispatch]);

  const getRecipes = useCallback(async () => {
    await dispatch(RecipeActions.getRecipes());
  });

  const [sortType, setSortType] = useState("Recent");

  const headerAllrecipeComponent = () => {
    return (
      <>
        <ScreenTitle>All Recipes</ScreenTitle>
        <SortContainer>
          <SortTitle>Sort</SortTitle>
          <SortDropDownContainer>
            <Picker
              selectedValue={sortType}
              style={{ height: 50, width: 120 }}
              onValueChange={(itemValue, itemIndex) => setSortType(itemValue)}
            >
              <Picker.Item label="Recent" value="recent" />
              <Picker.Item label="Old First" value="old" />
              <Picker.Item label="A-Z" value="alpha" />
            </Picker>
          </SortDropDownContainer>
        </SortContainer>
      </>
    );
  };

  return (
    <Container>
      <FlatListContainer>
        <FlatList
          data={recipes}
          ListHeaderComponent={headerAllrecipeComponent}
          keyExtractor={item => item.rID}
          renderItem={({ item }) => {
            return (
              <SpecialsCard
                recipe={item}
                title={item.title}
                description={item.desc}
                splImg={item.image}
                navigation={navigation}
                setPaddings={true}
              />
            );
          }}
        />
      </FlatListContainer>
    </Container>
  );
};

export default AllRecipeScreen;

const Container = styled.SafeAreaView`
  background-color: #f7f7f7;
  flex: 1;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  padding-top: 10px;
`;

const ScreenTitle = styled.Text`
  width: 100%;
  font-weight: 500;
  font-size: 24px;
  color: #f56565;
  line-height: 29px;
  text-align: center;
`;
const SortContainer = styled.View`
  width: 100%;
  height: 30px;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 20px;
`;
const SortTitle = styled.Text`
  font-style: normal;
  font-weight: 900;
  font-size: 24px;
  line-height: 36px;
  color: #161c2b;
  padding-left: 20px;
`;

const SortDropDownContainer = styled.View`
  width: 120px;
`;

const FlatListContainer = styled.View`
  flex: 1;
  /* position: absolute; */
`;
