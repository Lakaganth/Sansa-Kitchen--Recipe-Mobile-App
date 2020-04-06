import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import * as InputActions from "../../../store/actions/inputAction";
import * as RecipeActions from "../../../store/actions/recipeActions";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import IngredientsModal from "./IngredientsModal";
import InstructionsModal from "./InstructionsModal";
import {
  Platform,
  StatusBar,
  TouchableNativeFeedback,
  ScrollView,
  Picker,
  Dimensions,
} from "react-native";

const screenWidth = Dimensions.get("window").width;

const EditRecipe = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const recipes = useSelector((state) => state.recipe.recipes);
  const ingredients = useSelector((state) => state.input.ingredients);
  const instructions = useSelector((state) => state.input.instructions);
  const [loading, setLoading] = useState(false);
  const modalIngredientsState = useSelector(
    (state) => state.input.openIngredientModal
  );
  const modalInstructionState = useSelector(
    (state) => state.input.openInstructionModal
  );

  const selectedID = route.params.rID;
  const selectedRecipeArr = recipes.filter((r) => r.rID == selectedID);
  const selectedRecipe = selectedRecipeArr[0];

  const [title, setTitle] = useState(selectedRecipe.title);
  const [desc, setDesc] = useState(selectedRecipe.desc);

  const openModal = async () => {
    await dispatch(InputActions.openIngredientsModal());
  };
  const openInstructionModal = async () => {
    await dispatch(InputActions.openInstructionModal());
  };

  const removeIngredient = async (index) => {
    await dispatch(InputActions.removeIngredient(index));
  };

  useEffect(() => {
    getRecipes();
    setIngredients();
    setInstructions();
  }, [dispatch]);

  const getRecipes = useCallback(async () => {
    await dispatch(RecipeActions.getRecipes());
  }, [dispatch]);

  const setIngredients = async () => {
    await dispatch(InputActions.setIngredients(selectedRecipe.ingredients));
  };
  const setInstructions = async () => {
    await dispatch(InputActions.setInstructions(selectedRecipe.instructions));
  };

  console.log(selectedRecipe);

  const handleEditRecipe = async () => {
    setLoading(true);
    const editedRecipe = {
      title,
      desc,
      ingredients,
      instructions,
      createdAt: new Date(),
      ownerID: selectedRecipe.ownerID,
      image: selectedRecipe.image,
      favouritedBy: selectedRecipe.favouritedBy,
      categoryRecipe: selectedRecipe.categoryRecipe,
    };

    await dispatch(RecipeActions.editRecipe(selectedID, editedRecipe));
    navigation.goBack();
  };

  return (
    <Container>
      {modalIngredientsState ? <IngredientsModal /> : null}
      {modalInstructionState ? <InstructionsModal /> : null}
      <ScrollView>
        <ScreenTitle>Edit </ScreenTitle>
        <CloseIcon onPress={() => navigation.goBack()}>
          <Ionicons
            name="ios-close-circle-outline"
            size={32}
            color="rgba(0, 0, 0, 0.4)"
          />
        </CloseIcon>
        <FormContainer>
          <TextInput
            value={title}
            onChangeText={(name) => setTitle(name)}
            placeholder="Recipe Name"
            keyboardType="default"
          />
          <TextInput
            value={desc}
            onChangeText={(description) => setDesc(description)}
            placeholder="Description"
            keyboardType="default"
          />
          <TouchableNativeFeedback onPress={openModal}>
            <AddContainer>
              <FormTitle> Edit Ingredients</FormTitle>
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
          <Button
            onPress={handleEditRecipe}
            // rName={rName}
            // imgSelected={imgSelected}
            // categoryRec={categoryRec}
            // disabled={
            //   rName == "" || imgSelected == false || categoryRec == false
            //     ? true
            //     : false
            // }
          >
            <ButtonText>Add</ButtonText>
          </Button>
        </FormContainer>
      </ScrollView>
    </Container>
  );
};

export default EditRecipe;

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

const FormContainer = styled.View`
  padding-left: 20px;
  margin-top: 25px;
  width: 100%;
  margin-bottom: 20px;
`;

const ScreenTitle = styled.Text`
  font-weight: 500;
  font-size: 24px;
  color: #f56565;
  width: 100%;
  text-align: center;
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

const Button = styled.TouchableOpacity`
  background: #5263ff;
  width: 150px;
  height: 50px;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  box-shadow: 0 10px 20px #c2cbff;
  margin: 0 ${screenWidth / 4}px;
  margin-top: 30px;
  margin-bottom: 30px;
  /* background: ${({ rName, imgSelected, categoryRec }) => {
    if (rName == "" || imgSelected == false || categoryRec == false) {
      return "gray";
    } else {
      return " #5263ff";
    }
  }}; */
`;

const ButtonText = styled.Text`
  color: white;
  font-weight: 600;
  font-size: 20px;
  text-transform: uppercase;
  width: 100%;
  text-align: center;
`;

const CloseIcon = styled.TouchableOpacity`
  position: absolute;
  top: 10px;
  right: 10px;
`;
