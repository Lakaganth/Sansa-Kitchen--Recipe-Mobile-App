import React, { useState, useEffect } from "react";
import { Platform, StatusBar } from "react-native";
import styled from "styled-components";
import { MaterialCommunityIcons, Feather, Ionicons } from "@expo/vector-icons";
import { TouchableOpacity, ScrollView } from "react-native-gesture-handler";
import LoginModal from "../components/LoginModal";
import { useSelector, useDispatch } from "react-redux";
import * as AuthActions from "../../store/actions/authActions";
import * as UserActions from "../../store/actions/userActions";
import RegisterModal from "./../components/RegisterModal";
import SigninModal from "../components/inputs/SigninModal";

const ProfileScreen = () => {
  const user = useSelector((state) => state.auth.user);
  const modalState = useSelector((state) => state.auth.openLoginModal);
  const registerModalState = useSelector(
    (state) => state.auth.openRegisterModal
  );
  const dispatch = useDispatch();

  useEffect(() => {
    getUserProfile();
  }, [user]);

  const getUserProfile = async () => {
    if (user) {
      await dispatch(UserActions.getUserData(user.userID));
    }
  };

  const openModal = async () => {
    await dispatch(AuthActions.openLoginModal());
  };

  const openRegisterModal = async () => {
    await dispatch(AuthActions.openRegisterModal());
  };

  const signout = async () => {
    await dispatch(AuthActions.signOutUser());
  };

  return (
    <Container>
      {registerModalState ? <RegisterModal /> : null}
      {modalState ? <LoginModal /> : null}
      <ScrollView>
        <ProfileContainer>
          <TitleContainer>
            <ScreenTitle>Profile</ScreenTitle>
            {user ? (
              <MaterialCommunityIcons
                name="pencil"
                size={23}
                color="#161C2B"
                style={{ position: "absolute", top: 0, right: 20 }}
              />
            ) : null}
          </TitleContainer>

          {user ? (
            <Avatar
              source={
                user.photoURL
                  ? { uri: user.photoURL }
                  : require("../../assets/images/defaultAvatar.jpg")
              }
            />
          ) : (
            <Avatar source={require("../../assets/images/defaultAvatar.jpg")} />
          )}

          <UserName>{user ? user.userName : "Guest"}</UserName>
          {user ? null : (
            <TouchableOpacity onPress={openRegisterModal}>
              <RegConatiner>
                <Register>Register</Register>
              </RegConatiner>
            </TouchableOpacity>
          )}

          <Location>{user ? "India" : null}</Location>
          {user ? (
            <LevelContainer>
              <LevelTitle>Level : 25</LevelTitle>
            </LevelContainer>
          ) : null}
        </ProfileContainer>
        <IconList>
          {!user ? (
            <SigninModal />
          ) : (
            <Icons>
              <TouchableOpacity onPress={signout}>
                <IconContainer style={{ backgroundColor: "#FFF5F5" }}>
                  <Feather
                    name="log-out"
                    size={23}
                    color="#FC8181"
                    style={{ alignSelf: "center" }}
                  />
                </IconContainer>
              </TouchableOpacity>
              <IconTitle> Log out</IconTitle>
            </Icons>
          )}

          <Icons>
            <IconContainer style={{ backgroundColor: "#EBF8FF" }}>
              <Ionicons
                name="md-share"
                size={23}
                color="#FC8181"
                style={{ alignSelf: "center" }}
              />
            </IconContainer>
            <IconTitle> Share with friends</IconTitle>
          </Icons>
        </IconList>
      </ScrollView>
    </Container>
  );
};

export default ProfileScreen;

const Container = styled.SafeAreaView`
  background-color: #ffffff;
  flex: 1;
  padding-top: ${Platform.OS === "android"
    ? StatusBar.currentHeight + 20
    : 0}px;
`;

const TitleContainer = styled.View`
  width: 100%;
  height: 30px;
  align-items: center;
  position: relative;
`;
const ScreenTitle = styled.Text`
  font-weight: 500;
  font-size: 24px;
  color: #f56565;
  line-height: 29px;
`;

const Avatar = styled.Image`
  width: 150px;
  height: 150px;
  border-radius: 20px;
  align-self: center;
  margin: 15px 0;
`;

const ProfileContainer = styled.View`
  width: 100%;
  height: 350px;
  background-color: #ffffff;
  border-radius: 40px;
  padding-top: 25px;
  elevation: 6;
`;

const UserName = styled.Text`
  font-weight: 900;
  font-size: 24px;
  color: #161c2b;
  width: 100%;
  text-align: center;
  text-transform: capitalize;
`;

const RegConatiner = styled.View`
  align-self: center;
  width: 20%;
  height: 25px;
  margin: 10px 0;
  background: #fffaf0;
  border-radius: 25px;
`;

const Register = styled.Text`
  font-weight: 900;
  font-size: 16px;
  text-align: center;
  color: #f6ad55;
`;
const Location = styled.Text`
  font-weight: 900;
  font-size: 16px;
  color: grey;
  margin: 5px 0 10px;
  opacity: 0.6;
  width: 100%;
  text-align: center;
`;

const LevelContainer = styled.View`
  align-self: center;
  width: 20%;
  height: 20px;
  margin: 10px 0;
  background: #fff5f5;
  border-radius: 25px;
  overflow: hidden;
`;

const LevelTitle = styled.Text`
  align-self: center;
  color: #fc8181;
  line-height: 19px;
`;

const IconList = styled.View`
  margin: 40px 0;
  padding-left: 45px;
`;
const Icons = styled.View`
  flex-direction: row;
  align-items: center;
`;
const IconContainer = styled.View`
  width: 50px;
  height: 50px;
  background: #fff5f5;
  border-radius: 15px;
  padding-top: 12.5px;
  margin: 10px 20px 10px 0;
  elevation: 3;
`;
const IconTitle = styled.Text`
  color: #757575;
`;
