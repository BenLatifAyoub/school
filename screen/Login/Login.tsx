import React from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Image,
  TextStyle,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { app } from "../../firebase";
import {
  styles,
  getTextPasswordStyles,
  getTextInputStyles,
} from "./loginStyle";
import { getAuth, Auth } from "firebase/auth";
import Icon from "react-native-vector-icons/Feather";

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
  email: any;
  setEmail: any;
  password: any;
  setPassword: any;
  errorText: any;
  isVisible: any;
  setisVisible: any;
  handleLogin: any;
  handleSign: any;
  handleGoBack: any;
  selectedInput: any;
  setSelectedInput: any;
  selectedPasswordInput: any;
  setSelectedPasswordInput: any;
  passwordInputRef: any;
};

const LOGIN: React.FC<Props> = ({
  email,
  setEmail,
  password,
  setPassword,
  errorText,
  isVisible,
  setisVisible,
  handleLogin,
  handleSign,
  handleGoBack,
  selectedInput,
  setSelectedInput,
  selectedPasswordInput,
  setSelectedPasswordInput,
  passwordInputRef,
}) => {
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableOpacity style={styles.back} onPress={() => handleGoBack()}>
        <Icon name="arrow-left-circle" style={styles.icon}></Icon>
      </TouchableOpacity>
      <Text style={styles.title}>Login</Text>
      <Text style={styles.Email}>Email</Text>
      <TextInput
        textBreakStrategy="simple"
        clearButtonMode="never"
        selectionColor="rgba(85,103,248,1)"
        keyboardType="email-address"
        defaultValue={email}
        style={getTextInputStyles(selectedInput) as TextStyle}
        onChangeText={(text) => setEmail(text)}
        onFocus={() => setSelectedInput("email")}
        onBlur={() => setSelectedInput("")}
        onSubmitEditing={() => passwordInputRef.current?.focus()}
      />
      <Text style={styles.password}>Password</Text>
      <View style={styles.passwordInputContainer}>
        <TextInput
          textBreakStrategy="simple"
          clearButtonMode="never"
          selectionColor="rgba(85,103,248,1)"
          keyboardType="default"
          secureTextEntry={isVisible}
          defaultValue={password}
          ref={passwordInputRef}
          style={getTextPasswordStyles(selectedPasswordInput) as TextStyle}
          onChangeText={(text) => setPassword(text)}
          onFocus={() => setSelectedPasswordInput("email")}
          onBlur={() => setSelectedPasswordInput("")}
          onSubmitEditing={() => handleLogin()}
        />
        <TouchableOpacity
          style={styles.passwordVisibilityButton}
          onPress={() => setisVisible(!isVisible)}
        >
          <Icon name={isVisible ? "eye" : "eye-off"} size={20} color="gray" />
        </TouchableOpacity>
      </View>
      <Text style={styles.errorText}>{errorText}</Text>
      <TouchableOpacity style={styles.button} onPress={() => handleLogin()}>
        <Text style={styles.login}>LOGIN</Text>
      </TouchableOpacity>
      <View style={styles.registerRow}>
        <Text style={styles.text1}>Don't have an account?</Text>
        <TouchableOpacity
          style={styles.registerButton}
          onPress={() => handleSign()}
        >
          <Text style={styles.regestirNow}>Sign in</Text>
        </TouchableOpacity>
      </View>
      <Image
        source={require("../../assets/man-reading-book-character-illustration-free-vector.png")}
        resizeMode="contain"
        style={styles.image}
      ></Image>
    </KeyboardAvoidingView>
  );
};

export default LOGIN;
