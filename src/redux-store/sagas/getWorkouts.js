import { put, select } from "redux-saga/effects";
import * as SecureStore from "expo-secure-store";
import environmentVars from "../../../environmentVars";
import { setWorkouts } from "../actions";

export default function* getWorkouts() {
  const authToken = yield SecureStore.getItemAsync("authToken");
  const dateString = yield select((state) => state.date);
  const date = new Date(dateString).getTime();
  const serverResponse = yield fetch(
    `${environmentVars.serverUrl}/workouts/${date}`,
    {
      headers: {
        Authorization: `Bearer ${authToken}`
      }
    }
  );
  const parsedResponse = yield serverResponse.json();
  const returnedWorkouts = !parsedResponse.error ? parsedResponse : [];
  yield put(setWorkouts(returnedWorkouts));
}
