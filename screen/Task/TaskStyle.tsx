import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "#E3AD6A",
  },
  back: {
    width: 50,
    height: 50,
    marginTop: 53,
  },
  icon: {
    fontSize: 40,
    color: "#ffffff",
  },

  title: {
    color: "#ffffff",
    fontSize: 30,
    fontWeight: "400",
    textAlign: "center",
    width: "60%",
    marginRight: 50,
    marginTop: 50,
  },
  image: {
    marginTop: 50,
    width: 90,
    height: 80,
    borderRadius: 50,
  },
  menu: {
    width: "100%",
    height: "100%",
    backgroundColor: "#ffffff",
    marginTop: 25,
    borderRadius: 30,
    alignContent: "center",
    alignItems: "center",
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
    marginLeft: 350,
    marginBottom: 150,
  },
  addIcon: {
    fontSize: 40,
    color: "#E3AD6A",
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
    marginRight: 240,
  },
  row: {
    flexDirection: "row",
    justifyContent: "center",
  },
});
