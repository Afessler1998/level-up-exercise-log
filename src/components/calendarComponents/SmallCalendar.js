import React from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { useDispatch } from "react-redux";
import { setCalendarDate, getMarkedDates } from "../../redux-store/actions";
import { white, lightestGrey, blue } from "../../colorPalette";
import monthNumToString from "../../../lib/utils/monthNumToString";

const SmallCalendar = ({ month, year, navigation }) => {
  const dispatch = useDispatch();

  const calendarArray = [
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0]
  ];

  const firstDay = new Date(year, month, 1).getDay();
  const lastDate = new Date(year, month + 1, 0);

  let dayNum = 1;
  for (let i = 0; i <= 5; i += 1) {
    for (let j = 0; j <= 6; j += 1) {
      if (dayNum === 1 && j === firstDay) {
        calendarArray[i][j] = dayNum;
        dayNum += 1;
      } else if (dayNum > 1 && dayNum <= lastDate.getDate()) {
        calendarArray[i][j] = dayNum;
        dayNum += 1;
      }
    }
  }

  let listKey = 0;
  return (
    <TouchableOpacity
      onPress={() => {
        const date = new Date(year, month, 1).toISOString();
        dispatch(setCalendarDate(date));
        dispatch(getMarkedDates());
        navigation.navigate("Calendar");
      }}
      style={styles.contentContainer}
    >
      <Text style={styles.header}>{monthNumToString(month)}</Text>
      {calendarArray.map((row) => (
        <View style={styles.calendarRow} key={(listKey += 1)}>
          {row.map((day) => {
            if (day === 0) {
              return (
                <View style={styles.daySpacingView} key={(listKey += 1)} />
              );
            }
            const iterDate = new Date(year, month, day).toISOString();
            const today = new Date(
              new Date().getFullYear(),
              new Date().getMonth(),
              new Date().getDate()
            ).toISOString();
            const isToday = iterDate === today;
            return (
              <View style={styles.dayContainer} key={(listKey += 1)}>
                <Text
                  style={[styles.dayText, { color: isToday ? blue : white }]}
                >
                  {day}
                </Text>
              </View>
            );
          })}
        </View>
      ))}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    backgroundColor: lightestGrey,
    borderRadius: 20,
    padding: 10,
    margin: 5
  },
  header: {
    color: white,
    textAlign: "center",
    marginBottom: 10
  },
  calendarRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    flex: 1
  },
  dayContainer: {
    flex: 1
  },
  dayText: {
    color: white,
    fontSize: 8,
    textAlign: "center"
  },
  daySpacingView: {
    flex: 1
  }
});

export default SmallCalendar;
