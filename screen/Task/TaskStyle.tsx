import { StyleSheet } from "react-native";


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
    marginRight: 240,
    backgroundColor: "#ffffff",
  },
  icon: {
    fontSize: 40,
    color: "rgba(128,128,128,1)",
  },
  image: {
    marginTop: 50,
    width: 90,
    height: 80,
    borderRadius: 50,
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
    width: "100%",
    height: "47%",
    flexDirection: "column",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  tasksWrapper: {
    padding: 10,
    backgroundColor: "#ffffff",
    width: "100%",
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
    marginBottom: 10,
  },
  addIcon: {
    fontSize: 40,
    color: "rgba(128,128,128,1)",
  },
  taskTitle: {
    color: "#000000",
    fontSize: 30,
    fontWeight: "400",
    textAlign: "left",
  },
  calendar: {},
  dayText: {
    color: "#333333",
  },
  taskButton: {
    marginTop: 20,
  },
  row: {
    flexDirection: "row",
  },
});
