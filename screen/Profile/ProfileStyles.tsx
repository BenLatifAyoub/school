import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "#E3AD6A",
    alignItems: "center",
  },
  back: {
    width: 50,
    height: 50,
    marginTop: 50,
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
  menu: {
    width: "100%",
    height: "100%",
    backgroundColor: "#ffffff",
    marginTop: 25,
    borderRadius: 30,
  },
  row: {
    flexDirection: "row",
    justifyContent: "center",
  },
  image: {
    marginTop: 20,
    borderRadius: 50,
    borderColor: "#E3AD6A",
    borderWidth: 1,
    width: 200,
    height: 200,
  },
  textContainer: {
    flexDirection: "column",
    alignItems: "flex-end",
  },
  yourName2: {
    marginLeft: 20,
    textAlign: "right",
    marginTop: 30,
    fontSize: 20,
  },
  work: {
    textAlign: "right",
  },
  place: {
    flexDirection: "row",
  },
  iconContainer: {
    marginTop: 20,
  },
  icon1: {
    marginTop: 5,
    fontSize: 20,
  },
  city: {
    marginTop: 20,
    marginLeft: 10,
    textAlign: "right",
    fontSize: 20,
  },
  taskButton: {
    marginTop: 20,
    width: "100%",
  },
  taskItem: {
    flexDirection: "column",
    paddingVertical: 10,
    marginLeft: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  rowButton: {
    flexDirection: "row",
  },
});
