import React, { useRef, useCallback, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  StyleSheet,
  Dimensions
} from "react-native";
import * as Linking from "expo-linking";
import * as WebBrowser from "expo-web-browser";
import * as SecureStore from "expo-secure-store";
import { useDispatch } from "react-redux";
import {
  getMarkedDates,
  getTemplates,
  getUserSettings,
  getWorkouts
} from "../../redux-store/actions";
import SvgLogo from "../../components/SvgLogo";
import SignInBtn from "../../components/signInScreenComponents/SignInBtn";
import GoogleButton from "../../components/signInScreenComponents/GoogleButton";
import FacebookButton from "../../components/signInScreenComponents/FacebookButton";
import environmentVars from "../../../environmentVars";
import { white, darkGrey, blueishGrey } from "../../colorPalette";
import { signInButtonText } from "../../fontSizeEnum";

const SignIn = ({ navigation }) => {
  const { width } = Dimensions.get("window");
  const dispatch = useDispatch();

  const checkAuth = async () => {
    const authToken = await SecureStore.getItemAsync("authToken");
    if (authToken) {
      navigation.navigate("mainFlow");
      dispatch(getWorkouts());
      dispatch(getMarkedDates());
      dispatch(getTemplates());
      dispatch(getUserSettings());
    }
  };
  checkAuth();

  const animPosition = useRef(
    new Animated.ValueXY({ x: 0, y: width / 2 - 115 })
  ).current;

  const runAnimation = useCallback(() => {
    Animated.sequence([
      Animated.timing(animPosition, {
        toValue: { x: 0, y: width / 2 + 15 - 115 },
        duration: 1000,
        useNativeDriver: false
      }),
      Animated.timing(animPosition, {
        toValue: { x: 0, y: width / 2 - 15 - 115 },
        duration: 1000,
        useNativeDriver: false
      })
    ]).start(runAnimation);
  }, [animPosition, width]);

  useEffect(() => {
    runAnimation();
  }, [runAnimation, checkAuth]);

  const handleSignIn = async (provider) => {
    const returnUrl = await Linking.getInitialURL();
    const authUrl = `${environmentVars.serverUrl}/auth/${provider}`;
    try {
      const authResult = await WebBrowser.openAuthSessionAsync(
        authUrl,
        returnUrl
      );
      if (authResult.type === "success") {
        const urlParams = Linking.parse(authResult.url);
        const authToken = urlParams.queryParams.token;
        SecureStore.setItemAsync("authToken", authToken);
        dispatch(getWorkouts());
        dispatch(getMarkedDates());
        dispatch(getTemplates());
        dispatch(getUserSettings());
        navigation.navigate("mainFlow");
      }
    } catch (err) {
      throw new Error(err);
    }
  };

  return (
    <View style={styles.contentContainer}>
      <Animated.View style={[styles.animWrapper, animPosition.getLayout()]}>
        <SvgLogo size={400} backgroundColor={darkGrey} />
      </Animated.View>
      <View style={styles.contentSpacingView} />
      <View style={styles.btnContainer}>
        <SignInBtn
          onPress={() => {
            navigation.navigate("signInForm");
          }}
        />
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("signUpForm");
          }}
          hitSlop={{
            top: 10,
            left: 10,
            right: 10,
            bottom: 10
          }}
        >
          <Text style={styles.callToAction}>
            New user? Press here to sign up!
          </Text>
        </TouchableOpacity>
        <View style={styles.lineBreak} />
        <GoogleButton onPress={() => handleSignIn("google")} />
        <FacebookButton onPress={() => handleSignIn("facebook")} />
      </View>
    </View>
  );
};

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    backgroundColor: darkGrey
  },
  contentSpacingView: {
    flex: 0.7
  },
  btnContainer: {
    alignItems: "center"
  },
  lineBreak: {
    borderBottomWidth: 2,
    borderRadius: 1,
    borderColor: blueishGrey,
    width: width * 0.7,
    marginBottom: 20
  },
  callToAction: {
    color: white,
    fontSize: signInButtonText,
    marginBottom: 20
  }
});

export default SignIn;
