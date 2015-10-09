import React from 'react';
import ReactDOM from 'react-dom';

import { createStore, compose, applyMiddleware } from 'redux';
import { devTools, persistState } from 'redux-devtools';
import { DevTools, DebugPanel, LogMonitor } from 'redux-devtools/lib/react';
import multi from 'redux-multi';

import { Provider } from 'react-redux';

import App from './components/App';

import worldMapApp from './reducers';

let initialState = {
  tileSize: 100,
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
