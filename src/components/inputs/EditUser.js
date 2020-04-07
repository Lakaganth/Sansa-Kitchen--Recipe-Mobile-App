import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import {
  Platform,
  StatusBar,
  TouchableNativeFeedback,
  ScrollView,
  Picker,
  Dimensions,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import Spinner from "react-native-loading-spinner-overlay";
import * as ImagePicker from "expo-image-picker";
import * as UserAction from "../../../store/actions/userActions";
import firebase from "../../../config";

const screenWidth = Dimensions.get("window").width;

const EditUser = ({ navigation }) => {
  const user = useSelector((state) => state.user.currentUser);
  console.log(user);
  const [editName, setEditName] = useState(user.userName);
  const [loading, setLoading] = useState(false);
  const [imgURL, setImgURL] = useState("");

  const dispatch = useDispatch();
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    setLoading(true);
    const img = result.uri;
    const imgName = img.split("/").pop();
    const response = await fetch(img);
    const blob = await response.blob();
    const res = await firebase
      .storage()
      .ref()
      .child(`images/users/avatars/` + imgName);
    await res.put(blob);
    const url = await res.getDownloadURL();

    imgSelected = true;
    await setImgURL(url);
    setLoading(false);
  };

  const handleEditProfile = async () => {
    const editedUser = {
      userName: editName,
      photoURL: imgURL,
      email: user.email,
      favourite: user.favourites,
      id: user.id,
      submittedRecipies: user.submittedRecipies,
      userID: user.userID,
    };
    await dispatch(UserAction.editUser(editedUser));
    navigation.goBack();
  };

  return (
    <Container>
      <Spinner
        visible={loading}
        textContent={"Loading..."}
        textStyle={{ color: "white" }}
      />
      <ScrollView>
        <ScreenTitle>Edit Your Profile</ScreenTitle>
        <FormContainer>
          <FormTitle>Edit your Name</FormTitle>
          <TextInput
            value={editName}
            onChangeText={(name) => setEditName(name)}
            placeholder="Your Name"
            keyboardType="default"
          />
          <FormTitle>Select your Avatar</FormTitle>
          <ImageContainer>
            <TouchableNativeFeedback onPress={pickImage}>
              {imgURL ? (
                <Image source={{ uri: imgURL }} />
              ) : (
                <MaterialCommunityIcons
                  name="image-plus"
                  size={32}
                  style={{ alignSelf: "center", marginTop: 80 }}
                />
              )}
            </TouchableNativeFeedback>
          </ImageContainer>
          <Button onPress={handleEditProfile}>
            <ButtonText>Add</ButtonText>
          </Button>
        </FormContainer>
      </ScrollView>
    </Container>
  );
};

export default EditUser;

const Container = styled.SafeAreaView`
  background-color: #ffffff;
  flex: 1;
  padding-top: ${Platform.OS === "android"
    ? StatusBar.currentHeight + 20
    : 0}px;
  z-index: 0;

  /* align-items: center; */
  width: ${screenWidth}px;
`;

const ScreenTitle = styled.Text`
  width: 100%;
  font-weight: 500;
  font-size: 24px;
  color: #f56565;
  line-height: 29px;
  text-align: center;
`;
const FormContainer = styled.View`
  padding-left: 20px;
  margin-top: 25px;
  width: 100%;
`;

const TextInput = styled.TextInput`
  border: 1px solid #dbdfea;
  width: 90%;
  height: 44px;
  border-radius: 10px;
  font-size: 17px;
  color: #3c4560;
  margin-top: 20px;
  padding-left: 44px;
`;

const ImageContainer = styled.View`
  width: 200px;
  height: 200px;
  margin: 20px 0;
  border-radius: 20px;
  background-color: grey;
  overflow: hidden;
  margin: 0 ${screenWidth / 5}px;
  margin-top: 30px;
`;
const AddContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 15px;
`;
const FormTitle = styled.Text`
  width: 60%;
  font-weight: 500;
  font-size: 24px;
  color: #f56565;
  line-height: 29px;
  text-align: left;
`;

const Image = styled.Image`
  width: 100%;
  height: 100%;
  border-radius: 20px;
`;

const Button = styled.TouchableOpacity`
  background: #5263ff;
  width: 150px;
  height: 50px;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  box-shadow: 0 10px 20px #c2cbff;
  margin: 0 ${screenWidth / 4}px;
  margin-top: 30px;
  margin-bottom: 30px;
  /* background: ${({ rName, imgSelected, categoryRec }) => {
    if (rName == "" || imgSelected == false || categoryRec == false) {
      return "gray";
    } else {
      return " #5263ff";
    }
  }}; */
`;

const ButtonText = styled.Text`
  color: white;
  font-weight: 600;
  font-size: 20px;
  text-transform: uppercase;
  width: 100%;
  text-align: center;
`;
