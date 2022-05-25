import React from "react";
import { View, SafeAreaView, Text, StyleSheet, Dimensions } from "react-native";
import { useDispatch } from "react-redux";
import { getWorkouts } from "../../redux-store/actions";
import GrayBtn from "../../components/GrayBtn";
import CancelBtn from "../../components/CancelBtn";
import { white, lighterGrey, lightestGrey } from "../../colorPalette";
import { infoText } from "../../fontSizeEnum";

const DeleteForm = ({ navigation }) => {
  const { onPress } = navigation.state.params;

  const dispatch = useDispatch();

  return (
    <SafeAreaView style={styles.background}>
      <View style={styles.background}>
        <View style={styles.contentContainer}>
          <View style={styles.contentSpacingView}>
            <Text style={styles.text}>
              Are you sure you want to delete this?
            </Text>
          </View>
          <GrayBtn btnText="CONFIRM" onPress={onPress} />
          <CancelBtn
            onPress={() => {
              navigation.navigate("ExerciseLog");
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const screenWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: lighterGrey,
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
    flex: 1,
    justifyContent: "center",
    width: screenWidth * 0.8
  },
  text: {
    color: white,
    fontSize: infoText,
    textAlign: "center"
  }
});

export default DeleteForm;
