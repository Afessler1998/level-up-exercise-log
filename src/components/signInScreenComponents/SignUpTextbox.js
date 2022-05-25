import React from "react";
import { View, Text, TextInput, StyleSheet, Dimensions } from "react-native";
import { white, blueishGrey } from "../../colorPalette";
import { infoText } from "../../fontSizeEnum";

const SignUpTextbox = ({
  value,
  onChangeText,
  caption,
  keyboardType,
  secureTextEntry
}) => (
  <View style={styles.textboxContainer}>
    <Text style={styles.textboxCaption}>{caption}</Text>
    <TextInput
      style={styles.textbox}
      value={value}
      onChangeText={(text) => {
        onChangeText(text);
      }}
      keyboardAppearance={"dark"}
      keyboardType={keyboardType || "default"}
      secureTextEntry={secureTextEntry}
    />
  </View>
);

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  textboxContainer: {},
  textboxCaption: {
    color: white,
    fontSize: infoText,
    marginLeft: 10,
    marginVertical: 10,
    width: width * 0.7
  },
  textbox: {
    backgroundColor: white,
    height: 50,
    width: width * 0.7,
    borderRadius: 5,
    borderColor: blueishGrey,
    borderWidth: 1,
    paddingLeft: 10,
    fontSize: infoText
  }
});

export default SignUpTextbox;
