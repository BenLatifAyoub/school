import React, { useRef, useState } from "react";
import {
  TextInput,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { app } from "../firebase";
import { getAuth, signInWithEmailAndPassword, Auth } from "firebase/auth";
import LOGIN from "./Login";
import { useDispatch } from 'react-redux';
import { updateUser } from '../Redux/userActions';

const authInstance: Auth = getAuth(app);

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

const LoginContainer: React.FC<Props> = ({ navigation }) => {
  const dispatch = useDispatch();  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedInput, setSelectedInput] = useState("");
  const [selectedPasswordInput, setSelectedPasswordInput] = useState("");
  const [errorText, setErrorText] = useState("");
  const [isVisible, setisVisible] = useState(true);
  const passwordInputRef = useRef<TextInput | null>(null);

  const handleLogin = async () => {
    console.log("username: ", email);
    console.log("password: ", password);
    if (!email || !password) {
      setErrorText("Please provide both email and password.");
      return;
    }
    try {
      const userCredential = await signInWithEmailAndPassword(
        authInstance,
        email,
        password
      );
      const user = userCredential.user;
      dispatch(updateUser(email, user.displayName, password));
      setEmail("");
      setPassword("");
      console.log(user);
    } catch (error) {
      console.log("error");
      setErrorText("Wrong Email or Password.");
      setEmail("");
      setPassword("");
    }
  };

  const handleSign = () => {
    navigation.navigate("SignUp");
    setEmail("");
    setPassword("");
    setErrorText("");
  };
  const handleGoBack = () => {
    if (navigation.canGoBack()) {
        navigation.goBack();
      } else {
        navigation.navigate("Welcome");
      }
      setEmail("");
      setPassword("");
      setErrorText("");
  };

  return (
    <LOGIN
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      errorText={errorText}
      isVisible={isVisible}
      setisVisible={setisVisible}
      handleLogin={handleLogin}
      handleSign={handleSign}
      handleGoBack={handleGoBack}
      selectedInput={selectedInput}
      setSelectedInput={setSelectedInput}
      selectedPasswordInput={selectedPasswordInput}
      setSelectedPasswordInput={setSelectedPasswordInput}
      passwordInputRef={passwordInputRef}
    />
);
};

export default LoginContainer;