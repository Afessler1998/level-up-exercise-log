import React, { useState } from "react";
import {
  View,
  SafeAreaView,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Keyboard,
  StyleSheet,
  Dimensions,
  Text
} from "react-native";
import { useDispatch } from "react-redux";
import * as Haptics from "expo-haptics";
import * as SecureStore from "expo-secure-store";
import {
  getMarkedDates,
  getTemplates,
  getUserSettings,
  getWorkouts
} from "../../redux-store/actions";
import SignUpTextbox from "../../components/signInScreenComponents/SignUpTextbox";
import GrayBtn from "../../components/GrayBtn";
import CancelBtn from "../../components/CancelBtn";
import environmentVars from "../../../environmentVars";
import cancellableTimeout from "../../../lib/utils/cancellableTimeout";
import { darkGrey, invalidRed, lightestGrey, white } from "../../colorPalette";
import { infoText, signInButtonText } from "../../fontSizeEnum";

const SignInForm = ({ navigation }) => {
  const [emailText, onChangeEmailText] = useState("");
  const [passwordText, onChangePasswordText] = useState("");

  const [errorText, setErrorText] = useState("");
  const [timeouts, setTimeouts] = useState([]);

  const dispatch = useDispatch();

  const childOnChangeEmailText = (email) => {
    onChangeEmailText(email);
  };

  const childOnChangePasswordText = (password) => {
    onChangePasswordText(password);
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView style={styles.background}>
        <View style={styles.background}>
          <View style={styles.contentContainer}>
            <View style={styles.contentSpacingView}>
              <View style={styles.textboxContainer}>
                <SignUpTextbox
                  value={emailText}
                  onChangeText={childOnChangeEmailText}
                  caption={"Email"}
                  keyboardType={"email-address"}
                  secureTextEntry={false}
                />
                <SignUpTextbox
                  value={passwordText}
                  onChangeText={childOnChangePasswordText}
                  caption={"Password"}
                  secureTextEntry={true}
                />
              </View>
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
            </View>
            <TouchableOpacity
              onPress={() => {
                timeouts.forEach((timeout) => {
                  timeout?.cancel();
                });
                navigation.navigate("resetCodeForm");
              }}
              hitSlop={{
                top: 10,
                left: 10,
                right: 10,
                bottom: 10
              }}
            >
              <Text style={styles.text}>Forgot Password?</Text>
            </TouchableOpacity>
            <GrayBtn
              btnText={"SIGN IN"}
              onPress={async () => {
                const body = JSON.stringify({
                  email: emailText,
                  password: passwordText
                });
                const serverResponse = await fetch(
                  `${environmentVars.serverUrl}/auth/signIn`,
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
                  Haptics.notificationAsync("warning");
                  setTimeouts([
                    ...timeouts,
                    cancellableTimeout(() => {
                      setErrorText("");
                    }, 3000)
                  ]);
                } else {
                  const token = parsedResponse?.token;
                  await SecureStore.setItemAsync("authToken", token);
                  dispatch(getWorkouts());
                  dispatch(getMarkedDates());
                  dispatch(getTemplates());
                  dispatch(getUserSettings());
                  timeouts.forEach((timeout) => {
                    timeout?.cancel();
                  });
                  navigation.navigate("mainFlow");
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
    backgroundColor: darkGrey,
    flex: 1,
    alignItems: "center"
  },
  contentContainer: {
    flex: 1,
    borderRadius: 35,
    backgroundColor: lightestGrey,
    width: width * 0.9,
    alignItems: "center"
  },
  contentSpacingView: {
    flex: 1
  },
  textboxContainer: {
    flex: 0.6,
    justifyContent: "flex-end"
  },
  errorTextContainer: {
    flex: 0.4,
    justifyContent: "center"
  },
  errorText: {
    color: invalidRed,
    fontSize: infoText,
    width: width * 0.7,
    textAlign: "center"
  },
  text: {
    color: white,
    fontSize: signInButtonText,
    textAlign: "center"
  }
});

export default SignInForm;
