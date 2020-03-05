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
import * as AuthActions from "../../store/actions/authActions";
import { useSelector, useDispatch } from "react-redux";
import SuccessAnim from "./SuccessAnim";

const screenHeight = Dimensions.get("window").height;

const LoginModal = () => {
  const dispatch = useDispatch();
  const loginSuccess = useSelector(state => state.auth.loginSuccess);
  const modalState = useSelector(state => state.auth.openLoginModal);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [iconEmail, setIconEmail] = useState(
    require("../../assets/images/icon-email.png")
  );
  const [iconPassword, setIconPassword] = useState(
    require("../../assets/images/icon-password.png")
  );
  const [isSuccessful, setIsSuccessful] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [top, setTop] = useState(new Animated.Value(screenHeight));
  const [scale, setScale] = useState(new Animated.Value(1.3));
  const [translateY, setTranslateY] = useState(new Animated.Value(0));

  useEffect(() => {
    modalAnimation();
  }, [modalState]);

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

  const handleLogin = async () => {
    await dispatch(AuthActions.signinUser(email, password));
    await dispatch(AuthActions.closeLoginModal());
  };

  const focusEmail = () => {
    setIconEmail(require("../../assets/images/icon-email-animated.gif"));
    setIconPassword(require("../../assets/images/icon-password.png"));
  };

  const focusPassword = () => {
    setIconEmail(require("../../assets/images/icon-email.png"));
    setIconPassword(require("../../assets/images/icon-password-animated.gif"));
  };

  const tapBackground = async () => {
    Keyboard.dismiss();
    await dispatch(AuthActions.closeLoginModal());
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
          {/* <Logo source={require("../assets/logo-dc.png")} /> */}
          <Text>Welcome back to Sansa's Kitchen</Text>
          <EmailContainer>
            <IconEmail source={iconEmail} />
            <TextInput
              onChangeText={email => setEmail(email)}
              placeholder="Email"
              keyboardType="email-address"
              onFocus={focusEmail}
            />
          </EmailContainer>
          <PasswordContainer>
            <IconPassword source={iconPassword} />

            <TextInput
              onChangeText={password => setPassword(password)}
              placeholder="Password"
              secureTextEntry={true}
              onFocus={focusPassword}
            />
          </PasswordContainer>
          <TouchableOpacity onPress={handleLogin}>
            <Button>
              <ButtonText>Log In</ButtonText>
            </Button>
          </TouchableOpacity>
        </AnimatedModal>
      </KeyboardAvoidingView>
      <SuccessAnim isActive={loginSuccess} />
      {/* <Loading isActive={this.state.isLoading} /> */}
    </AnimatedContainer>
  );
};

export default LoginModal;

const Container = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: ${screenHeight + 50}px;
  background: rgba(0, 0, 0, 0.75);
  justify-content: center;
  align-items: center;
  z-index: 5;
`;
const AnimatedContainer = Animated.createAnimatedComponent(Container);
const Modal = styled.View`
  width: 335px;
  height: 370px;
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

const EmailContainer = styled.View`
  position: relative;
`;
const PasswordContainer = styled.View`
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
`;
const IconEmail = styled.Image`
  width: 24px;
  height: 16px;
  position: absolute;
  top: 35px;
  left: 10px;
`;
const IconPassword = styled.Image`
  width: 18px;
  height: 24px;
  position: absolute;
  top: 32px;
  left: 10px;
`;
