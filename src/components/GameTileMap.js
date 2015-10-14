import React, { Component } from 'react';

import GameMapCell from './GameMapCell';

import styles from './TileMap.css';

export default class GameTileMap extends Component {

  render() {

    const { world, tiles, tileSize, beginScene } = this.props;

    const maxWorldRowLength = Math.max.apply(null, (world.map(row => {return row.length;})));

    const makeWorldRow = (worldRow, rowIndex) => {

      const cells = worldRow.map((cell, cellIndex) => {

        let { tile, scene } = cell;
        return (
          <GameMapCell
            tile={tiles[tile]}
            beginScene={scene !== null ? beginScene.bind(this, scene) : null}
            key={cellIndex}
            tileSize={tileSize}
          />
        );
      });

      return (
        <tr
          key={rowIndex}
        >
          { cells }
        </tr>
      );
    };

    return (
      <table
        width={maxWorldRowLength * tileSize}
        className={styles.table}
      >
        <tbody>
          { world.map(makeWorldRow) }
        </tbody>
      </table>
    );
  }
}
