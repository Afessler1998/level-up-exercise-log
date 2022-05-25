import React from "react";
import { View, Text, TextInput, StyleSheet, Dimensions } from "react-native";
import { white, blueishGrey } from "../../../colorPalette";
import { infoText } from "../../../fontSizeEnum";

const NewWorkoutFormTextbox = ({ value, onChangeText }) => (
  <>
    <Text style={styles.text}>Workout title</Text>
    <TextInput
      style={styles.textbox}
      value={value}
      onChangeText={(text) => {
        onChangeText(text);
      }}
      keyboardAppearance="dark"
    />
  </>
);

const screenWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  textbox: {
    backgroundColor: white,
    height: 50,
    fontSize: infoText,
    width: screenWidth * 0.7,
    marginTop: 10,
    borderRadius: 5,
    borderColor: blueishGrey,
    borderWidth: 1,
    paddingLeft: 10
  },
  text: {
    fontSize: infoText,
    color: white,
    width: screenWidth * 0.7,
    marginLeft: 10
  }
});

export default NewWorkoutFormTextbox;
