import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import GrayBtn from "../GrayBtn";
import { white, lightestGrey, black } from "../../colorPalette";
import { infoText } from "../../fontSizeEnum";

const NoWorkoutMsg = ({ navigation }) => (
  <View style={styles.contentContainer}>
    <View style={styles.textSpacingView}>
      <Text style={styles.text}>No Workouts Logged</Text>
    </View>
    <GrayBtn
      btnText="NEW WORKOUT"
      onPress={() => {
        navigation.navigate("WorkoutForm");
      }}
    />
  </View>
);

const screenWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  contentContainer: {
    alignItems: "center"
  },
  textSpacingView: {
    backgroundColor: lightestGrey,
    borderRadius: 35,
    width: screenWidth * 0.9,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    flex: 1
  },
  text: {
    color: white,
    fontSize: infoText
  }
});

export default NoWorkoutMsg;
