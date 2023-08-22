// import React, { useRef, useState } from "react";
// import { TextInput } from "react-native";
// import { StackNavigationProp } from "@react-navigation/stack";
// import { app } from "../firebase";
// import {
//   getAuth,
//   createUserWithEmailAndPassword,
//   updateProfile,
//   Auth,
// } from "firebase/auth";
// import SignUp from "./SignUp";

// const authInstance: Auth = getAuth(app);

// type RootStackParamList = {
//   Login: undefined;
//   Home: undefined;
//   SignUp: undefined;
// };
// type LoginScreenNavigationProp = StackNavigationProp<
//   RootStackParamList,
//   "Login"
// >;

// type Props = {
//   navigation: LoginScreenNavigationProp;
// };

// const SignUpContainer: React.FC<Props> = ({ navigation }) => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [name, setName] = useState("");
//   const [selectedNameInput, setSelectedNameInput] = useState("");
//   const [selectedEmailInput, setSelectedEmailInput] = useState("");
//   const [selectedPasswordInput, setSelectedPasswordInput] = useState("");
//   const [errorText, setErrorText] = useState("");
//   const [isVisible, setisVisible] = useState(true);
//   const passwordInputRef = useRef<TextInput | null>(null);
//   const emailInputRef = useRef<TextInput | null>(null);

//   const handleSignin = async () => {
//     console.log("username: ", email);
//     console.log("password: ", password);
//     console.log("name :", name);
//     if (!email || !password || !name) {
//       setErrorText("Please provide name, email and password.");
//       return;
//     }
//     try {
//       const userCredential = await createUserWithEmailAndPassword(
//         authInstance,
//         email,
//         password
//       );
//       const user = userCredential.user;
//       console.log(userCredential);
//       await updateProfile(user, {
//         displayName: name,
//       });
//       setName("");
//       setEmail("");
//       setPassword("");
//       navigation.navigate("Home");
//     } catch (error: any) {
//       console.log("erroooor", error.message);
//       setName("");
//       setEmail("");
//       setPassword("");
//       setErrorText("email is already in use");
//     }
//   };
//   const handleLogin = () => {
//     navigation.navigate("Login");
//     setName("");
//     setEmail("");
//     setPassword("");
//     setErrorText("");
//   };
//   const handleGoBack = () => {
//     navigation.goBack();
//     setName("");
//     setEmail("");
//     setPassword("");
//     setErrorText("");
//   };

//   return (
//     // <SignUp
//     //   email={email}
//     //   setEmail={setEmail}
//     //   password={password}
//     //   setPassword={setPassword}
//     //   name={name}
//     //   setName={setName}
//     //   selectedNameInput={selectedNameInput}
//     //   setSelectedNameInput={setSelectedNameInput}
//     //   selectedEmailInput={selectedEmailInput}
//     //   setSelectedEmailInput={setSelectedEmailInput}
//     //   selectedPasswordInput={selectedPasswordInput}
//     //   setSelectedPasswordInput={setSelectedPasswordInput}
//     //   errorText={errorText}
//     //   isVisible={isVisible}
//     //   setisVisible={setisVisible}
//     //   passwordInputRef={passwordInputRef}
//     //   emailInputRef={emailInputRef}
//     //   handleSignin={handleSignin}
//     //   handleLogin={handleLogin}
//     //   handleGoBack={handleGoBack}
//     // />
//   );
// };

// export default SignUpContainer;