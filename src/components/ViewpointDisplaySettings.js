import React, { Component } from 'react';

import { DEFAULT_VIEWPOINT_SCENE } from '../ViewpointState';

import styles from './ViewpointDisplaySettings.css';

export default class ViewpointDisplaySettings extends Component {

  render() {

    const { viewpointScenes, scenes, editDisplaySetting, reorderScenes } = this.props;

    var sceneOptions = [];
    for (let sceneID in scenes) {
      for (let subsceneID in scenes[sceneID].subscenes) {
        sceneOptions.push(
          {
            id: subsceneID,
            optionElement: <option
              key={`${sceneID}-${subsceneID}`}
              value={[sceneID, subsceneID]}
            >
              if ‘{ scenes[sceneID].name }’, subscene {subsceneID} has been seen
            </option>
          }
        );
      }
    }

    const makeSceneSetting = (scene, sceneIndex) => {

      var sceneShownAfterOptions = sceneOptions.filter((otherScene) => {
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

      return <tr className={styles.settingRow}>
        <td
          className={styles.priorityControls}
        >
          { sceneIndex > 0 &&
            <button
              className={styles.priorityButton}
              onClick={() => {
                reorderScenes(sceneIndex, sceneIndex - 1);
              }}
            >▲</button>
          }
          {
            sceneIndex < viewpointScenes.length -1 &&
            <button
              className={styles.priorityButton}
              onClick={() => {
                reorderScenes(sceneIndex, sceneIndex + 1);
              }}
            >▼</button>
          }
        </td>
        <td className={styles.sceneName}>
          {scene.name}
        </td>
        <td>
          <select
            className={styles.select}
            onChange={(e) => {
              editDisplaySetting(sceneIndex, e.target.value);
            }}
            value={viewpointScenes[sceneIndex].displaySetting}
          >
           { sceneShownAfterOptions }
          </select>
        </td>
      </tr>;
    };

    return (
      <div className={styles.root}>
        <h1 className={styles.title}>Upon entering this viewpoint, show the following scene, prioritised by the following order:</h1>
        <table>
          <tbody>
            { viewpointScenes.map(makeSceneSetting) }
          </tbody>
        </table>
      </div>
    );
  }

}
