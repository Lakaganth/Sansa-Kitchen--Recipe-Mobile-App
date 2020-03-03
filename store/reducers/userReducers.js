import {
  GET_USER_DATA,
  GET_FAVOURITES,
  USER_LISITNER
} from "./../actions/userActions";

const initialState = {
  currentUser: "",
  userSubmittedRecipe: [],
  favourites: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_DATA:
      return { ...state, currentUser: action.userProfile };
    case GET_FAVOURITES:
      // const cUser = state.currentUser;
      // cUser.favourites = [...action.favourites];
      // console.log(cUser ? cUser.favourites : "Hello world", "cUSer");

      return { ...state, favourites: action.favourites };
    case USER_LISITNER:
      return { ...state, currentUser: action.currentUser };
    default:
      return state;
  }
};
