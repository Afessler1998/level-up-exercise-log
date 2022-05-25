import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import DropDownPicker from "../../DropDownPicker";
import { white, blueishGrey } from "../../../colorPalette";
import { infoText } from "../../../fontSizeEnum";

const screenWidth = Dimensions.get("window").width;

const ExerciseTemplateSelector = ({ exerciseNames, setExercise }) => (
  <View style={styles.contentContainer}>
    <Text style={styles.dropdownMenuCaption}>Select an exercise</Text>
    <DropDownPicker
      items={exerciseNames.map((name) => ({ label: name, value: name }))}
      searchable
      searchablePlaceholder="Search for an exercise"
      searchablePlaceholderTextColor={blueishGrey}
      placeholder={exerciseNames[0]}
      defaultValue={exerciseNames[0]}
      containerStyle={styles.dropdownContainer}
      style={styles.dropdownContainerStyle}
      dropDownStyle={styles.dropdownMenu}
      placeholderStyle={styles.dropdownText}
      selectedLabelStyle={styles.dropdownText}
      itemStyle={styles.dropdownItem}
      labelStyle={styles.dropdownText}
      onChangeItem={(item) => {
        setExercise(item.value);
      }}
      dropDownMaxHeight={225}
    />
  </View>
);

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 100
  },
  dropdownMenuCaption: {
    fontSize: infoText,
    color: white,
    width: screenWidth * 0.7,
    textAlign: "left",
    marginLeft: 20
  },
  dropdownContainer: {
    marginTop: 10,
    height: 50,
    width: screenWidth * 0.7
  },
  dropdownMenu: {
    borderColor: blueishGrey
  },
  dropdownContainerStyle: {
    borderColor: blueishGrey,
    paddingLeft: 5
  },
  dropdownText: {
    fontSize: infoText
  },
  dropdownItem: {
    justifyContent: "flex-start"
  }
});

export default ExerciseTemplateSelector;
