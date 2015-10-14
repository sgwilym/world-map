import React, { Component } from 'react';

import GameMapViewer from './GameMapViewer';
import SceneInspector from './SceneInspector';
import { createGameWorld } from '../GameUtilities';

export default class MapGame extends Component {

  constructor(props) {
    super(props);

    this.state = {
      displayingScene: null
    };
  }

  render() {

    const { world, tiles, viewpoints, scenes } = this.props;
    const { displayingScene } = this.state;

    const gameWorld = createGameWorld(world, viewpoints, scenes, [[0,0]]);

    return (
      <div
        style={{width: '100%', height: '100%'}}
      >
        <GameMapViewer
          {...this.props}
          world={gameWorld}
          beginScene={(sceneID) =>{
            this.setState({displayingScene: sceneID});
          }}
        />
        {
          displayingScene !== null &&
          <SceneInspector
            scene={scenes[displayingScene]}
            endScene={() => {
              this.setState({displayingScene: null});
            }}
          />
        }
      </div>
    );
  }
}
