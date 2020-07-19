import React, { useRef } from "react";
import {
  Animated,
  View,
  Dimensions,
  PanResponder,
  StyleSheet,
  Text,
} from "react-native";

function Card({ movable, onSwipe, movableCardStyles, cardStyles, index }) {
  //   console.log(movable);
  if (movable) {
    const card = useRef(new Animated.ValueXY()).current;
    const scale = useRef(new Animated.Value(1)).current;
    const rotate = useRef(new Animated.Value(0)).current;
    const left = useRef(new Animated.Value(0)).current;
    const right = useRef(new Animated.Value(0)).current;

    const WINDOW_HALF = Dimensions.get("window").width / 2;

    const panResponder = useRef(
      PanResponder.create({
        // Ask to be the responder:
        onStartShouldSetPanResponder: (evt, gestureState) => true,
        onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
        onMoveShouldSetPanResponder: (evt, gestureState) => true,
        onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

        onPanResponderGrant: (evt, gestureState) => {
          // The gesture has started. Show visual feedback so the user knows
          // what is happening!
          // gestureState.d{x,y} will be set to zero now
          Animated.spring(scale, {
            toValue: 1.2,
            useNativeDriver: true,
          }).start();
        },
        onPanResponderMove: (evt, gestureState) => {
          // whenever the touch move it sets the card position depending
          // on the change on x and y
          card.setValue({
            x: gestureState.dx,
            y: gestureState.dy,
          });
          // and it also sets the rotation value
          rotate.setValue(gestureState.dx * (1 / WINDOW_HALF));

          value = (gestureState.dx / WINDOW_HALF) * 5;
          if (gestureState.dx > 0) {
            right.setValue(value > 1 ? 1 : value);
            left.setValue(0);
          } else {
            left.setValue(value < -1 ? 1 : value * -1);
            right.setValue(0);
          }
        },
        onPanResponderTerminationRequest: (evt, gestureState) => true,
        onPanResponderRelease: (evt, gestureState) => {
          // whenever the touch is released it will get everything back to the starting point
          Animated.spring(scale, {
            toValue: 1,
            useNativeDriver: true,
          }).start();
          Animated.spring(rotate, {
            toValue: 0,
            useNativeDriver: true,
          }).start();

          Animated.spring(left, {
            toValue: 0,
            useNativeDriver: true,
          }).start();
          Animated.spring(right, {
            toValue: 0,
            useNativeDriver: true,
          }).start();

          value = (gestureState.dx / WINDOW_HALF) * 5;
          if (value > 1) {
            Animated.spring(card, {
              toValue: {
                x: WINDOW_HALF * 2,
                y: 0,
              },
              useNativeDriver: true,
            }).start();
            setTimeout(onSwipe, 200);
          } else if (value < -1) {
            Animated.spring(card, {
              toValue: {
                x: -WINDOW_HALF * 2,
                y: 0,
              },
              useNativeDriver: true,
            }).start();
            setTimeout(onSwipe, 200);
          } else {
            Animated.spring(card, {
              toValue: { x: 0, y: 0 },
              useNativeDriver: true,
            }).start();
          }
        },
        onPanResponderTerminate: (evt, gestureState) => {
          // Another component has become the responder, so this gesture
          // should be cancelled
        },
        onShouldBlockNativeResponder: (evt, gestureState) => {
          // Returns whether this component should block native components from becoming the JS
          // responder. Returns true by default. Is currently only supported on android.
          return true;
        },
      })
    ).current;

    return (
      <Animated.View
        style={
          movable
            ? {
                ...movableCardStyles,
                transform: [
                  { scale },
                  { translateX: card.x },
                  { translateY: card.y },
                  { rotateZ: rotate },
                ],
              }
            : movableCardStyles
        }
        {...(movable ? panResponder.panHandlers : {})}
      >
        <View style={[styles.box, styles.shadow, cardStyles]}>
          <Text>{index}</Text>
        </View>
      </Animated.View>
    );
  } else {
    return (
      <Animated.View style={movableCardStyles}>
        <View style={[styles.box, styles.shadow, cardStyles]}>
          <Text>{index}</Text>
        </View>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  box: {
    height: 150,
    width: 150,
    backgroundColor: "tomato",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  left: {
    position: "absolute",
    transform: [{ translateX: 10 }, { translateY: 10 }],
  },
  right: {
    position: "absolute",
    transform: [{ translateX: 110 }, { translateY: 10 }],
  },
  backBox: {
    position: "absolute",
    height: 150,
    width: 150,
    zIndex: -1,
    borderRadius: 5,
    transform: [{ translateY: -90 }],
    backgroundColor: "wheat",
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
});

export default Card;
