import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import MapCell from './MapCell';

import styles from './TileMap.css';

export default class TileMap extends Component {

  constructor(props) {
    super(props);

    this.state = {
      painting: false,
      modifierActive: false
    };

    this.onKeyUp = this.onKeyUp.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
  }

  componentWillMount() {
    document.addEventListener('keydown', this.onKeyDown, false);
    document.addEventListener('keyup', this.onKeyUp, false);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.onKeyDown, false);
    document.removeEventListener('keyup', this.onKeyUp, false);
  }

  onKeyDown(e) {
    if (e.keyCode == 68) {
      this.setState({modifierActive: true});
    }
  }


  onKeyUp(e) {
    if (e.keyCode == 68) {
      this.setState({modifierActive: false});
    }
  }

  render() {

    const { world, tiles, tileSize, changeCell, selectedTile, addRow, addColumn, deleteRow, deleteColumn, dragging, createViewpoint, viewpoints, editViewpoint, clearWorld, undo, redo } = this.props;
    const { modifierActive } = this.state;

    const maxXValue = Math.max.apply(null, (world.map(row => {return row.length;})));
    const maxYValue = world.length;

    const makeWorldRow = (worldRow, rowIndex) => {

      let cellsToAdd = [];

      if (worldRow.length < maxXValue) {
        let numberOfCellsToAdd = maxXValue - worldRow.length;
        cellsToAdd = Array.from(new Array(numberOfCellsToAdd), () => 0);
      }

      let extendedRow = worldRow.concat(cellsToAdd);

      let cells = extendedRow.map((cell, cellIndex) => {

        let tileImagePath = tiles[cell];
        let cellViewpoints = Object.keys(viewpoints).find(id => {
          return viewpoints[id].location.x == cellIndex &&
          viewpoints[id].location.y == rowIndex;
        });

        return <MapCell
              key={cellIndex}
              tileImagePath={tileImagePath}
              tileSize={tileSize}
              location={{x: cellIndex, y: rowIndex}}
              painting={this.state.painting}
              dragging={dragging}
              changeCell={changeCell}
              createViewpoint={createViewpoint}
              editViewpoint={editViewpoint}
              selectedTile={selectedTile}
              viewpoints={cellViewpoints}
            />;
      });

      return (
        <tr
          key={rowIndex}
        >
          { cells }
        </tr>
      );
    };

    const buttonClassName = modifierActive ? styles.deleteButton : styles.addButton;
    const buttonLabel = modifierActive ? '—' : '+';
    const columnButtonOnClick = (after) => {
      if (modifierActive) {
        deleteColumn(after);
      } else {
        addColumn(after);
      }
    };
    const rowButtonOnClick = (after) => {
      if (modifierActive) {
        deleteRow(after);
      } else {
        addRow(after);
      }
    };

    return (
      <div className={styles.root}>
        <table
          className={styles.table}
        >
          <tbody>
            <tr>
              <td>
              </td>
              <td>
                <button
                  className={buttonClassName}
                  onClick={rowButtonOnClick.bind(this, false)}
                >
                  { buttonLabel }
                </button>
              </td>
              <td>
              </td>
            </tr>
            <tr>
              <td>
              <button
                className={buttonClassName}
                onClick={columnButtonOnClick.bind(this, false)}
              >
                { buttonLabel }
              </button>
              </td>
              <td>
                <table
                  ref="worldMap"
                  width={tileSize * maxXValue}
                  className={styles.map}
                  onMouseDown={() => {
                    this.setState({painting: true});
                  }}
                  onMouseUp={() => {
                    this.setState({painting: false});
                  }}
                  onMouseLeave={(e) => {
                    this.setState({painting: false});
                  }}
                >
                  <tbody>
                    {world.map(makeWorldRow)}
                  </tbody>
                </table>
              </td>
              <td>
                <button
                  className={buttonClassName}
                  onClick={columnButtonOnClick.bind(this, true)}
                >
                  { buttonLabel }
                </button>
              </td>
            </tr>
            <tr>
              <td></td>
              <td>
                <button
                  className={buttonClassName}
                  onClick={rowButtonOnClick.bind(this, true)}
                >
                  { buttonLabel }
                </button>
              </td>
              <td>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }

}
