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
import { app } from "../firebase";
import {
  getAuth,
  Auth,
} from "firebase/auth";
import {
  styles,
  getTextPasswordStyles,
  getTextEmailStyles,
  getTextNameStyles,
} from "../styles/SignUp";
import Icon from "react-native-vector-icons/Feather";


const authInstance: Auth = getAuth(app);

type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  SignUp: undefined;
};
type LoginScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Login"
>;

type Props = {
  email: string,
  setEmail: any
  password: string
  setPassword: any
  name: string
  setName: any
  selectedNameInput: any
  setSelectedNameInput: any
  selectedEmailInput: any
  setSelectedEmailInput: any
  selectedPasswordInput: any
  setSelectedPasswordInput: any
  errorText: any
  isVisible: any
  setisVisible: any
  passwordInputRef: any
  emailInputRef: any
  handleNext: any
  handleLogin: any
  handleGoBack: any
};

const SignUp: React.FC<Props> = ({  
  email,
  setEmail,
  password,
  setPassword,
  name,
  setName,
  selectedNameInput,
  setSelectedNameInput,
  selectedEmailInput,
  setSelectedEmailInput,
  selectedPasswordInput,
  setSelectedPasswordInput,
  errorText,
  isVisible,
  setisVisible,
  passwordInputRef,
  emailInputRef,
  handleNext,
  handleLogin,
  handleGoBack, }) => {

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableOpacity style={styles.back} onPress={() => handleGoBack()}>
        <Icon name="arrow-left-circle" style={styles.icon}></Icon>
      </TouchableOpacity>
      <Text style={styles.title}>Sign in</Text>
      <Text style={styles.Name}>Name</Text>
      <TextInput
        textBreakStrategy="simple"
        clearButtonMode="never"
        selectionColor="rgba(85,103,248,1)"
        defaultValue={name}
        style={getTextNameStyles(selectedNameInput) as TextStyle}
        onChangeText={(text) => setName(text)}
        onFocus={() => setSelectedNameInput("Name")}
        onBlur={() => setSelectedNameInput("")}
        onSubmitEditing={() => emailInputRef.current?.focus()}
      />
      <Text style={styles.Email}>Email</Text>
      <TextInput
        textBreakStrategy="simple"
        clearButtonMode="never"
        selectionColor="rgba(85,103,248,1)"
        keyboardType="email-address"
        defaultValue={email}
        ref={emailInputRef}
        style={getTextEmailStyles(selectedEmailInput) as TextStyle}
        onChangeText={(text) => setEmail(text)}
        onFocus={() => setSelectedEmailInput("email")}
        onBlur={() => setSelectedEmailInput("")}
        onSubmitEditing={() => passwordInputRef.current?.focus()}
      />
      <Text style={styles.Password}>Password</Text>
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
          onFocus={() => setSelectedPasswordInput("password")}
          onBlur={() => setSelectedPasswordInput("")}
          onSubmitEditing={() => handleNext()}
        />
        <TouchableOpacity
          style={styles.passwordVisibilityButton}
          onPress={() => setisVisible(!isVisible)}
        >
          <Icon name={isVisible ? "eye" : "eye-off"} size={20} color="gray" />
        </TouchableOpacity>
      </View>
      <Text style={styles.errorText}>{errorText}</Text>
      <TouchableOpacity style={styles.button} onPress={() => handleNext()}>
        <Text style={styles.signUp}>Next</Text>
      </TouchableOpacity>
      <View style={styles.registerRow}>
        <Text style={styles.text1}>Do you have an account?</Text>
        <TouchableOpacity
          style={styles.registerButton}
          onPress={() => handleLogin()}
        >
          <Text style={styles.regestirNow}>Log in</Text>
        </TouchableOpacity>
      </View>
      <Image
        source={require("../assets/happy-woman-study-free-vector.png")}
        style={styles.image}
      ></Image>
    </KeyboardAvoidingView>
  );
};

export default SignUp;
