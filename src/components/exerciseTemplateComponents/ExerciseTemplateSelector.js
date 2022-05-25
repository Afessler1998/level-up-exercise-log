import React from "react";
import { View, Text, Dimensions, StyleSheet } from "react-native";
import DropDownPicker from "../DropDownPicker";
import { blueishGrey, white } from "../../colorPalette";
import { infoText } from "../../fontSizeEnum";

const ExerciseTemplateSelector = ({ exerciseNames, navigation }) => (
  <View>
    <Text style={styles.caption}>Select a template</Text>
    <DropDownPicker
      items={exerciseNames.map((name) => ({
        label: name,
        value: name
      }))}
      searchable
      searchablePlaceholder="Search for an exercise"
      searchablePlaceholderTextColor={blueishGrey}
      placeholder={exerciseNames[0]}
      containerStyle={styles.containerStyle}
      dropDownStyle={styles.dropdownStyle}
      style={styles.style}
      placeholderStyle={styles.text}
      selectedLabelStyle={styles.text}
      itemStyle={styles.itemStyle}
      labelStyle={styles.text}
      defaultValue={exerciseNames[0]}
      dropDownMaxHeight={225}
      onChangeItem={(item) => {
        navigation.navigate("ViewTemplate", {
          exerciseName: item.label
        });
      }}
    />
  </View>
);

const screenWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  caption: {
    fontSize: infoText,
    color: white,
    marginTop: 20,
    textAlign: "left",
    marginBottom: 10,
    marginLeft: 10
  },
  containerStyle: {
    height: 50,
    width: screenWidth * 0.7
  },
  dropdownStyle: {
    borderColor: blueishGrey
  },
  style: { paddingLeft: 5, borderColor: blueishGrey },
  text: { fontSize: infoText },
  itemStyle: { justifyContent: "flex-start" }
});

export default ExerciseTemplateSelector;
