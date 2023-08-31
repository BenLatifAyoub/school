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
import { addTask, editTask } from "../../Redux/userActions";
import { Task } from "../../Redux/userReducer";
import Icon from "react-native-vector-icons/EvilIcons";
import * as Notifications from "expo-notifications";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRoute } from "@react-navigation/native";

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
  formatDate: any;
  handleGoBack: any;
  handleConfirm: any;
  hideDatePicker: any;
  handleModifyTask: any;
  showDatePicker: any;
  userName: any;
  isDatePickerVisible: any;
  setDatePickerVisible: any;
  confirm: any;
  setConfirm: any;
  selectedDate: any;
  setSelectedDate: any;
  desc: any;
  setDesc: any;
  selectedTitleInput: any;
  setSelectedTitleInput: any;
  descInputRef: any;
  dispatch: any;
  route: any;
  disc: any;
  dates: any;
  time: any;
};

const EditTask: React.FC<Props> = ({
  formatDate,
  handleGoBack,
  handleConfirm,
  hideDatePicker,
  handleModifyTask,
  showDatePicker,
  userName,
  isDatePickerVisible,
  setDatePickerVisible,
  confirm,
  setConfirm,
  selectedDate,
  setSelectedDate,
  desc,
  setDesc,
  selectedTitleInput,
  setSelectedTitleInput,
  descInputRef,
  dispatch,
  route,
  disc,
  dates,
  time
}) => {
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.row}>
        <TouchableOpacity style={styles.back} onPress={handleGoBack}>
          <Icon name="close-o" style={styles.icon1}></Icon>
        </TouchableOpacity>
        <TouchableOpacity style={styles.Donebutton} onPress={handleModifyTask}>
          <Icon name="check" style={styles.icon1}></Icon>
        </TouchableOpacity>
      </View>
      <View style={styles.menu}>
        <TextInput
          textBreakStrategy="simple"
          clearButtonMode="never"
          selectionColor="#E3AD6A"
          placeholder="Title"
          defaultValue={disc}
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
          {confirm ? (
            <Text style={styles.time}>{formatDate(selectedDate)}</Text>
          ) : (
            <Text style={styles.time}>
              {dates},{time}
            </Text>
          )}
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

export default EditTask;
