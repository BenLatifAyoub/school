import { StyleSheet } from "react-native";

export const getTextTitleStyles = (selectedEmailInput: string) => {
  return {
    color: "#121212",
    height: 70,
    width: 340,
    borderBottomWidth: 1,
    borderColor: selectedEmailInput === "title" ? "#E3AD6A" : "black",
    textAlign: "left",
    backgroundColor: "rgba(255,255,255,1)",
    borderStyle: "solid",
    marginTop: 40,
    fontSize: 30,
  };
};
export const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "#E3AD6A",
    alignItems: "center",
  },

  icon: {
    fontSize: 40,
    color: "#E3AD6A",
  },
  icon1: {
    fontSize: 60,
    color: "#ffffff",
  },
  row: {
    flexDirection: "row",
    marginTop: 20,
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
  button: {
    width: 50,
    height: 50,
    backgroundColor: "#ffffff",
    marginTop: 15,
    marginRight: 20,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  time: {
    color: "rgba(67,65,65,1)",
    marginTop: 20,
    fontSize: 30,
  },
  back: {
    marginRight: 250,
    width: 50,
    height: 50,
    marginTop: 50,
    backgroundColor: "#E3AD6A",
  },

  Donebutton: {
    width: 50,
    height: 50,
    marginTop: 50,
    backgroundColor: "#E3AD6A",
  },
  image: {
    width: 250,
    height: 200,
  },
  calendar: {
    backgroundColor: "white", 
    borderWidth: 1, 
    borderColor: "#E3AD6A",
  },
});
