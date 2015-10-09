import React, { Component } from 'react';

import SceneEditor from './SceneEditor';
import { DEFAULT_VIEWPOINT_SCENE } from '../ViewpointState';

import styles from './ViewpointEditor.css';

export default class ViewpointEditor extends Component {

  constructor(props) {
    super(props);

    this.state = {
      editingScene: null
    };

    this.editScene = this.editScene.bind(this);
    this.deleteViewpoint = this.deleteViewpoint.bind(this);
  }

  editScene(sceneID) {
    this.setState({editingScene: sceneID});
  }

  deleteViewpoint() {
    const { deleteViewpoint } = this.props;
    const canDelete = confirm('Are you sure you want to delete this viewpoint?');
    if (canDelete) {
      deleteViewpoint();
    }
  }

  render() {

    const { viewpoint, closeViewpointEditor, viewpointTile, createScene, scenes, renameScene, deleteScene, addNewSubsceneToScene, changeSceneSubsceneDialogType, changeSceneSubsceneImage, connectSceneSubsceneDialog, addLineToSceneSubsceneDialog, editLineForSceneSubsceneDialog, deleteLineForSceneSubsceneDialog, addSceneSubsceneDialogChoice, editSceneSubsceneDialogChoiceText, connectSceneSubsceneDialogChoice, deleteSceneSubsceneDialogChoice, removeSubsceneFromScene, changeSceneEntrySubscene, changeViewpointDisplaySettings } = this.props;
    const { editingScene } = this.state;

    const viewpointScenes = viewpoint.scenes.map(sceneID => {
      return Object.assign({}, scenes[sceneID], {id: sceneID});
    });

    var sceneOptions = [];
    for (let sceneID in scenes) {
      sceneOptions.push(
        {
          id: sceneID,
          optionElement: <option
            key={sceneID}
            value={sceneID}
          >
            After { scenes[sceneID].name }
          </option>
        }
      );
    }

    const makeSceneButton = (scene) => {

      const selected = scene.id == editingScene;

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

      var shownAfterValue = Object.keys(viewpoint.displayScene).filter((key) => {
        return viewpoint.displayScene[key] === scene.id;
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

      return (
        <div
          key={scene.id}
          onClick={this.editScene.bind(this, scene.id)}
          className={selected ? styles.selectedSceneButton : styles.sceneButton}
        >
          <p>{scene.name}</p>
          <p>Display this scene:</p>
          <select
            value={shownAfterValue}
            onChange={(e) => {
              if (e.target.value !== 'none') {
                changeViewpointDisplaySettings(shownAfterValue, e.target.value, scene.id);
              }
            }}
          >
           { sceneShownAfterOptions }
          </select>
        </div>
      );
    };

    return (
      <div className={styles.root}>

        <button
          className={styles.closeButton}
          onClick={closeViewpointEditor}
        >
          Close
        </button>

        <div className={styles.sceneSelect}>

          <div
            className={styles.viewpoint}
            style={{
              backgroundImage: `url('${viewpointTile}')`
            }}
          >
            <span className={styles.xCoord}>
              {viewpoint.location.x}
            </span>
            <span className={styles.yCoord}>
              {viewpoint.location.y}
            </span>
          </div>

          <button
            className={styles.createSceneButton}
            onClick={createScene}
          >
            Make scene
          </button>

          { viewpointScenes.map(makeSceneButton) }

          <button
            className={styles.deleteViewpointButton}
            onClick={this.deleteViewpoint}
          >
            Delete this viewpoint
          </button>
        </div>

        { editingScene !== null &&
          <SceneEditor
            scene={scenes[editingScene]}
            sceneID={editingScene}
            renameScene={renameScene}

            addNewSubsceneToScene={() => {
              addNewSubsceneToScene(editingScene);
            }}

            deleteScene={() => {
              deleteScene(editingScene);
              this.setState({editingScene: null});
            }}

            changeSceneSubsceneDialogType={(subsceneID, dialogType) => {
              changeSceneSubsceneDialogType(editingScene, subsceneID, dialogType);
            }}

            changeSceneSubsceneImage={(subsceneID, imageIndex) => {
              changeSceneSubsceneImage(editingScene, subsceneID, imageIndex);
            }}

            connectSceneSubsceneDialog={(subsceneID, subsceneIDorConstant) => {
              connectSceneSubsceneDialog(editingScene, subsceneID, subsceneIDorConstant);
            }}

            addLineToSceneSubsceneDialog={(subsceneID) => {
              addLineToSceneSubsceneDialog(editingScene, subsceneID);
            }}

            editLineForSceneSubsceneDialog={(subsceneID, lineIndex, lineString) => {
              editLineForSceneSubsceneDialog(editingScene, subsceneID, lineIndex, lineString);
            }}

            deleteLineForSceneSubsceneDialog={(subsceneID, lineIndex) => {
              deleteLineForSceneSubsceneDialog(editingScene, subsceneID, lineIndex);
            }}

            addSceneSubsceneDialogChoice={(subsceneID) => {
              addSceneSubsceneDialogChoice(editingScene, subsceneID);
            }}

            editSceneSubsceneDialogChoiceText={(subsceneID, choiceIndex, choiceString) => {
              editSceneSubsceneDialogChoiceText(editingScene, subsceneID, choiceIndex, choiceString);
            }}

            deleteSceneSubsceneDialogChoice={(subsceneID, choiceIndex) => {
              deleteSceneSubsceneDialogChoice(editingScene, subsceneID, choiceIndex);
            }}

            connectSceneSubsceneDialogChoice={(subsceneID, choiceIndex, subsceneIDorConstant) => {
              connectSceneSubsceneDialogChoice(editingScene, subsceneID, choiceIndex, subsceneIDorConstant);
            }}

            removeSubscene={(subsceneID) => {
              removeSubsceneFromScene(editingScene, subsceneID);
            }}

            changeEntrySubscene={(subsceneID) => {
              changeSceneEntrySubscene(editingScene, subsceneID);
            }}
          />
        }


      </div>
    );
  }

}
