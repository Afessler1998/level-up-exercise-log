import React, { useState } from "react";
import {
  View,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  Dimensions,
  SafeAreaView,
  StyleSheet
} from "react-native";
import * as Haptics from "expo-haptics";
import SignUpTextbox from "../../components/signInScreenComponents/SignUpTextbox";
import ValidationIndicator from "../../components/signInScreenComponents/ValidationIndicator";
import Graybtn from "../../components/GrayBtn";
import CancelBtn from "../../components/CancelBtn";
import environmentVars from "../../../environmentVars";
import cancellableTimeout from "../../../lib/utils/cancellableTimeout";
import { darkGrey, invalidRed, lightestGrey } from "../../colorPalette";
import { infoText } from "../../fontSizeEnum";

const ResetPasswordForm = ({ navigation }) => {
  const [resetCode, setResetCode] = useState("");
  const [password, setPassword] = useState("");
  const [validatePassword, setValidatePassword] = useState("");
  const [isValidInfo, setIsValidInfo] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [timeouts, setTimeouts] = useState([]);

  const childSetResetCode = (string) => {
    setResetCode(string);
  };

  const childSetPassword = (string) => {
    setPassword(string);
  };

  const childSetValidatePassword = (string) => {
    setValidatePassword(string);
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
                value={resetCode}
                onChangeText={childSetResetCode}
                caption={"Reset code"}
                secureTextEntry={false}
                keyboardType={"numeric"}
              />
              <SignUpTextbox
                value={password}
                onChangeText={childSetPassword}
                caption={"New password"}
                secureTextEntry={true}
              />
              <SignUpTextbox
                value={validatePassword}
                onChangeText={childSetValidatePassword}
                caption={"Confirm new password"}
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
                  text={"Password has at least 8 characters"}
                  validator={() => {
                    const { length } = password;
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
                    const { length } = password;
                    for (let i = 0; i < length; i += 1) {
                      const currentCharacter = password[i];
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
                    const { length } = password;
                    for (let i = 0; i < length; i += 1) {
                      const currentCharacter = password[i];
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
                    const { length } = password;
                    for (let i = 0; i < length; i += 1) {
                      const currentCharacter = password[i];
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
                    const pwLength = password.length;
                    const vPwLength = validatePassword.length;
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
                      const pwCharacter = password[i];
                      const vPwCharacter = validatePassword[i];
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
            <Graybtn
              btnText={"RESET PASSWORD"}
              onPress={async () => {
                if (resetCode.length !== 6) {
                  setErrorText("Reset code must be 6 digits");
                  Haptics.notificationAsync("warning");
                  setTimeouts([
                    ...timeouts,
                    cancellableTimeout(() => {
                      setErrorText("");
                    }, 3000)
                  ]);
                } else if (!isValidInfo) {
                  Haptics.notificationAsync("warning");
                } else {
                  const email = navigation.getParam("email");
                  const serverResponse = await fetch(
                    `${environmentVars.serverUrl}/auth/resetPassword`,
                    {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json"
                      },
                      body: JSON.stringify({
                        email,
                        resetCode,
                        password,
                        confirmPassword: validatePassword
                      })
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
                navigation.navigate("signInForm");
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
    backgroundColor: darkGrey,
    alignItems: "center"
  },
  contentContainer: {
    width: width * 0.9,
    borderRadius: 35,
    backgroundColor: lightestGrey,
    flex: 1,
    alignItems: "center"
  },
  contentSpacingView: {
    flex: 1,
    justifyContent: "center"
  },
  errorTextContainer: {
    flex: 1,
    justifyContent: "center"
  },
  errorText: {
    fontSize: infoText,
    color: invalidRed,
    marginVertical: 10,
    width: width * 0.7,
    textAlign: "center"
  }
});

export default ResetPasswordForm;
