import React, { useState } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import * as Haptics from "expo-haptics";
import * as SecureStore from "expo-secure-store";
import { getUserSettings } from "../../redux-store/actions";
import { serverUrl } from "../../../environmentVars";
import { white, lighterGrey, blueishGrey, black } from "../../colorPalette";

const RoundSwitch = ({ switchFor, settings, active }) => {
  const [isActive, setIsActive] = useState(active);
  const { hapticFeedback } = useSelector((state) => state.userSettings).data;

  const dispatch = useDispatch();

  let btnState = styles.btnInactive;
  if (isActive) btnState = styles.btnActive;
  const settingsCopy = JSON.parse(JSON.stringify(settings));

  return (
    <TouchableOpacity
      onPress={async () => {
        if (switchFor === "hapticFeedback" && !hapticFeedback) {
          Haptics.impactAsync("light");
        }
        if (switchFor !== "hapticFeedback" && hapticFeedback) {
          Haptics.impactAsync("light");
        }
        const authToken = await SecureStore.getItemAsync("authToken");
        if (isActive) {
          settingsCopy[switchFor] = false;
          await fetch(`${serverUrl}/users/settings`, {
            method: "POST",
            headers: {
              Authorization: `Bearer ${authToken}`,
              "Content-type": "application/json"
            },
            body: JSON.stringify({
              settings: settingsCopy
            })
          });
          dispatch(getUserSettings());
          setIsActive(false);
        } else {
          settingsCopy[switchFor] = true;
          await fetch(`${serverUrl}/users/settings`, {
            method: "POST",
            headers: {
              Authorization: `Bearer ${authToken}`,
              "Content-type": "application/json"
            },
            body: JSON.stringify({
              settings: settingsCopy
            })
          });
          dispatch(getUserSettings());
          setIsActive(true);
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
