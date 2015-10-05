import React from 'react';
import ReactDOM from 'react-dom';

import { createStore } from 'redux';
import { Provider } from 'react-redux';

import App from './App';

import worldMapApp from './reducers';

let initialState = {
  tiles: {
    // Rocks
    0: './tiles/rocks00.png',
    1: './tiles/rocks01.png',
    2: './tiles/rocks02.png',
    3: './tiles/rocks03.png',
    4: './tiles/rocks04.png',
    5: './tiles/rocks05.png',
    6: './tiles/rocks06.png',
    7: './tiles/rocks07.png',
    8: './tiles/rocks08.png',
    9: './tiles/rocks09.png',
    10: './tiles/rocks10.png',
    11: './tiles/rocks11.png',
    12: './tiles/rocks12.png',
    13: './tiles/rocks13.png',
    14: './tiles/rocks14.png',
    15: './tiles/rocks15.png',
    16: './tiles/rocks16.png',
    17: './tiles/rocks17.png',
    18: './tiles/rocks18.png',
    19: './tiles/rocks19.png',
    20: './tiles/rocks20.png',
    21: './tiles/rocks21.png',
    22: './tiles/rocks22.png',
    23: './tiles/rocks23.png',
    24: './tiles/rocks24.png',
    25: './tiles/rocks25.png',
  },
  tileSize: 50,
  world: [
    ['13','12','12','12','12','12','11'],['18',0,0,0,0,'22',0],[0,'19','21','8','10',0,0],[0,0,'20','13','11',0,'23'],['23',0,'22','24','25',0,0],[0,'22',0,0,0,'19',0],['8','9','9','9','9','9','10']
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
