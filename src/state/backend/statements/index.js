import { actionTypes } from "state/actions";
import security from "./security";

export default {
  statementCollection: {
    [actionTypes.SIGN_IN]: security.authenthicate,
  },
};
