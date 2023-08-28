import React from "react";
import {
  View,
  TouchableOpacity,
  Text,
  Image,
} from "react-native";
import {
  styles,
} from "./WelcomeStyle";


type Props = {
  handleLogin: any
  handleSign: any
};

const Welcome: React.FC<Props> = ({  handleLogin, handleSign }) => {

  return (
    <View style={styles.container}>
      <Text style={styles.text} >Welcome to education app</Text> 
      <Image
        source={require("../../assets/8518144-startup-life-illustration-concept-vectoriel.png")}
        resizeMode="contain"
        style={styles.image}
      ></Image>
      <TouchableOpacity style={styles.button} onPress={() => handleLogin()}>
        <Text style={styles.login}>Log in</Text>
      </TouchableOpacity>

        <TouchableOpacity
          style={styles.registerButton}
          onPress={() => handleSign()}
        >
          <Text style={styles.regestirNow}>Sign up</Text>
        </TouchableOpacity>
    </View>
  );
};

export default Welcome;
