import React, { useState, useEffect } from "react";
import { View, SafeAreaView, Text, StyleSheet, Dimensions } from "react-native";
import { useDispatch } from "react-redux";
import * as SecureStore from "expo-secure-store";
import { getTemplates } from "../../redux-store/actions";
import environmentVars from "../../../environmentVars";
import LoadingSpinner from "../../components/LoadingSpinner";
import GrayBtn from "../../components/GrayBtn";
import CancelBtn from "../../components/CancelBtn";
import { white, lightestGrey, darkGrey } from "../../colorPalette";
import { header, infoText, subHeader } from "../../fontSizeEnum";

const ViewTemplateScreen = ({ navigation }) => {
  const exerciseName = navigation.getParam("exerciseName");
  const [template, setTemplate] = useState({});
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const authToken = await SecureStore.getItemAsync("authToken");
      const serverResponse = await fetch(
        `${environmentVars.serverUrl}/templates/templateByName/${exerciseName}`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`
          }
        }
      );
      const parsedResponse = await serverResponse.json();
      if (!parsedResponse.error) {
        setTemplate(parsedResponse);
      }
      setLoading(false);
    }
    fetchData();
  }, [exerciseName]);

  return (
    <SafeAreaView style={styles.background}>
      <View style={styles.background}>
        {loading && <LoadingSpinner />}
        {!loading && (
          <View style={styles.contentContainer}>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>{template.exerciseName}</Text>
            </View>
            <Text style={styles.subTitle}>
              {`${template.exerciseType} Exercise`}
            </Text>
            <View style={styles.contentSpacingView}>
              <Text style={styles.dataOptionsCaption}>Data Options:</Text>
              {template.dataOptions.weight && (
                <Text style={styles.dataOptionsText}>Weight</Text>
              )}
              {template.dataOptions.rpe && (
                <Text style={styles.dataOptionsText}>RPE</Text>
              )}
              {template.dataOptions.reps && (
                <Text style={styles.dataOptionsText}>Reps</Text>
              )}
              {template.dataOptions.duration && (
                <Text style={styles.dataOptionsText}>Duration</Text>
              )}
              {template.dataOptions.distance && (
                <Text style={styles.dataOptionsText}>Distance</Text>
              )}
              {template.dataOptions.speed && (
                <Text style={styles.dataOptionsText}>Speed</Text>
              )}
              {template.dataOptions.heartRate && (
                <Text style={styles.dataOptionsText}>Heart Rate</Text>
              )}
              {template.dataOptions.calories && (
                <Text style={styles.dataOptionsText}>Calories</Text>
              )}
            </View>
            <GrayBtn
              btnText="DELETE"
              onPress={() => {
                navigation.navigate("DeleteTemplate", {
                  exerciseName,
                  onPress: async () => {
                    const authToken = await SecureStore.getItemAsync(
                      "authToken"
                    );
                    const serverReponse = await fetch(
                      `${environmentVars.serverUrl}/templates/${template.id}`,
                      {
                        method: "DELETE",
                        headers: {
                          Authorization: `Bearer ${authToken}`,
                          "Content-Type": "application/json"
                        }
                      }
                    );
                    const parsedResponse = await serverReponse.json();
                    if (!parsedResponse.error) {
                      dispatch(getTemplates());
                    }
                    navigation.navigate("SelectTemplate");
                  }
                });
              }}
            />
            <CancelBtn onPress={() => navigation.navigate("SelectTemplate")} />
          </View>
        )}
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
    marginTop: 5,
    flex: 1,
    marginBottom: 20
  },
  contentSpacingView: { flex: 1, justifyContent: "center" },
  titleContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: screenWidth * 0.85,
    marginTop: 20
  },
  title: {
    color: white,
    fontSize: 25,
    fontWeight: "bold",
    letterSpacing: 2,
    marginBottom: header,
    textAlign: "center"
  },
  subTitle: {
    color: white,
    fontSize: subHeader,
    fontWeight: "bold",
    textAlign: "center"
  },
  dataOptionsCaption: {
    color: white,
    fontSize: infoText,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center"
  },
  dataOptionsText: {
    color: white,
    fontSize: infoText,
    textAlign: "center",
    marginBottom: 5
  }
});

export default ViewTemplateScreen;
