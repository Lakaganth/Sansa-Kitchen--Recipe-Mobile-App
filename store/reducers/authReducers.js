import {
  SIGNIN_USER,
  OPEN_LOGIN_MODAL,
  CLOSE_LOGIN_MODAL,
  SIGNOUT_USER,
  OPEN_REGISTER_MODAL,
  CLOSE_REGISTER_MODAL,
  REGISTER_USER,
  ERROR,
  CLEAR_ERROR,
} from "../actions/authActions";

const initialState = {
  user: "",
  loginSuccess: false,
  openLoginModal: false,
  openRegisterModal: false,
  errorMessage: "",
};

export default (state = { initialState }, action) => {
  switch (action.type) {
    case SIGNIN_USER:
      return {
        ...state,
        user: action.user,
        loginSuccess: true,
        openLoginModal: false,
        errorMessage: "",
      };
    case REGISTER_USER:
      return {
        ...state,
        user: action.user,
        loginSuccess: true,
        openRegisterModal: false,
        errorMessage: "",
      };
    case SIGNOUT_USER:
      return { ...state, user: "", loginSuccess: false };
    case OPEN_LOGIN_MODAL:
      return { ...state, openLoginModal: true };
    case CLOSE_LOGIN_MODAL:
      return { ...state, openLoginModal: false };
    case OPEN_REGISTER_MODAL:
      return { ...state, openRegisterModal: true };
    case CLOSE_REGISTER_MODAL:
      return { ...state, openRegisterModal: false };
    case ERROR:
      return { ...state, errorMessage: action.err };
    case CLEAR_ERROR:
      return { ...state, errorMessage: "" };
    default:
      return state;
  }
};
