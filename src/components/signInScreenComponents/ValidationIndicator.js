import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import ValidIcon from "./ValidIcon";
import InvalidIcon from "./InvalidIcon";
import { invalidRed, validGreen } from "../../colorPalette";
import { infoText } from "../../fontSizeEnum";

const ValidationIndicator = ({ validator, text }) => (
  <View style={styles.contentContainer}>
    {validator() && <ValidIcon />}
    {!validator() && <InvalidIcon />}
    <Text
      style={[styles.text, { color: validator() ? validGreen : invalidRed }]}
    >
      {text}
    </Text>
  </View>
);

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  contentContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: width * 0.7,
    marginTop: 10
  },
  text: {
    fontSize: infoText,
    marginLeft: 10,
    fontWeight: "600"
  }
});

export default ValidationIndicator;
