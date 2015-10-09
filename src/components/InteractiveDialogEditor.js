import React, { Component } from 'react';

import { CONNECT_END } from '../SceneState';

import styles from './DialogEditor.css';

export default class InteractiveDialogEditor extends Component {

  render() {

    const { choices, addChoice, editChoiceText, connectChoice, deleteChoice, subsceneID, sceneSubsceneIDs } = this.props;

    const makeSceneOption = (otherSubsceneID) => {
      if (otherSubsceneID !== subsceneID) {
        return (
          <option
            key={otherSubsceneID}
            value={otherSubsceneID}
          >
            Go to subscene {otherSubsceneID}
          </option>
        );
      }
    };

    var connectOptions = sceneSubsceneIDs.filter((sceneID) => {return sceneID !== subsceneID;}).map(makeSceneOption);
    connectOptions.push(
      <option
        key={CONNECT_END}
        value={CONNECT_END}
      >
        End Scene
      </option>
    );

    const makeChoiceEditor = (choice, i) => {
      return (
        <div className={styles.lineEditor}>
          <input
            onChange={(e) => {
              editChoiceText(i, e.target.value);
            }}
            value={choice.text}
          />
          <select
            value={choice.connectsTo}
            onChange={(e) => {
              connectChoice(i, e.target.value);
            }}
          >
            { connectOptions }
          </select>
          <button
            onClick={deleteChoice.bind(this, i)}
          >
            Delete
          </button>
        </div>
      );
    };

    return (
      <div className={styles.dialogEditor}>
        { choices.map(makeChoiceEditor) }
        <button
          className={styles.addlineButton}
          onClick={addChoice}
        >
          Add new choice
        </button>
      </div>
    );
  }

}
