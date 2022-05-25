import React from "react";
import { View, Text, StyleSheet } from "react-native";
import RoundSwitch from "./RoundSwitch";
import { white } from "../../colorPalette";
import { infoText } from "../../fontSizeEnum";

const SwitchCaption = ({ caption, switchFor, settings, active }) => (
  <View style={styles.contentContainer}>
    <RoundSwitch switchFor={switchFor} settings={settings} active={active} />
    <Text style={styles.text}>{caption}</Text>
  </View>
);

const styles = StyleSheet.create({
  contentContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20
  },
  text: {
    color: white,
    fontSize: infoText,
    marginLeft: 10
  }
});

export default SwitchCaption;
