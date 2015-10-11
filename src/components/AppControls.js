import React, { Component } from 'react';

import styles from './AppControls.css';

export default class AppControls extends Component {

  render() {

    const { undo, redo, clearWorld } = this.props;

    return (
      <div className={styles.root}>
        <div className={styles.row}>
          <button
            className={styles.negativeButton}
            onClick={undo}
          >Undo</button>
          <button
            className={styles.positiveButton}
            onClick={redo}
          >Redo</button>
        </div>
        <button
          className={styles.negativeButton}
          onClick={clearWorld}
        >Clear map</button>
        <div className={styles.hints}>
          <p>D - Delete rows/columns</p>
          <p>Spacebar - Drag map</p>
        </div>
      </div>
    );
  }

}
