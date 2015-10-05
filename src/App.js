import React, { Component } from 'react';
import { connect } from 'react-redux';

import { addRow, addColumn, changeCell, loadWorld, selectTile, changeTileSize } from './actions';
import TilePalette from './TilePalette';
import MapViewer from './MapViewer';
import DataControl from './DataControl';

import styles from './App.css';

class App extends Component {
  render() {
    const { dispatch, tiles, selectedTile, world } = this.props;
    return (
      <div className={styles.root}>
        <div className={styles.controls}>
          <DataControl
            worldData={world}
            loadWorld={(loadedWorld) => {
              dispatch(loadWorld(loadedWorld))
            }}
          />
          <TilePalette
            tiles={tiles}
            selectedTile={selectedTile}
            selectTile={(tile) => {
              dispatch(selectTile(tile))
            }}
          />
        </div>

        <MapViewer
          changeTileSize={(tileSize) => {
            dispatch(changeTileSize(tileSize))
          }}
          changeCell={(twoDimensionalIndex, tileId) => {
            dispatch(changeCell(twoDimensionalIndex, tileId))
          }}
          addRow={(append) => {
            dispatch(addRow(append))
          }}
          addColumn={(append) => {
            dispatch(addColumn(append))
          }}
          {...this.props}
        />
      </div>
    );
  }
}

function select(state) {
  return state;
}

export default connect(select)(App);
