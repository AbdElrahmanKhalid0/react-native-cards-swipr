import React, { useEffect, useState, useRef } from "react";
import { View, StyleSheet, Text, Animated } from "react-native";
import Cards from "./cards";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";

// group of icons
const data = [
  <MaterialCommunityIcons name="sleep" size={32} color="black" />,
  <MaterialCommunityIcons name="food-fork-drink" size={32} color="black" />,
  <MaterialIcons name="work" size={32} color="black" />,
  <MaterialIcons name="fitness-center" size={32} color="black" />,
];

const App = () => {
  const [status, setstatus] = useState(null);
  const scale = useRef(new Animated.Value(1)).current;

  // removing any status
  useEffect(() => {
    setstatus(null);
  }, []);

  return (
    <View style={styles.container}>
      <Cards
        items={data}
        showableCards={2}
        onSwipeUp={() => {
          setstatus("LATER");
        }}
        onSwipeRight={() => {
          setstatus("YES");
        }}
        onSwipeLeft={() => {
          setstatus("NO");
        }}
        onSwipe={() => {
          // whenever a swipe happens a bounce animation will happen to the status text
          Animated.sequence([
            Animated.timing(scale, {
              toValue: 1.4,
              duration: 200,
              useNativeDriver: true,
            }),
            Animated.spring(scale, {
              toValue: 1,
              useNativeDriver: true,
            }),
          ]).start();
        }}
        onDataEnd={() => {
          // hiding the status after one second of the final swipe
          setTimeout(() => {
            Animated.spring(scale, {
              toValue: 0,
              useNativeDriver: true,
            }).start();
          }, 1000);
        }}
        renderItem={(item) => (
          <View style={[styles.box, styles.shadow]}>
            <Text>{item}</Text>
          </View>
        )}
      />
      {status && (
        <Animated.Text
          style={{
            position: "absolute",
            bottom: 50,
            transform: [{ scale }],
            fontSize: 40,
          }}
        >
          {status}
        </Animated.Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  box: {
    height: 300,
    width: 300,
    backgroundColor: "tomato",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
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

export default App;
