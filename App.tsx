import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeContainer from "./screen/Home/HomeContainer";
import LoginContainer from "./screen/Login/LoginContainer";
import SignUpContainer from "./screen/SignUp/SignUpContainer";
import WelcomeContainer from "./screen/Welcome/WelcomeContainer";
import ProfilContainer from "./screen/Profile/ProfileContainer";
import ProfilDContainer from "./screen/ProfileDetails/ProfileDetailsContainer";
import TaskContaniner from "./screen/Task/taskContainer";
import AddTaskContaniner from "./screen/AddTask/AddTaskContainer";
import EditTaskContanier from "./screen/EditTasks/EditTaskContainer";
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { app } from "./firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Provider } from "react-redux";
import store from "./Redux/store";
import * as Notifications from "expo-notifications";
import {
  updateUser,
  updateTasks,
  updateUsername,
  updateEmail,
  updatePassword,
} from "./Redux/userActions";
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
        const storedIsSignedIN = await AsyncStorage.getItem("isSignedIn");
        const storedTasks = await AsyncStorage.getItem("tasks");
        if (storedIsSignedIN === "true") {
          const parsedTasks = storedTasks ? JSON.parse(storedTasks) : [];
          store.dispatch(updateTasks(parsedTasks));
        }
        const storedEmail = await AsyncStorage.getItem("email");
        const storedPassword = await AsyncStorage.getItem("password");

        try {
          if (storedEmail && storedPassword) {
            const userCredential = await signInWithEmailAndPassword(
              authInstance,
              storedEmail,
              storedPassword
            );
            if (storedTasks) {
              await AsyncStorage.setItem("tasks", storedTasks);
            }

            await AsyncStorage.setItem("password", storedPassword);
          }
        } catch (error) {}
      } catch (error) {
        console.error("Error reading authentication state:", error);
      }
    };

    const unsubscribe = onAuthStateChanged(authInstance, async (user) => {
      try {
        if (user) {
          let city = "";
          let gouvernemet = "";
          const userRef = firebase
            .firestore()
            .collection("users")
            .doc(user.uid);
          userRef.get().then(async (doc) => {
            if (doc.exists) {
              const profileData = doc.data();
              if (profileData) {
                city = profileData.city;
                gouvernemet = profileData.gouvernemet;
                await AsyncStorage.setItem("city", profileData.city);
                await AsyncStorage.setItem("gouv", profileData.gouvernemet);

                if (user.displayName) {
                  await AsyncStorage.setItem("username", user.displayName);
                }

                if (user.email) {
                  await AsyncStorage.setItem("email", user.email);
                }
                if (user.photoURL) {
                  await AsyncStorage.setItem("photo", user.photoURL);
                }

                store.dispatch(
                  updateUser(
                    user.email,
                    user.displayName,
                    user.photoURL,
                    city,
                    gouvernemet
                  )
                );
              }
              setIsSignedIn(!!user);
              await AsyncStorage.setItem("isSignedIn", "true");
            } else {
              if (user.displayName) {
                await AsyncStorage.setItem("username", user.displayName);
                store.dispatch(updateUsername(user.displayName));
              }
              if (user.email) {
                await AsyncStorage.setItem("email", user.email);
                store.dispatch(updateEmail(user.email));
              }
              if (user.photoURL) {
                await AsyncStorage.setItem("photo", user.photoURL);
                store.dispatch(updatePassword(user.photoURL));
              }
              setIsSignedIn(!!user);
              await AsyncStorage.setItem("isSignedIn", "true");
            }
          });
        } else {
          await AsyncStorage.removeItem("isSignedIn");
          await AsyncStorage.removeItem("tasks");
          await AsyncStorage.removeItem("username");
          await AsyncStorage.removeItem("email");
          await AsyncStorage.removeItem("photo");
          await AsyncStorage.removeItem("password");
          setIsSignedIn(!!user);
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
                component={TaskContaniner}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="AddTask"
                component={AddTaskContaniner}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="EditTask"
                component={EditTaskContanier}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Profil"
                component={ProfilContainer}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="ProfilD"
                component={ProfilDContainer}
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
