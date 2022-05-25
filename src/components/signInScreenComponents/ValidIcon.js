import React from "react";
import { View, StyleSheet } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { lightestGrey, validGreen } from "../../colorPalette";

const ValidIcon = () => (
  <View style={styles.outerCircle}>
    <View style={styles.innerCircle}>
      <FontAwesomeIcon icon={faCheck} size={13} color={validGreen} />
    </View>
  </View>
);

const styles = StyleSheet.create({
  outerCircle: {
    height: 25,
    width: 25,
    borderRadius: 12.5,
    backgroundColor: validGreen,
    justifyContent: "center",
    alignItems: "center"
  },
  innerCircle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    backgroundColor: lightestGrey,
    justifyContent: "center",
    alignItems: "center"
  }
});

export default ValidIcon;
