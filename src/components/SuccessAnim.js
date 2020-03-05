import React, { useState, useEffect, useMemo } from "react";
import styled from "styled-components";
import LottieView from "lottie-react-native";
import { Animated, Dimensions } from "react-native";
import animationData from "../../assets/images/433-checked-done.json";

const screenHeight = Dimensions.get("window").height;

const defaultOptions = {
  animationData: animationData
};

const SuccessAnim = props => {
  let animation = null;
  const [top, setTop] = useState(new Animated.Value(0));
  const [opacity, setOpacity] = useState(new Animated.Value(0));

  useEffect(() => {
    console.log("I'm open");
    if (props.isActive) {
      Animated.timing(top, { toValue: 0, duration: 0 }).start();
      Animated.timing(opacity, { toValue: 1 }).start();
      animation.current.play();
    } else {
      Animated.timing(top, {
        toValue: screenHeight,
        duration: 0
      }).start();
      Animated.timing(opacity, { toValue: 0 }).start();

      //   animation.loop = false;
    }
  }, []);

  return (
    <AnimatedContainer style={{ top: top, opacity: opacity }}>
      <LottieView
        loop={true}
        autoplay={true}
        source={require("../../assets/images/433-checked-done.json")}
        ref={animation => {
          animation = animation;
        }}
      />
    </AnimatedContainer>
  );
};

export default SuccessAnim;

const Container = styled.View`
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.9);
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
`;

const AnimatedContainer = Animated.createAnimatedComponent(Container);
