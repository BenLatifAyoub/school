import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import * as ImagePicker from "expo-image-picker";
import { updateProfile } from "firebase/auth";
import { useDispatch } from "react-redux";
import { app, auth } from "../../firebase";
import Icon from "react-native-vector-icons/Feather";
import { Feather } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { styles } from "./profileDStyles";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
import { firebase, uploadImage } from "../../firebase";
import { updateUser } from "../../Redux/userActions";
import { getFirestore } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Props = {
  handleSubmit: any;
  handleImagePicker: any;
  handleGoBack: any;
  userName: any;
  setUserName: any;
  email: any;
  setEmail: any;
  city: any;
  setCity: any;
  gouv: any;
  setGouv: any;
  photo: any;
  setPhoto: any;
};

const ProfilD: React.FC<Props> = ({
  handleSubmit,
  handleImagePicker,
  handleGoBack,
  userName,
  setUserName,
  email,
  setEmail,
  city,
  setCity,
  gouv,
  setGouv,
  photo,
  setPhoto,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <TouchableOpacity style={styles.back} onPress={handleGoBack}>
          <Icon name="arrow-left-circle" style={styles.icon}></Icon>
        </TouchableOpacity>
        <Text style={styles.title}> Profile </Text>
      </View>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.menu}>
          <View style={styles.row}>
            <View style={styles.imageContainer}>
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

              <TouchableOpacity style={styles.edit} onPress={handleImagePicker}>
                <Entypo
                  name="edit"
                  size={24}
                  color="#ffffff"
                  style={styles.editIcon}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.rowInput}>
            <Feather name="user" size={24} color="#E3AD6A" marginLeft={10} />
            <View
              style={{
                backgroundColor: "#999999",
                width: 1,
                height: "80%",
                borderRadius: 5,
                marginLeft: 10,
              }}
            />
            <View>
              <Text style={{ marginLeft: 10, color: "#868686" }}>Name</Text>
              <TextInput
                textBreakStrategy="simple"
                keyboardType="default"
                clearButtonMode="never"
                selectionColor="#E3AD6A"
                defaultValue={userName}
                style={styles.nameInput}
                onChangeText={(text) => setUserName(text)}
              />
            </View>
          </View>
          <View style={styles.rowInput}>
            <MaterialCommunityIcons
              name="email-edit-outline"
              size={24}
              color="#E3AD6A"
              marginLeft={10}
            />
            <View
              style={{
                backgroundColor: "#999999",
                width: 1,
                height: "80%",
                borderRadius: 5,
                marginLeft: 10,
              }}
            />
            <View>
              <Text style={{ marginLeft: 10, color: "#868686" }}>Email</Text>
              <TextInput
                textBreakStrategy="simple"
                clearButtonMode="never"
                selectionColor="#E3AD6A"
                defaultValue={email}
                style={styles.nameInput}
                onChangeText={(text) => setEmail(text)}
              />
            </View>
          </View>
          <View style={styles.rowInput}>
            <MaterialCommunityIcons
              name="home-city-outline"
              size={24}
              color="#E3AD6A"
              marginLeft={10}
            />
            <View
              style={{
                backgroundColor: "#999999",
                width: 1,
                height: "80%",
                borderRadius: 5,
                marginLeft: 10,
              }}
            />
            <View>
              <Text style={{ marginLeft: 10, color: "#868686" }}>City</Text>
              <TextInput
                textBreakStrategy="simple"
                clearButtonMode="never"
                selectionColor="#E3AD6A"
                defaultValue={city}
                style={styles.nameInput}
                onChangeText={(text) => setCity(text)}
              />
            </View>
          </View>
          <View style={styles.rowInput}>
            <EvilIcons
              name="location"
              size={24}
              color="#E3AD6A"
              marginLeft={10}
            />
            <View
              style={{
                backgroundColor: "#999999",
                width: 1,
                height: "80%",
                borderRadius: 5,
                marginLeft: 10,
              }}
            />
            <View>
              <Text style={{ marginLeft: 10, color: "#868686" }}>
                Gouvernemet
              </Text>
              <TextInput
                textBreakStrategy="simple"
                clearButtonMode="never"
                selectionColor="#E3AD6A"
                defaultValue={gouv}
                style={styles.nameInput}
                onChangeText={(text) => setGouv(text)}
              />
            </View>
          </View>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleSubmit()}
          >
            <Text style={styles.submit}>SUBMIT</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default ProfilD;
