import React, { useRef } from "react";
import { Animated, Dimensions, PanResponder } from "react-native";

function Card({
  movable,
  onSwipe,
  movableCardStyles,
  item,
  index,
  renderItem,
  onSwipeRight,
  onSwipeLeft,
  onSwipeUp,
  onMoveStart,
}) {
  if (movable) {
    const card = useRef(new Animated.ValueXY()).current;
    const scale = useRef(new Animated.Value(1)).current;
    const rotate = useRef(new Animated.Value(0)).current;
    const left = useRef(new Animated.Value(0)).current;
    const right = useRef(new Animated.Value(0)).current;

    const WIDTH_HALF = Dimensions.get("window").width / 2;
    const HEIGHT_HALF = Dimensions.get("window").height / 2;

    const panResponder = useRef(
      PanResponder.create({
        // Ask to be the responder:
        onStartShouldSetPanResponder: (evt, gestureState) => true,
        onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
        onMoveShouldSetPanResponder: (evt, gestureState) => true,
        onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

        onPanResponderGrant: (evt, gestureState) => {
          // whenever the touch starts it will scale the card to 1.2 value
          Animated.spring(scale, {
            toValue: 1.2,
            useNativeDriver: true,
          }).start();
          if (onMoveStart) {
            onMoveStart();
          }
        },
        onPanResponderMove: (evt, gestureState) => {
          // whenever the touch moves it sets the card position depending
          // on the change on x and y
          card.setValue({
            x: gestureState.dx,
            y: gestureState.dy,
          });
          // and it also sets the rotation value
          rotate.setValue(gestureState.dx * (1 / WIDTH_HALF));

          const value = (gestureState.dx / WIDTH_HALF) * 2;
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

          // if the card was in a place that is right or left or up it will swipe it
          // in that place, the more the number that is multiplied by
          // (gestureState.dx / WIDTH_HALF) the shorter the distance between the card and
          // its swipe position and the less it becomes the more the distance between the
          // card and its swipe position.
          const value = (gestureState.dx / WIDTH_HALF) * 2;
          const upValue = (gestureState.dy / HEIGHT_HALF) * 2;
          // right
          if (value > 1) {
            Animated.spring(card, {
              toValue: {
                x: WIDTH_HALF * 2,
                y: 0,
              },
              useNativeDriver: true,
            }).start();
            setTimeout(() => {
              onSwipe();
              if (onSwipeRight) {
                onSwipeRight();
              }
            }, 200);
            // left
          } else if (value < -1) {
            Animated.spring(card, {
              toValue: {
                x: -WIDTH_HALF * 2,
                y: 0,
              },
              useNativeDriver: true,
            }).start();
            setTimeout(() => {
              onSwipe();
              if (onSwipeLeft) {
                onSwipeLeft();
              }
            }, 200);
            // up
          } else if (onSwipeUp && upValue < -1) {
            Animated.spring(card, {
              toValue: {
                x: 0,
                y: HEIGHT_HALF * -2,
              },
              useNativeDriver: true,
            }).start();
            setTimeout(() => {
              onSwipe();
              onSwipeUp();
            }, 200);
            // the card didn't reach its swipe position
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
        {renderItem(item, index)}
      </Animated.View>
    );
  } else {
    return (
      <Animated.View style={movableCardStyles}>
        {renderItem(item, index)}
      </Animated.View>
    );
  }
}

export default Card;
