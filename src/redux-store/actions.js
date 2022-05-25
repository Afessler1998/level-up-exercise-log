function setDate(date) {
  if (typeof date !== "string") {
    throw new Error(
      `function setDate(date) expected argument of type string, received argument of type ${typeof date}: ${date}`
    );
  }
  return {
    type: "setDate",
    payload: { date }
  };
}

function setCalendarDate(calendarDate) {
  if (typeof calendarDate !== "string") {
    throw new Error(
      `function setDate(date) expected argument of type string, received argument of type ${typeof calendarDate}: ${calendarDate}`
    );
  }
  return {
    type: "setCalendarDate",
    payload: { calendarDate }
  };
}

function getWorkouts() {
  return {
    type: "getWorkouts"
  };
}

function setWorkouts(workouts) {
  if (!Array.isArray(workouts)) {
    throw new Error(
      `function setWorkouts(workouts) expected argument of type array, recieved argument of type ${typeof workouts}: ${workouts}`
    );
  }
  return {
    type: "setWorkouts",
    payload: { workouts }
  };
}

function getMarkedDates() {
  return {
    type: "getMarkedDates"
  };
}

function addMarkedDates(markedDates) {
  if (typeof markedDates !== "object" && markedDates !== null) {
    throw new Error(
      `function addMarkedDates(markedDates) expected argument of type object, received argument of type ${typeof markedDates}: ${markedDates}`
    );
  }
  return {
    type: "addMarkedDates",
    payload: { markedDates }
  };
}

function getTemplates() {
  return {
    type: "getTemplates"
  };
}

function addTemplates(templates) {
  if (!Array.isArray(templates)) {
    throw new Error(
      `function addTemplates(templates) expected argument of type array, received argument of type ${typeof templates}: ${templates}}`
    );
  }
  return {
    type: "addTemplates",
    payload: { templates }
  };
}

function getUserSettings() {
  return {
    type: "getUserSettings"
  };
}

function setUserSettings(userSettings) {
  if (typeof userSettings !== "object" && userSettings !== null) {
    throw new Error(
      `function setUserSettings(userSettings) expected argument of type object, received argument of type ${typeof userSettings}: ${userSettings}`
    );
  }
  return {
    type: "setUserSettings",
    payload: { userSettings }
  };
}

exports.setDate = setDate;
exports.setCalendarDate = setCalendarDate;
exports.getWorkouts = getWorkouts;
exports.setWorkouts = setWorkouts;
exports.getMarkedDates = getMarkedDates;
exports.addMarkedDates = addMarkedDates;
exports.getTemplates = getTemplates;
exports.addTemplates = addTemplates;
exports.getUserSettings = getUserSettings;
exports.setUserSettings = setUserSettings;
