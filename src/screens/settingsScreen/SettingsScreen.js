import React from "react";
import { View, Text, SafeAreaView, StyleSheet, Dimensions } from "react-native";
import * as SecureStore from "expo-secure-store";
import { useSelector } from "react-redux";
import SwitchCaption from "../../components/settingsScreenComponents/SwitchCaption";
import GrayBtn from "../../components/GrayBtn";
import GrayBtnNoMarginTop from "../../components/GrayBtnNoMarginTop";
import { darkGrey, lightestGrey, white } from "../../colorPalette";
import { header, signInButtonText } from "../../fontSizeEnum";

const SettingsScreen = ({ navigation }) => {
  const userSettings = useSelector((state) => state.userSettings);
  const { data } = userSettings;
  const { hapticFeedback, newPrPopup } = data;

  return (
    <SafeAreaView style={styles.background}>
      <View style={styles.background}>
        <View style={styles.contentContainer}>
          <Text style={styles.header}>Settings</Text>
          <View style={styles.settingsOptionsContainer}>
            <SwitchCaption
              switchFor={"newPrPopup"}
              settings={data}
              caption={"Personal Record Popup"}
              active={newPrPopup}
            />
            <SwitchCaption
              switchFor={"hapticFeedback"}
              settings={data}
              caption={"Haptic Feedback"}
              active={hapticFeedback}
            />
          </View>
          <Text style={styles.versionText}>Version 1.0.0</Text>
          <GrayBtn
            btnText="LOGOUT"
            onPress={async () => {
              await SecureStore.deleteItemAsync("authToken");
              navigation.navigate("signInScreen");
            }}
          />
          <GrayBtnNoMarginTop
            btnText="DELETE ACCOUNT"
            onPress={async () => {
              navigation.navigate("ConfirmDeleteAccount");
            }}
          />
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
  header: {
    fontSize: header,
    color: white,
    marginTop: 20,
    fontWeight: "600"
  },
  settingsOptionsContainer: {
    flex: 1,
    justifyContent: "center"
  },
  versionText: {
    fontSize: signInButtonText,
    color: white
  }
});

export default SettingsScreen;
