import React, { useState } from "react";
import { StackNavigationProp } from "@react-navigation/stack";
import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { Calendar } from "react-native-calendars";
import { styles } from "../styles/Task";
import { useSelector } from "react-redux";

type RootStackParamList = {
  Home: undefined;
  AddTask: undefined;
};
type LoginScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Home"
>;

type Props = {
  navigation: LoginScreenNavigationProp;
};

const Tasks: React.FC<Props> = ({ navigation }) => {
  const getCurrentDate = () => {
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().split("T")[0];
    return formattedDate;
  };
  let tas = false;
  const [selectedDate, setSelectedDate] = useState<string>(getCurrentDate());
  const tasks = useSelector((state: any) => state.user.tasks);
  console.log("task", tasks);

  const generateMarkedDates = () => {
    const markedDates: Record<string, any> = {};

    tasks.forEach((task: any) => {
      markedDates[task.date] = { marked: true, dotColor: "#E3AD6A" };
      if (task.date === getCurrentDate()) {
        tas = true;
      }
    });

    return markedDates;
  };

  const handleGoBack = () => {
    navigation.goBack();
  };
  const handleAddTask = () => {
    navigation.navigate("AddTask");
  };

  const countTasksForSelectedDate = () => {
    if (!selectedDate) {
      return 0;
    }

    const count = tasks.filter(
      (task: any) => task.date === selectedDate
    ).length;
    return count;
  };

  const formatDate = (inputDate: string) => {
    const date = new Date(inputDate);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    const day = date.getDate();
    const monthIndex = date.getMonth();
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const month = months[monthIndex];

    if (date.toDateString() === today.toDateString()) {
      return "Today";
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return "Tomorrow";
    } else if (date.toDateString() === yesterday.toDateString()) {
      return "Yesterday";
    } else {
      return `${day} ${month}`;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <TouchableOpacity style={styles.back} onPress={handleGoBack}>
          <Icon name="arrow-left-circle" style={styles.icon}></Icon>
        </TouchableOpacity>
        <Image
          source={require("../assets/8518144-startup-life-illustration-concept-vectoriel.png")}
          style={styles.image}
        ></Image>
      </View>
      <View style={styles.calendarWrapper}>
        <Calendar
          theme={{
            arrowColor: "#333333",
            monthTextColor: "#333333",
          }}
          markingType={"custom"}
          markedDates={{
            ...generateMarkedDates(),
            [selectedDate || ""]: {
              customStyles: {
                container: {
                  borderColor: "#E3AD6A",
                  borderWidth: 1,
                  borderRadius: 12,
                },
              },
            },
            [getCurrentDate()]: {
              marked: tas,
              dotColor: "white",
              customStyles: {
                container: {
                  backgroundColor: "#E3AD6A",
                  borderRadius: 12,
                },
                text: {
                  color: "white",
                  fontWeight: "bold",
                },
              },
            },
          }}
          onDayPress={(day) => setSelectedDate(day.dateString)}
        />
      </View>
      <ScrollView style={styles.tasksWrapper}>
        <Text style={styles.taskTitle}>
          {formatDate(selectedDate)} - {countTasksForSelectedDate()} Tasks
        </Text>
        {tasks
          .filter((task: any) => task.date === selectedDate)
          .map((task: any, index: any) => (
            <View key={index} style={styles.taskItem}>
              <TouchableOpacity style={styles.taskButton}>
                <View style={styles.row}>
                  <Text> {task.time} </Text>
                  <View
                    style={{
                      backgroundColor: "#E3AD6A",
                      width: 6,
                      height: 30,
                      borderRadius: 5,
                      marginLeft: 10,
                    }}
                  />
                  <Text style={{ marginLeft: 10 }}>{task.disc}</Text>
                </View>
              </TouchableOpacity>
            </View>
          ))}
        {tasks.filter((task: any) => task.date === selectedDate).length ===
          0 && (
          <View style={styles.taskItem}>
            <Text>No available Task</Text>
          </View>
        )}
      </ScrollView>
      <TouchableOpacity style={styles.addButton} onPress={handleAddTask}>
        <Icon name="plus-circle" style={styles.addIcon}></Icon>
      </TouchableOpacity>
    </View>
  );
};

export default Tasks;
