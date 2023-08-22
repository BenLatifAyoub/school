import { StyleSheet } from "react-native";

export const getTextEmailStyles = (selectedEmailInput: string) => {
  return {
    color: "#121212",
    height: 40,
    width: 340,
    borderBottomWidth: 1,
    borderColor:
      selectedEmailInput === "email" ? "rgba(85,103,248,1)" : "black",
    textAlign: "left",
    backgroundColor: "rgba(255,255,255,1)",
    borderStyle: "solid",
  };
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    alignItems: "center",
  },
  back: {
    width: 50,
    height: 50,
    marginTop: 50,
    marginRight: 330,
    backgroundColor: "#ffffff",
  },
  icon: {
    fontSize: 40,
    color: "rgba(128,128,128,1)",
  },
  title: {
    color: "#000000",
    fontSize: 50,
    fontWeight: "400",
    textAlign: "center",
    marginRight: 235,
    width: "85%",
  },

  calendarWrapper: {
    marginTop: 10,
    width: '100%',
    height: '47%',
    flexDirection: "column",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",

  },
  tasksWrapper: {
    padding: 10,
    backgroundColor: "#ffffff",
    width: '100%'
  },
  taskItem: {
    flexDirection: "column",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  addButton: {
    width: 50,
    height: 50,
    marginLeft: 330,
    backgroundColor: "#ffffff",
    marginBottom: 10
  },
  addIcon:{
    fontSize: 40,
    color: "rgba(128,128,128,1)",
  },
  taskTitle: {
    color: "#000000",
    fontSize: 30,
    fontWeight: "400",
    textAlign: "left",
  } ,
  calendar: {

  },
  dayText: {
    color: "#333333",
    // Add more styles as needed
  },
  taskButton: {
    marginTop: 20,

  },
  row: {
    flexDirection: "row",
  }

});
