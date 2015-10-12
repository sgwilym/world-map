import React, { Component } from 'react';

import GameMapViewer from './GameMapViewer';

export default class MapGame extends Component {
  render() {

    const { world, tiles,  } = this.props;

    return (
      <div
        style={{width: '100%', height: '100%'}}
      >
        <GameMapViewer
          {...this.props}
        />
      </div>
    );
  }
}
