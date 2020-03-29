import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView
} from "react-native";
import { BlurView } from "expo-blur";
import { Alert, Animated, Dimensions } from "react-native";
import * as InputActions from "../../../store/actions/inputAction";
import { useSelector, useDispatch } from "react-redux";

const screenHeight = Dimensions.get("window").height;

const IngredientsModal = () => {
  const dispatch = useDispatch();
  const modalState = useSelector(state => state.input.openIngredientModal);

  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [top, setTop] = useState(new Animated.Value(screenHeight));
  const [scale, setScale] = useState(new Animated.Value(1.3));
  const [translateY, setTranslateY] = useState(new Animated.Value(0));

  useEffect(() => {
    modalAnimation();
  }, []);

  const modalAnimation = () => {
    if (modalState) {
      Animated.timing(top, {
        toValue: 0,
        duration: 0
      }).start();
      Animated.spring(scale, { toValue: 1 }).start();
      Animated.timing(translateY, {
        toValue: 0,
        duration: 0
      }).start();
    }
    if (!modalState) {
      setTimeout(() => {
        Animated.timing(top, {
          toValue: screenHeight,
          duration: 0
        }).start();
        Animated.spring(scale, { toValue: 1.3 }).start();
      }, 500);

      Animated.timing(translateY, {
        toValue: 1000,
        duration: 500
      }).start();
    }
  };

  const handleAddIngredient = async () => {
    await dispatch(InputActions.addIngredient(name, quantity));
    await dispatch(InputActions.closeIngredientsModal());
  };

  const tapBackground = async () => {
    Keyboard.dismiss();
    await dispatch(InputActions.closeIngredientsModal());
  };

  return (
    <AnimatedContainer style={{ top: top }}>
      <TouchableWithoutFeedback onPress={tapBackground}>
        <BlurView
          tint="default"
          intensity={100}
          style={{
            position: "absolute",
            width: "100%",
            height: "100%"
          }}
        />
      </TouchableWithoutFeedback>
      <KeyboardAvoidingView behavior="padding" enabled>
        <AnimatedModal
          style={{
            transform: [{ scale: scale }, { translateY: translateY }]
          }}
        >
          <Text>Add Ingredient</Text>
          <TextContainer>
            <TextInput
              onChangeText={name => setName(name)}
              placeholder="Ingredient Name"
              keyboardType="email-address"
              // onFocus={focusEmail}
            />
          </TextContainer>
          <TextContainer>
            <TextInput
              onChangeText={quantity => setQuantity(quantity)}
              placeholder="Ingredient Quantity"
              // secureTextEntry={true}
              // onFocus={focusPassword}
            />
          </TextContainer>
          {/* {imgURL ? <Avatar source={{ uri: imgURL }} /> : null}
            <TouchableOpacity onPress={pickImage}>
              <Button>
                <ButtonText>Pick an Image</ButtonText>
              </Button>
            </TouchableOpacity> */}
          <TouchableOpacity onPress={handleAddIngredient}>
            <Button>
              <ButtonText>Add</ButtonText>
            </Button>
          </TouchableOpacity>
        </AnimatedModal>
      </KeyboardAvoidingView>
    </AnimatedContainer>
  );
};

export default IngredientsModal;

const Container = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: ${screenHeight + 50}px;
  background: rgba(0, 0, 0, 0.75);
  justify-content: center;
  align-items: center;
  z-index: 15;
`;
const AnimatedContainer = Animated.createAnimatedComponent(Container);
const Modal = styled.View`
  width: 335px;
  height: 270px;
  background: white;
  border-radius: 20px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  align-items: center;
`;
const AnimatedModal = Animated.createAnimatedComponent(Modal);
const Logo = styled.Image`
  width: 44px;
  height: 44px;
  margin-top: 50px;
`;
const Text = styled.Text`
  margin-top: 20px;
  font-size: 13px;
  font-weight: 600;
  text-transform: uppercase;
  width: 160px;
  text-align: center;
  color: #b8bece;
`;

const TextContainer = styled.View`
  position: relative;
`;

const TextInput = styled.TextInput`
  border: 1px solid #dbdfea;
  width: 295px;
  height: 44px;
  border-radius: 10px;
  font-size: 17px;
  color: #3c4560;
  margin-top: 20px;
  padding-left: 44px;
`;
const Button = styled.View`
  background: #5263ff;
  width: 295px;
  height: 50px;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  box-shadow: 0 10px 20px #c2cbff;
  margin-top: 20px;
`;
const ButtonText = styled.Text`
  color: white;
  font-weight: 600;
  font-size: 20px;
  text-transform: uppercase;
  width: 100%;
  text-align: center;
`;
