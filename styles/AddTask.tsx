import { StyleSheet } from "react-native";

export const getTextTitleStyles = (selectedEmailInput: string) => {
  return {
    color: "#121212",
    height: 70,
    width: 340,
    borderBottomWidth: 1,
    borderColor:
      selectedEmailInput === "title" ? "rgba(85,103,248,1)" : "black",
    textAlign: "left",
    backgroundColor: "rgba(255,255,255,1)",
    borderStyle: "solid",
    marginTop: 40,
    fontSize: 30,
  };
};
export const getTextNotesStyles = (selectedEmailInput: string) => {
  return {
    color: "#121212",
    height: 70,
    width: 340,
    borderBottomWidth: 1,
    borderColor:
      selectedEmailInput === "title" ? "rgba(85,103,248,1)" : "black",
    textAlign: "left",
    backgroundColor: "rgba(255,255,255,1)",
    borderStyle: "solid",
    fontSize: 30,
    marginTop: 20,
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
    width: 50,
    height: 50,
    marginTop: 50,
    backgroundColor: "#ffffff",
  },


  Donebutton: {
    width: 338,
    height: 47,
    backgroundColor: "rgba(85,103,248,1)",
    marginTop: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  image: {
    width: 250,
    height: 200,
  },
});
