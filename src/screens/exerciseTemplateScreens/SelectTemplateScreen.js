import React from "react";
import { useSelector } from "react-redux";
import {
  View,
  SafeAreaView,
  TouchableWithoutFeedback,
  Text,
  StyleSheet,
  Dimensions,
  Keyboard
} from "react-native";
import GrayBtn from "../../components/GrayBtn";
import LoadingSpinner from "../../components/LoadingSpinner";
import ExerciseTemplateSelector from "../../components/exerciseTemplateComponents/ExerciseTemplateSelector";
import { white, lightestGrey, darkGrey } from "../../colorPalette";
import { infoText, header } from "../../fontSizeEnum";

const SelectTemplateScreen = ({ navigation }) => {
  const exerciseTemplates = useSelector((state) => state.templates);
  const exercises = exerciseTemplates.data.map(
    (template) => template.exerciseName
  );

  const { pending } = exerciseTemplates;

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView style={styles.background}>
        <View style={styles.background}>
          {pending && <LoadingSpinner />}
          {!pending && (
            <View style={styles.contentContainer}>
              <View style={styles.textSpacingView}>
                {exercises.length === 0 && (
                  <>
                    <Text style={styles.header}>Exercise Templates</Text>
                    <View style={styles.centeringView}>
                      <Text style={styles.noTemplatesText}>
                        You have no exercise templates
                      </Text>
                    </View>
                  </>
                )}
                {exercises.length > 0 && (
                  <>
                    <Text style={styles.header}>Exercise Templates</Text>
                    <View style={styles.centeringView}>
                      <ExerciseTemplateSelector
                        exerciseNames={exercises}
                        navigation={navigation}
                      />
                    </View>
                    <View style={styles.contentSpacingView} />
                  </>
                )}
              </View>
              <GrayBtn
                btnText="NEW TEMPLATE"
                onPress={() => navigation.navigate("CreatingTemplate")}
              />
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
    alignItems: "center"
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
  header: {
    fontSize: header,
    color: white,
    marginTop: 20,
    fontWeight: "600",
    textAlign: "center"
  },
  centeringView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  contentSpacingView: {
    height: 150,
    zIndex: -1
  },
  textSpacingView: { flex: 1, justifyContent: "center" },
  noTemplatesText: {
    fontSize: infoText,
    color: white,
    marginTop: 20,
    width: screenWidth * 0.7,
    textAlign: "center"
  }
});

export default SelectTemplateScreen;
