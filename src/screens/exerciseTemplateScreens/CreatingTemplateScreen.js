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
import * as SecureStore from "expo-secure-store";
import * as Haptics from "expo-haptics";
import { useDispatch, useSelector } from "react-redux";
import { getTemplates } from "../../redux-store/actions";
import ExerciseNameInput from "../../components/exerciseTemplateComponents/ExerciseNameInput";
import ExerciseTypeSelector from "../../components/exerciseTemplateComponents/ExerciseTypeSelector";
import DataOptionsView from "../../components/exerciseTemplateComponents/DataOptionsView";
import GrayBtn from "../../components/GrayBtn";
import CancelBtn from "../../components/CancelBtn";
import environmentVars from "../../../environmentVars";
import cancellableTimeout from "../../../lib/utils/cancellableTimeout";
import { white, lightestGrey, darkGrey } from "../../colorPalette";
import { infoText } from "../../fontSizeEnum";

const CreatingTemplateScreen = ({ navigation }) => {
  const [exerciseName, setExerciseName] = useState("Exercise Name");
  const [exerciseType, setExerciseType] = useState("Strength");
  const [dataOptions, setDataOptions] = useState({
    weight: false,
    reps: false,
    rpe: false,
    duration: false,
    distance: false,
    speed: false,
    heartRate: false,
    calories: false
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [timeouts, setTimeouts] = useState([]);

  const userSettings = useSelector((state) => state.userSettings.data);
  const hapticFeedback = userSettings?.hapticFeedback;

  const dispatch = useDispatch();

  const childSetExerciseName = (string) => {
    setExerciseName(string);
  };

  const childSetExerciseType = (string) => {
    setExerciseType(string);
  };

  const childSetDataOptions = (object) => {
    setDataOptions(object);
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView style={styles.background}>
        <View style={styles.background}>
          <View style={styles.contentContainer}>
            <View style={styles.contentSpacingView}>
              <ExerciseNameInput
                exerciseName={exerciseName}
                setExerciseName={childSetExerciseName}
              />
              <ExerciseTypeSelector
                exerciseType={exerciseType}
                setExerciseType={childSetExerciseType}
                setDataOptions={childSetDataOptions}
              />
              <DataOptionsView
                exerciseType={exerciseType}
                dataOptions={dataOptions}
                setDataOptions={childSetDataOptions}
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
                if (validator.test(exerciseName) === false) {
                  setErrorMsg(
                    "Exercise name may only contain letters, spaces, and hyphens"
                  );
                  if (hapticFeedback) Haptics.notificationAsync("warning");
                  setTimeouts([
                    ...timeouts,
                    cancellableTimeout(() => {
                      setErrorMsg("");
                    }, 3000)
                  ]);
                } else if (exerciseName.length > 30) {
                  setErrorMsg(
                    "Exercise name cannot contain more than 30 characters"
                  );
                  if (hapticFeedback) Haptics.notificationAsync("warning");
                  setTimeouts([
                    ...timeouts,
                    cancellableTimeout(() => {
                      setErrorMsg("");
                    }, 3000)
                  ]);
                } else if (
                  !dataOptions.weight &&
                  !dataOptions.reps &&
                  !dataOptions.rpe &&
                  !dataOptions.duration &&
                  !dataOptions.distance &&
                  !dataOptions.speed &&
                  !dataOptions.heartRate &&
                  !dataOptions.calories
                ) {
                  setErrorMsg("At least one data option must be selected");
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
                    `${environmentVars.serverUrl}/templates/addTemplate`,
                    {
                      method: "POST",
                      headers: {
                        Authorization: `Bearer ${authToken}`,
                        "Content-Type": "application/json"
                      },
                      body: JSON.stringify({
                        exerciseName,
                        exerciseType,
                        dataOptions
                      })
                    }
                  );
                  const parsedResponse = await serverResponse.json();
                  if (!parsedResponse.error) {
                    dispatch(getTemplates());
                  }
                  timeouts.forEach((timeout) => {
                    timeout?.cancel();
                  });
                  const navFrom = navigation.getParam("navFrom");
                  if (navFrom && navFrom === "NoTemplatesMsg") {
                    navigation.navigate("SelectTemplate");
                    navigation.navigate("ExerciseForm");
                  } else {
                    navigation.navigate("SelectTemplate");
                  }
                }
              }}
            />
            <CancelBtn
              btnText="CANCEL"
              onPress={() => {
                timeouts.forEach((timeout) => {
                  timeout?.cancel();
                });
                const navFrom = navigation.getParam("navFrom");
                if (navFrom && navFrom === "NoTemplatesMsg") {
                  navigation.navigate("SelectTemplate");
                  navigation.navigate("ExerciseForm");
                } else {
                  navigation.navigate("SelectTemplate");
                }
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
    flex: 1,
    marginBottom: 20
  },
  contentSpacingView: {
    flex: 0.9,
    alignItems: "center"
  },
  errorTextContainer: {
    flex: 0.1,
    justifyContent: "center"
  },
  errorText: {
    color: white,
    fontSize: infoText,
    width: screenWidth * 0.7,
    textAlign: "center"
  }
});

export default CreatingTemplateScreen;
