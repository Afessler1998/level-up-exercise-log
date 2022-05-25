import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import DropDownPicker from "../DropDownPicker";
import { white, blueishGrey } from "../../colorPalette";
import { infoText } from "../../fontSizeEnum";

const screenWidth = Dimensions.get("window").width;

const HistoryYearFilter = ({ list, setYearFilter }) => (
  <View style={styles.contentContainer}>
    <DropDownPicker
      items={list.map((year) => ({
        value: year,
        label: year
      }))}
      placeholder={"Year"}
      dropDownMaxHeight={200}
      containerStyle={styles.dropdownContainer}
      style={styles.dropdownContainerStyle}
      dropDownStyle={styles.dropdownMenu}
      placeholderStyle={styles.dropdownText}
      selectedLabelStyle={styles.dropdownText}
      itemStyle={styles.dropdownItem}
      labelStyle={styles.dropdownText}
      onChangeItem={(item) => {
        setYearFilter(item.value);
      }}
    />
  </View>
);

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    alignItems: "flex-end",
    zIndex: 5
  },
  dropdownMenuCaption: {
    fontSize: infoText,
    color: white,
    width: screenWidth * 0.34,
    textAlign: "left"
  },
  dropdownContainer: {
    marginTop: 10,
    height: 50,
    width: screenWidth * 0.34
  },
  dropdownMenu: {
    borderColor: blueishGrey
  },
  dropdownContainerStyle: {
    borderColor: blueishGrey
  },
  dropdownText: {
    fontSize: infoText
  },
  dropdownItem: {
    justifyContent: "flex-start"
  }
});

export default HistoryYearFilter;
