// import React, { useState, useEffect } from "react";
// import styled from "styled-components";
// import LottieView from "lottie-react-native";
// import { Animated, Dimensions } from "react-native";

// const screenHeight = Dimensions.get("window").height;

// const SuccessAnim = props => {
//   const [top, setTop] = useState(new Animated.Value(screenHeight));
//   const [opacity, setOpacity] = useState(new Animated.Value(0));
//   let anim;

//   useEffect(() => {
//     if (props.isActive) {
//       Animated.timing(top, { toValue: 0, duration: 0 }).start();
//       Animated.timing(opacity, { toValue: 1 }).start();

//       anim.play();
//     } else {
//       Animated.timing(top, {
//         toValue: screenHeight,
//         duration: 0
//       }).start();
//       Animated.timing(opacity, { toValue: 0 }).start();

//       anim.loop = false;
//     }
//   }, []);

//   return (
//     <AnimatedContainer style={{ top: top, opacity: opacity }}>
//       <LottieView
//         source={require("../../assets/images/lottie-checked-done.json")}
//         autoPlay={false}
//         loop={false}
//         ref={animation => {
//           anim = animation;
//         }}
//       />
//     </AnimatedContainer>
//   );
// };

// export default SuccessAnim;

// const Container = styled.View`
//   width: 100%;
//   height: 100%;
//   background: rgba(255, 255, 255, 0.9);
//   justify-content: center;
//   align-items: center;
//   position: absolute;
//   top: 0;
//   left: 0;
// `;

// const AnimatedContainer = Animated.createAnimatedComponent(Container);
