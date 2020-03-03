import firebase from "./../../config";

export const GET_USER_DATA = "GET_USER_DATA";
export const GET_FAVOURITES = "GET_FAVOURITES";
export const USER_LISITNER = "USER_LISITNER";
export const ERROR = "ERROR";

export const getUserData = userID => {
  return async dispatch => {
    try {
      const res = await firebase
        .firestore()
        .collection("users")
        .where("userID", "==", userID)
        .get();

      let userProfile;

      res.forEach(doc => {
        userProfile = { id: doc.id, ...doc.data() };
      });

      return dispatch({ type: GET_USER_DATA, userProfile: userProfile });
    } catch (err) {
      return dispatch({ type: ERROR, err });
    }
  };
};

export const getUserSubmittedRecipes = userID => {
  return async dispatch => {
    try {
      const res = await firebase
        .firestore()
        .collection("recipes")
        .where("ownerID", "==", userID)
        .get();
      const userRecipes = [];

      res.forEach(doc => userRecipes.push({ rID: doc.id, ...doc.data() }));
    } catch (err) {
      return dispatch({ type: ERROR, err });
    }
  };
};

export const addToFavourites = (rID, currentUser) => {
  return async dispatch => {
    try {
      if (!currentUser.favourites.includes(rID)) {
        console.log("Add to favorites Array");
        const getUser = await firebase
          .firestore()
          .collection("users")
          .doc(currentUser.id)
          .get();

        const userCurrentFavourites = getUser.data().favourites;
        userCurrentFavourites.push(rID);

        await firebase
          .firestore()
          .collection("users")
          .doc(currentUser.id)
          .set({ favourites: userCurrentFavourites }, { merge: true });
      } else {
        console.log("Remove from favorites Array");
        const getUser = await firebase
          .firestore()
          .collection("users")
          .doc(currentUser.id)
          .get();
        const userCurrentFavourites = getUser.data().favourites;
        const removedFavourites = userCurrentFavourites.filter(
          fav => fav !== rID
        );

        await firebase
          .firestore()
          .collection("users")
          .doc(currentUser.id)
          .set({ favourites: removedFavourites }, { merge: true });
      }
    } catch (err) {
      return dispatch({ type: ERROR, err });
    }
  };
};

export const getFavourites = userFav => {
  return async dispatch => {
    let favouriteArr = [];
    try {
      const recipeRef = await firebase.firestore().collection("recipes");
      // .doc(userFav[0])
      // .get();

      favouriteArr = await Promise.all(
        userFav.map(fav => recipeRef.doc(fav).get())
      );
      const res = favouriteArr.map(fav => {
        const obj = { rID: fav.id, ...fav.data() };
        return obj;
      });
      //   const res = favouriteArr.
      // .filter(doc => doc.exists)
      // .map(doc => ({ [doc.id]: doc.data() }))
      // .reduce((acc, val) => acc.push(...val), []);

      return dispatch({ type: GET_FAVOURITES, favourites: res });
    } catch (err) {
      return dispatch({ type: ERROR, err });
    }
  };
};

export const userLisitner = obj => {
  return async dispatch => {
    return dispatch({ type: USER_LISITNER, currentUser: obj });
  };
};

// export const addToFAvouritesSubCollection = (recipe) => {
//     return async dispatch =>{
//         try {

//         } catch (err) {

//         }
//     }
// }
