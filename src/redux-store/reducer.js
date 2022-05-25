import produce from "immer";

export default function reducer(state, action) {
  const { payload } = action;
  switch (action.type) {
    case "setDate":
      return produce(state, (newState) => {
        newState.date = payload.date;
      });

    case "setCalendarDate":
      return produce(state, (newState) => {
        newState.calendarDate = payload.calendarDate;
      });

    case "getWorkouts":
      return produce(state, (newState) => {
        newState.workouts = {
          pending: true,
          data: []
        };
      });

    case "setWorkouts":
      return produce(state, (newState) => {
        newState.workouts = {
          pending: false,
          data: payload.workouts
        };
      });

    case "getMarkedDates":
      return produce(state, (newState) => {
        newState.markedDates = {
          pending: true,
          markedDates: {}
        };
      });

    case "addMarkedDates":
      return produce(state, (newState) => {
        newState.markedDates = {
          pending: false,
          data: { ...payload.markedDates }
        };
      });

    case "getTemplates":
      return produce(state, (newState) => {
        newState.templates = {
          pending: true,
          data: [...state.templates.data]
        };
      });

    case "addTemplates":
      return produce(state, (newState) => {
        newState.templates = {
          pending: false,
          data: [...payload.templates]
        };
      });

    case "getUserSettings":
      return produce(state, (newState) => {
        newState.userSettings = {
          pending: true,
          data: {}
        };
      });

    case "setUserSettings":
      return produce(state, (newState) => {
        newState.userSettings = {
          pending: false,
          data: { ...payload.userSettings }
        };
      });

    default:
      return state;
  }
}
