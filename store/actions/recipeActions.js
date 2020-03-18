import firebase from "./../../config";

export const ADD_CATEGORY = "ADD_CATEGORY";
export const GET_CATEGORIES = "GET_CATEGORIES";
export const REMOVE_CATEGORY = "REMOVE_CATEGORY";
export const ADD_RECIPE = "ADD_RECIPE";
export const GET_RECIPES = "GET_RECIPES";
export const REMOVE_RECIPE = "REMOVE_RECIPE";
export const EDIT_RECIPE = "EDIT_RECIPE";
export const RECIPE_LISITNER = "RECIPE_LISITNER";
export const ALL_RECIPE_LISITNER = "ALL_RECIPE_LISITNER";
export const ERROR = "ERROR";

export const addCategory = (name, imageURL) => {
  return async dispatch => {
    try {
      const category = { catName: name, catImg: imageURL };

      const res = await firebase
        .firestore()
        .collection("categories")
        .add({ ...category });

      return dispatch({ type: ADD_CATEGORY, category });
    } catch (err) {
      return dispatch({ type: ERROR, err });
    }
  };
};
export const getCategories = () => {
  return async dispatch => {
    try {
      const res = await firebase
        .firestore()
        .collection("categories")
        .orderBy("catName", "asc")
        .get();
      const categories = [];
      await res.forEach(doc => categories.push({ cID: doc.id, ...doc.data() }));
      return dispatch({ type: GET_CATEGORIES, categories });
    } catch (err) {
      return dispatch({ type: ERROR, err });
    }
  };
};

export const addRecipe = recipe => {
  return async dispatch => {
    try {
      const res = await firebase
        .firestore()
        .collection("allRecipes")
        .add({ ...recipe });

      console.log(res.id);

      let rec = { rID: res.id, ...recipe };
      return dispatch({ type: ADD_RECIPE });
    } catch (err) {
      return dispatch({ type: ERROR, err });
    }
  };
};

export const getRecipes = (order = "desc") => {
  return async dispatch => {
    try {
      const res = await firebase
        .firestore()
        .collection("allRecipes")
        .orderBy("createdAt", order)
        .get();
      let recipes = [];

      await res.forEach(doc => recipes.push({ rID: doc.id, ...doc.data() }));
      return dispatch({ type: GET_RECIPES, recipes });
    } catch (err) {
      return dispatch({ type: ERROR, err });
    }
  };
};

export const addFavouritedBy = (userID, rID) => {
  return async dispatch => {
    try {
      const res = await firebase
        .firestore()
        .collection("allRecipes")
        .doc(rID)
        .get();

      const favArr = res.data().favouritedBy;

      if (!favArr.includes(userID)) {
        favArr.push(userID);
        await firebase
          .firestore()
          .collection("allRecipes")
          .doc(rID)
          .set({ favouritedBy: favArr }, { merge: true });
      } else {
        const index = favArr.indexOf(userID);
        favArr.splice(index, 1);

        await firebase
          .firestore()
          .collection("allRecipes")
          .doc(rID)
          .set({ favouritedBy: favArr }, { merge: true });
      }
    } catch (err) {
      return dispatch({ type: ERROR, err });
    }
  };
};

export const recipeListner = (obj, currentUser) => {
  return async dispatch => {
    let fav = [];

    obj.filter(all => {
      if (all.favouritedBy.includes(currentUser.id)) {
        fav.push(all);
      }
    });

    const recListner = {
      recipies: obj,
      favourites: fav
    };

    return dispatch({ type: RECIPE_LISITNER, recListner: recListner });
  };
};
export const allRecipeListner = obj => {
  return async dispatch => {
    return dispatch({ type: ALL_RECIPE_LISITNER, recListner: obj });
  };
};
