import React, { useEffect } from "react";
import {
  Platform,
  StatusBar,
  Text,
  KeyboardAvoidingView,
  Dimensions,
  ScrollView,
  TouchableOpacity
} from "react-native";
import styled from "styled-components";
import CategoryBox from "../components/CategoryBox";
import { FlatList } from "react-native-gesture-handler";
import Constants from "expo-constants";
import { Ionicons } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import CategoriesModal from "../components/inputs/CategoriesModal";
import * as InputActions from "../../store/actions/inputAction";
import * as RecipeActions from "../../store/actions/recipeActions";
import { getCategories } from "../../store/actions/recipeActions";

const screenWidth = Dimensions.get("window").width;

let cardWidth = screenWidth - 40;
if (screenWidth >= 400) {
  cardWidth = (screenWidth - 60) / 2;
}

const CategoryScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const modalState = useSelector(state => state.input.openCategoryModal);
  const cat = useSelector(state => state.recipe.categories);

  // useEffect(() => {
  //   getCategories();
  // }, [dispatch]);

  // const getCategories = async () => {
  //   await dispatch(RecipeActions.getCategories());
  // };
  const openModal = async () => {
    await dispatch(InputActions.openCategoryModal());
  };

  return (
    <Container
      style={{
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight + 20 : 0
      }}
    >
      {modalState ? <CategoriesModal /> : null}
      <ScrollView showsVerticalScrollIndicator={true}>
        <ScreenTitle>Make Something Special?</ScreenTitle>
        <SearchBarContainer>
          <KeyboardAvoidingView
            behavior="padding"
            enabled
            keyboardVerticalOffset={100}
          >
            <SearchInput placeholder="Find recipes..." />
          </KeyboardAvoidingView>
        </SearchBarContainer>
        <Subtitle>Categories</Subtitle>
        <TouchableOpacity onPress={openModal}>
          <Ionicons name="md-add" size={32} style={{ paddingLeft: 20 }} />
        </TouchableOpacity>
        <CategoriesBoxContainer>
          {cat.map(item => (
            <CategoryBox
              key={item.cID}
              catID={item.cID}
              title={item.catName}
              img={item.catImg}
              navigation={navigation}
            />
          ))}
          {/* <FlatList
          data={categories}
          keyExtractor={(item, index) => index.toString()}
          numColumns={2}
          windowSize={10}
          contentContainerStyle={{}}
          renderItem={({ item }) => (
              <CategoryBox title={item.catName} img={item.catImage} />
              )}
            /> */}
        </CategoriesBoxContainer>
      </ScrollView>
    </Container>
  );
};

export default CategoryScreen;

const Container = styled.SafeAreaView`
  background-color: #f7f7f7;
  flex: 1;
`;

const ScreenTitle = styled.Text`
  width: 100%;
  font-weight: 500;
  font-size: 24px;
  color: #f56565;
  line-height: 29px;
  text-align: center;
`;
const Subtitle = styled.Text`
  font-style: normal;
  font-weight: 900;
  font-size: 24px;
  line-height: 36px;
  color: #161c2b;
  padding-left: 20px;
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

const CategoriesBoxContainer = styled.View`
  margin: 20px 0;
  /* padding: 0 20px; */
  /* flex: 1; */
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
`;
