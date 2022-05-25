import React from "react";
import { Text, View, StyleSheet, Dimensions } from "react-native";
import AwesomeButton from "react-native-really-awesome-button";
import { white, blueishGrey } from "../../colorPalette";
import { signInButtonText } from "../../fontSizeEnum";
import RoundBackgroundLogo from "./RoundBackgroundLogo";

const screenWidth = Dimensions.get("window").width;

const SignInBtn = ({ onPress }) => (
  <AwesomeButton
    onPress={onPress}
    width={screenWidth * 0.8}
    height={60}
    backgroundColor={white}
    backgroundActive={white}
    borderColor={blueishGrey}
    borderWidth={1}
    borderRadius={50}
    style={styles.btn}
    raiseLevel={1.5}
    backgroundDarker={blueishGrey}
  >
    <View style={styles.contentContainer}>
      <View style={styles.logo}>
        <RoundBackgroundLogo size={screenWidth * 0.1} />
      </View>
      <Text style={styles.text}>Sign in with Email</Text>
    </View>
  </AwesomeButton>
);

const styles = StyleSheet.create({
  btn: { marginBottom: 20 },
  contentContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    width: screenWidth * 0.8
  },
  logo: {
    marginHorizontal: 20
  },
  text: {
    textAlign: "center",
    fontSize: signInButtonText,
    fontWeight: "700"
  }
});

export default SignInBtn;
