import React, { useEffect, useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  StyleSheet,
  Dimensions
} from "react-native";
import * as SecureStore from "expo-secure-store";
import { useSelector, useDispatch } from "react-redux";
import { getWorkouts } from "../../redux-store/actions";
import environmentVars from "../../../environmentVars";
import GrayBtn from "../GrayBtn";
import SetContainer from "./SetContainer";
import { white, lighterGrey } from "../../colorPalette";
import { subHeader } from "../../fontSizeEnum";

const ExerciseContainer = ({
  workoutData,
  exerciseData,
  editting,
  navigation,
  fadeAnim
}) => {
  const exerciseTemplates = useSelector((state) => state.templates.data);

  const dispatch = useDispatch();

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
    <View style={styles.container}>
      {exerciseData.map((exercise) => {
        const { exerciseName, id, templateId, sets } = exercise;
        const template = exerciseTemplates.find(
          (item) => item.id === templateId
        );
        return (
          <View
            style={[styles.container, { paddingBottom: template ? 0 : 20 }]}
            key={id}
          >
            <View style={styles.titleContainer}>
              {!editting && <Text style={styles.title}>{exerciseName}</Text>}
              {editting && (
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("DeleteForm", {
                      onPress: async () => {
                        const authToken = await SecureStore.getItemAsync(
                          "authToken"
                        );
                        await fetch(
                          `${environmentVars.serverUrl}/workouts/removeExercise`,
                          {
                            method: "POST",
                            headers: {
                              Authorization: `Bearer ${authToken}`,
                              "Content-Type": "application/json"
                            },
                            body: JSON.stringify({
                              workoutId: workoutData.id,
                              exerciseId: id
                            })
                          }
                        );
                        dispatch(getWorkouts());
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
                  <Animated.Text style={[styles.title, { opacity: fadeAnim }]}>
                    {exerciseName}
                  </Animated.Text>
                </TouchableOpacity>
              )}
            </View>
            <SetContainer
              template={template}
              workoutData={workoutData}
              exerciseData={exercise}
              exerciseName={exerciseName}
              setData={sets}
              editting={editting}
              navigation={navigation}
              fadeAnim={fadeAnim}
            />
            {template && (
              <GrayBtn
                btnText="NEW SET"
                onPress={
                  () =>
                    // eslint-disable-next-line implicit-arrow-linebreak
                    navigation.navigate("SetForm", {
                      workoutId: workoutData.id,
                      exerciseName,
                      templateId,
                      dataOptions: template.dataOptions
                    })
                  // eslint-disable-next-line react/jsx-curly-newline
                }
              />
            )}
          </View>
        );
      })}
    </View>
  );
};

const screenWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: lighterGrey,
    borderRadius: 35,
    width: screenWidth * 0.8
  },
  title: {
    color: white,
    fontSize: subHeader,
    fontWeight: "bold",
    letterSpacing: 2,
    textAlign: "center",
    marginTop: 10
  },
  titleContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: screenWidth * 0.55
  }
});

export default ExerciseContainer;
