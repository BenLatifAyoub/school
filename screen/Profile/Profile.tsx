import React, { useEffect, useState } from "react";
import { StackNavigationProp } from "@react-navigation/stack";
import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { useSelector } from "react-redux";
import { Feather } from "@expo/vector-icons";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import { styles } from "./ProfileStyles";
import { AntDesign } from "@expo/vector-icons";
import { app } from "../../firebase";
import { getAuth } from "firebase/auth";

const auth = getAuth(app);
type RootStackParamList = {
  Home: undefined;
  Profil: undefined;
  ProfilD: undefined;
};
type LoginScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Home"
>;

type Props = {
  navigation: LoginScreenNavigationProp;
};

const Profil: React.FC<Props> = ({ navigation }) => {
  const userEmail = useSelector((state: any) => state.user.email);
  const userName = useSelector((state: any) => state.user.username);
  const photo = useSelector((state: any) => state.user.photoUrl);
  const userCity = useSelector((state: any) => state.user.city);
  const userGouv = useSelector((state: any) => state.user.gouv);
  console.log('user', userName)


  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleButton = () => {
    navigation.navigate('ProfilD')
  };

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
                  <Image
                    source={{ uri: photo }}
                    style={styles.image}
                  />
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
              <AntDesign name="right" size={24} color="#E3AD6A" marginLeft={200}/>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Profil;
