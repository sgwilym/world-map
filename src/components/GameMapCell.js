import React, { Component } from 'react';

import styles from './GameMapCell.css';

export default class GameMapCell extends Component {

  render() {

    const { tile, tileSize } = this.props;

    return (
      <td
        width={tileSize}
        height={tileSize}
        className={styles.root}
        style={{
          backgroundImage: `url(${tile})`
        }}
      ></td>
    );
  }

}
