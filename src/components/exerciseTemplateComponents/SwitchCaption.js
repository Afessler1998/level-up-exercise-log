import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import RoundSwitch from "./RoundSwitch";
import { white } from "../../colorPalette";
import { infoText } from "../../fontSizeEnum";

const SwitchCaption = ({ switchFor, caption, dataOptions, setDataOptions }) => (
  <View style={styles.contentContainer}>
    <RoundSwitch
      switchFor={switchFor}
      dataOptions={dataOptions}
      setDataOptions={setDataOptions}
    />
    <Text style={styles.text}>{caption}</Text>
  </View>
);

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  contentContainer: {
    flexDirection: "row",
    flex: 0.5,
    alignItems: "center",
    paddingHorizontal: width * 0.1
  },
  text: {
    color: white,
    fontSize: infoText,
    marginLeft: 10
  }
});

export default SwitchCaption;
