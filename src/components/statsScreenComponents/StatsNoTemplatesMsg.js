import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import GrayBtn from "../GrayBtn";
import { white, lightestGrey } from "../../colorPalette";
import { infoText, header } from "../../fontSizeEnum";

const StatsNoTemplatesMsg = ({ navigation }) => (
  <View style={styles.contentContainer}>
    <Text style={styles.header}>Stats and History</Text>
    <View style={styles.textSpacingView}>
      <Text style={styles.text}>
        You must create an exercise template to view stats
      </Text>
    </View>
    <GrayBtn
      btnText="NEW TEMPLATE"
      onPress={() => navigation.navigate("CreatingTemplate")}
    />
  </View>
);

const screenWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  contentContainer: {
    backgroundColor: lightestGrey,
    borderRadius: 35,
    width: screenWidth * 0.9,
    alignItems: "center",
    marginTop: 5,
    flex: 1
  },
  header: {
    fontSize: header,
    color: white,
    marginTop: 20,
    fontWeight: "600",
    textAlign: "center"
  },
  textSpacingView: {
    flex: 1,
    justifyContent: "center"
  },
  text: {
    fontSize: infoText,
    color: white,
    width: screenWidth * 0.7,
    textAlign: "center"
  }
});

export default StatsNoTemplatesMsg;
