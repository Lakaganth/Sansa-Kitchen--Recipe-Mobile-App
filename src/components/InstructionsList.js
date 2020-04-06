import React, { useState } from "react";
import { TouchableOpacity } from "react-native";
import styled from "styled-components";

import { FontAwesome, Entypo } from "@expo/vector-icons";

const InstructionsList = ({ ins }) => {
  const [checked, setChecked] = useState(false);

  return (
    <InsContainer onPress={() => setChecked(!checked)}>
      {!checked ? (
        <IconContainer>
          <Entypo name="circle" size={22} color="#f56565" />
        </IconContainer>
      ) : (
        <IconContainer>
          <FontAwesome name="dot-circle-o" size={26} color="#f56565" />
        </IconContainer>
      )}

      <Instructions>{ins}</Instructions>
    </InsContainer>
  );
};

export default InstructionsList;

const InsContainer = styled.TouchableOpacity`
  flex-direction: row;
  width: 100%;
  align-items: center;
  padding-left: 5px;
`;

const Instructions = styled.Text`
  font-size: 20px;
  line-height: 26px;
  font-weight: 400;
  color: grey;
  margin: 15px 0 0;
  text-align: justify;
  padding-left: 30px;
  /* padding-top: 25px; */
`;

const IconContainer = styled.View`
  padding-top: 15px;
`;
