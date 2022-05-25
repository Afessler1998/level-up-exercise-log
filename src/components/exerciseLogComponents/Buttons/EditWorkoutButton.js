import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { white, black } from "../../../colorPalette";

const EditWorkoutButton = ({ onPress }) => (
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
    <FontAwesomeIcon
      icon={faEdit}
      size={32}
      color={white}
      style={styles.shadow}
    />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  buttonPositioning: {
    position: "absolute",
    alignSelf: "flex-end"
  },
  shadow: {
    shadowOffset: {
      width: 2,
      height: 2
    },
    shadowRadius: 2,
    shadowOpacity: 0.4,
    shadowColor: black
  }
});

export default EditWorkoutButton;
