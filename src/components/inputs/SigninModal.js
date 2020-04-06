import React from "react";
import { Feather } from "@expo/vector-icons";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import * as AuthActions from "../../../store/actions/authActions";

const SigninModal = () => {
  const dispatch = useDispatch();

  const openModal = async () => {
    await dispatch(AuthActions.openLoginModal());
  };

  return (
    <Icons onPress={openModal}>
      <IconContainer style={{ backgroundColor: "#E6FFFA" }}>
        <Feather
          name="log-in"
          size={23}
          color="#4FD1C5"
          style={{ alignSelf: "center" }}
        />
      </IconContainer>
      <IconTitle>Log in</IconTitle>
    </Icons>
  );
};

export default SigninModal;

const Icons = styled.TouchableOpacity`
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
