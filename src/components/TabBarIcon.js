import React from "react";
import { View, StyleSheet } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { black } from "../colorPalette";

const TabBarIcon = ({ icon, color }) => (
  <View>
    <FontAwesomeIcon
      icon={icon}
      size={32}
      color={color}
      style={styles.shadow}
    />
  </View>
);

const styles = StyleSheet.create({
  shadow: {
    shadowOffset: {
      width: 2,
      height: 2
    },
    shadowRadius: 2,
    shadowOpacity: 0.4,
    shadowColor: black,
    marginBottom: 25,
    marginTop: 10
  }
});

export default TabBarIcon;
