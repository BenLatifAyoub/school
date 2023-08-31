import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { Feather } from "@expo/vector-icons";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import { styles } from "./ProfileStyles";
import { AntDesign } from "@expo/vector-icons";

type Props = {
  handleButton: any;
  handleGoBack: any;
  photo: any;
  userCity: any;
  userGouv: any;
  userName: any;
};

const Profil: React.FC<Props> = ({
  handleButton,
  handleGoBack,
  photo,
  userCity,
  userGouv,
  userName,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <TouchableOpacity style={styles.back} onPress={handleGoBack}>
          <Icon name="arrow-left-circle" style={styles.icon}></Icon>
        </TouchableOpacity>
        <Text style={styles.title}> Profile </Text>
      </View>
      <View style={styles.menu}>
        <View style={styles.row}>
          {photo ? (
            <View>
              <Image source={{ uri: photo }} style={styles.image} />
            </View>
          ) : (
            <Image
              source={require("../../assets/8518144-startup-life-illustration-concept-vectoriel.png")}
              style={styles.image}
            />
          )}
          <View style={styles.textContainer}>
            <Text style={styles.yourName2}>{userName}</Text>
            <Text style={styles.work}>student</Text>
            <View style={styles.place}>
              <View style={styles.iconContainer}>
                <EvilIcons name="location" style={styles.icon1}></EvilIcons>
              </View>
              <Text style={styles.city}>{userCity}</Text>
            </View>
            <Text>{userGouv}</Text>
          </View>
        </View>
        <View style={styles.taskItem}>
          <Text>PROFILE</Text>
          <TouchableOpacity style={styles.taskButton} onPress={handleButton}>
            <View style={styles.rowButton}>
              <Feather name="user" size={24} color="#E3AD6A" />
              <View>
                <Text style={{ marginLeft: 10 }}>Profile Details</Text>
                <Text style={{ marginLeft: 10 }}> View & Edit details</Text>
              </View>
              <AntDesign
                name="right"
                size={24}
                color="#E3AD6A"
                marginLeft={200}
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Profil;
