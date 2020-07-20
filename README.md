# react-native-cards-swipr
A react-native component that enables you to make swipeable cards.

## installation
<code>npm i react-native-cards-swipr</code>

## Demo

### [examples/numbers](https://github.com/AbdElrahmanKhalid0/react-native-cards-swipr/blob/master/examples/numbers.js)
![](https://i.imgur.com/fU6xEBn.gif)

### [examples/words](https://github.com/AbdElrahmanKhalid0/react-native-cards-swipr/blob/master/examples/words.js)
![](https://i.imgur.com/jTDbGM6.gif)

### [examples/icons](https://github.com/AbdElrahmanKhalid0/react-native-cards-swipr/blob/master/examples/icons.js)
![](https://i.imgur.com/nMk7G71.gif)

## Basic Usage

you can use the Cards component by importing it form the package

```jsx
import { Cards } from 'react-native-cards-swipr';
```

then you can use it like this

```jsx
<Cards 
  // the rendered data, and whenever a card is swiped the data it represents will be removed from the items list
  items={items}
  // the rendered cards in the view the default is 2 and the lower this number
  // the smoother the move also it can't be less than 2
  showableCards={5}
  onSwipe={() => {
    // a function that will be called whenever a swipe is made
  }}
  onSwipeUp={() => {
    // a function that will be called whenever a card is swiped up and if it
    // wasn't given the cards can't be swiped up
  }}
  onSwipeRight={() => {
    // a function that will be called whenever a card is swiped right and if
    // this function wasn't given the cards will still be able to swiped right
  }}
  onSwipeLeft={() => {
    // a function that will be called whenever a card is swiped left and has
    // the same functionality as the onSwipeRight function
  }}
  onMoveStart={() => {
    // a function that will be called whenever a card starts to be moved no matter
    // if it was swiped or not
  }}
  onDataEnd={() => {
    // a function that will be called whenever the final card is swiped (the data ends)
  }}
  renderItem={(item, index) => (
    // a function that takes the item of the items and its index and should return
    // the item view component
  )}
/>
```