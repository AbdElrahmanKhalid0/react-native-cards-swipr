import React from "react";
import { View, StyleSheet, Text } from "react-native";
import Cards from "./cards";

const data = Array.from(Array(50), (_, i) => i + 1);
function getRandomColor(j) {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }

  if (colors[j]) {
    return colors[j];
  } else {
    colors[j] = color;
    return color;
  }
}

const colors = {};

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
              { backgroundColor: getRandomColor(item) },
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
    height: 150,
    width: 150,
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
