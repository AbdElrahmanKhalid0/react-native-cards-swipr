import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import Card from "./card";

let offset = 0;
let data = [];

const Cards = ({
  showableCards,
  items,
  renderItem,
  onSwipe,
  onSwipeUp,
  onSwipeRight,
  onSwipeLeft,
}) => {
  useEffect(() => {
    setCurrentCardIdx(0);
    // copying the items
    for (item of items) {
      data.push(item);
    }
  }, []);
  if (!showableCards) {
    showableCards = 2;
  }
  const [currentCardIdx, setCurrentCardIdx] = useState(0);

  return (
    <View>
      {data
        .slice(0, showableCards)
        .reverse()
        .map((item, index) => {
          // initializing the index according to the showing cards number
          index =
            data.length >= showableCards
              ? showableCards - index - 1
              : data.length - index - 1;
          return (
            <Card
              movable={currentCardIdx === index + offset}
              onSwipe={() => {
                data.shift();
                offset++;
                setCurrentCardIdx(currentCardIdx + 1);
                if (onSwipe) {
                  onSwipe();
                }
              }}
              movableCardStyles={{
                ...(currentCardIdx !== index + offset
                  ? { ...styles.card }
                  : {}),
              }}
              onSwipeUp={onSwipeUp}
              onSwipeRight={onSwipeRight}
              onSwipeLeft={onSwipeLeft}
              renderItem={renderItem}
              item={item}
              index={index + offset}
              key={index + offset}
            />
          );
        })}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    position: "absolute",
    zIndex: -1,
  },
});

export default Cards;
