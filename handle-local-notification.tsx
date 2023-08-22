import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { Platform } from "react-native";

const TWO_WEEKS = 60 * 60 * 24 * 14;

export const schedulePushNotification = async () => {
  await Notifications.scheduleNotificationAsync({
    identifier: "review",
    content: {
      title: "Your opinion is important to us!",
      subtitle: "It's been a while since you used the app.",
      body: "Please take a moment to leave a review."
    },
    trigger: {
      seconds: TWO_WEEKS
    }
  });
};

export const registerForPushNotificationsAsync = async () => {
  let token: string = "";

  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FFAABBCC"
    });
  }

  if (Device.isDevice) {
    console.log("we are heereee")
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    console.log('exist', existingStatus)
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      console.log("dssdq", status)
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    console.log('finalStatusssss' ,finalStatus);
    token = (await Notifications.getExpoPushTokenAsync()).data;
  } else {
    alert("Must use physical device for Push Notifications");
  }

  console.log(token);

  return token;
};