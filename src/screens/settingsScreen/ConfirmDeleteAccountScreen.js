import React from "react";
import { View, Text, SafeAreaView, StyleSheet, Dimensions } from "react-native";
import * as SecureStore from "expo-secure-store";
import environmentVars from "../../../environmentVars";
import GrayBtn from "../../components/GrayBtn";
import GrayBtnNoMarginTop from "../../components/GrayBtnNoMarginTop";
import { darkGrey, lightestGrey, white } from "../../colorPalette";
import { header } from "../../fontSizeEnum";

const SettingsScreen = ({ navigation }) => {

  return (
    <SafeAreaView style={styles.background}>
      <View style={styles.background}>
        <View style={styles.contentContainer}>
          <View style={styles.confirmationTextContainer}>
            <Text style={styles.confirmDeleteText}>
              ARE YOU SURE YOU WANT TO DELETE YOUR ACCOUNT AND ALL STORED DATA?
            </Text>
          </View>
          <GrayBtn
              btnText="CONFIRM"
              onPress={async () => {
                const authToken = await SecureStore.getItemAsync("authToken");
                const serverResponse = await fetch(
                  `${environmentVars.serverUrl}/users/delete`,
                  {
                    headers: {
                      Authorization: `Bearer ${authToken}`
                    }
                  }
                );
                const parsedReponse = await serverResponse.json();
                await SecureStore.deleteItemAsync("authToken");
                navigation.navigate("signInScreen");
              }}
            />
            <GrayBtnNoMarginTop
              btnText="CANCEL"
              onPress={async () => {
                navigation.navigate("SettingsScreen");
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
  confirmationTextContainer: {
    flex: 1,
    justifyContent: "center",
    width: screenWidth * 0.8,
  },
  confirmDeleteText: {
    color: white,
    fontSize: header,
    textAlign: "center",
    fontWeight: "bold"
  }
});

export default SettingsScreen;
