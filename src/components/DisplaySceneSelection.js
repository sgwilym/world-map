import React, { Component } from 'react';

import { DEFAULT_VIEWPOINT_SCENE } from '../ViewpointState';

import styles from './DisplaySceneSelection.css';

export default class DisplaySceneSelection extends Component {
  render() {

    const { scenes, scene, displaySceneSettings, changeDisplaySettings } = this.props;


    var sceneOptions = [];
    for (let sceneID in scenes) {
      sceneOptions.push(
        {
          id: sceneID,
          optionElement: <option
            key={sceneID}
            value={sceneID}
          >
            After '{ scenes[sceneID].name }' has been seen
          </option>
        }
      );
    }

    let sceneShownAfterOptions = sceneOptions.filter((otherScene) => {
      return parseInt(otherScene.id) !== scene.id;
    }).map((otherScene) => {
      return otherScene.optionElement;
    });

    sceneShownAfterOptions.unshift(
      <option
        key={DEFAULT_VIEWPOINT_SCENE}
        value={DEFAULT_VIEWPOINT_SCENE}
      >
        By default
      </option>
    );

    var shownAfterValue = Object.keys(displaySceneSettings).filter((key) => {
      return displaySceneSettings[key] === scene.id;
    })[0];

    if (shownAfterValue == undefined) {
      sceneShownAfterOptions.unshift(
        <option
          key="none"
          value="none"
        >
          Never
        </option>
      );
      shownAfterValue = 'none';
    }

    console.log(styles);

    return (
      <div className={styles.root}>
        <p className={styles.label}>Shown:</p>
        <select
          className={styles.select}
          value={shownAfterValue}
          onChange={(e) => {
            if (e.target.value !== 'none') {
              changeDisplaySettings(shownAfterValue, e.target.value, scene.id);
            }
          }}
        >
         { sceneShownAfterOptions }
        </select>
      </div>
    );
  }
}
