import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { white, lighterGrey, blueishGrey, black } from "../../colorPalette";
import { smallText } from "../../fontSizeEnum";

const ChartDateSelector = ({ setDateFrom, setSelectedBtn, selectedBtn }) => {
  const dateRangeEnum = Object.freeze({
    OneWeek: "1w",
    OneMonth: "1m",
    ThreeMonth: "3m",
    SixMonth: "6m",
    OneYear: "1y"
  });
  const { OneWeek, OneMonth, ThreeMonth, SixMonth, OneYear } = dateRangeEnum;
  return (
    <View style={styles.container}>
      {/* 1 week buton */}
      <TouchableOpacity
        style={[styles.btn, styles.btnLeft]}
        onPress={() => {
          setSelectedBtn(OneWeek);
          const dateFrom = new Date(
            new Date().getFullYear(),
            new Date().getMonth(),
            new Date().getDate() - 7
          );
          setDateFrom(dateFrom);
        }}
      >
        <Text
          style={[
            styles.text,
            selectedBtn === OneWeek && styles.selectedBtnText
          ]}
        >
          {`${OneWeek}`}
        </Text>
      </TouchableOpacity>

      {/* 1 month button */}
      <TouchableOpacity
        style={[styles.btn, styles.innerBtn]}
        onPress={() => {
          setSelectedBtn(OneMonth);
          const dateFrom = new Date(
            new Date().getFullYear(),
            new Date().getMonth() - 1,
            new Date().getDate()
          );
          setDateFrom(dateFrom);
        }}
      >
        <Text
          style={[
            styles.text,
            selectedBtn === OneMonth && styles.selectedBtnText
          ]}
        >
          {`${OneMonth}`}
        </Text>
      </TouchableOpacity>

      {/* 3 months button */}
      <TouchableOpacity
        style={[styles.btn, styles.innerBtn]}
        onPress={() => {
          setSelectedBtn(ThreeMonth);
          const dateFrom = new Date(
            new Date().getFullYear(),
            new Date().getMonth() - 3,
            new Date().getDate()
          );
          setDateFrom(dateFrom);
        }}
      >
        <Text
          style={[
            styles.text,
            selectedBtn === ThreeMonth && styles.selectedBtnText
          ]}
        >
          {`${ThreeMonth}`}
        </Text>
      </TouchableOpacity>

      {/* 6 months button */}
      <TouchableOpacity
        style={[styles.btn, styles.innerBtn]}
        onPress={() => {
          setSelectedBtn(SixMonth);
          const dateFrom = new Date(
            new Date().getFullYear(),
            new Date().getMonth() - 6,
            new Date().getDate()
          );
          setDateFrom(dateFrom);
        }}
      >
        <Text
          style={[
            styles.text,
            selectedBtn === SixMonth && styles.selectedBtnText
          ]}
        >
          {`${SixMonth}`}
        </Text>
      </TouchableOpacity>

      {/* 1 year button */}
      <TouchableOpacity
        style={[styles.btn, styles.btnRight]}
        onPress={() => {
          setSelectedBtn(OneYear);
          const dateFrom = new Date(
            new Date().getFullYear() - 1,
            new Date().getMonth(),
            new Date().getDate()
          );
          setDateFrom(dateFrom);
        }}
      >
        <Text
          style={[
            styles.text,
            selectedBtn === OneYear && styles.selectedBtnText
          ]}
        >
          {`${OneYear}`}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-evenly"
  },
  btn: {
    backgroundColor: lighterGrey,
    flex: 1,
    alignItems: "center"
  },
  innerBtn: {
    borderColor: black,
    borderLeftWidth: 1,
    borderRightWidth: 1
  },
  btnLeft: {
    borderBottomLeftRadius: 25,
    borderRightWidth: 1,
    borderColor: black
  },
  btnRight: {
    borderBottomRightRadius: 25,
    borderLeftWidth: 1,
    borderColor: black
  },
  text: {
    color: white,
    paddingVertical: 10,
    fontSize: smallText
  },
  selectedBtnText: {
    color: blueishGrey,
    fontSize: smallText
  }
});

export default ChartDateSelector;
