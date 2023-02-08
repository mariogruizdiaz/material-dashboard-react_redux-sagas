import { actionTypes } from "../actions";

const authenticationStatus = {
  NON_AUTHENTICATED: "NON_AUTHENTICATED",
  AUTHENTICATING: "AUTHENTICATING",
  AUTHINTIUCATED: "AUTHINTIUCATED",
  FAILED: "FAILED",
};

const initialSate = {
  firstName: null,
  lastName: null,
  email: null,
  picture: null,
  authenticationStatus: authenticationStatus.NON_AUTHENTICATED,
};

export default (state = initialSate, action) => {
  switch (action.type) {
    case actionTypes.SIGN_IN: {
      return {
        ...state,
        authenticationStatus: authenticationStatus.AUTHENTICATING,
      };
    }
    case actionTypes.SIGN_IN_SUCCESS: {
      return {
        ...state,
        authenticationStatus: authenticationStatus.AUTHINTIUCATED,
        firstName: action.payload.data.firstName,
        lastName: action.payload.data.lastName,
        email: action.payload.data.email,
        picture: action.payload.data.picture,
      };
    }
    case actionTypes.SIGN_IN_UNSUCCESS:
    case actionTypes.SIGN_IN_FAIL: {
      return {
        ...state,
        authenticationStatus: authenticationStatus.FAILED,
      };
    }

    default:
      return state;
  }
};
