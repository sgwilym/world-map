import React, { Component } from 'react';

import styles from './TilePalette.css';

export default class TilePalette extends Component {

  render() {

    const { tiles, selectedTile, selectTile } = this.props;

    const makePalettes = (tiles) => {
      var palettes = [];

      for (let tileKey in tiles) {

        let tileImagePath = require(tiles[tileKey]);
        let selected = tileKey == selectedTile;

        palettes.push(
          <div
            key={tiles[tileKey]}
            className={selected ? styles.selectedPalette : styles.palette}
            style={{
              backgroundImage: `url(${tileImagePath})`
            }}
            onClick={
              selectTile.bind(this, tileKey)
            }
          >
          </div>
        )
      }

      return palettes;
    }

    return (
      <div className={styles.root}>
        { makePalettes(tiles) }
      </div>
    )
  }

}
