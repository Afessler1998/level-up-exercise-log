import React, { useState } from "react";
import {
  View,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  SafeAreaView,
  StyleSheet,
  Dimensions
} from "react-native";
import SignUpTextbox from "../../components/signInScreenComponents/SignUpTextbox";
import GrayBtn from "../../components/GrayBtn";
import CancelBtn from "../../components/CancelBtn";
import environmentVars from "../../../environmentVars";
import cancellableTimeout from "../../../lib/utils/cancellableTimeout";
import { darkGrey, invalidRed, lightestGrey } from "../../colorPalette";
import { infoText } from "../../fontSizeEnum";

const ResetCodeForm = ({ navigation }) => {
  const [emailText, onChangeEmail] = useState("");
  const [errorText, setErrorText] = useState("");
  const [timeouts, setTimeouts] = useState([]);

  const childOnChangeEmail = (email) => {
    onChangeEmail(email);
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
                value={emailText}
                onChangeText={childOnChangeEmail}
                caption={
                  "Enter your email to get your 6 digit password reset code"
                }
                keyboardType={"email-address"}
                secureTextEntry={false}
              />
            </View>
            <View style={styles.errorTextContainer}>
              <Text style={styles.errorText}>{errorText}</Text>
            </View>
            <GrayBtn
              btnText={"GET RESET CODE"}
              onPress={async () => {
                const validator = new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
                if (validator.test(emailText) === false) {
                  setErrorText("Email is invalid");
                  setTimeouts([
                    ...timeouts,
                    cancellableTimeout(() => {
                      setErrorText("");
                    }, 3000)
                  ]);
                } else {
                  const serverResponse = await fetch(
                    `${environmentVars.serverUrl}/auth/resetCode`,
                    {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json"
                      },
                      body: JSON.stringify({ email: emailText })
                    }
                  );
                  const parsedResponse = await serverResponse.json();
                  if (!parsedResponse.error) {
                    timeouts.forEach((timeout) => {
                      timeout?.cancel();
                    });
                    navigation.navigate("resetPasswordForm", {
                      email: emailText
                    });
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
    flex: 1,
    backgroundColor: lightestGrey,
    borderRadius: 35,
    width: width * 0.9,
    alignItems: "center"
  },
  contentSpacingView: {
    flex: 0.6,
    justifyContent: "flex-end",
    alignItems: "center"
  },
  errorTextContainer: {
    flex: 0.4,
    justifyContent: "flex-start"
  },
  errorText: {
    width: width * 0.7,
    textAlign: "center",
    color: invalidRed,
    fontSize: infoText,
    marginTop: 20
  }
});

export default ResetCodeForm;
