import React from "react";
import { View, StyleSheet, Text } from "react-native";
import Cards from "./cards";

const data = ["hello","world","this","is","react-native-cards-swipr"];

const App = () => {
  return (
    <View style={styles.container}>
      <Cards
        items={data}
        showableCards={2}
        onSwipeUp={() => {
          console.log("swiped up")
        }}
        onSwipeRight={() => {
          console.log("swiped right")
        }}
        onSwipeLeft={() => {
          console.log("swiped left")
        }}
        renderItem={(item, index) => (
          <View
            style={[
              styles.box,
              styles.shadow,
            ]}
          >
            <Text>{item}</Text>
          </View>
        )}
      />
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
  }
});

export default App;
