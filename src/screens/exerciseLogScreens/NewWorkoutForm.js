import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableWithoutFeedback,
  StyleSheet,
  Dimensions,
  Keyboard
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import * as SecureStore from "expo-secure-store";
import * as Haptics from "expo-haptics";
import { getMarkedDates, getWorkouts } from "../../redux-store/actions";
import environmentVars from "../../../environmentVars";
import NewWorkoutFormTextbox from "../../components/exerciseLogComponents/formComponents/NewWorkoutFormTextbox";
import GrayBtn from "../../components/GrayBtn";
import CancelBtn from "../../components/CancelBtn";
import cancellableTimeout from "../../../lib/utils/cancellableTimeout";
import { white, darkGrey, lightestGrey } from "../../colorPalette";
import { infoText } from "../../fontSizeEnum";

const NewWorkoutForm = ({ navigation }) => {
  const [workoutTitle, onChangeText] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [timeouts, setTimeouts] = useState([]);
  const date = useSelector((state) => state.date);
  const { data } = useSelector((state) => state.workouts);
  const userSettings = useSelector((state) => state.userSettings);
  const hapticFeedback = userSettings?.data?.hapticFeedback;
  const dispatch = useDispatch();

  const childOnChangeText = (string) => {
    onChangeText(string);
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView style={styles.background}>
        <View style={styles.background}>
          <View style={styles.contentContainer}>
            <View style={styles.contentSpacingView}>
              <NewWorkoutFormTextbox
                value={workoutTitle}
                onChangeText={childOnChangeText}
              />
            </View>
            <View style={styles.errorTextContainer}>
              <Text
                style={[styles.errorText, { opacity: errorMsg !== "" ? 1 : 0 }]}
              >
                {errorMsg}
              </Text>
            </View>
            <GrayBtn
              btnText="DONE"
              onPress={async () => {
                const validator = new RegExp(/^[A-Za-z\s-]+$/);
                if (workoutTitle.length === 0) {
                  setErrorMsg("Title cannot be empty");
                  if (hapticFeedback) Haptics.notificationAsync("warning");
                  setTimeouts([
                    ...timeouts,
                    cancellableTimeout(() => {
                      setErrorMsg("");
                    }, 3000)
                  ]);
                } else if (validator.test(workoutTitle) === false) {
                  setErrorMsg(
                    "Title may only contain letters, spaces, and hyphens"
                  );
                  if (hapticFeedback) Haptics.notificationAsync("warning");
                  setTimeouts([
                    ...timeouts,
                    cancellableTimeout(() => {
                      setErrorMsg("");
                    }, 3000)
                  ]);
                } else if (workoutTitle.length > 30) {
                  setErrorMsg("Title cannot contain more than 30 characters");
                  if (hapticFeedback) Haptics.notificationAsync("warning");
                  setTimeouts([
                    ...timeouts,
                    cancellableTimeout(() => {
                      setErrorMsg("");
                    }, 3000)
                  ]);
                } else {
                  const authToken = await SecureStore.getItemAsync("authToken");
                  const serverResponse = await fetch(
                    `${environmentVars.serverUrl}/workouts/addWorkout`,
                    {
                      method: "POST",
                      headers: {
                        Authorization: `Bearer ${authToken}`,
                        "Content-Type": "application/json"
                      },
                      body: JSON.stringify({
                        workoutTitle,
                        date
                      })
                    }
                  );
                  const parsedReponse = await serverResponse.json();
                  if (!parsedReponse.error) {
                    dispatch(getWorkouts());
                    if (data.length === 0) {
                      dispatch(getMarkedDates());
                    }
                  }
                  timeouts.forEach((timeout) => {
                    timeout?.cancel();
                  });
                  navigation.navigate("ExerciseLog");
                }
              }}
            />
            <CancelBtn
              onPress={() => {
                timeouts.forEach((timeout) => {
                  timeout?.cancel();
                });
                navigation.navigate("ExerciseLog");
              }}
            />
          </View>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const screenWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: darkGrey,
    alignItems: "center"
  },
  contentContainer: {
    backgroundColor: lightestGrey,
    borderRadius: 35,
    width: screenWidth * 0.9,
    alignItems: "center",
    marginTop: 5,
    marginBottom: 20,
    flex: 1
  },
  contentSpacingView: {
    flex: 0.6,
    justifyContent: "flex-end",
    alignItems: "center"
  },
  errorTextContainer: {
    flex: 0.4,
    justifyContent: "flex-end"
  },
  errorText: {
    color: white,
    fontSize: infoText,
    width: screenWidth * 0.7,
    textAlign: "center"
  }
});

export default NewWorkoutForm;
