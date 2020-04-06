import React, { useState, useEffect, useCallback } from "react";

import styled from "styled-components";
import {
  Picker,
  KeyboardAvoidingView,
  FlatList,
  Dimensions,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import SpecialsCard from "../components/SpecialsCard";
import * as RecipeActions from "../../store/actions/recipeActions";
import SigninModal from "../components/inputs/SigninModal";
import LoginModal from "./../components/LoginModal";
import firebase from "../../config";

const { width, height } = Dimensions.get("window");

const AllRecipeScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const recipes = useSelector((state) => state.recipe.recipes);
  const loggedinUser = useSelector((state) => state.auth.user);
  const modalState = useSelector((state) => state.auth.openLoginModal);
  const user = useSelector((state) => state.user.currentUser);
  const [sortType, setSortType] = useState("desc");
  const [searchTerm, setSearchTerm] = useState("");
  const [recipesRedux, setRecipesRedux] = useState(recipes);

  const userRecipe = recipesRedux.filter((r) => r.ownerID == user.id);

  useEffect(() => {
    // StatusBar.setBarStyle("dark-content", true);
    getRecipes();
    // StatusBar.setHidden(true);
    const addedRecipeListner = firebase
      .firestore()
      .collection("allRecipes")
      .onSnapshot(async (querySnapshot) => {
        let recipeObj = [];
        querySnapshot.forEach(async (doc) => {
          recipeObj.push({ rID: doc.id, ...doc.data() });
        });
        await dispatch(RecipeActions.allRecipeListner(recipeObj));
        setRecipesRedux(recipeObj);
      });

    return () => {
      addedRecipeListner();
    };
  }, []);

  const getRecipes = useCallback(async () => {
    await dispatch(RecipeActions.getRecipes());
  }, [dispatch]);

  // useEffect(() => {
  //   getRecipes();
  // }, [dispatch, sortType]);

  // const getRecipes = useCallback(async () => {
  //   await dispatch(RecipeActions.getRecipes(sortType));
  // }, [dispatch, sortType]);

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
      {modalState ? <LoginModal /> : null}
      <ScreenTitle>Your Recipes</ScreenTitle>
      {/* <SearchBarContainer>
        <KeyboardAvoidingView
          behavior="padding"
          enabled
          keyboardVerticalOffset={100}
        >
          <SearchInput
            placeholder="Find recipes..."
            onChangeText={(term) => setSearchTerm(term)}
            value={searchTerm}
            keyboardType="default"
          />
        </KeyboardAvoidingView>
      </SearchBarContainer> */}
      <FlatListContainer>
        {loggedinUser ? (
          <>
            {userRecipe.length > 0 ? (
              <FlatList
                data={userRecipe}
                ListHeaderComponent={headerAllrecipeComponent}
                keyExtractor={(item) => item.rID}
                renderItem={({ item }) => {
                  return (
                    <SpecialsCard
                      recipe={item}
                      rID={item.rID}
                      title={item.title}
                      description={item.desc}
                      splImg={item.image}
                      navigation={navigation}
                      setPaddings={true}
                    />
                  );
                }}
              />
            ) : (
              <PrompContainer>
                <Prompt>Add Your Recipes</Prompt>
              </PrompContainer>
            )}
          </>
        ) : (
          <PrompContainer>
            <Prompt>Log in to see your Recipe Submissions</Prompt>
            <SigninModal />
          </PrompContainer>
        )}
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

const Prompt = styled.Text`
  font-style: normal;
  font-weight: 900;
  font-size: 24px;
  line-height: 36px;
  text-align: center;
  color: #161c2b;
  padding: 25px 0;
`;
const PrompContainer = styled.View`
  width: 60%;
  margin: ${height / 6}px auto;
  align-items: center;
`;
