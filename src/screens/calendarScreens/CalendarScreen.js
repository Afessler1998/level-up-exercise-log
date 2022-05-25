import React from "react";
import { useSelector } from "react-redux";
import { View, StyleSheet } from "react-native";
import LoadingSpinner from "../../components/LoadingSpinner";
import CalendarList from "../../components/calendarComponents/CalendarList";
import { darkGrey } from "../../colorPalette";

const CalendarScreen = ({ navigation }) => {
  const markedDates = useSelector((state) => state.markedDates);
  const calendarDate = new Date(useSelector((state) => state.calendarDate));

  const { data, pending } = markedDates;

  return (
    <View style={styles.background}>
      {pending && <LoadingSpinner />}
      {!pending && (
        <CalendarList
          dateRangeBack={6}
          dateRangeForward={6}
          markedDates={data}
          navigation={navigation}
          calendarDate={calendarDate}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: darkGrey,
    justifyContent: "center"
  }
});

export default CalendarScreen;
