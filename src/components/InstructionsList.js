import React, { useState } from "react";
import { TouchableOpacity } from "react-native";
import styled from "styled-components";

import { FontAwesome, Entypo } from "@expo/vector-icons";

const InstructionsList = ({ ins }) => {
  const [checked, setChecked] = useState(false);

  return (
    <InsContainer>
      <TouchableOpacity onPress={() => setChecked(!checked)}>
        {!checked ? (
          <IconContainer>
            <Entypo name="circle" size={22} color="#f56565" />
          </IconContainer>
        ) : (
          <IconContainer>
            <FontAwesome name="dot-circle-o" size={25} color="#f56565" />
          </IconContainer>
        )}
      </TouchableOpacity>
      <Instructions>{ins}</Instructions>
    </InsContainer>
  );
};

export default InstructionsList;

const Instructions = styled.Text`
  font-size: 20px;
  line-height: 26px;
  font-weight: 400;
  color: grey;
  margin: 10px 0 0;
  text-align: justify;
  padding-left: 50px;
  /* padding-top: 25px; */
`;

const InsContainer = styled.View`
  flex-direction: row;
  width: 100%;
  align-items: center;
`;

const IconContainer = styled.View`
  padding-top: 15px;
`;
