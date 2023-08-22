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
    marginRight: 250,
  },
  errorText: {
    color: "red",
    fontSize: 18,
    marginTop: 10,
  },

  button: {
    width: 338,
    height: 47,
    backgroundColor: "rgba(85,103,248,1)",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    borderRadius: 10,
  },
  login: {
    color: "rgba(255,255,255,1)",
    fontSize: 18,
  },
  Email: {
    color: "rgba(67,65,65,1)",
    marginRight: 310,
    marginTop: 80,
  },
  password: {
    color: "rgba(67,65,65,1)",
    marginRight: 280,
    marginTop: 20,
  },
  passwordInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#ffffff",
    paddingHorizontal: 10,
  },
  passwordVisibilityButton: {
    marginLeft: -20,
  },
  text1: {
    color: "rgba(67,65,65,1)",
    marginTop: 4,
  },
  registerButton: {
    width: 100,
    height: 25,
    backgroundColor: "#ffffff",
  },
  regestirNow: {
    color: "#000000",
    marginTop: 4,
    marginLeft: 6,
    fontWeight: "900",
  },
  registerRow: {
    height: 25,
    flexDirection: "row",
    marginTop: 10,
  },
  image: {
    width: 500,
    height: 250,
  },
});
export const getTextPasswordStyles = (selectedPasswordInput: string) => {
  return {
    color: "#121212",
    height: 45,
    width: 347,
    borderBottomWidth: 1,
    borderColor:
      selectedPasswordInput === "email" ? "rgba(85,103,248,1)" : "black",
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
