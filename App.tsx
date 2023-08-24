import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeContainer from "./screen/HomeContainer";
import LoginContainer from "./screen/LoginContainer";
import SignUpContainer from "./screen/SignUpContainer";
import WelcomeContainer from "./screen/WelcomeContainer";
import Task from "./screen/task";
import AddTask from "./screen/AddTask";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "./firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Provider } from "react-redux";
import store from "./Redux/store";
import * as Notifications from "expo-notifications";
import { updateUser } from "./Redux/userActions";

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

        store.dispatch(updateUser(storedEmail, storedUsername));
      } catch (error) {
        console.error("Error reading authentication state:", error);
      }
    };

    const unsubscribe = onAuthStateChanged(authInstance, async (user) => {
      setIsSignedIn(!!user);
      try {
        if (user) {
          await AsyncStorage.setItem("isSignedIn", "true");

          if (user.displayName) {
            await AsyncStorage.setItem("username", user.displayName);
          }

          if (user.email) {
            await AsyncStorage.setItem("email", user.email);
          }
        } else {
          await AsyncStorage.removeItem("isSignedIn");

          await AsyncStorage.removeItem("username");
          await AsyncStorage.removeItem("email");
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
