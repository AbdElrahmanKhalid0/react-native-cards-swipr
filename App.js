import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import Card from "./card";

const data = Array.from(Array(50), (_, i) => i + 1);
function getRandomColor(j) {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  // console.log(i);
  if (colors[j]) {
    return colors[j];
  } else {
    colors[j] = color;
    return color;
  }
}

const colors = {};

const App = () => {
  useEffect(() => {
    setCurrentCardIdx(1);
  }, []);
  const [currentCardIdx, setCurrentCardIdx] = useState(1);

  return (
    <View style={styles.container}>
      {data
        .slice(0, 2)
        .reverse()
        .map((element) => {
          return (
            <Card
              movable={currentCardIdx === element}
              onSwipe={() => {
                data.shift();
                setCurrentCardIdx(currentCardIdx + 1);
              }}
              cardStyles={{ backgroundColor: getRandomColor(element) }}
              movableCardStyles={{
                ...(currentCardIdx !== element ? { ...styles.card } : {}),
              }}
              index={element}
              key={element}
            />
          );
        })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    position: "absolute",
    zIndex: -1,
  },
});

export default App;
