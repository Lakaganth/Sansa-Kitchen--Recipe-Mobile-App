import {
  OPEN_INGREDIENTS_MODAL,
  CLOSE_INGREDIENTS_MODAL,
  ADD_INGREDIENT,
  REMOVE_INGREDIENT,
  OPEN_INSTRUCTION_MODAL,
  CLOSE_INSTRUCTION_MODAL,
  ADD_INSTRUCTION,
  REMOVE_INSTRUCTION,
  OPEN_CATEGORY_MODAL,
  CLOSE_CATEGORY_MODAL,
  ERROR,
  CLEAR_INGREDIENT,
  CLEAR_INSTRUCTION,
  SET_IMAGE_URL,
  SET_INGREDIENT,
  SET_INSTRUCTIONS,
} from "../actions/inputAction";

const initialState = {
  openIngredientModal: false,
  openInstructionModal: false,
  openCategoryModal: false,
  ingredients: [],
  instructions: [],
  cameraURL: "",
};

export default (state = initialState, action) => {
  switch (action.type) {
    case OPEN_INGREDIENTS_MODAL:
      return { ...state, openIngredientModal: true };
    case OPEN_INSTRUCTION_MODAL:
      return { ...state, openInstructionModal: true };
    case CLOSE_INGREDIENTS_MODAL:
      return { ...state, openIngredientModal: false };
    case CLOSE_INSTRUCTION_MODAL:
      return { ...state, openInstructionModal: false };
    case ADD_INGREDIENT:
      const ingArr = [...state.ingredients];
      ingArr.push(action.ingredient);
      return { ...state, ingredients: ingArr };
    case REMOVE_INGREDIENT:
      state.ingredients.splice(action.index, 1);
      const removeArr = state.ingredients.filter((ing, i) => {
        return i !== action.index;
      });
      return {
        ...state,
        ingredients: removeArr,
      };
    case CLEAR_INGREDIENT:
      return { ...state, ingredients: [] };
    case ADD_INSTRUCTION:
      const insArr = [...state.instructions];
      insArr.push(action.instruction);
      return { ...state, instructions: insArr };
    case REMOVE_INSTRUCTION:
      state.instructions.splice(action.index, 1);
      const removeInsArr = state.instructions.filter((ing, i) => {
        return i !== action.index;
      });
      return {
        ...state,
        ingredients: removeInsArr,
      };
    case CLEAR_INSTRUCTION:
      return { ...state, instructions: [] };
    case OPEN_CATEGORY_MODAL:
      return { ...state, openCategoryModal: true };
    case CLOSE_CATEGORY_MODAL:
      return { ...state, openCategoryModal: false };
    case SET_IMAGE_URL:
      return { ...state, cameraURL: action.url };
    case SET_INGREDIENT:
      return { ...state, ingredients: action.existingIngredients };
    case SET_INSTRUCTIONS:
      return { ...state, instructions: action.existingInstructions };
    default:
      return state;
  }
};
