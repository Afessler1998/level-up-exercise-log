import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { white } from "../../colorPalette";

const CalenarsListButton = ({ onPress }) => (
  <TouchableOpacity
    onPress={onPress}
    hitSlop={{
      top: 10,
      right: 10,
      bottom: 10,
      left: 10
    }}
    style={styles.buttonPositioning}
  >
    <FontAwesomeIcon icon={faChevronLeft} size={26} color={white} />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  buttonPositioning: { position: "absolute", zIndex: 10 }
});

export default CalenarsListButton;
