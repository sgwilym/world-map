import React, { Component } from 'react';

import SubsceneImagePicker from './SubsceneImagePicker';
import StaticDialogEditor from './StaticDialogEditor';
import InteractiveDialogEditor from './InteractiveDialogEditor';

import { STATIC_DIALOG, INTERACTIVE_DIALOG } from '../SceneState';
import styles from './SubsceneEditor.css';

export default class SubsceneEditor extends Component {

  constructor(props) {
    super(props);

    this.handleDialogTypeChoice = this.handleDialogTypeChoice.bind(this);
  }

  handleDialogTypeChoice(e) {
    const { changeDialogType } = this.props;
    changeDialogType(e.target.value);
  }

  render() {

    const { subscene, sceneSubsceneIDs, changeImage, connectDialog, addLineToDialog, editLineForDialog, deleteLineForDialog, addDialogChoice, editDialogChoiceText, connectDialogChoice, deleteDialogChoice, removeSelf } = this.props;

    var dialogEditor;
    switch (subscene.dialog.type) {
      case STATIC_DIALOG:
        dialogEditor = <StaticDialogEditor
          subsceneID={subscene.id}
          connectsTo={subscene.dialog.elements.connectsTo}
          addLine={addLineToDialog}
          editLine={editLineForDialog}
          deleteLine={deleteLineForDialog}
          sceneSubsceneIDs={sceneSubsceneIDs}
          dialogLines={subscene.dialog.elements.lines}
          connectScene={connectDialog}
        />;
        break;
      case INTERACTIVE_DIALOG:
        dialogEditor = <InteractiveDialogEditor
          subsceneID={subscene.id}
          sceneSubsceneIDs={sceneSubsceneIDs}
          addChoice={addDialogChoice}
          editChoiceText={editDialogChoiceText}
          connectChoice={connectDialogChoice}
          deleteChoice={deleteDialogChoice}
          choices={subscene.dialog.elements.choices}
        />;
        break;
      default:
        dialogEditor = <p>Uh oh… Sam made a mistake.</p>;
    }

    return (
      <div className={styles.root}>
        <SubsceneImagePicker
          subsceneImage={subscene.image}
          changeImage={changeImage}
        />
        <div className={styles.dialogChoice}>
          <input
            className={styles.radioInput}
            id="staticDialog"
            name="dialogType"
            type="radio"
            checked={subscene.dialog.type == STATIC_DIALOG}
            value={STATIC_DIALOG}
            onChange={this.handleDialogTypeChoice}
          />
          <label
            className={styles.dialogChoiceLabel}
            htmlFor="staticDialog"
          >Static Dialog</label>
          <input
            className={styles.radioInput}
            id="interactiveDialog"
            name="dialogType"
            type="radio"
            checked={subscene.dialog.type == INTERACTIVE_DIALOG}
            value={INTERACTIVE_DIALOG}
            onChange={this.handleDialogTypeChoice}
          />
          <label
            className={styles.dialogChoiceLabel}
            htmlFor="interactiveDialog"
          >Interactive Dialog</label>
        </div>

        {dialogEditor}

        <button
          onClick={() => {
            const canDelete = confirm('Are you sure you want to delete this subscene?');
            if (canDelete) {
              removeSelf();
            }
          }}
        >
          Delete this subscene
        </button>
      </div>
    );
  }

}
