import React from "react";
import { View, SafeAreaView, Text, StyleSheet, Dimensions } from "react-native";
import monthNumToString from "../../../lib/utils/monthNumToString";
import { white, lightestGrey } from "../../colorPalette";
import { header } from "../../fontSizeEnum";

const DateHeader = ({ date }) => (
  <SafeAreaView style={styles.contentContainer}>
    <View style={styles.contentContainer}>
      <Text style={styles.dateText}>
        {`${monthNumToString(
          date.getMonth()
        )} ${date.getDate()}, ${date.getFullYear()}`}
      </Text>
    </View>
  </SafeAreaView>
);

const screenWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  contentContainer: {
    width: screenWidth,
    backgroundColor: lightestGrey
  },
  dateText: {
    color: white,
    fontSize: header,
    textAlign: "center",
    paddingBottom: 20,
    fontWeight: "600"
  }
});

export default DateHeader;
