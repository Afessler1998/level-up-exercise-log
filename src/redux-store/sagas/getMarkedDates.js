import { put, select } from "redux-saga/effects";
import * as SecureStore from "expo-secure-store";
import { addMarkedDates } from "../actions";
import getCalendarDate from "../selectors/getCalendarDate";
import environmentVars from "../../../environmentVars";
import createDateMark from "../../../lib/utils/createDateMark";

export default function* getMarkedDates() {
  const authToken = yield SecureStore.getItemAsync("authToken");
  const calendarDateString = yield select(getCalendarDate);
  const calendarDate = new Date(calendarDateString);
  const dateFrom = new Date(
    calendarDate.getFullYear(),
    calendarDate.getMonth() - 6,
    calendarDate.getDate()
  ).getTime();
  const dateTo = new Date(
    calendarDate.getFullYear(),
    calendarDate.getMonth() + 6,
    calendarDate.getDate()
  ).getTime();
  const serverResponse = yield fetch(
    `${environmentVars.serverUrl}/workouts/${dateFrom}/${dateTo}`,
    {
      headers: {
        Authorization: `Bearer ${authToken}`
      }
    }
  );
  const parsedReponse = yield serverResponse.json();
  let markedDates = {};
  if (!parsedReponse.error) {
    parsedReponse.forEach((date) => {
      const dateMark = createDateMark(new Date(date));
      markedDates = { ...markedDates, ...dateMark };
    });
  }
  yield put(addMarkedDates(markedDates));
}
