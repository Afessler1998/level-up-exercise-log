import React, { useState } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import DropDownPicker from "../DropDownPicker";
import { blueishGrey } from "../../colorPalette";
import { infoText } from "../../fontSizeEnum";

const screenWidth = Dimensions.get("window").width;

const ExerciseTypeSelector = ({
  exerciseType,
  setExerciseType,
  setDataOptions
}) => {
  const [dropDownValue, onSelect] = useState(exerciseType);
  return (
    <View>
      <DropDownPicker
        items={[
          { label: "Strength", value: "Strength" },
          { label: "Cardio", value: "Cardio" }
        ]}
        placeholder={exerciseType}
        containerStyle={styles.containerStyle}
        dropDownStyle={styles.dropDownStyle}
        style={styles.style}
        placeholderStyle={styles.text}
        selectedLabelStyle={styles.text}
        itemStyle={styles.itemStyle}
        labelStyle={styles.text}
        defaultValue={dropDownValue}
        onChangeItem={(item) => {
          onSelect(item.value);
          setExerciseType(item.value);
          setDataOptions({
            weight: false,
            reps: false,
            rir: false,
            duration: false,
            distance: false,
            speed: false,
            heartRate: false,
            calories: false
          });
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    marginTop: 20,
    height: 50,
    width: screenWidth * 0.7
  },
  dropDownStyle: { borderColor: blueishGrey },
  style: { paddingLeft: 5, borderColor: blueishGrey },
  text: { fontSize: infoText },
  itemStyle: { justifyContent: "flex-start" }
});

export default ExerciseTypeSelector;
