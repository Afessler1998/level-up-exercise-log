import React, { useState } from "react";
import { View, TextInput, StyleSheet, Dimensions } from "react-native";
import { white, blueishGrey, black } from "../../colorPalette";
import { infoText } from "../../fontSizeEnum";

const ExerciseNameInput = ({ exerciseName, setExerciseName }) => {
  const [value, onChangeText] = useState(exerciseName);
  return (
    <View>
      <TextInput
        style={styles.textbox}
        value={value}
        onChangeText={(text) => {
          onChangeText(text);
          setExerciseName(text);
        }}
        clearTextOnFocus
        keyboardAppearance="dark"
      />
    </View>
  );
};

const screenWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  textbox: {
    backgroundColor: white,
    height: 50,
    fontSize: infoText,
    width: screenWidth * 0.7,
    marginTop: 30,
    borderRadius: 5,
    paddingLeft: 10,
    borderColor: blueishGrey,
    borderWidth: 1
  }
});

export default ExerciseNameInput;
