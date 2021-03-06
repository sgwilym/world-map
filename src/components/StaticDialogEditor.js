import React, { Component } from 'react';

import { CONNECT_END } from '../SceneState';

import styles from './DialogEditor.css';

export default class StaticDialogEditor extends Component {

  constructor(props) {
    super(props);

    this.handleConnectionSelection = this.handleConnectionSelection.bind(this);
  }

  handleConnectionSelection(e) {
    const { connectScene } = this.props;
    connectScene(e.target.value);
  }

  render() {

    const { dialogLines, subsceneID, sceneSubsceneIDs, connectsTo, addLine, editLine, deleteLine } = this.props;

    const makeLineEditors = (line, i) => {
      return (
        <div
          className={styles.lineEditor}
        >
          <input
            className={styles.lineInput}
            key={i}
            onChange={(e) => {
              editLine(i, e.target.value);
            }}
            value={line}
          />
          <button
            className={styles.deleteButton}
            onClick={deleteLine.bind(this, i)}
          >
           Delete
          </button>
        </div>
      );
    };

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

    return (
      <div>
        <div className={styles.dialogEditor}>
          { dialogLines.map(makeLineEditors) }
          <button
            className={styles.addlineButton}
            onClick={addLine}
          >Add new line</button>
        </div>

        <div>
          <p>When this scene finishes,&nbsp;
            <select
              className={styles.connectSelect}
              value={connectsTo}
              onChange={this.handleConnectionSelection}
            >
              { connectOptions }
            </select>
          </p>
        </div>

      </div>
    );
  }

}
