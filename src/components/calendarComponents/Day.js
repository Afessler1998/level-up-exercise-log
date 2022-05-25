import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { white, blue } from "../../colorPalette";
import { calendarNum } from "../../fontSizeEnum";

const Day = ({ onPress, date, marked }) => {
  const today = new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    new Date().getDate()
  );
  return (
    <View style={styles.contentContainer}>
      <TouchableOpacity onPress={onPress}>
        <View style={styles.centerDot}>
          <Text
            style={[
              styles.dayText,
              {
                color: date.toISOString() === today.toISOString() ? blue : white
              }
            ]}
          >
            {date.getDate()}
          </Text>
          <View style={[styles.dot, { opacity: marked ? 1 : 0 }]} />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    justifyContent: "center"
  },
  dayText: {
    color: white,
    fontSize: calendarNum,
    textAlign: "center"
  },
  centerDot: {
    alignItems: "center"
  },
  dot: {
    borderRadius: 4,
    borderWidth: 4,
    marginTop: 8,
    borderColor: blue
  }
});

export default Day;
