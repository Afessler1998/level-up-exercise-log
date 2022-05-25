/* eslint-disable no-underscore-dangle */
import React, { useCallback, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  StyleSheet,
  Dimensions
} from "react-native";
import { useDispatch } from "react-redux";
import * as SecureStore from "expo-secure-store";
import { getWorkouts } from "../../redux-store/actions";
import environmentVars from "../../../environmentVars";
import SvgLogo from "../SvgLogo";
import { white, lighterGrey } from "../../colorPalette";
import { infoText } from "../../fontSizeEnum";

const SetContainer = ({
  workoutData,
  exerciseData,
  setData,
  editting,
  navigation,
  fadeAnim,
  template
}) => {
  const dispatch = useDispatch();

  const exerciseType = template?.exerciseType;

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

  let setNumber = 0;
  return (
    <>
      {setData.map((set) => {
        setNumber += 1;

        const dataOptionsKeys = Object.keys(template?.dataOptions ?? []);
        const dataOptions = [];
        dataOptionsKeys.forEach((key) => {
          if (template?.dataOptions[key]) {
            dataOptions.push(key);
          }
        });

        const dataColOne = [];
        const dataColTwo = [];

        const animDataColOne = [];
        const animDataColTwo = [];

        for (let i = 0; i < dataOptions.length; i += 1) {
          const dataOption = dataOptions[i];
          let dataComponent;
          let animDataComponent;
          switch (dataOption) {
            case "weight":
              dataComponent = (
                <Text
                  key={"weight"}
                  style={styles.text}
                >{`Weight: ${set.weight} `}</Text>
              );
              animDataComponent = (
                <Animated.Text
                  key={"weight"}
                  style={[styles.text, { opacity: fadeAnim }]}
                >
                  {`Weight: ${set.weight} `}
                </Animated.Text>
              );
              break;
            case "reps":
              dataComponent = (
                <Text
                  key={"reps"}
                  style={styles.text}
                >{`Reps: ${set.reps} `}</Text>
              );
              animDataComponent = (
                <Animated.Text
                  key={"reps"}
                  style={[styles.text, { opacity: fadeAnim }]}
                >
                  {`Reps: ${set.reps} `}
                </Animated.Text>
              );
              break;
            case "rpe":
              dataComponent = (
                <Text
                  key={"rpe"}
                  style={styles.text}
                >{`RPE: ${set.rpe} `}</Text>
              );
              animDataComponent = (
                <Animated.Text
                  key={"rpe"}
                  style={[styles.text, { opacity: fadeAnim }]}
                >
                  {`RPE: ${set.rpe} `}
                </Animated.Text>
              );
              break;
            case "duration":
              dataComponent = (
                <Text
                  key={"duration"}
                  style={styles.text}
                >{`Duration: ${set.duration} `}</Text>
              );
              animDataComponent = (
                <Animated.Text
                  key={"duration"}
                  style={[styles.text, { opacity: fadeAnim }]}
                >
                  {`Duration: ${set.duration} `}
                </Animated.Text>
              );
              break;
            case "speed":
              dataComponent = (
                <Text
                  key={"speed"}
                  style={styles.text}
                >{`Speed: ${set.speed} `}</Text>
              );
              animDataComponent = (
                <Animated.Text
                  key={"speed"}
                  style={[styles.text, { opacity: fadeAnim }]}
                >
                  {`Speed: ${set.speed} `}
                </Animated.Text>
              );
              break;
            case "calories":
              dataComponent = (
                <Text
                  key={"calories"}
                  style={styles.text}
                >{`Calories: ${set.calories} `}</Text>
              );
              animDataComponent = (
                <Animated.Text
                  key={"calories"}
                  style={[styles.text, { opacity: fadeAnim }]}
                >
                  {`Calories: ${set.calories} `}
                </Animated.Text>
              );
              break;
            case "distance":
              dataComponent = (
                <Text
                  key={"distance"}
                  style={styles.text}
                >{`Distance: ${set.distance} `}</Text>
              );
              animDataComponent = (
                <Animated.Text
                  key={"distance"}
                  style={[styles.text, { opacity: fadeAnim }]}
                >
                  {`Distance: ${set.distance} `}
                </Animated.Text>
              );
              break;
            case "heartRate":
              dataComponent = (
                <Text key={"heartRate"} style={styles.text}>
                  {`Heart Rate: ${set.heartRate} `}
                </Text>
              );
              animDataComponent = (
                <Animated.Text
                  key={"heartRate"}
                  style={[styles.text, { opacity: fadeAnim }]}
                >
                  {`Heart Rate: ${set.heartRate} `}
                </Animated.Text>
              );
              break;
            default:
              break;
          }
          if (i % 2 === 0) {
            dataColOne.push(dataComponent);
            animDataColOne.push(animDataComponent);
          } else {
            dataColTwo.push(dataComponent);
            animDataColTwo.push(animDataComponent);
          }
        }

        if (editting) {
          return (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("DeleteForm", {
                  onPress: async () => {
                    const authToken = await SecureStore.getItemAsync(
                      "authToken"
                    );
                    await fetch(
                      `${environmentVars.serverUrl}/workouts/removeSet`,
                      {
                        method: "POST",
                        headers: {
                          Authorization: `Bearer ${authToken}`,
                          "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                          workoutId: workoutData.id,
                          exerciseId: exerciseData.id,
                          setId: set.id
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
              key={set._id}
            >
              <View style={styles.contentContainer}>
                {exerciseType &&
                  exerciseType === "Cardio" &&
                  setData.length > 1 && (
                    <View style={styles.captionContainer}>
                      <Animated.Text
                        style={[styles.captionText, { opacity: fadeAnim }]}
                      >
                        {`Set ${setNumber}:`}
                      </Animated.Text>
                      <Animated.View style={{ opacity: fadeAnim }}>
                        {set.isPr && (
                          <SvgLogo size={24} backgroundColor={lighterGrey} />
                        )}
                      </Animated.View>
                    </View>
                  )}
                {exerciseType && exerciseType !== "Cardio" && (
                  <View style={styles.captionContainer}>
                    <Animated.Text
                      style={[styles.captionText, { opacity: fadeAnim }]}
                    >
                      {`Set ${setNumber}:`}
                    </Animated.Text>
                    <Animated.View style={{ opacity: fadeAnim }}>
                      {set.isPr && (
                        <SvgLogo size={24} backgroundColor={lighterGrey} />
                      )}
                    </Animated.View>
                  </View>
                )}
                <View style={styles.dataContainer}>
                  <View style={styles.dataColOne}>{animDataColOne}</View>
                  <View style={styles.dataColTwo}>{animDataColTwo}</View>
                </View>
              </View>
            </TouchableOpacity>
          );
        }
        return (
          <View style={styles.contentContainer} key={set._id}>
            {exerciseType && exerciseType === "Cardio" && setData.length > 1 && (
              <View style={styles.captionContainer}>
                <Text style={styles.captionText}>{`Set ${setNumber}:`}</Text>
                {set.isPr && (
                  <SvgLogo size={24} backgroundColor={lighterGrey} />
                )}
              </View>
            )}
            {exerciseType && exerciseType !== "Cardio" && (
              <View style={styles.captionContainer}>
                <Text style={styles.captionText}>{`Set ${setNumber}:`}</Text>
                {set.isPr && (
                  <SvgLogo size={24} backgroundColor={lighterGrey} />
                )}
              </View>
            )}
            <View style={styles.dataContainer}>
              <View style={styles.dataColOne}>{dataColOne}</View>
              <View style={styles.dataColTwo}>{dataColTwo}</View>
            </View>
          </View>
        );
      })}
    </>
  );
};

const screenWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  contentContainer: {
    marginTop: 10,
    alignItems: "center"
  },
  captionContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: screenWidth * 0.7
  },
  captionText: {
    color: white,
    fontSize: infoText,
    textAlign: "center",
    fontWeight: "bold"
  },
  dataContainer: {
    flexDirection: "row",
    width: screenWidth * 0.75,
    justifyContent: "space-evenly"
  },
  text: {
    color: white,
    fontSize: infoText,
    marginTop: 5
  }
});

export default SetContainer;
