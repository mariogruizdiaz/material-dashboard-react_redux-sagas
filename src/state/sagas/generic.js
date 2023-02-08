/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import { select, put, takeLatest, delay, takeEvery } from "redux-saga/effects";
import { generic } from "../backend";
import { actionTypes } from "../actions";

function* genericQuery(action) {
  const command = yield generic(action);
  try {
    const result = yield command.resolver(action);
    if (result && result[command.endpointName].data) {
      yield put(command.onSuccess({ data: result[command.endpointName].data }));
    } else {
      yield put(
        command.onUnsuccess({ errors: command.unsuccessMessage, inputParameters: action.payload })
      );
    }
  } catch (e) {
    console.log(e);
    yield put(
      command.onFailure({ errors: command.failureMessage, inputParameters: action.payload })
    );
  }
}

function* genericMutation(action) {
  const command = yield generic(action);
  try {
    console.log(action, command);
    const result = yield command.resolver(action);
    if (result && result[command.endpointName]?.success) {
      yield put(command.onSuccess({ data: result[command.endpointName].data }));
    } else {
      yield put(command.onUnsuccess({ errors: result[command.endpointName].data }));
    }
  } catch (e) {
    console.log(e);
    yield put(command.onFailure({ errors: command.failureMessage }));
  }
}

export default function* security() {
  yield takeLatest(actionTypes.SIGN_IN, genericMutation);
}
