import React, { useEffect, useRef, useState } from "react";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { StackNavigationProp } from "@react-navigation/stack";
import {
  TextInput,
  TouchableOpacity,
  Text,
  TextStyle,
  KeyboardAvoidingView,
  Platform,
  View,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useDispatch, useSelector } from "react-redux";
import { getTextTitleStyles, styles } from "./EditTaskStyle";
import { editTask } from "../../Redux/userActions";
import { Task } from "../../Redux/userReducer";
import Icon from "react-native-vector-icons/EvilIcons";
import * as Notifications from "expo-notifications";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRoute } from "@react-navigation/native";
import EditTask from "./EditTask";

type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  Task: undefined;
  EditTask: undefined;
  Welcome: undefined;
};
type LoginScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Welcome"
>;

type Props = {
  navigation: LoginScreenNavigationProp;
};

const EditTaskContainer: React.FC<Props> = ({ navigation }) => {
  const userName = useSelector((state: any) => state.user);
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [desc, setDesc] = useState("");
  const [selectedTitleInput, setSelectedTitleInput] = useState("");
  const descInputRef = useRef<TextInput | null>(null);
  const dispatch = useDispatch();
  const route = useRoute();
  const { task } = route.params as { task: Task };

  useEffect(() => {
    if (descInputRef.current) {
      descInputRef.current.focus();
    }
  }, []);
  const showDatePicker = () => {
    setDatePickerVisible(true);
  };
  const handleModifyTask = async () => {
    if (!selectedDate || !desc) {
      console.log("noo");
      return;
    }

    const notificationId = task.id;
    const newTask: Task = {
      disc: desc,
      date: selectedDate.toISOString().split("T")[0],
      time: selectedDate.toLocaleTimeString(undefined, {
        hour: "2-digit",
        minute: "2-digit",
      }),
      id: notificationId,
    };

    try {
      await Notifications.scheduleNotificationAsync({
        identifier: notificationId,
        content: {
          title: "Upcoming Task",
          body: `You have a modified task "${newTask.disc}" at "${newTask.time}"`,
        },
        trigger: new Date(newTask.date + " " + newTask.time),
      });
      console.log(
        "Notification modified and scheduled successfully:",
        newTask.disc
      );
    } catch (error) {
      console.error("Error scheduling modified notification:", error);
    }
    dispatch(editTask(newTask));
    console.log(userName);

    try {
      const tasks = await AsyncStorage.getItem("tasks");
      const updatedTasks = tasks ? JSON.parse(tasks) : [];
      updatedTasks.push(newTask);
      await AsyncStorage.setItem("tasks", JSON.stringify(updatedTasks));
      console.log("Tasks saved to AsyncStorage:", updatedTasks);
    } catch (error) {
      console.error("Error saving tasks to AsyncStorage:", error);
    }
    setDesc("");
    setSelectedDate(new Date());
    navigation.navigate("Task");
  };
  const hideDatePicker = () => {
    setDatePickerVisible(false);
  };

  const handleConfirm = (date: Date) => {
    setSelectedDate(date);
    setConfirm(true);
    hideDatePicker();
  };
  const handleGoBack = () => {
    navigation.goBack();
  };
  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Intl.DateTimeFormat(undefined, options).format(date);
  };

  return (
<EditTask
formatDate={formatDate}
handleGoBack={handleGoBack}
handleConfirm={handleConfirm}
hideDatePicker={hideDatePicker}
handleModifyTask={handleModifyTask}
showDatePicker={showDatePicker}
userName={userName}
isDatePickerVisible={isDatePickerVisible}
setDatePickerVisible={setDatePickerVisible}
confirm={confirm}
setConfirm={setConfirm}
selectedDate={selectedDate}
setSelectedDate={setSelectedDate}
desc={desc}
setDesc={setDesc}
selectedTitleInput={selectedTitleInput}
setSelectedTitleInput={setSelectedTitleInput}
descInputRef={descInputRef}
dispatch={dispatch}
route={route}
disc={task.disc}
dates={task.date}
time={task.time}
/>
  );
};

export default EditTaskContainer;
