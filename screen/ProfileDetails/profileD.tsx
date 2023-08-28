import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { PermissionStatus } from "expo-image-picker";
import * as ImagePicker from "expo-image-picker";
import { getAuth, Auth } from "firebase/auth";
import { useDispatch } from "react-redux";
import { app, auth } from "../../firebase";
import Icon from "react-native-vector-icons/Feather";
import { Feather } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { styles } from "./profileDStyles";
import storage from "@react-native-firebase/storage";


const authInstance: Auth = getAuth(app);
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

const ProfilD: React.FC<Props> = ({ navigation }) => {
  const dispatch = useDispatch();
  const [userName, setUserName] = useState("");
  const [city, setCity] = useState("");
  const [palece, setPlace] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedInput, setSelectedInput] = useState("");
  const [selectedPasswordInput, setSelectedPasswordInput] = useState("");
  const [errorText, setErrorText] = useState("");
  const [isVisible, setisVisible] = useState(true);
  const [ImageUri, setImageUri] = useState<string | null>(null);
  const [cameraPermission, setCameraPermission] =
    useState<PermissionStatus | null>(null);
  const passwordInputRef = useRef<TextInput | null>(null);
  console.log("user", userName);
  useEffect(() => {
    const fetchData = async () => {
      const user = auth.currentUser;

      if (user) {
        const uid = user.uid;
        const userEmail = user.email ?? "";
        const userDisplayName = user.displayName ?? "";
        const img = user.photoURL;
        setUserName(userDisplayName);
        console.log("profil", user);
      }
    };

    fetchData();
  }, []);

  // useEffect(() => {
  //   const getCameraPermission = async () => {
  //     const { status } = await Camera.requestPermissionsAsync();
  //     setCameraPermission(status);
  //   };

  //   getCameraPermission();
  // }, []);
  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleImagePicker = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      console.log('Permission to access media library was denied');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync();
    console.log(result)
    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
      console.log('aaaaefefefe', result.assets[0].uri)
      await uploadImage(result.assets[0].uri);
    }
  };

  const uploadImage = async (uri: string) => {
    console.log('aaaaaa')
    const filename = uri.substring(uri.lastIndexOf('/') + 1);
    console.log('file', filename);
    const storageRef = storage().ref(`images/${filename}`);
    const response = await fetch(uri);
    console.log('rep', response)
    const blob = await response.blob();
    await storageRef.put(blob);
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
              <Image
                source={require("../../assets/8518144-startup-life-illustration-concept-vectoriel.png")}
                style={styles.image}
              />
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
                onChangeText={(text) => setEmail(text)}
                onSubmitEditing={() => passwordInputRef.current?.focus()}
              />
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
              <Text style={{ marginLeft: 10, color: "#868686" }}>City</Text>
              <TextInput
                textBreakStrategy="simple"
                clearButtonMode="never"
                selectionColor="#E3AD6A"
                defaultValue={userName}
                style={styles.nameInput}
                onChangeText={(text) => setEmail(text)}
                onSubmitEditing={() => passwordInputRef.current?.focus()}
              />
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
              <Text style={{ marginLeft: 10, color: "#868686" }}>
                Gouvernemet
              </Text>
              <TextInput
                textBreakStrategy="simple"
                clearButtonMode="never"
                selectionColor="#E3AD6A"
                defaultValue={userName}
                style={styles.nameInput}
                onChangeText={(text) => setEmail(text)}
                onSubmitEditing={() => passwordInputRef.current?.focus()}
              />
            </View>
          </View>
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

