import React, { useState, useEffect } from "react";
import { View, SafeAreaView, Text, StyleSheet, Dimensions } from "react-native";
import * as SecureStore from "expo-secure-store";
import { serverUrl } from "../../../environmentVars";
import LoadingSpinner from "../../components/LoadingSpinner";
import GrayBtn from "../../components/GrayBtn";
import LineChart from "../../components/statsScreenComponents/LineChart";
import StatsTypeSelector from "../../components/statsScreenComponents/StatsTypeSelector";
import ExerciseHistory from "../../components/statsScreenComponents/ExerciseHistory";
import PersonalRecords from "../../components/statsScreenComponents/PersonalRecords";
import { white, lightestGrey, darkGrey } from "../../colorPalette";
import { header, infoText } from "../../fontSizeEnum";

const ViewStatsScreen = ({ navigation }) => {
  const templateId = navigation.getParam("templateId");
  const exerciseName = navigation.getParam("exerciseName");
  const { reps, weight, distance, speed } = navigation.getParam("dataOptions");
  const [statsType, setStatsType] = useState("history");
  const [statData, setStatData] = useState({});
  const [dateFrom, setDateFrom] = useState(
    new Date(
      new Date().getFullYear(),
      new Date().getMonth() - 1,
      new Date().getDate()
    ).toISOString()
  );
  const [selectedBtn, setSelectedBtn] = useState("1m");
  const [loading, setLoading] = useState(true);

  const statsTypeEnum = Object.freeze({
    history: { value: "history", label: "History" },
    personalRecords: { value: "personalRecords", label: "Personal Records" },
    volume: { value: "volume", label: "Volume" },
    estimatedMax: { value: "estimatedMax", label: "Estimated Max" },
    speedGraph: { value: "speed", label: "Speed" },
    distanceGraph: { value: "distance", label: "Distance" }
  });

  const {
    history,
    personalRecords,
    estimatedMax,
    volume,
    speedGraph,
    distanceGraph
  } = statsTypeEnum;

  const graphDimensions = {
    graphHeight: screenWidth * 0.625,
    graphWidth: screenWidth * 0.8,
    graphPadding: 0.1
  };
  const { graphHeight, graphWidth, graphPadding } = graphDimensions;

  const childSetDateFrom = (date) => {
    setDateFrom(new Date(date).toISOString());
  };

  const childSetSelectedBtn = (btn) => {
    setSelectedBtn(btn);
  };

  const childSetStatsType = (string) => {
    setStatsType(string);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const authToken = await SecureStore.getItemAsync("authToken");

      let serverResponse;
      if (statsType === "personalRecords" || statsType === "history") {
        serverResponse = await fetch(
          `${serverUrl}/stats/${statsType}/${templateId}`,
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
              "Content-Type": "application/json"
            }
          }
        );
      } else {
        serverResponse = await fetch(
          `${serverUrl}/stats/${statsType}/${templateId}/?dateFrom=${dateFrom}&graphDimensions=${JSON.stringify(
            graphDimensions
          )}`,
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
              "Content-Type": "application/json"
            }
          }
        );
      }
      const parsedResponse = await serverResponse.json();
      if (!parsedResponse.error) {
        setStatData(parsedResponse);
      }
      setLoading(false);
    };
    fetchData();
  }, [
    dateFrom,
    exerciseName,
    graphHeight,
    graphPadding,
    graphWidth,
    navigation,
    statsType
  ]);

  return (
    <SafeAreaView style={styles.background}>
      <View style={styles.background}>
        <View style={styles.contentContainer}>
          {loading && <LoadingSpinner />}
          {!loading && (
            <>
              <View style={styles.selectorContainer}>
                <Text style={styles.text}>Select stats to view</Text>
                <StatsTypeSelector
                  statsOptions={
                    (reps &&
                      weight && [
                        history.label,
                        personalRecords.label,
                        volume.label,
                        estimatedMax.label
                      ]) ||
                    (speed &&
                      distance && [
                        history.label,
                        speedGraph.label,
                        distanceGraph.label
                      ]) ||
                    (speed && [history.label, speedGraph.label]) ||
                    (distance && [history.label, distanceGraph.label]) || [
                      history.label
                    ]
                  }
                  statsType={statsType}
                  setStatsType={childSetStatsType}
                  statsTypeEnum={statsTypeEnum}
                />
              </View>
              {statsType === volume.value && (
                <View style={styles.graphContainer}>
                  <Text style={styles.exerciseName}>{exerciseName}</Text>
                  <LineChart
                    graphData={statData}
                    graphWidth={graphWidth}
                    graphHeight={graphHeight}
                    graphPadding={graphPadding}
                    setDateFrom={childSetDateFrom}
                    setSelectedBtn={childSetSelectedBtn}
                    selectedBtn={selectedBtn}
                  />
                </View>
              )}
              {statsType === estimatedMax.value && (
                <View style={styles.graphContainer}>
                  <Text style={styles.exerciseName}>{exerciseName}</Text>
                  <LineChart
                    graphData={statData}
                    graphWidth={graphWidth}
                    graphHeight={graphHeight}
                    graphPadding={graphPadding}
                    setDateFrom={childSetDateFrom}
                    setSelectedBtn={childSetSelectedBtn}
                    selectedBtn={selectedBtn}
                  />
                </View>
              )}
              {statsType === speedGraph.value && (
                <View style={styles.graphContainer}>
                  <Text style={styles.exerciseName}>{exerciseName}</Text>
                  <LineChart
                    graphData={statData}
                    graphWidth={graphWidth}
                    graphHeight={graphHeight}
                    graphPadding={graphPadding}
                    setDateFrom={childSetDateFrom}
                    setSelectedBtn={childSetSelectedBtn}
                    selectedBtn={selectedBtn}
                  />
                </View>
              )}
              {statsType === distanceGraph.value && (
                <View style={styles.graphContainer}>
                  <Text style={styles.exerciseName}>{exerciseName}</Text>
                  <LineChart
                    graphData={statData}
                    graphWidth={graphWidth}
                    graphHeight={graphHeight}
                    graphPadding={graphPadding}
                    setDateFrom={childSetDateFrom}
                    setSelectedBtn={childSetSelectedBtn}
                    selectedBtn={selectedBtn}
                  />
                </View>
              )}
              {statsType === personalRecords.value && (
                <PersonalRecords
                  statData={statData}
                  exerciseName={exerciseName}
                />
              )}
              {statsType === history.value && (
                <ExerciseHistory
                  statData={statData}
                  exerciseName={exerciseName}
                />
              )}
              <GrayBtn
                btnText="BACK"
                onPress={() => {
                  navigation.navigate("SelectExercise");
                }}
              />
            </>
          )}
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
    marginTop: 5,
    marginBottom: 20,
    flex: 1
  },
  selectorContainer: {
    width: screenWidth * 0.7,
    zIndex: 10
  },
  graphContainer: {
    flex: 1,
    justifyContent: "center",
    zIndex: -1
  },
  exerciseName: {
    fontSize: header,
    color: white,
    textAlign: "center",
    marginBottom: 20,
    fontWeight: "bold"
  },
  text: {
    fontSize: infoText,
    color: white,
    marginTop: 10,
    marginLeft: 10,
    width: screenWidth * 0.7,
    textAlign: "left"
  }
});

export default ViewStatsScreen;
