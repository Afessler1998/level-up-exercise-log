import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import reducer from "./reducer";
import rootSaga from "./sagas/rootSaga";

const sagaMiddleware = createSagaMiddleware();

const middleware = [sagaMiddleware];

const store = createStore(
  reducer,
  {
    date: new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate()
    ).toISOString(),
    calendarDate: new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate()
    ).toISOString(),
    workouts: {
      pending: false,
      data: []
    },
    markedDates: {
      pending: false,
      data: {}
    },
    templates: {
      pending: false,
      data: []
    },
    userSettings: {}
  },
  applyMiddleware(...middleware)
);

sagaMiddleware.run(rootSaga);

export default store;
