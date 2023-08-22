import React from "react";
import Icon from "react-native-vector-icons/EvilIcons";
import SimpleLineIconsIcon from "react-native-vector-icons/SimpleLineIcons";
import EntypoIcon from "react-native-vector-icons/Entypo";
import EvilIconsIcon from "react-native-vector-icons/EvilIcons";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Feather from "react-native-vector-icons/Feather";
import { View, TouchableOpacity, Text, Image, ScrollView } from "react-native";
import { styles } from "../styles/Home";

type HomeProps = {
  userName: any;
  handleLogout: any;
  handleTask: any
};
const Home: React.FC<HomeProps> =  ({ userName, handleLogout, handleTask }) => {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Image
          source={require("../assets/8518144-startup-life-illustration-concept-vectoriel.png")}
          style={styles.image}
        ></Image>
        <View style={styles.textContainer}>
          <Text style={styles.yourName2}>{userName} Rejeb</Text>
          <Text style={styles.work}>student</Text>
          <View style={styles.place}>
            <View style={styles.icon}>
              <Icon name="location" style={styles.icon1}></Icon>
            </View>
            <Text style={styles.city}>Moknine</Text>
          </View>
          <Text style={styles.country}>Monastir,Tunis</Text>
        </View>
      </View>
      <ScrollView style={{ width: "100%", height: "100%" }}>
        <View style={{ alignItems: "center" }}>
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity
              style={styles.button4}
              onPress={() => handleLogout()}
            >
              <EntypoIcon name="book" style={styles.lessonIcon}></EntypoIcon>

              <Text style={styles.buttonText}>Exams</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button4}
              onPress={() => handleLogout()}
            >
              <SimpleLineIconsIcon
                name="book-open"
                style={styles.book}
              ></SimpleLineIconsIcon>
              <Text style={styles.buttonText}>Lesson</Text>
            </TouchableOpacity>
          </View>
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity
              style={styles.button4}
              onPress={() => handleTask()}
            >
              <EvilIconsIcon
                name="clock"
                style={styles.shedduleIcon}
              ></EvilIconsIcon>
              <Text style={styles.buttonText}>Tasks</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button4}
              onPress={() => handleLogout()}
            >
                      <SimpleLineIconsIcon
          name="notebook"
          style={styles.resultsIcon}
        ></SimpleLineIconsIcon>
              <Text style={styles.buttonText}>Results</Text>
            </TouchableOpacity>
          </View>
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity
              style={styles.button4}
              onPress={() => handleLogout()}
            >
                      <FontAwesomeIcon
          name="newspaper-o"
          style={styles.newsIcon}
        ></FontAwesomeIcon>
              <Text style={styles.buttonText}>News</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button4}
              onPress={() => handleLogout()}
            >
                    <Ionicons name="ios-person" style={styles.profileIcon}></Ionicons>
              <Text style={styles.buttonText}>Profil</Text>
            </TouchableOpacity>
          </View>
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity
              style={styles.button4}
              onPress={() => handleLogout()}
            >
                    <MaterialCommunityIcons name="message" style={styles.contactIcon}></MaterialCommunityIcons>
              <Text style={styles.buttonText}>Contact us</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button4}
              onPress={() => handleLogout()}
            >
               <Feather name="log-out" style={styles.LogOutIcon}></Feather>
              <Text style={styles.buttonText}>Log out</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Home;
