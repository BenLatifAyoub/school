import { StyleSheet } from "react-native";

export const getTextTitleStyles = (selectedEmailInput: string) => {
  return {
    color: "#121212",
    height: 70,
    width: 340,
    borderBottomWidth: 1,
    borderColor:
      selectedEmailInput === "title" ? "#E3AD6A" : "black",
    textAlign: "left",
    backgroundColor: "rgba(255,255,255,1)",
    borderStyle: "solid",
    marginTop: 40,
    fontSize: 30,
  };
};
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    alignItems: "center",
  },

  icon: {
    fontSize: 40,
    color: "#E3AD6A",
  },
  icon1: {
    fontSize: 60,
    color: "rgba(128,128,128,1)",
  },
  row: {
    flexDirection: "row",
    marginTop: 20,
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
    backgroundColor: "#ffffff",
  },


  Donebutton: {
    width: 50,
    height: 50,
    marginTop: 50,
    backgroundColor: "#ffffff",
  },
  image: {
    width: 250,
    height: 200,
  },
  calendar: {
    backgroundColor: "white", // Set the background color
    borderWidth: 1, // You can adjust these values as needed
    borderColor: "#E3AD6A",
  },
});
