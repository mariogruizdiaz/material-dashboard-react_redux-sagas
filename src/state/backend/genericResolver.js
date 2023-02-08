import { request } from "graphql-request";
import statements from "./statements";

const executeCommand = async (endpoint, mutation, variables) =>
  request(endpoint, mutation, variables)
    .then((data) => Promise.resolve(data))
    .catch((err) =>
      Promise.resolve(err.response.data || err.response.errors || err.response || err)
    );

// eslint-disable-next-line import/prefer-default-export
export const genericResolver = function* genericResolver(action) {
  try {
    const statement = statements.statementCollection[action.type];
    return yield executeCommand("https://localhost:5555", statement, action.payload);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(`Error excuting the command: ${JSON.stringify(action)}`);
    throw e;
  }
};
