import React from "react";
import { Text, StyleSheet, Dimensions } from "react-native";
import AwesomeButton from "react-native-really-awesome-button";
import { white, lighterGrey, blueishGrey, black } from "../colorPalette";
import { buttonText } from "../fontSizeEnum";

const screenWidth = Dimensions.get("window").width;

const GrayBtnNoMarginTop = ({ btnText, onPress }) => (
  <AwesomeButton
    onPress={onPress}
    width={screenWidth * 0.7}
    height={60}
    backgroundColor={lighterGrey}
    backgroundActive={lighterGrey}
    borderColor={blueishGrey}
    borderWidth={1}
    borderRadius={50}
    style={[styles.btn, styles.shadow]}
    raiseLevel={1.5}
    backgroundDarker={blueishGrey}
  >
    <Text style={styles.text}>{btnText}</Text>
  </AwesomeButton>
);

const styles = StyleSheet.create({
  btn: {
    marginBottom: 20
  },
  text: {
    color: white,
    fontSize: buttonText,
    fontWeight: "bold",
    letterSpacing: 2
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

export default GrayBtnNoMarginTop;