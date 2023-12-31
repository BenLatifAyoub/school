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
import { getTextTitleStyles, styles } from "./AddTaskStyle";
import { addTask } from "../../Redux/userActions";
import { Task } from "../../Redux/userReducer";
import Icon from "react-native-vector-icons/EvilIcons";
import * as Notifications from "expo-notifications";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { v4 as uuidv4 } from "uuid";

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
  handleDone: any;
  handleGoBack: any;
  handleConfirm: any;
  formatDate: any;
  showDatePicker: any;
  hideDatePicker: any;
  userName: any;
  isDatePickerVisible: any;
  setDatePickerVisible: any;
  selectedDate: any;
  setSelectedDate: any;
  desc: any;
  setDesc: any;
  selectedTitleInput: string;
  setSelectedTitleInput: any;
  descInputRef: any;
  dispatch: any;
};

const AddTasks: React.FC<Props> = ({
  handleDone,
  handleGoBack,
  handleConfirm,
  formatDate,
  showDatePicker,
  hideDatePicker,
  userName,
  isDatePickerVisible,
  setDatePickerVisible,
  selectedDate,
  setSelectedDate,
  desc,
  setDesc,
  selectedTitleInput,
  setSelectedTitleInput,
  descInputRef,
  dispatch,
}) => {
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
      <View style={styles.menu}>
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
      </View>
    </KeyboardAvoidingView>
  );
};

export default AddTasks;
