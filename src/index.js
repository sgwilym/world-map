import React from 'react';
import ReactDOM from 'react-dom';

import { createStore, compose, applyMiddleware } from 'redux';
import { devTools, persistState } from 'redux-devtools';
import { DevTools, DebugPanel, LogMonitor } from 'redux-devtools/lib/react';
import multi from 'redux-multi';

import { Provider } from 'react-redux';

import App from './App';

import worldMapApp from './reducers';

let initialState = {
  tileSize: 100,
  world: [[0,0,0,0,0,0,0,0],['0','0','0','11','9','0','0',0],['0','34','11','23','28','9','0',0],['14','25','23','19','20','28','26','12'],['17','24','22','32','29','27','16','15'],['0','0','17','24','6','39','37',0],['0','0','0','0','0','0','0',0]],
  selectedTile: 0,
  viewpoints: {},
  scenes: {}
};

const devCreateStore = compose(
  devTools(),
  persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
)(createStore);

const creatStoreToUse = __DEVTOOLS__ ? devCreateStore : createStore;

const createStoreWithMiddleware = applyMiddleware(multi)(creatStoreToUse);

const store = createStoreWithMiddleware(worldMapApp, initialState);

ReactDOM.render(
  <div style={{height: '100%', width: '100%'}}>
    <Provider store={store}>
      <App />
    </Provider>
    { __DEVTOOLS__ &&
      <DebugPanel top right bottom>
        <DevTools store={store} monitor={LogMonitor} />
      </DebugPanel>
    }

  </div>,
  document.getElementById('root')
);
