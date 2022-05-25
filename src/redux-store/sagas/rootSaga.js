import { takeLatest, all } from "redux-saga/effects";
import getWorkouts from "./getWorkouts";
import getMarkedDates from "./getMarkedDates";
import getTemplates from "./getTemplates";
import getUserSettings from "./getUserSettings";

function* actionWatcher() {
  yield takeLatest("getWorkouts", getWorkouts);
  yield takeLatest("getMarkedDates", getMarkedDates);
  yield takeLatest("getTemplates", getTemplates);
  yield takeLatest("getUserSettings", getUserSettings);
}

export default function* rootSaga() {
  yield all([actionWatcher()]);
}
