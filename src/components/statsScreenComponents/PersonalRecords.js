import React from "react";
import { View, Text, ScrollView, StyleSheet, Dimensions } from "react-native";
import { white, lighterGrey, blueishGrey } from "../../colorPalette";
import { header, infoText } from "../../fontSizeEnum";

const PersonalRecords = ({ statData, exerciseName }) => {
  let repNumber = 0;
  return (
    <View style={styles.contentContainer}>
      <Text style={styles.exerciseNameText}>{exerciseName}</Text>
      <ScrollView
        style={styles.prTable}
        bounces={false}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.prTableRow}>
          <View style={[styles.rowSection, styles.headerRowSection]}>
            <Text style={styles.tableHeader}>Reps</Text>
          </View>
          <View
            style={[
              styles.rowSection,
              styles.headerRowSection,
              styles.innerRowSection
            ]}
          >
            <Text style={styles.tableHeader}>Weight</Text>
          </View>
          <View style={[styles.rowSection, styles.headerRowSection]}>
            <Text style={styles.tableHeader}>Date</Text>
          </View>
        </View>
        {statData.recordTable &&
          statData.recordTable.map((record) => {
            const date = new Date(record.date);
            const yearStr = date.getFullYear().toString().substr(-2);
            repNumber += 1;
            return (
              // eslint-disable-next-line no-underscore-dangle
              <View style={styles.prTableRow} key={record._id}>
                <View style={styles.rowSection}>
                  <Text style={styles.tableRowText}>{repNumber}</Text>
                </View>
                <View style={[styles.rowSection, styles.innerRowSection]}>
                  <Text style={styles.tableRowText}>{record.weight}</Text>
                </View>
                <View style={styles.rowSection}>
                  {record.weight > 0 && (
                    <Text style={styles.tableRowText}>
                      {`${date.getMonth()}/${date.getDate()}/${yearStr}`}
                    </Text>
                  )}
                </View>
              </View>
            );
          })}
      </ScrollView>
    </View>
  );
};

const screenWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  contentContainer: {
    alignItems: "center",
    backgroundColor: lighterGrey,
    borderRadius: 35,
    width: screenWidth * 0.8,
    marginTop: 20,
    flex: 1,
    zIndex: -1
  },
  exerciseNameText: {
    color: white,
    fontSize: header,
    fontWeight: "bold",
    marginVertical: 10
  },
  prTable: { flexDirection: "column" },
  prTableRow: { flexDirection: "row", width: screenWidth * 0.6 },
  headerRowSection: {
    borderTopWidth: 1,
    borderColor: blueishGrey
  },
  tableHeader: {
    color: white,
    fontSize: infoText,
    textAlign: "right",
    paddingRight: 4,
    fontWeight: "600"
  },
  rowSection: {
    textAlign: "right",
    flex: 1,
    borderColor: blueishGrey,
    borderWidth: 1,
    borderTopWidth: 0
  },
  innerRowSection: {
    borderRightWidth: 0,
    borderLeftWidth: 0
  },
  tableRowText: {
    color: white,
    fontSize: 18,
    textAlign: "right",
    paddingRight: 4,
    paddingVertical: 1
  }
});

export default PersonalRecords;
