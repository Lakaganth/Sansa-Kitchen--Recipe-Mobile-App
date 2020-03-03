import firebase from "./../../config";

export const REGISTER_USER = "REGISTER_USER";
export const SET_REGISTER_USER = "SET_REGISTER_USER";
export const SIGNIN_USER = "SIGNIN_USER";
export const SIGNOUT_USER = "SIGNOUT_USER";
export const SET_EDIT_USER = "SET_EDIT_USER";
export const OPEN_LOGIN_MODAL = "OPEN_LOGIN_MODAL";
export const CLOSE_LOGIN_MODAL = "CLOSE_LOGIN_MODAL";
export const OPEN_REGISTER_MODAL = "OPEN_REGISTER_MODAL";
export const CLOSE_REGISTER_MODAL = "CLOSE_REGISTER_MODAL";
export const ERROR = "ERROR";

// export const registerNewUser = (newUser) =>{
// return async dispatch => {
//     try {

//     } catch (err) {

//     }
// }

// }
export const signinUser = (email, password) => {
  return async dispatch => {
    try {
      const user = await firebase
        .auth()
        .signInWithEmailAndPassword(email, password);

      const getUserCollection = await firebase
        .firestore()
        .collection("users")
        .get();

      let currentUser;

      getUserCollection.forEach(doc => {
        const data = doc.data();
        if (user.user.uid == data.userID) {
          currentUser = data;
        }
      });

      return dispatch({ type: SIGNIN_USER, user: currentUser });
    } catch (err) {
      return dispatch({ type: ERROR, err });
    }
  };
};
export const registerUser = (email, password, name) => {
  return async dispatch => {
    try {
      const user = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);
      await user.user.updateProfile({
        displayName: name.trim()
      });

      const userProfile = {
        userName: user.user.displayName,
        email: user.user.email,
        photoURL: null,
        userID: user.user.uid,
        favourites: [],
        submittedRecipies: []
      };

      const addUser = await firebase
        .firestore()
        .collection("users")
        .add({ ...userProfile });

      return dispatch({ type: REGISTER_USER, user: addUser });
    } catch (err) {
      console.log(err);
      return dispatch({ type: ERROR, err });
    }
  };
};

export const signOutUser = () => {
  return async dispatch => {
    try {
      await firebase.auth().signOut();
      return dispatch({ type: SIGNOUT_USER });
    } catch (err) {
      return dispatch({ type: ERROR, err });
    }
  };
};

export const editUser = () => {};

export const openLoginModal = () => {
  return async dispatch => {
    return dispatch({ type: OPEN_LOGIN_MODAL });
  };
};
export const closeLoginModal = () => {
  return async dispatch => {
    return dispatch({ type: CLOSE_LOGIN_MODAL });
  };
};
export const openRegisterModal = () => {
  return async dispatch => {
    return dispatch({ type: OPEN_REGISTER_MODAL });
  };
};
export const closeRegisterModal = () => {
  return async dispatch => {
    return dispatch({ type: CLOSE_REGISTER_MODAL });
  };
};
