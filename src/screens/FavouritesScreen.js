import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import { Picker, ScrollView } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import SpecialsCard from "./../components/SpecialsCard";
import * as UserActions from "../../store/actions/userActions";
import firebase from "./../../config";
import * as RecipeActions from "../../store/actions/recipeActions";
import { FlatList } from "react-native";

const FavouritesScreen = ({ navigation }) => {
  const [sortType, setSortType] = useState("Recent");
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.user.currentUser);

  const favouriteRedux = useSelector(state => state.recipe.favourites);

  let fav = [];

  useEffect(() => {
    // getFavourites();
    getRecipes();

    const favouriteUserListner = firebase
      .firestore()
      .collection("users")
      .onSnapshot(async querySnapshot => {
        let userObj;
        querySnapshot.forEach(async doc => {
          if (doc.id === currentUser.id) {
            userObj = { id: doc.id, ...doc.data() };
          }
        });
        await dispatch(UserActions.userLisitner(userObj));
        // await dispatch(UserActions.getFavourites(userFavourites));
      });

    const favouriteRecipeListner = firebase
      .firestore()
      .collection("allRecipes")
      .onSnapshot(async querySnapshot => {
        let recipeObj = [];

        querySnapshot.forEach(async doc => {
          recipeObj.push({ rID: doc.id, ...doc.data() });
        });

        await dispatch(RecipeActions.recipeListner(recipeObj, currentUser));
      });

    return () => {
      favouriteUserListner();
      favouriteRecipeListner();
    };
  }, [dispatch]);

  const getRecipes = useCallback(async () => {
    await dispatch(RecipeActions.getRecipes());
    console.log("HOW");
  }, [dispatch]);

  // const getFavourites = useCallback(async () => {
  //   await dispatch(UserActions.getFavourites(userFavourites));
  // }, [dispatch]);

  // allRecipes.filter(all => {
  //   if (all.favouritedBy.includes(currentUser.id)) {
  //     fav.push(all);
  //   }
  // });

  const headComponent = () => {
    return (
      <>
        <ScreenTitle>Favourite Recipe</ScreenTitle>
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
      <FavourtitesContainer>
        {/* {favouriteRedux.length > 0
            ? favouriteRedux.map(r => (
                <SpecialsCard
                  key={r.rID}
                  recipe={r}
                  title={r.title}
                  description={r.desc}
                  splImg={r.image}
                  navigation={navigation}
                />
              ))
            : null} */}
        {favouriteRedux.length > 0 ? (
          <FlatList
            data={favouriteRedux}
            keyExtractor={item => item.rID}
            ListHeaderComponent={headComponent}
            renderItem={({ item }) => (
              <SpecialsCard
                recipe={item}
                title={item.title}
                description={item.desc}
                splImg={item.image}
                favouriteScreen={true}
                navigation={navigation}
              />
            )}
          />
        ) : null}
      </FavourtitesContainer>
    </Container>
  );
};

export default FavouritesScreen;

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
  /* margin-top: 20px; */
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

const FavourtitesContainer = styled.View`
  /* width: 100%; */
  flex: 1;
`;

const sortType = [
  {
    value: "Recent"
  },
  {
    value: "First"
  },
  {
    value: "New"
  }
];
