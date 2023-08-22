import React from "react";
import { StackNavigationProp } from "@react-navigation/stack";
import Welcome from "./welcome";
import { useLocalNotification } from "../useLocalNotification";
import { schedulePushNotification } from "../handle-local-notification";
import * as Notifications from "expo-notifications";

type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  SignUp: undefined;
  Welcome: undefined;
};
type LoginScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Welcome"
>;

type Props = {
  navigation: LoginScreenNavigationProp;
};

const WelcomeContainer: React.FC<Props> = ({ navigation }) => {
  const handleLogin = async () => {
    navigation.navigate("Login");
  };

  const handleSign = () => {
    navigation.navigate("SignUp");
  };
  return <Welcome handleLogin={handleLogin} handleSign={handleSign} />;
};

export default WelcomeContainer;
