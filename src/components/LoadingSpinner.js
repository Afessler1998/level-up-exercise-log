import React from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import { blueishGrey, black } from "../colorPalette";

const LoadingSpinner = () => {
  return (
    <View style={[styles.container, styles.shadow]}>
      <ActivityIndicator size="large" color={blueishGrey} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1
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

export default LoadingSpinner;
