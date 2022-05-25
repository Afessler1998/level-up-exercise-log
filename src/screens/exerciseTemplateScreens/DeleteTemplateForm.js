import React from "react";
import { View, SafeAreaView, Text, StyleSheet, Dimensions } from "react-native";
import GrayBtn from "../../components/GrayBtn";
import CancelBtn from "../../components/CancelBtn";
import { white, lightestGrey, darkGrey } from "../../colorPalette";
import { infoText } from "../../fontSizeEnum";

const DeleteTemplateForm = ({ navigation }) => {
  const { onPress, exerciseName } = navigation.state.params;
  return (
    <SafeAreaView style={styles.background}>
      <View style={styles.background}>
        <View style={styles.contentContainer}>
          <View style={styles.textSpacingView}>
            <Text style={styles.text}>
              Are you sure you want to delete this?
            </Text>
          </View>
          <GrayBtn btnText="CONFIRM" onPress={onPress} />
          <CancelBtn
            onPress={
              () =>
                // eslint-disable-next-line implicit-arrow-linebreak
                navigation.navigate("ViewTemplate", {
                  exerciseName
                })
              // eslint-disable-next-line react/jsx-curly-newline
            }
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
    backgroundColor: darkGrey,
    alignItems: "center",
    justifyContent: "center"
  },
  contentContainer: {
    backgroundColor: lightestGrey,
    borderRadius: 35,
    width: screenWidth * 0.9,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 5,
    marginBottom: 20,
    flex: 1
  },
  textSpacingView: {
    flex: 1,
    justifyContent: "center"
  },
  text: {
    color: white,
    fontSize: infoText,
    textAlign: "center",
    width: screenWidth * 0.7
  }
});

export default DeleteTemplateForm;
