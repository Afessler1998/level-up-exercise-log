import React from "react";
import { useSelector } from "react-redux";
import { View, StyleSheet } from "react-native";
import LoadingSpinner from "../../components/LoadingSpinner";
import NewPrModal from "../../components/exerciseLogComponents/NewPrModal";
import DateHeader from "../../components/exerciseLogComponents/DateHeader";
import NoWorkoutMsg from "../../components/exerciseLogComponents/NoWorkoutMsg";
import ScrollingWorkoutList from "../../components/exerciseLogComponents/ScrollingWorkoutList";
import { darkGrey } from "../../colorPalette";

const ExerciseLogScreen = ({ navigation }) => {
  const { data, pending } = useSelector((state) => state.workouts);
  const date = new Date(useSelector((state) => state.date));

  return (
    <View style={styles.background}>
      {pending && <LoadingSpinner />}
      {!pending && (
        <>
          <NewPrModal
            prStatus={navigation.getParam("prStatus")}
            navigation={navigation}
          />
          <DateHeader date={date} />
          <View style={styles.contentContainer}>
            {data.length === 0 && <NoWorkoutMsg navigation={navigation} />}
            {data.length > 0 && (
              <ScrollingWorkoutList
                workoutData={data}
                navigation={navigation}
              />
            )}
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    alignItems: "center",
    backgroundColor: darkGrey
  },
  contentContainer: {
    flex: 1
  }
});

export default ExerciseLogScreen;
