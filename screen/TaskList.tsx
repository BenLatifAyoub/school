import React from "react";
import { View, Text } from "react-native";

interface Task {
  time: string;
  disc: string;
}

interface TaskListProps {
  tasks: Task[];
}

const TaskList: React.FC<TaskListProps> = ({ tasks }) => {
  return (
    <View>
      {tasks.map((task, index) => (
        <Text key={index}>
          {task.time} - {task.disc}
        </Text>
      ))}
    </View>
  );
};

export default TaskList;
