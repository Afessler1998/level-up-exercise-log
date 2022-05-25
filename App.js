import React from "react";
import { Dimensions } from "react-native";
import { Provider } from "react-redux";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";
import {
  faBook,
  faCalendarAlt,
  faStickyNote,
  faChartLine,
  faCog
} from "@fortawesome/free-solid-svg-icons";
import SignInScreen from "./src/screens/authScreens/SignInScreen";
import SignUpForm from "./src/screens/authScreens/SignUpForm";
import SignInForm from "./src/screens/authScreens/SignInForm";
import ResetCodeForm from "./src/screens/authScreens/ResetCodeForm";
import ResetPasswordForm from "./src/screens/authScreens/ResetPasswordForm";
import ExerciseLogScreen from "./src/screens/exerciseLogScreens/ExerciseLogScreen";
import NewWorkoutForm from "./src/screens/exerciseLogScreens/NewWorkoutForm";
import NewExerciseForm from "./src/screens/exerciseLogScreens/NewExerciseForm";
import NewSetForm from "./src/screens/exerciseLogScreens/NewSetForm";
import ConfirmDeleteForm from "./src/screens/exerciseLogScreens/ConfirmDeleteForm";
import CalendarScreen from "./src/screens/calendarScreens/CalendarScreen";
import CalendarsListScreen from "./src/screens/calendarScreens/CalendarsListScreen";
import SelectTemplateScreen from "./src/screens/exerciseTemplateScreens/SelectTemplateScreen";
import CreatingTemplateScreen from "./src/screens/exerciseTemplateScreens/CreatingTemplateScreen";
import ViewTemplateScreen from "./src/screens/exerciseTemplateScreens/ViewTemplateScreen";
import DeleteTemplateForm from "./src/screens/exerciseTemplateScreens/DeleteTemplateForm";
import SelectExerciseScreen from "./src/screens/statsScreen/SelectExerciseScreen";
import ViewStatsScreen from "./src/screens/statsScreen/ViewStatsScreen";
import SettingsScreen from "./src/screens/SettingsScreen";
import TabBarIcon from "./src/components/TabBarIcon";
import store from "./src/redux-store/store";
import { white, lightestGrey, blue } from "./src/colorPalette";

const screenHeight = Dimensions.get("window").height;

const authFlow = createSwitchNavigator({
  signInScreen: SignInScreen,
  signInForm: SignInForm,
  signUpForm: SignUpForm,
  resetCodeForm: ResetCodeForm,
  resetPasswordForm: ResetPasswordForm,
  mainFlow: createBottomTabNavigator(
    {
      exerciseLogFlow: {
        screen: createSwitchNavigator({
          ExerciseLog: ExerciseLogScreen,
          WorkoutForm: NewWorkoutForm,
          ExerciseForm: NewExerciseForm,
          SetForm: NewSetForm,
          DeleteForm: ConfirmDeleteForm
        })
      },
      Calendar: {
        screen: createSwitchNavigator({
          Calendar: CalendarScreen,
          CalendarsList: CalendarsListScreen
        })
      },
      exerciseTemplateFlow: {
        screen: createSwitchNavigator({
          SelectTemplate: SelectTemplateScreen,
          CreatingTemplate: CreatingTemplateScreen,
          ViewTemplate: ViewTemplateScreen,
          DeleteTemplate: DeleteTemplateForm
        })
      },
      statsFlow: {
        screen: createSwitchNavigator({
          SelectExercise: SelectExerciseScreen,
          ViewStats: ViewStatsScreen
        })
      },
      Settings: {
        screen: SettingsScreen
      }
    },
    {
      tabBarOptions: {
        showLabel: false,
        style: {
          backgroundColor: lightestGrey,
          borderTopWidth: 0,
          height: screenHeight * 0.1
        },
        activeTintColor: blue,
        inactiveTintColor: white
      },
      defaultNavigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ focused }) => {
          const { routeName } = navigation.state;

          let icon;
          if (routeName === "exerciseLogFlow") icon = faBook;
          else if (routeName === "Calendar") icon = faCalendarAlt;
          else if (routeName === "exerciseTemplateFlow") icon = faStickyNote;
          else if (routeName === "statsFlow") icon = faChartLine;
          else icon = faCog;

          const color = focused ? blue : white;

          return <TabBarIcon icon={icon} color={color} />;
        }
      })
    }
  )
});

const Navigation = createAppContainer(authFlow);

export default function App() {
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
}
