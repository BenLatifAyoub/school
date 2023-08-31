import React from "react";
import { StackNavigationProp } from "@react-navigation/stack";
import { useSelector } from "react-redux";
import { app } from "../../firebase";
import { getAuth } from "firebase/auth";
import Profil from "./Profile";

const auth = getAuth(app);
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

const ProfilContainer: React.FC<Props> = ({ navigation }) => {
  const userName = useSelector((state: any) => state.user.username);
  const photo = useSelector((state: any) => state.user.photoUrl);
  const userCity = useSelector((state: any) => state.user.city);
  const userGouv = useSelector((state: any) => state.user.gouv);

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleButton = () => {
    navigation.navigate("ProfilD");
  };

  return (
    <Profil
      handleButton={handleButton}
      handleGoBack={handleGoBack}
      photo={photo}
      userCity={userCity}
      userGouv={userGouv}
      userName={userName}
    />
  );
};

export default ProfilContainer;
