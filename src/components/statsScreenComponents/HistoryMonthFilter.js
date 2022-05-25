import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import DropDownPicker from "../DropDownPicker";
import monthNumToString from "../../../lib/utils/monthNumToString";
import { white, blueishGrey } from "../../colorPalette";
import { infoText } from "../../fontSizeEnum";

const screenWidth = Dimensions.get("window").width;

const HistoryMonthFilter = ({ list, setMonthFilter }) => (
  <View style={styles.contentContainer}>
    <DropDownPicker
      items={list.map((monthNum) => ({
        value: monthNum,
        label: monthNumToString(monthNum)
      }))}
      placeholder={"Month"}
      dropDownMaxHeight={200}
      containerStyle={styles.dropdownContainer}
      style={styles.dropdownContainerStyle}
      dropDownStyle={styles.dropdownMenu}
      placeholderStyle={styles.dropdownText}
      selectedLabelStyle={styles.dropdownText}
      itemStyle={styles.dropdownItem}
      labelStyle={styles.dropdownText}
      onChangeItem={(item) => {
        setMonthFilter(item.value);
      }}
    />
  </View>
);

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
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

export default HistoryMonthFilter;
