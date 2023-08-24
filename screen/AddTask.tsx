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
import { getTextTitleStyles, styles } from "../styles/AddTask";
import { addTask } from "../Redux/userActions";
import { Task } from "../Redux/userReducer";
import Icon from "react-native-vector-icons/EvilIcons";
import * as Notifications from "expo-notifications";



type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  SignUp: undefined;
  Task: undefined;
};
type LoginScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Login"
>;

type Props = {
  navigation: LoginScreenNavigationProp;
};

const AddTasks: React.FC<Props> = ({ navigation }) => {
  const userName = useSelector((state: any) => state.user);
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [desc, setDesc] = useState("");
  const [selectedTitleInput, setSelectedTitleInput] = useState("");
  const [selectedNoteInput, setSelectedNoteInput] = useState("");
  const [email, setEmail] = useState("");
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
    console.log(userName);
  };

  const handleDone = async () => {
    if (!selectedDate || !desc) {
      console.log("noo");
      return;
    }

    const newTask: Task = {
      disc: desc,
      date: selectedDate.toISOString().split("T")[0],
      time: selectedDate.toLocaleTimeString(undefined, {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    try {
      await Notifications.scheduleNotificationAsync({
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
    console.log(userName);
    setDesc("");
    setSelectedDate(new Date());
    navigation.navigate("Task");
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.row}>
        <TouchableOpacity style={styles.back} onPress={() => handleGoBack()}>
          <Icon name="close-o" style={styles.icon1}></Icon>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.Donebutton}
          onPress={() => handleDone()}
        >
          <Icon name="check" style={styles.icon1}></Icon>
        </TouchableOpacity>
      </View>
      <TextInput
        textBreakStrategy="simple"
        clearButtonMode="never"
        selectionColor="#E3AD6A"
        placeholder="Title"
        defaultValue={desc}
        ref={descInputRef}
        style={getTextTitleStyles(selectedTitleInput) as TextStyle}
        onChangeText={(text) => setDesc(text)}
        onFocus={() => setSelectedTitleInput("title")}
        onBlur={() => setSelectedTitleInput("")}
      />
      <View style={styles.row}>
        <TouchableOpacity style={styles.button} onPress={showDatePicker}>
          <FontAwesome name="calendar" style={styles.icon}></FontAwesome>
        </TouchableOpacity>
        <Text style={styles.time}>{formatDate(selectedDate)}</Text>
      </View>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="datetime"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </KeyboardAvoidingView>
  );
};

export default AddTasks;
