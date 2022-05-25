/* eslint-disable no-shadow */
import React, { useState } from "react";
import { View, Text, ScrollView, Dimensions, StyleSheet } from "react-native";
import monthNumToString from "../../../lib/utils/monthNumToString";
import HistoryMonthFilter from "./HistoryMonthFilter";
import HistoryYearFilter from "./HistoryYearFilter";
import SvgLogo from "../SvgLogo";
import { white, lighterGrey } from "../../colorPalette";
import { header, infoText } from "../../fontSizeEnum";

const ExerciseHistory = ({ statData, exerciseName }) => {
  const [monthFilter, setMonthFilter] = useState(null);
  const [yearFilter, setYearFilter] = useState(null);

  const childSetMonthFilter = (monthFilter) => {
    setMonthFilter(monthFilter);
  };

  const childSetYearFilter = (yearFilter) => {
    setYearFilter(yearFilter);
  };

  const monthList = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

  const thisYear = new Date().getFullYear();
  const yearList = [
    thisYear.toString(),
    (thisYear - 1).toString(),
    (thisYear - 2).toString(),
    (thisYear - 3).toString(),
    (thisYear - 4).toString()
  ];

  let setNum = 0;
  return (
    <>
      <View style={styles.filterContainer}>
        <HistoryMonthFilter
          list={monthList}
          setMonthFilter={childSetMonthFilter}
        />
        <HistoryYearFilter list={yearList} setYearFilter={childSetYearFilter} />
      </View>
      <View style={styles.container}>
        <Text style={styles.header}>{exerciseName}</Text>
        {Array.isArray(statData) && (
          <ScrollView
            style={styles.ScrollViewContainer}
            contentContainerStyle={styles.scrollView}
            showsVerticalScrollIndicator={false}
          >
            {statData.map((exerciseData) => {
              const { sets, _id } = exerciseData;
              const date = new Date(exerciseData.date);
              setNum = 0;
              if (monthFilter !== null && date.getMonth() !== monthFilter)
                return;
              if (
                yearFilter !== null &&
                date.getFullYear().toString() !== yearFilter
              ) {
                return;
              }
              return (
                <View key={_id}>
                  <Text style={styles.dateText}>
                    {`${monthNumToString(
                      date.getMonth()
                    )} ${date.getDate()}, ${date.getFullYear()}`}
                  </Text>
                  {sets.map((setData) => {
                    const { reps, weight, rpe, duration, distance, _id } =
                      setData;
                    setNum += 1;
                    return (
                      <View key={_id}>
                        <View style={styles.setTextContainer}>
                          <Text style={[styles.setText, styles.setDataText]}>
                            {`Set ${setNum}:`}
                          </Text>
                          {setData.isPr && (
                            <SvgLogo size={26} backgroundColor={lighterGrey} />
                          )}
                        </View>
                        <Text style={styles.setDataText}>
                          {reps && `Reps: ${reps}   `}
                          {rpe && `RPE: ${rpe}   `}
                          {distance && `Distance: ${distance}   `}
                        </Text>
                        <Text style={styles.setDataText}>
                          {weight && `Weight: ${weight}   `}
                          {duration && `Duration: ${duration}   `}
                        </Text>
                      </View>
                    );
                  })}
                </View>
              );
            })}
          </ScrollView>
        )}
      </View>
    </>
  );
};

const screenWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: lighterGrey,
    borderRadius: 35,
    width: screenWidth * 0.8,
    marginTop: 10,
    paddingTop: 10,
    flex: 1,
    zIndex: -1
  },
  filterContainer: {
    flexDirection: "row",
    marginBottom: 10,
    justifyContent: "space-between",
    width: screenWidth * 0.7
  },
  header: {
    color: white,
    fontSize: header,
    fontWeight: "bold"
  },
  scrollView: {
    alignItems: "center",
    justifyContent: "center",
    width: screenWidth * 0.8
  },
  dateText: {
    color: white,
    textAlign: "center",
    fontSize: infoText,
    paddingVertical: 6,
    textDecorationLine: "underline",
    fontWeight: "bold"
  },
  setTextContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  setText: {
    fontWeight: "bold"
  },
  setDataText: {
    color: white,
    fontSize: infoText,
    paddingVertical: 4,
    textAlign: "center"
  }
});

export default ExerciseHistory;
