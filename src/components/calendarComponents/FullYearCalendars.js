import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import SmallCalendar from "./SmallCalendar";
import { white } from "../../colorPalette";

const FullYearCalendars = ({ year, navigation }) => (
  <View style={styles.contentContainer}>
    <Text style={styles.header}>{year}</Text>
    <View style={styles.calendarsRow}>
      <SmallCalendar month={0} year={year} navigation={navigation} />
      <SmallCalendar month={1} year={year} navigation={navigation} />
      <SmallCalendar month={2} year={year} navigation={navigation} />
    </View>
    <View style={styles.calendarsRow}>
      <SmallCalendar month={3} year={year} navigation={navigation} />
      <SmallCalendar month={4} year={year} navigation={navigation} />
      <SmallCalendar month={5} year={year} navigation={navigation} />
    </View>
    <View style={styles.calendarsRow}>
      <SmallCalendar month={6} year={year} navigation={navigation} />
      <SmallCalendar month={7} year={year} navigation={navigation} />
      <SmallCalendar month={8} year={year} navigation={navigation} />
    </View>
    <View style={styles.calendarsRow}>
      <SmallCalendar month={9} year={year} navigation={navigation} />
      <SmallCalendar month={10} year={year} navigation={navigation} />
      <SmallCalendar month={11} year={year} navigation={navigation} />
    </View>
  </View>
);

const { height } = Dimensions.get("window");

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    height: height * 0.83,
    transform: [{ scaleY: -1 }]
  },
  header: {
    color: white,
    fontSize: 24,
    textAlign: "center",
    marginBottom: 10,
    marginTop: 5
  },
  calendarsRow: {
    flex: 1,
    flexDirection: "row"
  }
});

export default FullYearCalendars;
