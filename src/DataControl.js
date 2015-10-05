import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import ExportImportUtilities from './ExportImportUtilities';

import styles from './DataControl.css';

export default class DataControl extends Component {

  constructor(props) {
    super(props);

    this.triggerInputClick = this.triggerInputClick.bind(this);
    this.fileUploaded = this.fileUploaded.bind(this);
  }

  triggerInputClick() {
    const click = new Event('click', {bubbles: true});
    const input = ReactDOM.findDOMNode(this.refs.fileInput);
    input.dispatchEvent(click);
  }

  fileUploaded(e) {
    const { loadWorld } = this.props;

    ExportImportUtilities.validateUploadedWorldFile(e.target.files[0])
    .then((loadedWorld) => {
      loadWorld(loadedWorld['world'])
    })
    .catch((err) => {
      alert('You need to upload a file exported from this app, man.')
    })
  }

  render() {

    const { worldData } = this.props;

    const date = new Date();
    const dateString = `${date.getUTCDate()}-${date.getUTCMonth()}-${date.getUTCFullYear()}-${date.getUTCHours()}-${date.getUTCMinutes()}`;

    return (
      <div className={styles.root}>
        <a
          className={styles.button}
          href={ExportImportUtilities.worldAsDataURI(worldData)}
          download={`worldmap-${dateString}.json`}
          target="_blank"
        >
         Export
        </a>
        <button
          className={styles.button}
          onClick={this.triggerInputClick}
        >
          Import
        </button>
        <input
          ref="fileInput"
          className={styles.fileInput}
          type="file"
          accept=".json"
          onChange={this.fileUploaded}
        />
      </div>
    )
  }
}
