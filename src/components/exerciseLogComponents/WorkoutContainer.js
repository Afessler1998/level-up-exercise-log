import React, { useEffect, useCallback, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  StyleSheet,
  Dimensions
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import * as SecureStore from "expo-secure-store";
import * as Haptics from "expo-haptics";
import { getMarkedDates, getWorkouts } from "../../redux-store/actions";
import environmentVars from "../../../environmentVars";
import EditWorkoutButton from "./Buttons/EditWorkoutButton";
import DoneEdittingWorkoutButton from "./Buttons/DoneEdittingWorkoutButton";
import GrayBtn from "../GrayBtn";
import ExerciseContainer from "./ExerciseContainer";
import { lightestGrey, white } from "../../colorPalette";
import { header, infoText } from "../../fontSizeEnum";

const WorkoutContainer = ({ workoutData, navigation }) => {
  const { workoutTitle, exercises, id } = workoutData;
  const { data } = useSelector((state) => state.workouts);
  const { hapticFeedback } = useSelector((state) => state.userSettings).data;
  const [editting, setEditting] = useState(false);
  const dispatch = useDispatch();

  const fadeAnim = new Animated.Value(1);

  const runAnimation = useCallback(() => {
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 700,
        useNativeDriver: true
      }),
      Animated.timing(fadeAnim, {
        toValue: 0.5,
        duration: 700,
        useNativeDriver: true
      })
    ]).start(runAnimation);
  }, [fadeAnim]);

  useEffect(() => {
    if (editting) runAnimation();
  }, [editting, runAnimation]);

  return (
    <View style={styles.contentContainer}>
      <View style={styles.buttonPositioningView}>
        {!editting && <Text style={styles.titleText}>{workoutTitle}</Text>}
        {editting && (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("DeleteForm", {
                onPress: async () => {
                  const authToken = await SecureStore.getItemAsync("authToken");
                  const serverResponse = await fetch(
                    `${environmentVars.serverUrl}/workouts/removeWorkout`,
                    {
                      method: "POST",
                      headers: {
                        Authorization: `Bearer ${authToken}`,
                        "Content-Type": "application/json"
                      },
                      body: JSON.stringify({
                        workoutId: id
                      })
                    }
                  );
                  const parsedResponse = await serverResponse.json();
                  if (!parsedResponse.error) {
                    dispatch(getWorkouts());
                    if (data.length === 1) {
                      dispatch(getMarkedDates());
                    }
                  }
                  navigation.navigate("ExerciseLog");
                }
              });
            }}
            hitSlop={{
              top: 10,
              left: 10,
              bottom: 10,
              right: 10
            }}
          >
            <Animated.Text style={[styles.titleText, { opacity: fadeAnim }]}>
              {workoutTitle}
            </Animated.Text>
          </TouchableOpacity>
        )}
        {!editting && (
          <EditWorkoutButton
            onPress={() => {
              if (hapticFeedback) Haptics.impactAsync("light");
              setEditting(true);
            }}
          />
        )}
        {editting && (
          <DoneEdittingWorkoutButton
            onPress={() => {
              if (hapticFeedback) Haptics.impactAsync("light");
              setEditting(false);
            }}
          />
        )}
      </View>
      {editting && (
        <Text style={styles.edittingMsgText}>Select an item to delete</Text>
      )}
      {workoutData.exercises.length > 0 && (
        <ExerciseContainer
          workoutData={workoutData}
          exerciseData={exercises}
          editting={editting}
          navigation={navigation}
          fadeAnim={fadeAnim}
        />
      )}
      <GrayBtn
        btnText="NEW EXERCISE"
        onPress={
          () =>
            // eslint-disable-next-line implicit-arrow-linebreak
            navigation.navigate("ExerciseForm", {
              id
            })
          // eslint-disable-next-line react/jsx-curly-newline
        }
      />
    </View>
  );
};

const screenWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  contentContainer: {
    backgroundColor: lightestGrey,
    borderRadius: 35,
    width: screenWidth * 0.9,
    alignItems: "center",
    marginTop: 20
  },
  buttonPositioningView: {
    width: screenWidth * 0.75,
    justifyContent: "center",
    alignItems: "center"
  },
  titleText: {
    color: white,
    fontSize: header,
    fontWeight: "bold",
    letterSpacing: 2,
    marginTop: 10,
    marginBottom: 10,
    textAlign: "center",
    width: screenWidth * 0.55
  },
  edittingMsgText: {
    color: white,
    fontSize: infoText,
    marginBottom: 10
  }
});

export default WorkoutContainer;
