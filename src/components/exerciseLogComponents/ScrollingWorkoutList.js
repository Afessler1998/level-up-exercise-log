import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import WorkoutContainer from "./WorkoutContainer";
import GrayBtn from "../GrayBtn";

const ScrollingWorkoutList = ({ workoutData, navigation }) => (
  <ScrollView
    contentContainerStyle={styles.contentContainer}
    showsVerticalScrollIndicator={false}
  >
    {workoutData.map((workout) => (
      <WorkoutContainer
        // eslint-disable-next-line no-underscore-dangle
        key={workout._id}
        workoutData={workout}
        navigation={navigation}
      />
    ))}
    <GrayBtn
      btnText="NEW WORKOUT"
      onPress={() => {
        navigation.navigate("WorkoutForm");
      }}
    />
  </ScrollView>
);

const styles = StyleSheet.create({
  contentContainer: {
    alignItems: "center",
    justifyContent: "center"
  }
});

export default ScrollingWorkoutList;
