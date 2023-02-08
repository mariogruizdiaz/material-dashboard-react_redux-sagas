import { actionTypes } from "state/actions";
import { genericResolver } from "./genericResolver";

const endpointMapper = async (type) => {
  switch (type) {
    case actionTypes.SIGN_IN:
      return "authenticate";
    case actionTypes.VALIDATE_TOKEN:
      return "validateToken";
    default:
      return type;
  }
};

// eslint-disable-next-line import/prefer-default-export
export const generic = async (action) => ({
  resolver: genericResolver,
  endpointName: await endpointMapper(action.type),
  unsuccessMessage: "Something went wrong!",
  failureMessage: "Service not available right now!",
  onSuccess: (data) => ({
    type: `${action.type}_SUCCESS`,
    payload: data,
  }),
  onUnsuccess: (data) => ({
    type: `${action.type}_UNSUCCESS`,
    payload: data,
  }),
  onFailure: (data) => ({
    type: `${action.type}_FAIL`,
    payload: data,
  }),
});
