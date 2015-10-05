import React from 'react';
import ReactDOM from 'react-dom';

import { createStore } from 'redux';
import { Provider } from 'react-redux';

import App from './App';

import worldMapApp from './reducers';

let initialState = {
  tiles: {
    0: './tiles/0.png',
    1: './tiles/1.png',
    2: './tiles/2.png',
    3: './tiles/3.png',
    4: './tiles/4.png',
    5: './tiles/5.png',
    6: './tiles/6.png',
    7: './tiles/7.png',
    8: './tiles/8.png',
    9: './tiles/9.png',
    10: './tiles/10.png',
    11: './tiles/11.png',
    12: './tiles/12.png',
    13: './tiles/13.png',
    14: './tiles/14.png',
    15: './tiles/15.png',
    16: './tiles/16.png',
    17: './tiles/17.png',
    18: './tiles/18.png',
  },
  tileSize: 100,
  world: [
    [0, 0, 0, 0, 0],
    [0, 4, 4, 4, 0],
    [0, 4, 4, 4, 0],
    [0, 1, 1, 1, 0],
    [0, 0, 0, 0, 0]
  ],
  selectedTile: 0
}

let store = createStore(worldMapApp, initialState);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
