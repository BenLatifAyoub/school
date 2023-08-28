import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "#E3AD6A",
  },
  scrollViewContent: {
    flexGrow: 1, // Allow ScrollView to take all available space
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
  imageContainer: {
    position: "relative", // Required for absolute positioning
  },
  image: {
    marginTop: 20,
    resizeMode: "cover",
    width: 200,
    height: 200,
  },
  edit: {
    width: "17%",
    height: "17%",
    borderRadius: 50,
    backgroundColor: "#E3AD6A",
    alignItems: "center",
    justifyContent: "center",
    top: 175,
    right: 20,
    position: "absolute",
  },
  editIcon: {
    position: "absolute",
    backgroundColor: "transparent", // Make the icon background transparent
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
    width: "100%",
  },
  rowInput: {
    height: "7%",
    backgroundColor: "#e9edee",
    borderColor: "#bcbcbc",
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 20,
    flexDirection: "row",
    marginLeft: 20,
    marginRight: 20,
    alignItems: "center",
  },
  password: {
    color: "#ffffff",
    fontSize: 30,
    fontWeight: "400",
    textAlign: "center",
    width: "60%",
    marginRight: 50,
    marginTop: 50,
  },
  nameInput: {
    color: "#121212",
    height: "50%",
    width: 347,
    marginLeft: 10,
    textAlign: "left",
    borderStyle: "solid",
  },
});
export const getTextPasswordStyles = (
  selectedPasswordInput: string,
  userName: any
) => {
  return {
    color: "#121212",
    height: 45,
    width: 347,
    borderBottomWidth: 1,
    borderColor:
      selectedPasswordInput === userName ? "rgba(85,103,248,1)" : "black",
    textAlign: "left",
    backgroundColor: "rgba(255,255,255,1)",
    borderStyle: "solid",
  };
};
export const getTextInputStyles = (selectedInput: string) => {
  return {
    color: "#121212",
    height: 45,
    width: 347,
    borderBottomWidth: 1,
    borderColor: selectedInput === "email" ? "rgba(85,103,248,1)" : "black",
    textAlign: "left",
    backgroundColor: "rgba(255,255,255,1)",
    borderStyle: "solid",
  };
};
