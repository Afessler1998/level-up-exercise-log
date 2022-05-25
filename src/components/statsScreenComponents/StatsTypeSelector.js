import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import DropDownPicker from "../DropDownPicker";
import { blueishGrey } from "../../colorPalette";
import { infoText } from "../../fontSizeEnum";

const screenWidth = Dimensions.get("window").width;

const StatsTypeSelector = ({
  statsOptions,
  statsType,
  setStatsType,
  statsTypeEnum
}) => {
  const {
    estimatedMax,
    history,
    volume,
    personalRecords,
    speedGraph,
    distanceGraph
  } = statsTypeEnum;
  return (
    <View style={styles.contentContainer}>
      <DropDownPicker
        items={statsOptions.map((name) => ({ label: name, value: name }))}
        containerStyle={styles.containerStyle}
        dropDownStyle={styles.dropDownStyle}
        style={styles.style}
        placeholderStyle={styles.text}
        selectedLabelStyle={styles.text}
        itemStyle={styles.itemStyle}
        labelStyle={styles.text}
        dropDownMaxHeight={300}
        defaultValue={
          (statsType === volume.value && volume.label) ||
          (statsType === estimatedMax.value && estimatedMax.label) ||
          (statsType === speedGraph.value && speedGraph.label) ||
          (statsType === distanceGraph.value && distanceGraph.label) ||
          (statsType === personalRecords.value && personalRecords.label) ||
          (statsType === history.value && history.label)
        }
        onChangeItem={(item) => {
          if (item.label === volume.label) {
            setStatsType(volume.value);
          }
          if (item.label === estimatedMax.label) {
            setStatsType(estimatedMax.value);
          }
          if (item.label === speedGraph.label) {
            setStatsType(speedGraph.value);
          }
          if (item.label === distanceGraph.label) {
            setStatsType(distanceGraph.value);
          }
          if (item.label === personalRecords.label) {
            setStatsType(personalRecords.value);
          }
          if (item.label === history.label) {
            setStatsType(history.value);
          }
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    zIndex: 10
  },
  containerStyle: {
    marginTop: 10,
    height: 50,
    width: screenWidth * 0.7
  },
  dropDownStyle: { borderColor: blueishGrey },
  style: { paddingLeft: 5, borderColor: blueishGrey },
  text: { fontSize: infoText },
  itemStyle: { justifyContent: "flex-start" }
});

export default StatsTypeSelector;
