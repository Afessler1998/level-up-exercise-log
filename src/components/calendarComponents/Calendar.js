import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { useDispatch } from "react-redux";
import { setDate, getWorkouts } from "../../redux-store/actions";
import CalendarListButton from "./CalendarsListButton";
import Day from "./Day";
import monthNumToString from "../../../lib/utils/monthNumToString";
import dayNumToString from "../../../lib/utils/dayNumToString";
import { lightestGrey, white } from "../../colorPalette";
import { calendarNum, header } from "../../fontSizeEnum";

const Calendar = ({ date, markedDates, navigation }) => {
  const dispatch = useDispatch();

  const month = date.getMonth();
  const year = date.getFullYear();

  const firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  const lastDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);

  const calendarArray = [
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0]
  ];

  let dayNum = 1;
  for (let i = 0; i <= 5; i += 1) {
    for (let j = 0; j <= 6; j += 1) {
      if (dayNum === 1 && j === firstDay) {
        const iteratorDate = new Date(
          date.getFullYear(),
          date.getMonth(),
          dayNum
        );
        calendarArray[i][j] = (
          <Day
            key={iteratorDate}
            date={iteratorDate}
            onPress={() => {
              dispatch(setDate(iteratorDate.toISOString()));
              dispatch(getWorkouts());
              navigation.navigate("ExerciseLog");
            }}
            marked={
              markedDates[
                `${iteratorDate.getFullYear()}-${iteratorDate.getMonth()}-${iteratorDate.getDate()}`
              ]
            }
          />
        );
        dayNum += 1;
      } else if (dayNum > 1 && dayNum <= lastDate.getDate()) {
        const iteratorDate = new Date(
          date.getFullYear(),
          date.getMonth(),
          dayNum
        );
        calendarArray[i][j] = (
          <Day
            key={iteratorDate}
            date={iteratorDate}
            onPress={() => {
              dispatch(setDate(iteratorDate.toISOString()));
              dispatch(getWorkouts());
              navigation.navigate("ExerciseLog");
            }}
            marked={
              markedDates[
                `${iteratorDate.getFullYear()}-${iteratorDate.getMonth()}-${iteratorDate.getDate()}`
              ]
            }
          />
        );
        dayNum += 1;
      }
    }
  }

  let listKey = 0;
  return (
    <View style={styles.contentContainer}>
      <View style={styles.headerContainer}>
        <CalendarListButton
          onPress={() => {
            navigation.navigate("CalendarsList");
          }}
        />
        <Text style={styles.header}>{`${monthNumToString(
          month
        )} ${year}`}</Text>
      </View>
      <View style={styles.dayHeaderContainer}>
        <View style={styles.dayHeaderBox}>
          <Text style={styles.dayHeader}>{dayNumToString(0)}</Text>
        </View>
        <View style={styles.dayHeaderBox}>
          <Text style={styles.dayHeader}>{dayNumToString(1)}</Text>
        </View>
        <View style={styles.dayHeaderBox}>
          <Text style={styles.dayHeader}>{dayNumToString(2)}</Text>
        </View>
        <View style={styles.dayHeaderBox}>
          <Text style={styles.dayHeader}>{dayNumToString(3)}</Text>
        </View>
        <View style={styles.dayHeaderBox}>
          <Text style={styles.dayHeader}>{dayNumToString(4)}</Text>
        </View>
        <View style={styles.dayHeaderBox}>
          <Text style={styles.dayHeader}>{dayNumToString(5)}</Text>
        </View>
        <View style={styles.dayHeaderBox}>
          <Text style={styles.dayHeader}>{dayNumToString(6)}</Text>
        </View>
      </View>
      <View style={styles.daysContainer}>
        {calendarArray.map((row) => (
          <View style={styles.calendarRow} key={(listKey += 1)}>
            {row.map((day) => {
              if (day === 0) {
                return (
                  <View style={styles.daySpacingView} key={(listKey += 1)} />
                );
              }
              return day;
            })}
          </View>
        ))}
      </View>
    </View>
  );
};

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  contentContainer: {
    backgroundColor: lightestGrey,
    width: width * 0.9,
    marginHorizontal: width * 0.05,
    paddingHorizontal: 10,
    borderRadius: 35,
    flex: 1,
    justifyContent: "center"
  },
  headerContainer: {
    justifyContent: "center",
    marginTop: 20,
    width: width * 0.7,
    alignSelf: "center"
  },
  header: {
    fontSize: header,
    color: white,
    textAlign: "center",
    fontWeight: "600"
  },
  dayHeaderContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: 30,
    marginBottom: 30
  },
  dayHeaderBox: { flex: 1 },
  dayHeader: {
    color: white,
    fontSize: calendarNum,
    textAlign: "center"
  },
  daysContainer: {
    flex: 1,
    justifyContent: "center",
    paddingBottom: 30
  },
  calendarRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    flex: 1
  },
  daySpacingView: {
    flex: 1
  }
});

export default Calendar;
