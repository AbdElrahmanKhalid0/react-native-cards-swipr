import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import Card from "./card";

let offset = 0;

const Cards = ({
  showableCards,
  items,
  renderItem,
  onSwipe,
  onSwipeUp,
  onSwipeRight,
  onSwipeLeft,
  onMoveStart,
  onDataEnd,
}) => {
  useEffect(() => {
    setCurrentCardIdx(0);
  }, []);
  if (!showableCards) {
    showableCards = 2;
  }
  const [currentCardIdx, setCurrentCardIdx] = useState(0);

  return (
    <View>
      {items
        .slice(0, showableCards)
        .reverse()
        .map((item, index) => {
          // initializing the index according to the showing cards number
          index =
            items.length >= showableCards
              ? showableCards - index - 1
              : items.length - index - 1;
          return (
            <Card
              movable={currentCardIdx === index + offset}
              onSwipe={() => {
                items.shift();
                offset++;
                setCurrentCardIdx(currentCardIdx + 1);
                if (onSwipe) {
                  onSwipe();
                }
                if (onDataEnd && items.length === 0) {
                  onDataEnd()
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
              onMoveStart={onMoveStart}
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
