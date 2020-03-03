import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {
  Platform,
  StatusBar,
  TouchableNativeFeedback,
  ScrollView,
  Picker,
  Dimensions
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import firebase from "../../config";

import { useSelector, useDispatch } from "react-redux";
import IngredientsModal from "../components/inputs/IngredientsModal";
import * as InputActions from "../../store/actions/inputAction";
import * as RecipeActions from "../../store/actions/recipeActions";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import InstructionsModal from "../components/inputs/InstructionsModal";

const screenWidth = Dimensions.get("window").width;

const AddRecipeScreen = () => {
  const dispatch = useDispatch();
  const modalIngredientsState = useSelector(
    state => state.input.openIngredientModal
  );
  const modalInstructionState = useSelector(
    state => state.input.openInstructionModal
  );

  const cat = useSelector(state => state.recipe.categories);
  const currentUser = useSelector(state => state.user.currentUser);

  const [category, setCategory] = useState(cat.map(c => c.data.catName));
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [catObj, setCatObj] = useState();
  const ingredients = useSelector(state => state.input.ingredients);
  const instructions = useSelector(state => state.input.instructions);

  const [rName, setRName] = useState("");
  const [desc, setDesc] = useState("");
  const [duration, setDuration] = useState("");
  const [imgURL, setImgURL] = useState("");

  // console.log("selectedCategory", selectedCategory);

  useEffect(() => {
    getCategories();
  }, [dispatch]);

  const getCategories = async () => {
    await dispatch(RecipeActions.getCategories());
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    });

    const img = result.uri;

    const imgName = img.split("/").pop();
    const response = await fetch(img);
    const blob = await response.blob();
    const res = firebase
      .storage()
      .ref()
      .child(`images/recipe/submissions/` + imgName);
    await res.put(blob);
    const url = await res.getDownloadURL();
    await setImgURL(url);
  };

  const openModal = async () => {
    await dispatch(InputActions.openIngredientsModal());
  };
  const openInstructionModal = async () => {
    await dispatch(InputActions.openInstructionModal());
  };

  const removeIngredient = async index => {
    await dispatch(InputActions.removeIngredient(index));
  };
  const removeInstruction = async index => {
    await dispatch(InputActions.removeInstruction(index));
  };

  const setCatFunc = async value => {
    await setCategory(value);
    await setSelectedCategory(value);
  };

  const handleAddRecipe = async () => {
    console.log("selectedCategory", selectedCategory);
    const filteredCatArr = cat.filter(c => c.cID == selectedCategory);
    // console.log("selectedCategory", filteredCatArr[0]);
    await setCatObj(filteredCatArr[0]);
    // console.log("catObj", catObj);

    const recipe = {
      title: rName,
      desc: desc,
      categoryRecipe: filteredCatArr[0],
      ingredients,
      instructions,
      image: imgURL,
      ownerID: currentUser.id,
      favouritedBy: []
    };

    await dispatch(RecipeActions.addRecipe(recipe));
    console.log("Uploaded");
  };

  return (
    <Container>
      {modalIngredientsState ? <IngredientsModal /> : null}
      {modalInstructionState ? <InstructionsModal /> : null}
      <ScrollView>
        <ScreenTitle>Add New Recipe</ScreenTitle>
        <FormContainer>
          <TextInput
            onChangeText={name => setRName(name)}
            placeholder="Recipe Name"
            keyboardType="default"
          />
          <TextInput
            onChangeText={description => setDesc(description)}
            placeholder="Description"
            keyboardType="default"
          />
          <PickerContainer>
            <Picker
              selectedValue={category}
              itemStyle={{ paddingLeft: 40 }}
              style={{ height: 50, width: "100%", paddingLeft: 40 }}
              onValueChange={setCatFunc}
            >
              {cat
                ? cat.map(c => (
                    <Picker.Item
                      key={c.cID}
                      label={c.data.catName}
                      value={c.cID}
                    />
                  ))
                : null}
            </Picker>
          </PickerContainer>
          <TouchableNativeFeedback onPress={openModal}>
            <AddContainer>
              <FormTitle> Add Ingredients</FormTitle>
              <Ionicons name="md-add-circle" size={32} />
            </AddContainer>
          </TouchableNativeFeedback>

          {ingredients
            ? ingredients.map((ing, index) => (
                <IngContainer key={index}>
                  <IngTextContainer>
                    <IngName>{ing.ingredientName}</IngName>
                    <IngQuantity>{ing.ingredientQuantity}</IngQuantity>
                  </IngTextContainer>
                  <TouchableNativeFeedback
                    onPress={() => removeIngredient(index)}
                  >
                    <Ionicons
                      name="ios-close-circle"
                      size={32}
                      color="red"
                      style={{ width: "20%", paddingLeft: 30, opacity: 0.5 }}
                    />
                  </TouchableNativeFeedback>
                </IngContainer>
              ))
            : null}
          <TouchableNativeFeedback onPress={openInstructionModal}>
            <AddContainer>
              <FormTitle> Add Instructions</FormTitle>
              <Ionicons name="md-add-circle" size={32} />
            </AddContainer>
          </TouchableNativeFeedback>
          {instructions
            ? instructions.map((ins, index) => (
                <IngContainer key={index}>
                  <InsTextContainer>
                    <InsName>{ins}</InsName>
                  </InsTextContainer>
                  <TouchableNativeFeedback
                    onPress={() => removeInstruction(index)}
                  >
                    <Ionicons
                      name="ios-close-circle"
                      size={32}
                      color="red"
                      style={{ width: "20%", paddingLeft: 30, opacity: 0.5 }}
                    />
                  </TouchableNativeFeedback>
                </IngContainer>
              ))
            : null}

          <ImageContainer>
            <TouchableNativeFeedback onPress={pickImage}>
              {imgURL ? (
                <Image source={{ uri: imgURL }} />
              ) : (
                <MaterialCommunityIcons
                  name="image-plus"
                  size={32}
                  style={{ alignSelf: "center", marginTop: 80 }}
                />
              )}
            </TouchableNativeFeedback>
          </ImageContainer>
          <TouchableNativeFeedback onPress={handleAddRecipe}>
            <Button>
              <ButtonText>Add</ButtonText>
            </Button>
          </TouchableNativeFeedback>
        </FormContainer>
      </ScrollView>
    </Container>
  );
};

export default AddRecipeScreen;

const Container = styled.SafeAreaView`
  background-color: #ffffff;
  flex: 1;
  padding-top: ${Platform.OS === "android"
    ? StatusBar.currentHeight + 20
    : 0}px;
  z-index: 0;

  /* align-items: center; */
  width: ${screenWidth}px;
`;

const ScreenTitle = styled.Text`
  width: 100%;
  font-weight: 500;
  font-size: 24px;
  color: #f56565;
  line-height: 29px;
  text-align: center;
`;

const FormContainer = styled.View`
  padding-left: 20px;
  margin-top: 25px;
  width: 100%;
`;

const TextContainer = styled.View`
  position: relative;
  width: 80%;
`;

const TextInput = styled.TextInput`
  border: 1px solid #dbdfea;
  width: 90%;
  height: 44px;
  border-radius: 10px;
  font-size: 17px;
  color: #3c4560;
  margin-top: 20px;
  padding-left: 44px;
`;

const PickerContainer = styled.View`
  width: 90%;
  height: 44px;
  border-radius: 10px;
  border: 1px solid #dbdfea;
  margin-top: 20px;
`;
const AddContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 15px;
`;

const FormTitle = styled.Text`
  width: 60%;
  font-weight: 500;
  font-size: 24px;
  color: #f56565;
  line-height: 29px;
  text-align: left;
`;

const IngContainer = styled.View`
  flex-direction: row;
  margin-top: 20px;
  align-items: center;
`;

const IngTextContainer = styled.View`
  flex-direction: row;
  border: 1px solid #dbdfea;
  /* width: 250px; */
  width: 80%;
  height: 60px;
  border-radius: 10px;
  align-items: center;
`;
const IngName = styled.Text`
  text-transform: capitalize;
  width: 70%;
  font-weight: 500;
  font-size: 22px;
  text-align: center;
`;
const IngQuantity = styled.Text`
  text-transform: capitalize;
  width: 30%;
  font-weight: 500;
  font-size: 16px;
  text-align: center;
  color: #3c4560;
`;

const InsName = styled.Text`
  text-transform: capitalize;
  width: 70%;
  font-weight: 500;
  font-size: 22px;
  text-align: center;
`;
const InsTextContainer = styled.View`
  flex-direction: row;
  border: 1px solid #dbdfea;
  width: 80%;
  min-height: 60px;
  border-radius: 10px;
  align-items: center;
`;

const Button = styled.View`
  background: #5263ff;
  width: 150px;
  height: 50px;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  box-shadow: 0 10px 20px #c2cbff;
  margin-top: 20px;
`;

const ButtonText = styled.Text`
  color: white;
  font-weight: 600;
  font-size: 20px;
  text-transform: uppercase;
`;

const ImageContainer = styled.View`
  width: 200px;
  height: 200px;
  margin: 20px 0;
  border-radius: 20px;
  background-color: grey;
  overflow: hidden;
`;

const Image = styled.Image`
  width: 100%;
  height: 100%;
  border-radius: 20px;
`;
