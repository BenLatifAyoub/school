import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { PermissionStatus } from "expo-image-picker";
import * as ImagePicker from "expo-image-picker";
import { getAuth, updateProfile, Auth, updateCurrentUser } from "firebase/auth";
import { useDispatch } from "react-redux";
import { app, auth } from "../../firebase";
import Icon from "react-native-vector-icons/Feather";
import { Feather } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { styles } from "./profileDStyles";
import { decode } from "base-64";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
import { firebase, uploadImage } from "../../firebase";
import * as FileSystem from "expo-file-system";
import { updateUser } from "../../Redux/userActions";
import { getFirestore } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

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

const firestore = getFirestore(app);
const ProfilD: React.FC<Props> = ({ navigation }) => {
  const dispatch = useDispatch();
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [gouv, setGouv] = useState("");
  const [loadingImage, setLoadingImage] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [photo, setPhoto] = useState<any | null>("");
  const passwordInputRef = useRef<TextInput | null>(null);
  const user = auth.currentUser;
  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        const uid = user.uid;
        const userEmail = user.email ?? "";
        const userDisplayName = user.displayName ?? "";
        const userPhoto = user.photoURL ?? "";
        const userRef = firebase.firestore().collection("users").doc(user.uid);
        userRef
          .get()
          .then((doc) => {
            if (doc.exists) {
              const profileData = doc.data();
              if (profileData) {
                setCity(profileData.city);
                setGouv(profileData.gouvernemet);
                setEmail(userEmail);
                setPhoto(userPhoto);
                setUserName(userDisplayName);
              }
              console.log("User profile data:", profileData);
            } else {
              console.log("No user profile data found.");
            }
          })
          .catch((error) => {
            console.error("Error fetching user profile data:", error);
          });
      }
    };

    fetchData();
  }, []);

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleImagePicker = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        const url = await uploadImage(
          result.assets[0].uri,
          "profil" + userName,
          "image"
        );
        console.log("urll", url);

        if (url) {
          const user = auth.currentUser;
          if (user) {
            await updateProfile(user, {
              photoURL: url,
            });
            setPhoto(url);
            dispatch(
              updateUser(email, user.displayName, user.photoURL, city, gouv)
            );
            console.log("User profile updated with photoURL:", user);
          }
        } else {
          console.log("Image upload failed.");
        }
      }
    } catch (error) {
      console.error("Error during image upload and profile update:", error);
    }
  };

  const handleSubmit = async () => {
    const user = auth.currentUser;
    if (user) {
      await updateProfile(user, {
        displayName: userName,
      });

      user
        .updateEmail(email)
        .then(() => {
          console.log("Email address updated successfully.");
        })
        .catch((error) => {
          console.error("Error updating email:", error);
        });

      console.log("usernameee", user.displayName);

      const userRef = firebase.firestore().collection("users").doc(user.uid);

      const profileData = {
        city: city,
        gouvernemet: gouv,
      };

      userRef
        .set(profileData, { merge: true })
        .then(async () => {
          dispatch(
            updateUser(email, user.displayName, user.photoURL, city, gouv)
          );
          if (user.displayName && user.photoURL) {
            await AsyncStorage.setItem("username", user.displayName);
            await AsyncStorage.setItem("email", email);
            await AsyncStorage.setItem("photo", user.photoURL);
            await AsyncStorage.setItem("city", profileData.city);
            await AsyncStorage.setItem("gouv", profileData.gouvernemet);
          }
          console.log("User profile data stored successfully.");
        })
        .catch((error) => {
          console.error("Error storing user profile data:", error);
        });
    }
  };

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
                  <Image
                    source={{ uri: photo }}
                    style={styles.image}
                    onLoadEnd={() => setLoadingImage(false)}
                  />
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
                clearButtonMode="never"
                selectionColor="#E3AD6A"
                defaultValue={userName}
                style={styles.nameInput}
                onChangeText={(text) => setUserName(text)}
                onSubmitEditing={() => passwordInputRef.current?.focus()}
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
                onSubmitEditing={() => passwordInputRef.current?.focus()}
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
                onSubmitEditing={() => passwordInputRef.current?.focus()}
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
                onSubmitEditing={() => passwordInputRef.current?.focus()}
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
function launchImageLibrary(arg0: {}, arg1: (response: any) => Promise<void>) {
  throw new Error("Function not implemented.");
}

function setImageUri(uri: any) {
  throw new Error("Function not implemented.");
}
