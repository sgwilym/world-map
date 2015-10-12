import React, { Component } from 'react';

import SceneEditor from './SceneEditor';
import ViewpointDisplaySettings from './ViewpointDisplaySettings';
import { DEFAULT_VIEWPOINT_SCENE } from '../ViewpointState';

import styles from './ViewpointEditor.css';

const EDITING_DISPLAY_SETTINGS = 'EDITING_DISPLAY_SETTINGS';

export default class ViewpointEditor extends Component {

  constructor(props) {
    super(props);

    this.state = {
      editing: null,
    };

    this.editScene = this.editScene.bind(this);
    this.deleteViewpoint = this.deleteViewpoint.bind(this);
  }

  editScene(sceneID) {
    this.setState({editing: sceneID});
  }

  deleteViewpoint() {
    const { deleteViewpoint } = this.props;
    const canDelete = confirm('Are you sure you want to delete this viewpoint?');
    if (canDelete) {
      deleteViewpoint();
    }
  }

  render() {

    const { viewpoint, closeViewpointEditor, viewpointTile, createScene, scenes, renameScene, deleteScene, addNewSubsceneToScene, changeSceneSubsceneDialogType, changeSceneSubsceneImage, connectSceneSubsceneDialog, addLineToSceneSubsceneDialog, editLineForSceneSubsceneDialog, deleteLineForSceneSubsceneDialog, addSceneSubsceneDialogChoice, editSceneSubsceneDialogChoiceText, connectSceneSubsceneDialogChoice, deleteSceneSubsceneDialogChoice, removeSubsceneFromScene, changeSceneEntrySubscene, editDisplaySetting, reorderScenes } = this.props;
    const { editing } = this.state;

    const viewpointScenes = viewpoint.scenes.map(scene => {
      return Object.assign({}, scenes[scene.id], {id: scene.id, displaySetting: scene.displaySetting});
    });

    const makeSceneButton = (scene) => {
      const selected = scene.id == editing;
      return (
        <div
          key={scene.id}
          onClick={this.editScene.bind(this, scene.id)}
          className={selected ? styles.selectedSceneButton : styles.sceneButton}
        >
          {scene.name}
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

          { viewpoint.scenes.length > 0 &&
            <button
              className={styles.editDisplaySettingsButton}
              onClick={() => {
                this.setState({editing: EDITING_DISPLAY_SETTINGS});
              }}
            >Edit Viewpoint Display Settings</button>
          }

          { viewpointScenes.map(makeSceneButton) }

          { viewpoint.scenes.length == 0 &&
            <p className={styles.noScenes}>No scenes.</p>
          }

          <button
            className={styles.createSceneButton}
            onClick={createScene}
          >
          </button>

          <button
            className={styles.deleteViewpointButton}
            onClick={this.deleteViewpoint}
          >
            Delete this viewpoint
          </button>
        </div>

        { editing == EDITING_DISPLAY_SETTINGS &&
          <ViewpointDisplaySettings
            scenes={scenes}
            viewpointScenes={viewpointScenes}
            editDisplaySetting={editDisplaySetting}
            reorderScenes={reorderScenes}
          />
        }

        { editing !== null &&
          editing !== EDITING_DISPLAY_SETTINGS &&
          <SceneEditor
            scene={scenes[editing]}
            sceneID={editing}
            renameScene={renameScene}

            addNewSubscene={() => {
              addNewSubsceneToScene(editing);
            }}

            deleteScene={() => {
              deleteScene(editing);
              this.setState({editing: null});
            }}

            changeSubsceneDialogType={(subsceneID, dialogType) => {
              changeSceneSubsceneDialogType(editing, subsceneID, dialogType);
            }}

            changeSubsceneImage={(subsceneID, imageIndex) => {
              changeSceneSubsceneImage(editing, subsceneID, imageIndex);
            }}

            connectSubsceneDialog={(subsceneID, subsceneIDorConstant) => {
              connectSceneSubsceneDialog(editing, subsceneID, subsceneIDorConstant);
            }}

            addLineToSubsceneDialog={(subsceneID) => {
              addLineToSceneSubsceneDialog(editing, subsceneID);
            }}

            editLineForSubsceneDialog={(subsceneID, lineIndex, lineString) => {
              editLineForSceneSubsceneDialog(editing, subsceneID, lineIndex, lineString);
            }}

            deleteLineForSubsceneDialog={(subsceneID, lineIndex) => {
              deleteLineForSceneSubsceneDialog(editing, subsceneID, lineIndex);
            }}

            addSubsceneDialogChoice={(subsceneID) => {
              addSceneSubsceneDialogChoice(editing, subsceneID);
            }}

            editSubsceneDialogChoiceText={(subsceneID, choiceIndex, choiceString) => {
              editSceneSubsceneDialogChoiceText(editing, subsceneID, choiceIndex, choiceString);
            }}

            deleteSubsceneDialogChoice={(subsceneID, choiceIndex) => {
              deleteSceneSubsceneDialogChoice(editing, subsceneID, choiceIndex);
            }}

            connectSubsceneDialogChoice={(subsceneID, choiceIndex, subsceneIDorConstant) => {
              connectSceneSubsceneDialogChoice(editing, subsceneID, choiceIndex, subsceneIDorConstant);
            }}

            removeSubscene={(subsceneID) => {
              removeSubsceneFromScene(editing, subsceneID);
            }}

            changeEntrySubscene={(subsceneID) => {
              changeSceneEntrySubscene(editing, subsceneID);
            }}
          />
        }


      </div>
    );
  }

}
