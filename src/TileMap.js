import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import styles from './TileMap.css';

export default class TileMap extends Component {

  constructor(props) {
    super(props);

    this.state = {
      painting: false
    };
  }

  render() {

    const { world, tiles, tileSize, changeCell, selectedTile, addRow, addColumn, dragging } = this.props;

    const maxXValue = Math.max.apply(null, (world.map(row => {return row.length})));
    const maxYValue = world.length;

    const makeWorldRow = (worldRow, rowIndex) => {

      let cellsToAdd = [];

      if (worldRow.length < maxXValue) {
        let numberOfCellsToAdd = maxXValue - worldRow.length;
        cellsToAdd = Array.from(new Array(numberOfCellsToAdd), () => 0);
      }

      let extendedRow = worldRow.concat(cellsToAdd);

      let cells = extendedRow.map((cell, cellIndex) => {

        let tileImagePath = require(tiles[cell]);

        return <td
          className={styles.cell}
          key={cellIndex}
          style={{
            backgroundImage: `url(${tileImagePath})`,
          }}
          width={tileSize}
          height={tileSize}
          onMouseOver={(e) => {
            if (this.state.painting && !dragging) {
              changeCell([rowIndex, cellIndex], selectedTile)
            }
          }}
          onMouseDown={(e) => {
            if (!dragging) {
              changeCell([rowIndex, cellIndex], selectedTile)
            }
          }}
          onClick={() => {
            if (!dragging) {
              changeCell([rowIndex, cellIndex], selectedTile)
            }
          }}
        >
        </td>
      });

      return (
        <tr
          key={rowIndex}
        >
          { cells }
        </tr>
      )
    }

    return (
      <div className={styles.root}>
        <table
          className={styles.table}
        >
          <tbody>
            <tr>
              <td></td>
              <td>
                <button
                  className={styles.addButton}
                  onClick={addRow.bind(this, false)}
                >
                  +
                </button>
              </td>
              <td></td>
            </tr>
            <tr>
              <td>
              <button
                className={styles.addButton}
                onClick={addColumn.bind(this, false)}
              >
                +
              </button>
              </td>
              <td>
                <table
                  ref="worldMap"
                  width={tileSize * maxXValue}
                  className={styles.map}
                  onMouseDown={() => {
                    this.setState({painting: true})
                  }}
                  onMouseUp={() => {
                    this.setState({painting: false})
                  }}
                  onMouseLeave={(e) => {
                    this.setState({painting: false})
                  }}
                >
                  <tbody>
                    {world.map(makeWorldRow)}
                  </tbody>
                </table>
              </td>
              <td>
                <button
                  className={styles.addButton}
                  onClick={addColumn.bind(this, true)}
                >
                  +
                </button>
              </td>
            </tr>
            <tr>
              <td></td>
              <td>
                <button
                  className={styles.addButton}
                  onClick={addRow.bind(this, true)}
                >
                  +
                </button>
              </td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }

}
