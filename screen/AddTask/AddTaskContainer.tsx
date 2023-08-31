import React, { useEffect, useRef, useState } from "react";
import { StackNavigationProp } from "@react-navigation/stack";
import { TextInput } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { addTask } from "../../Redux/userActions";
import { Task } from "../../Redux/userReducer";
import * as Notifications from "expo-notifications";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { v4 as uuidv4 } from "uuid";
import AddTasks from "./AddTask";

type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  SignUp: undefined;
  Task: undefined;
  Welcome: undefined;
};
type LoginScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Welcome"
>;

type Props = {
  navigation: LoginScreenNavigationProp;
};

const AddTasksContainer: React.FC<Props> = ({ navigation }) => {
  const userName = useSelector((state: any) => state.user);
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [desc, setDesc] = useState("");
  const [selectedTitleInput, setSelectedTitleInput] = useState("");
  const descInputRef = useRef<TextInput | null>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (descInputRef.current) {
      descInputRef.current.focus();
    }
  }, []);
  const showDatePicker = () => {
    setDatePickerVisible(true);
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
  const hideDatePicker = () => {
    setDatePickerVisible(false);
  };

  const handleConfirm = (date: Date) => {
    setSelectedDate(date);
    hideDatePicker();
  };
  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleDone = async () => {
    if (!selectedDate || !desc) {
      console.log("noo");
      return;
    }

    const notificationId = uuidv4();
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
          body: `You have a task "${newTask.disc}" at "${newTask.time}"`,
        },
        trigger: new Date(newTask.date + " " + newTask.time),
      });
      console.log("Notification scheduled successfully:", newTask.disc);
    } catch (error) {
      console.error("Error scheduling notification:", error);
    }

    dispatch(addTask(newTask));

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

  return (
    <AddTasks
      handleDone={handleDone}
      handleGoBack={handleGoBack}
      handleConfirm={handleConfirm}
      formatDate={formatDate}
      showDatePicker={showDatePicker}
      hideDatePicker={hideDatePicker}
      userName={userName}
      isDatePickerVisible={isDatePickerVisible}
      setDatePickerVisible={setDatePickerVisible}
      selectedDate={selectedDate}
      setSelectedDate={setSelectedDate}
      desc={desc}
      setDesc={setDesc}
      selectedTitleInput={selectedTitleInput}
      setSelectedTitleInput={setSelectedTitleInput}
      descInputRef={descInputRef}
      dispatch={dispatch}
    />
  );
};

export default AddTasksContainer;
