import React from "react";
import { View, Text, TextInput, StyleSheet, Dimensions } from "react-native";
import { white, blueishGrey } from "../../../colorPalette";
import { infoText } from "../../../fontSizeEnum";

const NewSetFormTextbox = ({ caption, textboxValue, onChangeValue }) => (
  <View style={styles.contentContainer}>
    <Text style={styles.textboxCaption}>{`${caption}`}</Text>
    <TextInput
      style={styles.textbox}
      value={textboxValue}
      onChangeText={(text) => {
        onChangeValue(text);
      }}
      keyboardType="numeric"
      keyboardAppearance="dark"
    />
  </View>
);

const screenWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  contentContainer: {},
  textbox: {
    backgroundColor: white,
    height: 50,
    fontSize: infoText,
    width: screenWidth * 0.32,
    marginTop: 5,
    paddingLeft: 10,
    borderRadius: 5,
    borderColor: blueishGrey,
    borderWidth: 1
  },
  textboxCaption: {
    color: white,
    fontSize: infoText,
    marginLeft: 10,
    marginTop: 20
  }
});

export default NewSetFormTextbox;
