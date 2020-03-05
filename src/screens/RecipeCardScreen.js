import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import { PanResponder, Animated } from "react-native";
import RecipeCard from "../components/recipieScreens/RecipeCard";
import { useSelector, useDispatch } from "react-redux";
import * as RecipeActions from "../../store/actions/recipeActions";

const RecipeCardScreen = () => {
  const dispatch = useDispatch();

  const recipes = useSelector(state => state.recipe.recipes);
  const [pan, setPan] = useState(new Animated.ValueXY());
  const [scale, setScale] = useState(new Animated.Value(0.9));
  const [translateY, settranslateY] = useState(new Animated.Value(44));
  const [thirdScale, setThirdScale] = useState(new Animated.Value(0.8));
  const [thirdTranslateY, setThirdTranslateY] = useState(
    new Animated.Value(-50)
  );
  const [opacity, setOpacity] = useState(new Animated.Value(0));
  const [index, setIndex] = useState(0);

  const length = recipes.length;

  useEffect(() => {
    getRecipes();
  }, [dispatch]);

  const getRecipes = useCallback(async () => {
    await dispatch(RecipeActions.getRecipes());
  }, []);

  const getNextIndex = index => {
    let nextIndex = index + 1;
    if (nextIndex > recipes.length - 1) {
      return 0;
    }
    // setIndex(nextIndex);
    return nextIndex;
  };

  const panResponder = React.useMemo(
    () =>
      PanResponder.create({
        onMoveShouldSetPanResponder: () => true,
        onPanResponderGrant: () => {
          Animated.spring(scale, { toValue: 1 }).start();
          Animated.spring(translateY, { toValue: 0 }).start();
          Animated.spring(thirdScale, { toValue: 0.9 }).start();
          Animated.spring(thirdTranslateY, { toValue: 44 }).start();
        },
        onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }]),
        onPanResponderRelease: () => {
          const positionY = pan.y.__getValue();
          if (positionY > 200) {
            Animated.timing(pan, {
              toValue: { x: 0, y: 1000 }
            }).start(() => {
              pan.setValue({ x: 0, y: 0 });
              scale.setValue(0.9);
              translateY.setValue(44);
              thirdScale.setValue(0.8);
              thirdTranslateY.setValue(-50);
              setIndex(index => getNextIndex(index));
            });
          } else {
            Animated.spring(pan, { toValue: { x: 0, y: 0 } }).start();
            Animated.spring(scale, { toValue: 0.9 }).start();
            Animated.spring(translateY, { toValue: 44 }).start();
            Animated.spring(thirdScale, { toValue: 0.8 }).start();
            Animated.spring(thirdTranslateY, { toValue: -50 }).start();
          }
        }
      }),
    []
  );

  return (
    <Container>
      <Animated.View
        style={{ transform: [{ translateX: pan.x }, { translateY: pan.y }] }}
        {...panResponder.panHandlers}
      >
        <RecipeCard
          title={recipes[index].title}
          img={recipes[index].image}
          desc={recipes[index].desc}
        />
      </Animated.View>
      <Animated.View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: -1,
          width: "100%",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
          transform: [{ scale: scale }, { translateY: translateY }]
        }}
      >
        <RecipeCard
          title={recipes[getNextIndex(index)].title}
          img={recipes[getNextIndex(index)].image}
          desc={recipes[getNextIndex(index)].desc}
        />
      </Animated.View>
      <Animated.View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: -3,
          width: "100%",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
          transform: [{ scale: thirdScale }, { translateY: thirdTranslateY }]
        }}
      >
        <RecipeCard
          title={recipes[getNextIndex(index + 1)].title}
          img={recipes[getNextIndex(index + 1)].image}
          desc={recipes[getNextIndex(index + 1)].desc}
        />
      </Animated.View>
    </Container>
  );
};

export default RecipeCardScreen;

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background: #f0f3f5;
`;
