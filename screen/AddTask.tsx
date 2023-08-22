import React, { useState } from "react";
import { Auth, getAuth } from "firebase/auth";
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
import { app } from "../firebase";
import {
  getTextTitleStyles,
  styles,
  getTextNotesStyles,
} from "../styles/AddTask";
import { addTask } from "../Redux/userActions";
import { Task, UserState } from "../Redux/userReducer";

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
  const [descInputRef, setDescInputRef] = useState<TextInput | null>(null);
  const dispatch = useDispatch();

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
    if (!selectedDate) {
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

    dispatch(addTask(newTask)); // Dispatch the async action
    setDesc("");
    setSelectedDate(new Date());

    console.log(userName);

    navigation.goBack();
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TextInput
        textBreakStrategy="simple"
        clearButtonMode="never"
        selectionColor="rgba(85,103,248,1)"
        placeholder="Title"
        defaultValue={desc}
        style={getTextTitleStyles(selectedTitleInput) as TextStyle}
        onChangeText={(text) => setDesc(text)}
        onFocus={() => setSelectedTitleInput("title")}
        onBlur={() => setSelectedTitleInput("")}
      />
      <TextInput
        textBreakStrategy="simple"
        clearButtonMode="never"
        selectionColor="rgba(85,103,248,1)"
        placeholder="Notes"
        style={getTextNotesStyles(selectedNoteInput) as TextStyle}
        onChangeText={(text) => setEmail(text)}
        onFocus={() => setSelectedNoteInput("title")}
        onBlur={() => setSelectedNoteInput("")}
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
      <TouchableOpacity style={styles.back} onPress={() => handleGoBack()}>
        <Text>Cancel</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.Donebutton} onPress={() => handleDone()}>
        <Text>Done</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

export default AddTasks;
