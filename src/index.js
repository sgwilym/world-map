import React from 'react';
import ReactDOM from 'react-dom';

import { createStore } from 'redux';
import { Provider } from 'react-redux';

import App from './App';

import worldMapApp from './reducers';

let initialState = {
  tiles: {
    //
    0: './tiles/00.png',
    1: './tiles/01.png',
    2: './tiles/02.png',
    3: './tiles/02b.png',
    4: './tiles/03.png',
    5: './tiles/04.png',
    6: './tiles/05.png',
    7: './tiles/06.png',
    8: './tiles/06b.png',
    9: './tiles/07.png',
    10: './tiles/08.png',
    11: './tiles/09.png',
    12: './tiles/10.png',
    13: './tiles/11.png',
    14: './tiles/12.png',
    15: './tiles/13.png',
    16: './tiles/14.png',
    17: './tiles/15.png',
    18: './tiles/16.png',
    19: './tiles/17.png',
    20: './tiles/18.png',
    21: './tiles/19.png',
    22: './tiles/20.png',
    23: './tiles/21.png',
    24: './tiles/22.png',
    25: './tiles/23.png',
    26: './tiles/24.png',
    27: './tiles/25.png',
    28: './tiles/26.png',
    29: './tiles/27.png',
    30: './tiles/28.png',
    31: './tiles/29.png',
    32: './tiles/30.png',
    33: './tiles/31.png',
    34: './tiles/32.png',
    35: './tiles/33.png',
    36: './tiles/34.png',
    37: './tiles/35.png',
    38: './tiles/36.png',
    39: './tiles/37.png',
    40: './tiles/38.png',
    41: './tiles/39.png',
    42: './tiles/40.png',
    43: './tiles/41.png',
    44: './tiles/42.png',
    45: './tiles/43.png',
    46: './tiles/44.png',
    47: './tiles/45.png',
    48: './tiles/46.png',
    49: './tiles/47.png',
    50: './tiles/48.png',
    51: './tiles/49.png',
    52: './tiles/50.png',
    53: './tiles/51.png',
    54: './tiles/52.png',
    55: './tiles/53.png',
    56: './tiles/54.png'
  },
  tileSize: 50,
  world: [[0,0,0,0,0,0,0,0,0,0],[0,0,0,'33',0,0,0,0,0,0],['0','0','34','11','10','9','0','0',0,0],['0','0','0','2','20','28','26','12',0,0],['0','0','0','3','21','20','21','28','9',0],['0','14','25','23','21','32','21','31','8',0],['0','17','16','24','22','21','29','27','15',0],['0','0','0','0','4','27','15',0,0,0],['0','0','0','0','0','0','0',0,0,0]],
  selectedTile: 0
}

let store = createStore(worldMapApp, initialState);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
