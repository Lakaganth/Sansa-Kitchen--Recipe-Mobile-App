import React, { useState, useEffect, useCallback } from "react";

import styled from "styled-components";
import { Picker, KeyboardAvoidingView, FlatList } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import SpecialsCard from "../components/SpecialsCard";
import * as RecipeActions from "../../store/actions/recipeActions";

const AllRecipeScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const recipes = useSelector(state => state.recipe.recipes);
  const [sortType, setSortType] = useState("desc");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    getRecipes();
  }, [dispatch, sortType]);

  const getRecipes = useCallback(async () => {
    await dispatch(RecipeActions.getRecipes(sortType));
  }, [dispatch, sortType]);

  const headerAllrecipeComponent = () => {
    return (
      <>
        <SortContainer>
          <SortTitle>Sort</SortTitle>
          <SortDropDownContainer>
            <Picker
              selectedValue={sortType}
              style={{ height: 50, width: 120 }}
              onValueChange={(itemValue, itemIndex) => setSortType(itemValue)}
            >
              <Picker.Item label="Recent" value="desc" />
              <Picker.Item label="Old First" value="asc" />
              {/* <Picker.Item label="A-Z" value="alpha" /> */}
            </Picker>
          </SortDropDownContainer>
        </SortContainer>
      </>
    );
  };

  return (
    <Container>
      <ScreenTitle>All Recipes</ScreenTitle>
      <SearchBarContainer>
        <KeyboardAvoidingView
          behavior="padding"
          enabled
          keyboardVerticalOffset={100}
        >
          <SearchInput
            placeholder="Find recipes..."
            onChangeText={term => setSearchTerm(term)}
            value={searchTerm}
            keyboardType="default"
          />
        </KeyboardAvoidingView>
      </SearchBarContainer>
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

const SearchBarContainer = styled.View`
  width: 80%;
  height: 50px;
  border: 1px solid #dddddd;
  align-self: center;
  justify-content: center;
  padding-left: 20px;
  margin: 20px 0;
`;
const SearchInput = styled.TextInput`
  font-weight: 200;
  font-size: 16px;
  line-height: 27px;
`;
