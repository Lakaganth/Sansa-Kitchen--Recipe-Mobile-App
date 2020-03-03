import {
  SIGNIN_USER,
  OPEN_LOGIN_MODAL,
  CLOSE_LOGIN_MODAL,
  SIGNOUT_USER,
  OPEN_REGISTER_MODAL,
  CLOSE_REGISTER_MODAL,
  REGISTER_USER
} from "../actions/authActions";

const initialState = {
  user: "",
  openLoginModal: false,
  openRegisterModal: false,
  errorMessage: ""
};

export default (state = { initialState }, action) => {
  switch (action.type) {
    case SIGNIN_USER:
      return { ...state, user: action.user };
    case REGISTER_USER:
      return { ...state, user: action.user };
    case SIGNOUT_USER:
      return { ...state, user: "" };
    case OPEN_LOGIN_MODAL:
      return { ...state, openLoginModal: true };
    case CLOSE_LOGIN_MODAL:
      return { ...state, openLoginModal: false };
    case OPEN_REGISTER_MODAL:
      return { ...state, openRegisterModal: true };
    case CLOSE_REGISTER_MODAL:
      return { ...state, openRegisterModal: false };
    default:
      return state;
  }
};
