import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  Animated,
  Dimensions
} from "react-native";
import { useSelector } from "react-redux";
import * as Haptics from "expo-haptics";
import SvgLogo from "../SvgLogo";
import GrayBtn from "../GrayBtn";
import { white, darkGrey } from "../../colorPalette";
import { modalHeader, modalSubHeader } from "../../fontSizeEnum";

const { height, width } = Dimensions.get("window");

const NewPrModal = ({ prStatus, navigation }) => {
  const userSettings = useSelector((state) => state.userSettings)?.data;
  const hapticFeedback = userSettings?.hapticFeedback;
  const newPrPopup = userSettings?.newPrPopup;
  const [modalVisible, setModalVisible] = useState(false);
  if (!newPrPopup && prStatus) navigation.setParams({ prStatus: false });
  if (newPrPopup && prStatus && !modalVisible) setModalVisible(true);

  const animPosition = useRef(
    new Animated.ValueXY({ x: 0, y: width / 2 })
  ).current;

  const runAnimation = useCallback(() => {
    Animated.sequence([
      Animated.timing(animPosition, {
        toValue: { x: 0, y: width / 2 + 15 },
        duration: 1000,
        useNativeDriver: false
      }),
      Animated.timing(animPosition, {
        toValue: { x: 0, y: width / 2 - 15 },
        duration: 1000,
        useNativeDriver: false
      })
    ]).start(runAnimation);
  }, [animPosition]);

  useEffect(() => {
    if (modalVisible === true) {
      if (hapticFeedback) Haptics.notificationAsync("success");
      runAnimation();
    }
  }, [runAnimation]);

  return (
    <Modal animationType="fade" transparent visible={modalVisible}>
      <View style={styles.modalBackground}>
        <View style={styles.contentContainer}>
          <Text style={styles.headerText}>LEVEL UP!</Text>
          <View style={styles.textSpacingView} />
          <Text style={styles.footerText}>New Personal Record!</Text>
        </View>
        <Animated.View style={[styles.animWrapper, animPosition.getLayout()]}>
          <SvgLogo size={400} backgroundColor={darkGrey} />
        </Animated.View>
        <View style={styles.contentSpacingView}>
          <GrayBtn
            onPress={() => {
              setModalVisible(!modalVisible);
              navigation.setParams({ prStatus: false });
            }}
            btnText="Close"
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: darkGrey,
    height,
    width
  },
  contentContainer: {
    flex: 0.8,
    justifyContent: "center",
    alignItems: "center"
  },
  headerText: {
    color: white,
    fontSize: modalHeader,
    fontWeight: "bold",
    letterSpacing: 3
  },
  footerText: {
    color: white,
    fontSize: modalSubHeader,
    letterSpacing: 1,
    fontWeight: "600"
  },
  textSpacingView: {
    height: 450
  },
  animWrapper: {
    position: "absolute"
  },
  contentSpacingView: {
    flex: 0.1
  }
});

export default NewPrModal;
