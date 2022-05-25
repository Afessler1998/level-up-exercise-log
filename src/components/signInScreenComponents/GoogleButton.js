import React from "react";
import { View, Image, Text, StyleSheet, Dimensions } from "react-native";
import AwesomeButton from "react-native-really-awesome-button";
import { white, black, blueishGrey } from "../../colorPalette";
import { signInButtonText } from "../../fontSizeEnum";

const googleLogo = require("../../../assets/google_logo.png");

const GoogleButton = ({ onPress }) => (
  <AwesomeButton
    onPress={onPress}
    width={screenWidth * 0.8}
    height={60}
    backgroundColor={white}
    backgroundActive={white}
    borderColor={blueishGrey}
    borderWidth={1}
    borderRadius={50}
    style={[styles.btn, styles.shadow]}
    raiseLevel={1.5}
    backgroundDarker={blueishGrey}
  >
    <View style={styles.contentContainer}>
      <Image style={styles.logo} source={googleLogo} />
      <Text style={styles.text}>Sign in with Google</Text>
    </View>
  </AwesomeButton>
);

const screenWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  contentContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    width: screenWidth * 0.8
  },
  btn: {
    marginBottom: 20
  },
  logo: {
    width: screenWidth * 0.1,
    resizeMode: "contain",
    marginHorizontal: 20
  },
  text: {
    textAlign: "center",
    fontSize: signInButtonText,
    fontWeight: "700"
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

export default GoogleButton;
