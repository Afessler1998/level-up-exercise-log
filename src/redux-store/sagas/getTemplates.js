import { put } from "redux-saga/effects";
import * as SecureStore from "expo-secure-store";
import environmentVars from "../../../environmentVars";
import { addTemplates } from "../actions";

export default function* getTemplates() {
  const authToken = yield SecureStore.getItemAsync("authToken");
  const serverResponse = yield fetch(
    `${environmentVars.serverUrl}/templates/exerciseTemplates`,
    {
      headers: {
        Authorization: `Bearer ${authToken}`
      }
    }
  );
  const parsedResponse = yield serverResponse.json();
  const templates = !parsedResponse.error ? parsedResponse : [];
  yield put(addTemplates(templates));
}
