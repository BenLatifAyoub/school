import { useState, useEffect, useRef } from "react";
import * as Notifications from "expo-notifications";
import { registerForPushNotificationsAsync } from "./handle-local-notification";

interface ILocalNotificationHook {
  expoPushToken: string | undefined;
  notification: Notifications.Notification;
}

export const useLocalNotification = (): ILocalNotificationHook => {
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(
    {} as Notifications.Notification
  );
  const notificationListener = useRef<Notifications.Subscription | undefined>();
  const responseListener = useRef<Notifications.Subscription | undefined>();

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => {
        console.log(token);
      setExpoPushToken(token || "");
    });

    notificationListener.current =
      Notifications.addNotificationReceivedListener(notification => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener(response => {
        setNotification(response.notification);
      });

    return () => {
      if (notificationListener.current?.remove) {
        notificationListener.current.remove();
      }
      if (responseListener.current?.remove) {
        responseListener.current.remove();
      }
    };
  }, []);

  return { expoPushToken, notification };
};