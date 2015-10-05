import React, { Component } from 'react';

import styles from './ZoomControl.css';

export default class ZoomControl extends Component {

  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const { changeTileSize } = this.props;
    changeTileSize(e.target.value);
  }

  render() {

    const { zoomLevel } = this.props;

    return (
      <div className={styles.root}>
        <input
          className={styles.slider}
          onChange={this.handleChange}
          type="range"
          min="25"
          value={zoomLevel}
          max="200"
          step="1"
          orient="vertical"
        />
      </div>
    )
  }

}
