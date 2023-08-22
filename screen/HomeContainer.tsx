import React from "react";
import { getAuth, signOut } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Home from "./Home";
import { useSelector } from "react-redux";
import { app } from "../firebase";
import { StackNavigationProp } from "@react-navigation/stack";

const auth = getAuth(app);

type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  SignUp: undefined;
  Task: undefined
};
type LoginScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Login"
>;

type HomeProps = {
  navigation: LoginScreenNavigationProp;
};
const HomeContainer: React.FC<HomeProps> = ({ navigation }) => {
  const userEmail = useSelector((state: any) => state.user.email);
  const userName = useSelector((state: any) => state.user.username);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      await AsyncStorage.removeItem("isSignedIn");
    } catch (error: any) {
      console.error("Error logging out:", error.message);
    }
  };

  const handleTask = () => {
    navigation.navigate("Task")
  }

  return <Home userName={userName} handleLogout={handleLogout} handleTask={handleTask} />;
};

export default HomeContainer;
