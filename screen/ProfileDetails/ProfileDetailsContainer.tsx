import React, { useEffect, useState } from "react";
import { StackNavigationProp } from "@react-navigation/stack";
import * as ImagePicker from "expo-image-picker";
import { updateProfile } from "firebase/auth";
import { useDispatch } from "react-redux";
import { auth } from "../../firebase";
import ProfilD from "./profileD";
import { firebase, uploadImage } from "../../firebase";
import { updateUser } from "../../Redux/userActions";
import AsyncStorage from "@react-native-async-storage/async-storage";

type RootStackParamList = {
  Home: undefined;
  Profil: undefined;
  ProfilD: undefined;
  Welcome: undefined;
};
type LoginScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Welcome"
>;

type Props = {
  navigation: LoginScreenNavigationProp;
};

const ProfilDContainer: React.FC<Props> = ({ navigation }) => {
  const dispatch = useDispatch();
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [gouv, setGouv] = useState("");
  const [photo, setPhoto] = useState<any | null>("");
  const user = auth.currentUser;
  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        console.log("ussssseerrrr", user);
        const userEmail = user.email ?? "";
        const userDisplayName = user.displayName ?? "";
        const userPhoto = user.photoURL ?? "";
        setEmail(userEmail);
        setPhoto(userPhoto);
        setUserName(userDisplayName);
        const userRef = firebase.firestore().collection("users").doc(user.uid);
        userRef
          .get()
          .then((doc) => {
            if (doc.exists) {
              const profileData = doc.data();
              if (profileData) {
                setCity(profileData.city);
                setGouv(profileData.gouvernemet);
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
            console.log("User profile data stored successfully.");
          }
        })
        .catch((error) => {
          console.error("Error storing user profile data:", error);
        });
    }
  };

  return (
    <ProfilD
      handleSubmit={handleSubmit}
      handleImagePicker={handleImagePicker}
      handleGoBack={handleGoBack}
      userName={userName}
      setUserName={setUserName}
      email={email}
      setEmail={setEmail}
      city={city}
      setCity={setCity}
      gouv={gouv}
      setGouv={setGouv}
      photo={photo}
      setPhoto={setPhoto}
    />
  );
};

export default ProfilDContainer;
