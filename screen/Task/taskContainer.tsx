import React, { useState } from "react";
import { StackNavigationProp } from "@react-navigation/stack";
import { useSelector } from "react-redux";
import { Task } from "../../Redux/userReducer";
import Taskk from "./task";

type RootStackParamList = {
  Home: undefined;
  AddTask: undefined;
  EditTask: { task: Task };
  Welcome: undefined;
};
type LoginScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Welcome"
>;

type Props = {
  navigation: LoginScreenNavigationProp;
};

const TasksContainer: React.FC<Props> = ({ navigation }) => {
  const getCurrentDate = () => {
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().split("T")[0];
    return formattedDate;
  };
  const [tas, setTas] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string>(getCurrentDate());
  const tasks = useSelector((state: any) => state.user.tasks);

  const generateMarkedDates = () => {
    const markedDates: Record<string, any> = {};

    tasks.forEach((task: any) => {
      markedDates[task.date] = { marked: true, dotColor: "#E3AD6A" };
      if (task.date === getCurrentDate()) {
        setTas(true);
      }
    });

    return markedDates;
  };

  const handleEdit = (task: Task) => {
    navigation.navigate("EditTask", { task });
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
    <Taskk
      handleEdit={handleEdit}
      handleGoBack={handleGoBack}
      handleAddTask={handleAddTask}
      countTasksForSelectedDate={countTasksForSelectedDate}
      formatDate={formatDate}
      generateMarkedDates={generateMarkedDates}
      selectedDate={selectedDate}
      setSelectedDate={setSelectedDate}
      tasks={tasks}
      tas={tas}
    />
  );
};

export default TasksContainer;
