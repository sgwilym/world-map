import React, { Component } from 'react';

import SubsceneEditor from './SubsceneEditor';

import styles from './SceneEditor.css';

export default class SceneEditor extends Component {

  constructor(props) {
    super(props);

    this.state = {
      editingSubscene: null
    };

    this.editSubscene = this.editSubscene.bind(this);
    this.editTitle = this.editTitle.bind(this);
    this.deleteScene = this.deleteScene.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.sceneID !== this.props.sceneID) {
      this.setState({editingSubscene: null});
    }

  }

  editSubscene(subsceneID) {
    this.setState({editingSubscene: subsceneID});
  }

  editTitle(e) {
    const { scene, renameScene, sceneID } = this.props;
    renameScene(sceneID, e.target.value);
  }

  deleteScene() {
    const { deleteScene } = this.props;
    const canDelete = confirm('Are you sure you want to delete this scene?');
    if (canDelete) {
      deleteScene();
    }
  }

  render() {
    const { scene, addNewSubsceneToScene, changeSceneSubsceneDialogType, changeSceneSubsceneImage, connectSceneSubsceneDialog, addLineToSceneSubsceneDialog, editLineForSceneSubsceneDialog, deleteLineForSceneSubsceneDialog, addSceneSubsceneDialogChoice, editSceneSubsceneDialogChoiceText, connectSceneSubsceneDialogChoice, deleteSceneSubsceneDialogChoice, removeSubscene, changeEntrySubscene } = this.props;
    const { editingSubscene } = this.state;

    const subsceneButtons = [];
    const subsceneOptions = [];
    const sceneSubsceneIDs = [];
    for (let subsceneID in scene.subscenes) {
      let subscene = scene.subscenes[subsceneID];
      let selected = editingSubscene == subsceneID;

      sceneSubsceneIDs.push(subsceneID);

      subsceneOptions.push(
        <option
          key={subsceneID}
          value={subsceneID}
        >
          Subscene {subsceneID}
        </option>
      );

      subsceneButtons.push(
        <div
          key={subsceneID}
          className={selected ? styles.selectedSubsceneButton: styles.subsceneButton}
          onClick={this.editSubscene.bind(this, subsceneID)}
        >
          Subscene {subsceneID}
        </div>
      );
    }

    return (
      <div className={styles.root}>
        <div className={styles.header}>
          <input
            className={styles.titleField}
            value={scene.name}
            placeholder={"Name this scene"}
            onChange={this.editTitle}
          />

          { Object.keys(scene.subscenes).length > 0 &&
            <p>Begins on&nbsp;
            <select
              value={scene.entrySubscene}
              onChange={(e) => {
                changeEntrySubscene(e.target.value);
              }}
            >
              { subsceneOptions }
            </select>
            </p>
          }


          <button
            className={styles.deleteButton}
            onClick={this.deleteScene}
          >
            Delete this scene
          </button>
        </div>
        <div className={styles.subscenes}>
          { subsceneButtons }
          <button
            className={styles.addSubsceneButton}
            onClick={addNewSubsceneToScene}
          >
            Add subscene
          </button>
        </div>

        { editingSubscene !== null &&
          <SubsceneEditor
            subscene={Object.assign({}, scene.subscenes[editingSubscene], {id: editingSubscene})}

            sceneSubsceneIDs={sceneSubsceneIDs}

            changeSceneSubsceneDialogType={(dialogType) => {
              changeSceneSubsceneDialogType(editingSubscene, dialogType);
            }}

            changeSceneSubsceneImage={(imageIndex) => {
              changeSceneSubsceneImage(editingSubscene, imageIndex);
            }}

            connectSceneSubsceneDialog={(subsceneIDorConstant) => {
              connectSceneSubsceneDialog(editingSubscene, subsceneIDorConstant);
            }}

            addLineToSceneSubsceneDialog={() => {
              addLineToSceneSubsceneDialog(editingSubscene);
            }}

            editLineForSceneSubsceneDialog={(lineIndex, lineString) => {
              editLineForSceneSubsceneDialog(editingSubscene, lineIndex, lineString);
            }}

            deleteLineForSceneSubsceneDialog={(lineIndex) => {
              deleteLineForSceneSubsceneDialog(editingSubscene, lineIndex);
            }}

            addSceneSubsceneDialogChoice={() => {
              addSceneSubsceneDialogChoice(editingSubscene);
            }}

            editSceneSubsceneDialogChoiceText={(choiceIndex, choiceString) => {
              editSceneSubsceneDialogChoiceText(editingSubscene, choiceIndex, choiceString);
            }}

            deleteSceneSubsceneDialogChoice={(choiceIndex) => {
              deleteSceneSubsceneDialogChoice(editingSubscene, choiceIndex);
            }}

            connectSceneSubsceneDialogChoice={(choiceIndex, subsceneIDorConstant) => {
              connectSceneSubsceneDialogChoice(editingSubscene, choiceIndex, subsceneIDorConstant);
            }}

            removeSelf={() => {
              this.setState({editingSubscene: null});
              removeSubscene(editingSubscene);
            }}
          />
        }
      </div>
    );
  }

}