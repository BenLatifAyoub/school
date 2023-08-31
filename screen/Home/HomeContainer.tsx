import React from "react";
import { getAuth, signOut } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Home from "./Home";
import { useSelector } from "react-redux";
import { app } from "../../firebase";
import { StackNavigationProp } from "@react-navigation/stack";

const auth = getAuth(app);

type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  SignUp: undefined;
  Task: undefined;
  Profil: undefined;
  Welcome: undefined;
};
type LoginScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Welcome"
>;

type HomeProps = {
  navigation: LoginScreenNavigationProp;
};
const HomeContainer: React.FC<HomeProps> = ({ navigation }) => {
  const userEmail = useSelector((state: any) => state.user.email);
  const userName = useSelector((state: any) => state.user.username);
  const photo = useSelector((state: any) => state.user.photoUrl);
  const userCity = useSelector((state: any) => state.user.city);
  const userGouv = useSelector((state: any) => state.user.gouv);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      await AsyncStorage.removeItem("isSignedIn");
      await AsyncStorage.removeItem("tasks");
      await AsyncStorage.removeItem("username");
      await AsyncStorage.removeItem("email");
      await AsyncStorage.removeItem("photo");
      await AsyncStorage.removeItem("password");
    } catch (error: any) {
      console.error("Error logging out:", error.message);
    }
  };

  const handleTask = () => {
    navigation.navigate("Task");
  };
  const handleProfile = () => {
    navigation.navigate("Profil");
  };

  return (
    <Home
      userName={userName}
      handleLogout={handleLogout}
      handleTask={handleTask}
      handleProfile={handleProfile}
      userGouv={userGouv}
      userCity={userCity}
      photo={photo}
    />
  );
};

export default HomeContainer;
