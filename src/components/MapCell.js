import React, { Component } from 'react';

import styles from './MapCell.css';

export default class MapCell extends Component {

  constructor(props) {
    super(props);

    this.state = {
      mouseIsOver: false
    };
  }

  render() {

    const { tileImagePath, tileSize, location, painting, dragging, createViewpoint, changeCell, selectedTile, viewpoints, editViewpoint } = this.props;
    const { mouseIsOver } = this.state;

    return (
      <td
        className={styles.root}
        style={{
          backgroundImage: `url(${tileImagePath})`,
        }}
        width={tileSize}
        height={tileSize}
        onMouseOver={(e) => {
          if (painting && !dragging) {
            changeCell([location.y, location.x], selectedTile);
          }
        }}
        onMouseEnter={(e) => {
          this.setState({mouseIsOver: true});
        }}
        onMouseLeave={(e) => {
          this.setState({mouseIsOver: false});
        }}
        onMouseDown={(e) => {
          if (!dragging) {
            changeCell([location.y, location.x], selectedTile);
          }
        }}
        onClick={() => {
          if (!dragging) {
            changeCell([location.y, location.x], selectedTile);
          }
        }}
      >
        { !viewpoints &&
          mouseIsOver &&
          !painting &&
          <div
            className={styles.addViewpoint}
            onMouseDown={(e) => {
              e.stopPropagation();
            }}
            onMouseOver={(e) => {
              e.stopPropagation();
            }}
            onClick={(e) => {
              e.stopPropagation();
              createViewpoint(location);
            }}
          >
          </div>
        }
        { viewpoints &&
          <div
            className={styles.inspectViewpoint}
            onMouseDown={(e) => {
              e.stopPropagation();
            }}
            onMouseOver={(e) => {
              e.stopPropagation();
            }}
            onClick={(e) => {
              e.stopPropagation();
              editViewpoint(viewpoints[0]);
            }}
          >
          </div>
        }
      </td>
    );
  }

}
