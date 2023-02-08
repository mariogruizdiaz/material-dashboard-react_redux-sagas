import { fork } from "redux-saga/effects";
import security from "./generic";

export default function* Saga() {
  yield fork(security);
}
