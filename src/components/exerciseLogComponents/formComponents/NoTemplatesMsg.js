import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import GrayBtn from "../../GrayBtn";
import CancelBtn from "../../CancelBtn";
import { white, lightestGrey } from "../../../colorPalette";
import { infoText } from "../../../fontSizeEnum";

const NoTemplatesMsg = ({ navigation }) => (
  <View style={styles.contentContainer}>
    <View style={styles.textSpacingView}>
      <Text style={styles.text}>
        You must create an exercise template to add it to a workout
      </Text>
    </View>
    <GrayBtn
      btnText="NEW TEMPLATE"
      onPress={() =>
        navigation.navigate("CreatingTemplate", { navFrom: "NoTemplatesMsg" })
      }
    />
    <CancelBtn
      onPress={() => {
        navigation.navigate("ExerciseLog");
      }}
    />
  </View>
);

const screenWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  contentContainer: {
    backgroundColor: lightestGrey,
    borderRadius: 35,
    width: screenWidth * 0.9,
    alignItems: "center",
    marginTop: 5,
    marginBottom: 20,
    flex: 1
  },
  textSpacingView: {
    flex: 1,
    justifyContent: "center"
  },
  text: {
    fontSize: infoText,
    color: white,
    width: screenWidth * 0.7,
    textAlign: "center"
  }
});

export default NoTemplatesMsg;
