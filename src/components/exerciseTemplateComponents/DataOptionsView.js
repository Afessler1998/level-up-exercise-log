import React from "react";
import { View, StyleSheet } from "react-native";
import SwitchCaption from "./SwitchCaption";

const DataOptionsView = ({ exerciseType, dataOptions, setDataOptions }) => {
  let switchContainer;
  if (exerciseType === "Strength") {
    switchContainer = (
      <>
        <View style={styles.switchRow}>
          <SwitchCaption
            switchFor="weight"
            caption="Weight"
            dataOptions={dataOptions}
            setDataOptions={setDataOptions}
          />
          <SwitchCaption
            switchFor="reps"
            caption="Reps"
            dataOptions={dataOptions}
            setDataOptions={setDataOptions}
          />
        </View>
        <View style={styles.switchRow}>
          <SwitchCaption
            switchFor="duration"
            caption="Duration"
            dataOptions={dataOptions}
            setDataOptions={setDataOptions}
          />
          <SwitchCaption
            switchFor="rpe"
            caption="RPE"
            dataOptions={dataOptions}
            setDataOptions={setDataOptions}
          />
        </View>
      </>
    );
  }
  if (exerciseType === "Cardio") {
    switchContainer = (
      <>
        <View style={styles.switchRow}>
          <SwitchCaption
            switchFor="distance"
            caption="Distance"
            dataOptions={dataOptions}
            setDataOptions={setDataOptions}
          />
          <SwitchCaption
            switchFor="speed"
            caption="Speed"
            dataOptions={dataOptions}
            setDataOptions={setDataOptions}
          />
        </View>
        <View style={styles.switchRow}>
          <SwitchCaption
            switchFor="duration"
            caption="Duration"
            dataOptions={dataOptions}
            setDataOptions={setDataOptions}
          />
          <SwitchCaption
            switchFor="heartRate"
            caption="Heart Rate"
            dataOptions={dataOptions}
            setDataOptions={setDataOptions}
          />
        </View>
        <View style={styles.switchRow}>
          <SwitchCaption
            switchFor="calories"
            caption="Calories"
            dataOptions={dataOptions}
            setDataOptions={setDataOptions}
          />
        </View>
      </>
    );
  }

  return <View style={styles.contentContainer}>{switchContainer}</View>;
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    zIndex: -1,
    alignItems: "flex-start"
  },
  switchRow: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center"
  }
});

export default DataOptionsView;
