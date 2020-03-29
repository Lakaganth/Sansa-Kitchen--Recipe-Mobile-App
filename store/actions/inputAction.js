export const OPEN_INGREDIENTS_MODAL = "OPEN_INGREDIENTS_MODAL";
export const CLOSE_INGREDIENTS_MODAL = "CLOSE_INGREDIENTS_MODAL";
export const ADD_INGREDIENT = "ADD_INGREDIENT";
export const REMOVE_INGREDIENT = "REMOVE_INGREDIENT";
export const CLEAR_INGREDIENT = "CLEAR_INGREDIENT";
export const OPEN_INSTRUCTION_MODAL = "OPEN_INSTRUCTION_MODAL";
export const CLOSE_INSTRUCTION_MODAL = "CLOSE_INSTRUCTION_MODAL";
export const ADD_INSTRUCTION = "ADD_INSTRUCTION";
export const REMOVE_INSTRUCTION = "REMOVE_INSTRUCTION";
export const CLEAR_INSTRUCTION = "CLEAR_INSTRUCTION";
export const OPEN_CATEGORY_MODAL = "OPEN_CATEGORY_MODAL";
export const CLOSE_CATEGORY_MODAL = "CLOSE_CATEGORY_MODAL";
export const SET_IMAGE_URL = "SET_IMAGE_URL";
export const ERROR = "ERROR";

export const openIngredientsModal = () => {
  return async dispatch => {
    return dispatch({ type: OPEN_INGREDIENTS_MODAL });
  };
};
export const closeIngredientsModal = () => {
  return async dispatch => {
    return dispatch({ type: CLOSE_INGREDIENTS_MODAL });
  };
};
export const openInstructionModal = () => {
  return async dispatch => {
    return dispatch({ type: OPEN_INSTRUCTION_MODAL });
  };
};
export const closeInstructionModal = () => {
  return async dispatch => {
    return dispatch({ type: CLOSE_INSTRUCTION_MODAL });
  };
};

export const addIngredient = (ingName, ingQuantity) => {
  return async dispatch => {
    try {
      const ingredient = {
        ingredientName: ingName,
        ingredientQuantity: ingQuantity
      };

      return dispatch({ type: ADD_INGREDIENT, ingredient });
    } catch (err) {
      return dispatch({ type: ERROR, err });
    }
  };
};
export const removeIngredient = index => {
  return async dispatch => {
    try {
      return dispatch({ type: REMOVE_INGREDIENT, index });
    } catch (err) {
      return dispatch({ type: ERROR, err });
    }
  };
};
export const addInstruction = instruction => {
  return async dispatch => {
    try {
      return dispatch({ type: ADD_INSTRUCTION, instruction });
    } catch (err) {
      return dispatch({ type: ERROR, err });
    }
  };
};
export const removeInstruction = index => {
  return async dispatch => {
    try {
      return dispatch({ type: REMOVE_INSTRUCTION, index });
    } catch (err) {
      return dispatch({ type: ERROR, err });
    }
  };
};

export const openCategoryModal = () => {
  return async dispatch => {
    return dispatch({ type: OPEN_CATEGORY_MODAL });
  };
};
export const closeCategoryModal = () => {
  return async dispatch => {
    return dispatch({ type: CLOSE_CATEGORY_MODAL });
  };
};

export const clearIngredientsArray = () => {
  return async dispatch => {
    return dispatch({ type: CLEAR_INGREDIENT });
  };
};
export const clearInstructionsArray = () => {
  return async dispatch => {
    return dispatch({ type: CLEAR_INSTRUCTION });
  };
};

export const setCameraURL = url => {
  return async dispatch => {
    return dispatch({ type: SET_IMAGE_URL, url });
  };
};
