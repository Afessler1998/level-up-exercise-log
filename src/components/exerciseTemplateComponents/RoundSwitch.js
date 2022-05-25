import React, { useState } from "react";
import { useSelector } from "react-redux";
import * as Haptics from "expo-haptics";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { white, lighterGrey, blueishGrey, black } from "../../colorPalette";

const RoundSwitch = ({ switchFor, dataOptions, setDataOptions }) => {
  const [active, setActive] = useState(false);
  if (active !== dataOptions[switchFor]) setActive(dataOptions[switchFor]);
  const { hapticFeedback } = useSelector((state) => state.userSettings).data;

  let btnState = styles.btnInactive;
  if (active) btnState = styles.btnActive;

  return (
    <TouchableOpacity
      onPress={() => {
        const dataOptionsCopy = JSON.parse(JSON.stringify(dataOptions));
        if (hapticFeedback) Haptics.impactAsync("light");
        if (active) {
          setActive(false);
          dataOptionsCopy[switchFor] = false;
          setDataOptions(dataOptionsCopy);
        } else {
          setActive(true);
          dataOptionsCopy[switchFor] = true;
          setDataOptions(dataOptionsCopy);
        }
      }}
      hitSlop={{
        top: 10,
        bottom: 10,
        left: 10,
        right: 10
      }}
    >
      <View style={[styles.btn, styles.shadow, btnState]} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btn: {
    width: 25,
    height: 25,
    borderWidth: 1,
    borderColor: blueishGrey,
    borderRadius: 100
  },
  btnActive: {
    backgroundColor: lighterGrey
  },
  btnInactive: {
    backgroundColor: white
  },
  shadow: {
    shadowOffset: {
      width: 2,
      height: 2
    },
    shadowRadius: 2,
    shadowOpacity: 0.4,
    shadowColor: black
  }
});

export default RoundSwitch;
