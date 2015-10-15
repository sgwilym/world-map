import React, { Component } from 'react';

import styles from './InteractiveDialogViewer.css';

export default class InteractiveDialogViewer extends Component {

  render() {

    const { choices, advance } = this.props;

    const makeChoiceButton = (choice) => {
      console.log(choice);
      return <button
        className={styles.choice}
        onClick={() => {
          advance(choice.connectsTo);
        }}
      >
       { choice.text}
      </button>;
    };

    return (
      <div
        className={styles.root}
      >
        { choices.map(makeChoiceButton) }
      </div>
    );
  }
}
