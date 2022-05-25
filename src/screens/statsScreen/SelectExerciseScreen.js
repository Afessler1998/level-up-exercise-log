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
import LoadingSpinner from "../../components/LoadingSpinner";
import StatsNoTemplatesMsg from "../../components/statsScreenComponents/StatsNoTemplatesMsg";
import ExerciseTemplateSelector from "../../components/statsScreenComponents/exerciseTemplateSelector";
import { white, lightestGrey, darkGrey } from "../../colorPalette";
import { infoText, header } from "../../fontSizeEnum";

const SelectExerciseScreen = ({ navigation }) => {
  const exerciseTemplates = useSelector((state) => state.templates);

  const { pending, data } = exerciseTemplates;

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView style={styles.background}>
        <View style={styles.background}>
          {pending && <LoadingSpinner />}
          {!pending && (
            <View style={styles.contentContainer}>
              {data.length === 0 && (
                <StatsNoTemplatesMsg navigation={navigation} />
              )}
              {data.length !== 0 && (
                <>
                  <Text style={styles.header}>Stats and History</Text>
                  <View style={styles.centeringView}>
                    <ExerciseTemplateSelector
                      exerciseTemplates={data}
                      navigation={navigation}
                    />
                    <View style={styles.contentSpacingView} />
                  </View>
                </>
              )}
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
    justifyContent: "center",
    marginTop: 5,
    marginBottom: 20,
    flex: 1
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
  text: {
    fontSize: infoText,
    color: white,
    marginTop: 20,
    width: screenWidth * 0.7,
    textAlign: "left",
    marginBottom: 10,
    marginLeft: 10
  },
  contentSpacingView: {
    height: 250,
    zIndex: -1
  }
});

export default SelectExerciseScreen;
