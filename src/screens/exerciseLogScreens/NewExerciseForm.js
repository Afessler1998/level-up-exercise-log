import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  View,
  SafeAreaView,
  TouchableWithoutFeedback,
  StyleSheet,
  Dimensions,
  Keyboard
} from "react-native";
import * as SecureStore from "expo-secure-store";
import { getWorkouts } from "../../redux-store/actions";
import environmentVars from "../../../environmentVars";
import LoadingSpinner from "../../components/LoadingSpinner";
import NoTemplatesMsg from "../../components/exerciseLogComponents/formComponents/NoTemplatesMsg";
import GrayBtn from "../../components/GrayBtn";
import CancelBtn from "../../components/CancelBtn";
import ExerciseTemplateSelector from "../../components/exerciseLogComponents/formComponents/ExerciseTemplateSelector";
import { darkGrey, lightestGrey } from "../../colorPalette";

const NewExerciseForm = ({ navigation }) => {
  const [selectedExercise, setExercise] = useState("");

  const exerciseTemplates = useSelector((state) => state.templates);
  const exerciseNames = exerciseTemplates.data.map(
    (template) => template.exerciseName
  );

  if (selectedExercise === "" && exerciseNames.length > 0) {
    setExercise(exerciseNames[0]);
  }

  const selectedTemplate = exerciseTemplates.data.find(
    (template) => template.exerciseName === selectedExercise
  );

  const dispatch = useDispatch();

  const { pending } = exerciseTemplates;
  const { id } = navigation.state.params;

  const childSetExercise = (string) => {
    setExercise(string);
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView style={styles.background}>
        <View style={styles.background}>
          {pending && <LoadingSpinner />}
          {!pending && exerciseNames.length === 0 && (
            <NoTemplatesMsg navigation={navigation} />
          )}
          {!pending && exerciseNames.length > 0 && (
            <View style={styles.contentContainer}>
              <ExerciseTemplateSelector
                exerciseNames={exerciseNames}
                setExercise={childSetExercise}
              />
              <GrayBtn
                btnText="DONE"
                onPress={async () => {
                  const authToken = await SecureStore.getItemAsync("authToken");
                  const workoutId = id.toString();
                  const exerciseName = selectedExercise.toString();
                  const templateId = selectedTemplate.id;
                  await fetch(
                    `${environmentVars.serverUrl}/workouts/addExercise`,
                    {
                      method: "POST",
                      headers: {
                        Authorization: `Bearer ${authToken}`,
                        "Content-Type": "application/json"
                      },
                      body: JSON.stringify({
                        workoutId,
                        exerciseName,
                        templateId
                      })
                    }
                  );
                  dispatch(getWorkouts());
                  navigation.navigate("ExerciseLog");
                }}
              />
              <CancelBtn onPress={() => navigation.navigate("ExerciseLog")} />
            </View>
          )}
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
  }
});

export default NewExerciseForm;
