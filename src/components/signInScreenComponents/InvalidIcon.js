import React from "react";
import { View, StyleSheet } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { lightestGrey, invalidRed } from "../../colorPalette";

const InvalidIcon = () => (
  <View style={styles.outerCircle}>
    <View style={styles.innerCircle}>
      <FontAwesomeIcon icon={faTimes} size={16} color={invalidRed} />
    </View>
  </View>
);

const styles = StyleSheet.create({
  outerCircle: {
    height: 25,
    width: 25,
    borderRadius: 12.5,
    backgroundColor: invalidRed,
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

export default InvalidIcon;
