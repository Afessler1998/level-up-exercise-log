import { put } from "redux-saga/effects";
import * as SecureStore from "expo-secure-store";
import environmentVars from "../../../environmentVars";
import { setUserSettings } from "../actions";

export default function* getUserSettings() {
  const authToken = yield SecureStore.getItemAsync("authToken");
  const serverResponse = yield fetch(
    `${environmentVars.serverUrl}/users/settings`,
    {
      headers: {
        Authorization: `Bearer ${authToken}`
      }
    }
  );
  const parsedResponse = yield serverResponse.json();
  const userSettings = !parsedResponse.error
    ? parsedResponse
    : { hapticFeedback: true, newPrPopup: true };
  yield put(setUserSettings(userSettings));
}
