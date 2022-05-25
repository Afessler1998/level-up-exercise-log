import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard,
  StyleSheet,
  Dimensions
} from "react-native";
import * as Haptics from "expo-haptics";
import SignUpTextbox from "../../components/signInScreenComponents/SignUpTextbox";
import GrayBtn from "../../components/GrayBtn";
import CancelBtn from "../../components/CancelBtn";
import ValidationIndicator from "../../components/signInScreenComponents/ValidationIndicator";
import cancellableTimeout from "../../../lib/utils/cancellableTimeout";
import { darkGrey, invalidRed, lightestGrey } from "../../colorPalette";
import environmentVars from "../../../environmentVars";
import { infoText } from "../../fontSizeEnum";

const SignUpForm = ({ navigation }) => {
  const [emailText, onChangeEmailText] = useState("");
  const [pwText, onChangePwText] = useState("");
  const [validatePwText, onChangeValidatePwText] = useState("");

  const [isValidInfo, setIsValidInfo] = useState(false);

  const [errorText, setErrorText] = useState("");
  const [timeouts, setTimeouts] = useState([]);

  const childOnChangeEmail = (email) => {
    onChangeEmailText(email);
  };

  const childOnChangePw = (pw) => {
    onChangePwText(pw);
  };

  const childOnChangeValidatePw = (validatePw) => {
    onChangeValidatePwText(validatePw);
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <SafeAreaView style={styles.background}>
        <View style={styles.background}>
          <View style={styles.contentContainer}>
            <View style={styles.contentSpacingView}>
              <SignUpTextbox
                caption={"Email"}
                onChangeText={childOnChangeEmail}
                value={emailText}
                keyboardType={"email-address"}
                secureTextEntry={false}
              />
              <SignUpTextbox
                caption={"Password"}
                onChangeText={childOnChangePw}
                value={pwText}
                secureTextEntry={true}
              />
              <SignUpTextbox
                caption={"Confirm Password"}
                onChangeText={childOnChangeValidatePw}
                value={validatePwText}
                secureTextEntry={true}
              />
              <View style={styles.errorTextContainer}>
                <Text
                  style={[
                    styles.errorText,
                    { opacity: errorText !== "" ? 1 : 0 }
                  ]}
                >
                  {errorText}
                </Text>
              </View>
              <View style={styles.validatorsContainer}>
                <ValidationIndicator
                  text={"Email is valid"}
                  validator={() => {
                    const validator = new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
                    if (validator.test(emailText) === false) {
                      setIsValidInfo(false);
                      return false;
                    }
                    setIsValidInfo(true);
                    return true;
                  }}
                />
                <ValidationIndicator
                  text={"Password has at least 8 characters"}
                  validator={() => {
                    const { length } = pwText;
                    if (length >= 8) {
                      setIsValidInfo(true);
                      return true;
                    }
                    setIsValidInfo(false);
                    return false;
                  }}
                />
                <ValidationIndicator
                  text={"Password has uppercase"}
                  validator={() => {
                    let containsUppercase = false;
                    const { length } = pwText;
                    for (let i = 0; i < length; i += 1) {
                      const currentCharacter = pwText[i];
                      if (
                        currentCharacter &&
                        currentCharacter === currentCharacter.toUpperCase() &&
                        isNaN(currentCharacter)
                      ) {
                        containsUppercase = true;
                      }
                    }
                    if (containsUppercase === false) {
                      setIsValidInfo(false);
                      return false;
                    }
                    setIsValidInfo(true);
                    return true;
                  }}
                />
                <ValidationIndicator
                  text={"Password has lowercase"}
                  validator={() => {
                    let containsLowercase = false;
                    const { length } = pwText;
                    for (let i = 0; i < length; i += 1) {
                      const currentCharacter = pwText[i];
                      if (
                        currentCharacter &&
                        currentCharacter === currentCharacter.toLowerCase() &&
                        isNaN(currentCharacter)
                      ) {
                        containsLowercase = true;
                      }
                    }
                    if (containsLowercase === false) {
                      setIsValidInfo(false);
                      return false;
                    }
                    setIsValidInfo(true);
                    return true;
                  }}
                />
                <ValidationIndicator
                  text={"Password has number"}
                  validator={() => {
                    let containsNumber = false;
                    const { length } = pwText;
                    for (let i = 0; i < length; i += 1) {
                      const currentCharacter = pwText[i];
                      if (currentCharacter && !isNaN(currentCharacter)) {
                        containsNumber = true;
                      }
                    }
                    if (containsNumber === false) {
                      setIsValidInfo(false);
                      return false;
                    }
                    setIsValidInfo(true);
                    return true;
                  }}
                />
                <ValidationIndicator
                  text={"Passwords match"}
                  validator={() => {
                    const pwLength = pwText.length;
                    const vPwLength = validatePwText.length;
                    if (pwLength === 0) {
                      setIsValidInfo(false);
                      return false;
                    }
                    if (pwLength !== vPwLength) {
                      setIsValidInfo(false);
                      return false;
                    }
                    let passwordsMatch = true;
                    for (let i = 0; i < pwLength; i += 1) {
                      const pwCharacter = pwText[i];
                      const vPwCharacter = validatePwText[i];
                      if (pwCharacter !== vPwCharacter) {
                        passwordsMatch = false;
                      }
                    }
                    if (passwordsMatch === true) {
                      setIsValidInfo(true);
                      return true;
                    }
                    setIsValidInfo(false);
                    return false;
                  }}
                />
              </View>
            </View>
            <GrayBtn
              btnText={"DONE"}
              onPress={async () => {
                if (!isValidInfo) {
                  Haptics.notificationAsync("warning");
                } else {
                  const body = JSON.stringify({
                    email: emailText,
                    password: pwText,
                    confirmPassword: validatePwText
                  });
                  const serverResponse = await fetch(
                    `${environmentVars.serverUrl}/auth/signUp`,
                    {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json"
                      },
                      body
                    }
                  );
                  const parsedResponse = await serverResponse.json();
                  if (parsedResponse.error) {
                    setErrorText(parsedResponse.msg);
                    setTimeouts([
                      ...timeouts,
                      cancellableTimeout(() => {
                        setErrorText("");
                      }, 3000)
                    ]);
                  } else {
                    timeouts.forEach((timeout) => {
                      timeout?.cancel();
                    });
                    navigation.navigate("signInForm");
                  }
                }
              }}
            />
            <CancelBtn
              onPress={() => {
                timeouts.forEach((timeout) => {
                  timeout?.cancel();
                });
                navigation.navigate("signInScreen");
              }}
            />
          </View>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  background: {
    flex: 1,
    alignItems: "center",
    backgroundColor: darkGrey
  },
  contentContainer: {
    backgroundColor: lightestGrey,
    width: width * 0.9,
    flex: 1,
    alignItems: "center",
    borderRadius: 35
  },
  contentSpacingView: {
    flex: 1,
    justifyContent: "space-around"
  },
  errorTextContainer: {
    flex: 1,
    justifyContent: "center"
  },
  errorText: {
    color: invalidRed,
    fontSize: infoText,
    marginTop: 10,
    width: width * 0.7,
    textAlign: "center"
  }
});

export default SignUpForm;
