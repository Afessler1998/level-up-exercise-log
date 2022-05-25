/* eslint-disable no-underscore-dangle */
import React, { useState } from "react";
import {
  Text,
  SafeAreaView,
  View,
  TouchableWithoutFeedback,
  StyleSheet,
  Keyboard,
  Dimensions
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import * as SecureStore from "expo-secure-store";
import * as Haptics from "expo-haptics";
import { getWorkouts } from "../../redux-store/actions";
import environmentVars from "../../../environmentVars";
import NewSetFormTextbox from "../../components/exerciseLogComponents/formComponents/NewSetFormTextbox";
import GrayBtn from "../../components/GrayBtn";
import CancelBtn from "../../components/CancelBtn";
import cancellableTimeout from "../../../lib/utils/cancellableTimeout";
import { darkGrey, lightestGrey, white } from "../../colorPalette";
import { infoText } from "../../fontSizeEnum";

const NewSetForm = ({ navigation }) => {
  const [weightValue, onChangeWeight] = useState("");
  const [rpeValue, onChangeRpe] = useState("");
  const [speedValue, onChangeSpeedValue] = useState("");
  const [distanceValue, onChangeDistance] = useState("");
  const [durationValue, onChangeDuration] = useState("");
  const [repsValue, onChangeReps] = useState("");
  const [heartRateValue, onChangeHeartRate] = useState("");
  const [caloriesValue, onChangeCalories] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [timeouts, setTimeouts] = useState([]);

  const childOnChangeWeight = (string) => onChangeWeight(string);
  const childOnChangeRpe = (string) => onChangeRpe(string);
  const childOnChangeAvgSpeed = (string) => onChangeSpeedValue(string);
  const childOnChangeReps = (string) => onChangeReps(string);
  const childOnChangeDuration = (string) => onChangeDuration(string);
  const childOnChangeDistance = (string) => onChangeDistance(string);
  const childOnChangeHeartRate = (string) => onChangeHeartRate(string);
  const childOnChangeCalories = (string) => onChangeCalories(string);

  const userSettings = useSelector((state) => state.userSettings.data);
  const hapticFeedback = userSettings?.hapticFeedback;

  const dispatch = useDispatch();

  const { workoutId, templateId, dataOptions } = navigation.state.params;

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView style={styles.background}>
        <View style={styles.background}>
          <View style={styles.contentContainer}>
            <View style={styles.contentSpacingView}>
              <View style={styles.textboxContainer}>
                {dataOptions.weight && (
                  <NewSetFormTextbox
                    caption="Weight"
                    textboxValue={weightValue}
                    onChangeValue={childOnChangeWeight}
                  />
                )}
                {dataOptions.reps && (
                  <NewSetFormTextbox
                    caption="Reps"
                    textboxValue={repsValue}
                    onChangeValue={childOnChangeReps}
                  />
                )}
                {dataOptions.rpe && (
                  <NewSetFormTextbox
                    caption="RPE"
                    textboxValue={rpeValue}
                    onChangeValue={childOnChangeRpe}
                  />
                )}
                {dataOptions.duration && (
                  <NewSetFormTextbox
                    caption="Duration"
                    textboxValue={durationValue}
                    onChangeValue={childOnChangeDuration}
                  />
                )}
                {dataOptions.distance && (
                  <NewSetFormTextbox
                    caption="Distance"
                    textboxValue={distanceValue}
                    onChangeValue={childOnChangeDistance}
                  />
                )}
                {dataOptions.calories && (
                  <NewSetFormTextbox
                    caption="Calories"
                    textboxValue={caloriesValue}
                    onChangeValue={childOnChangeCalories}
                  />
                )}
                {dataOptions.speed && (
                  <NewSetFormTextbox
                    caption="Speed"
                    textboxValue={speedValue}
                    onChangeValue={childOnChangeAvgSpeed}
                  />
                )}
                {dataOptions.heartRate && (
                  <NewSetFormTextbox
                    caption="Heart Rate"
                    textboxValue={heartRateValue}
                    onChangeValue={childOnChangeHeartRate}
                  />
                )}
              </View>
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
                const {
                  speed,
                  duration,
                  distance,
                  weight,
                  reps,
                  rpe,
                  heartRate,
                  calories
                } = dataOptions;
                if (
                  (speed && speedValue === "") ||
                  (duration && durationValue === "") ||
                  (distance && distanceValue === "") ||
                  (weight && weightValue === "") ||
                  (reps && repsValue === "") ||
                  (rpe && rpeValue === "") ||
                  (heartRate && heartRateValue === "") ||
                  (calories && caloriesValue === "")
                ) {
                  setErrorMsg("All input fields must be filled");
                  if (hapticFeedback) Haptics.notificationAsync("warning");
                  setTimeouts([
                    ...timeouts,
                    cancellableTimeout(() => {
                      setErrorMsg("");
                    }, 3000)
                  ]);
                } else if (
                  (speed && Number.isNaN(speedValue)) ||
                  (duration && Number.isNaN(durationValue)) ||
                  (distance && Number.isNaN(distanceValue)) ||
                  (weight && Number.isNaN(weightValue)) ||
                  (reps && Number.isNaN(repsValue)) ||
                  (rpe && Number.isNaN(rpeValue)) ||
                  (heartRate && Number.isNaN(heartRateValue)) ||
                  (calories && Number.isNaN(caloriesValue))
                ) {
                  setErrorMsg("Input fields may only contain number values");
                  if (hapticFeedback) Haptics.notificationAsync("warning");
                  setTimeouts([
                    ...timeouts,
                    cancellableTimeout(() => {
                      setErrorMsg("");
                    }, 3000)
                  ]);
                } else if (rpe && rpeValue > 10) {
                  setErrorMsg("RPE must between 1 and 10");
                  if (hapticFeedback) Haptics.notificationAsync("warning");
                  setTimeouts([
                    ...timeouts,
                    cancellableTimeout(() => {
                      setErrorMsg("");
                    }, 3000)
                  ]);
                } else {
                  const authToken = await SecureStore.getItemAsync("authToken");

                  const setData = {};
                  if (speed) {
                    setData.speed = parseFloat(speedValue);
                  }
                  if (duration) {
                    setData.duration = parseFloat(durationValue);
                  }
                  if (distance) {
                    setData.distance = parseFloat(distanceValue);
                  }
                  if (weight) setData.weight = parseFloat(weightValue);
                  if (reps) setData.reps = parseInt(repsValue, 10);
                  if (rpe) setData.rpe = parseInt(rpeValue, 10);
                  if (heartRate) {
                    setData.heartRate = parseInt(heartRateValue, 10);
                  }
                  if (calories) {
                    setData.calories = parseInt(caloriesValue, 10);
                  }
                  const serverResponse = await fetch(
                    `${environmentVars.serverUrl}/workouts/addSet`,
                    {
                      method: "POST",
                      headers: {
                        Authorization: `Bearer ${authToken}`,
                        "Content-Type": "application/json"
                      },
                      body: JSON.stringify({
                        workoutId,
                        templateId,
                        setData
                      })
                    }
                  );
                  const parsedResponse = await serverResponse.json();
                  dispatch(getWorkouts());
                  timeouts.forEach((timeout) => {
                    timeout?.cancel();
                  });
                  navigation.navigate("ExerciseLog", {
                    prStatus: parsedResponse.isPr
                  });
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
    alignItems: "center",
    justifyContent: "center"
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
    flex: 0.8,
    justifyContent: "flex-end"
  },
  textboxContainer: {
    flex: 0.8,
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "space-between",
    width: screenWidth * 0.7
  },
  errorTextContainer: {
    flex: 0.2,
    justifyContent: "flex-end"
  },
  errorText: {
    color: white,
    fontSize: infoText,
    width: screenWidth * 0.7,
    textAlign: "center",
    marginTop: -23
  }
});

export default NewSetForm;
