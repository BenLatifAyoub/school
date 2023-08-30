import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeContainer from "./screen/Home/HomeContainer";
import LoginContainer from "./screen/Login/LoginContainer";
import SignUpContainer from "./screen/SignUp/SignUpContainer";
import WelcomeContainer from "./screen/Welcome/WelcomeContainer";
import Profil from "./screen/Profile/Profile";
import ProfilD from "./screen/ProfileDetails/profileD";
import Task from "./screen/Task/task";
import AddTask from "./screen/AddTask/AddTask";
import { getAuth, onAuthStateChanged, initializeAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "./firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Provider } from "react-redux";
import store from "./Redux/store";
import * as Notifications from "expo-notifications";
import { updateUser, updateTasks } from "./Redux/userActions";
import firebase from "firebase/compat";

const Stack = createStackNavigator();

export default function App() {
  const authInstance = getAuth(app);
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    async function requestNotificationPermissions() {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== "granted") {
        alert("Notification permissions not granted!");
      } else {
        console.log("Notification permissions granted");
      }
    }
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
      }),
    });

    const checkAuthState = async () => {
      try {
        const value = await AsyncStorage.getItem("isSignedIn");
        setIsSignedIn(value === "true");

        const storedUsername = await AsyncStorage.getItem("username");
        const storedEmail = await AsyncStorage.getItem("email");
        const storedPassword = await AsyncStorage.getItem("password");
        const storedPhoto = await AsyncStorage.getItem('photo');
        const storedCity = await AsyncStorage.getItem('city');
        const storedGouv = await AsyncStorage.getItem('gouv');
        console.log("password",storedPassword)
        try {
          if (storedEmail && storedPassword) {
            const userCredential = await signInWithEmailAndPassword(
              authInstance,
              storedEmail,
              storedPassword
            );
            console.log(userCredential)
            await AsyncStorage.setItem("password",storedPassword)
          }
        } catch (error) {
          
        }

   
        store.dispatch(updateUser(storedEmail, storedUsername, storedPhoto, storedCity, storedGouv));

        const storedTasks = await AsyncStorage.getItem("tasks");
        const parsedTasks = storedTasks ? JSON.parse(storedTasks) : [];

        store.dispatch(updateTasks(parsedTasks));
      } catch (error) {
        console.error("Error reading authentication state:", error);
      }
    };

    const unsubscribe = onAuthStateChanged(authInstance, async (user) => {
      setIsSignedIn(!!user);
      try {
        if (user) {
          await AsyncStorage.setItem("isSignedIn", "true");
          const userRef = firebase.firestore().collection('users').doc(user.uid);
          userRef.get()
          .then(async (doc) => {
            if (doc.exists) {
              const profileData = doc.data();
              if(profileData){
                await AsyncStorage.setItem("city", profileData.city);
                await AsyncStorage.setItem("gouv", profileData.gouvernemet);
              }
              console.log('User profile data:', profileData);
            } else {
              console.log('No user profile data found.');
            }
          })
          if (user.displayName) {
            await AsyncStorage.setItem("username", user.displayName);
          }

          if (user.email) {
            await AsyncStorage.setItem("email", user.email);
          }
          if (user.photoURL) {
            await AsyncStorage.setItem("photo", user.photoURL)
          }
        } else {
          await AsyncStorage.removeItem("isSignedIn");
          await AsyncStorage.removeItem("tasks");
          await AsyncStorage.removeItem("username");
          await AsyncStorage.removeItem("email");
          await AsyncStorage.removeItem("photo");
          await AsyncStorage.removeItem("password");
        }
      } catch (error) {
        console.error("Error saving authentication state:", error);
      }
    });

    requestNotificationPermissions();
    checkAuthState();

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Welcome">
          {isSignedIn ? (
            <>
              <Stack.Screen
                name="Home"
                component={HomeContainer}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Task"
                component={Task}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="AddTask"
                component={AddTask}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Profil"
                component={Profil}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="ProfilD"
                component={ProfilD}
                options={{ headerShown: false }}
              />
            </>
          ) : (
            <>
              <Stack.Screen
                name="Welcome"
                component={WelcomeContainer}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Login"
                component={LoginContainer}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="SignUp"
                component={SignUpContainer}
                options={{ headerShown: false }}
              />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
