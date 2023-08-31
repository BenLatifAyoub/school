import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { Calendar } from "react-native-calendars";
import { styles } from "./TaskStyle";

type Props = {
  handleEdit: any;
  handleGoBack: any;
  handleAddTask: any;
  countTasksForSelectedDate: any;
  formatDate: any;
  generateMarkedDates: any;
  selectedDate: any;
  setSelectedDate: any;
  tasks: any;
  tas: any;
};

const Taskk: React.FC<Props> = ({
  handleEdit,
  handleGoBack,
  handleAddTask,
  countTasksForSelectedDate,
  formatDate,
  generateMarkedDates,
  selectedDate,
  setSelectedDate,
  tasks,
  tas,
}) => {
  const getCurrentDate = () => {
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().split("T")[0];
    return formattedDate;
  };

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <TouchableOpacity style={styles.back} onPress={handleGoBack}>
          <Icon name="arrow-left-circle" style={styles.icon}></Icon>
        </TouchableOpacity>
        <Text style={styles.title}> Profile </Text>
      </View>
      <View style={styles.menu}>
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
                <TouchableOpacity
                  style={styles.taskButton}
                  onPress={() => handleEdit(task)}
                >
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
    </View>
  );
};

export default Taskk;
