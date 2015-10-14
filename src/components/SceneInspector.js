import React, { Component } from 'react';

import StaticDialogViewer from './StaticDialogViewer';

import styles from './SceneInspector.css';
import SceneImages from '../scene-images';

import { STATIC_DIALOG, INTERACTIVE_DIALOG, CONNECT_END } from '../SceneState';

export default class SceneInspector extends Component {

  constructor(props) {
    super(props);

    this.state = {
      displayingSubsceneID: props.scene.entrySubscene
    };

    this.advance = this.advance.bind(this);
  }

  advance(connectsTo) {
    const { endScene } = this.props;

    if (connectsTo == CONNECT_END) {
      endScene();
    } else {
      this.setState({displayingSubsceneID: connectsTo});
    }
  }

  render() {

    const { scene } = this.props;
    const { displayingSubsceneID } = this.state;
    const displayingSubscene = scene.subscenes[displayingSubsceneID];

    return (
      <div
        className={styles.root}
      >
        <div>
          <img
            src={SceneImages[displayingSubscene.image]}
          />
          {
            displayingSubscene.dialog.type == STATIC_DIALOG ?
            <StaticDialogViewer
              lines={displayingSubscene.dialog.elements.lines}
              endDialog={this.advance.bind(this, displayingSubscene.dialog.elements.connectsTo)}
            />
            :
            <p>InteractiveDialog</p>
          }
        </div>

      </div>
    );
  }

}
