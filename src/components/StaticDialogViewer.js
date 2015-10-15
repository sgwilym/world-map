import React, { Component } from 'react';

import styles from './StaticDialogViewer.css';

export default class StaticDialogViewer extends Component {

  constructor(props) {
    super(props);

    this.state = {
      displayingLine: 0,
      displayingCharactersUpTo: 0
    };

    this.startTyping = this.startTyping.bind(this);
    this.advance = this.advance.bind(this);
    this.typeNextLetter = this.typeNextLetter.bind(this);
  }

  componentDidMount() {
    this.startTyping();
  }

  componentWillReceiveProps(props) {
    this.startTyping();
  }

  startTyping() {
    this.setState({displayingCharactersUpTo: 0}, this.typeNextLetter);
  }

  typeNextLetter() {
    const { lines } = this.props;
    const { displayingLine, displayingCharactersUpTo } = this.state;
    const line = lines[displayingLine];
    const characters = line.split('');
    const character = line[displayingCharactersUpTo];

    const getDelay = (character) => {
      switch (character) {
      case '.':
      case ',':
      case ':':
      case '!':
      case '?':
        return 200;
      default:
        return 40;
      }
    };

    if (displayingCharactersUpTo < characters.length - 1) {
      this.nextTimeout = setTimeout(() => {
        this.setState({displayingCharactersUpTo: displayingCharactersUpTo + 1});
        this.typeNextLetter();
      }, getDelay(character));
    }
  }

  advance() {
    const { endDialog, lines } = this.props;
    const { displayingLine, displayingCharactersUpTo } = this.state;
    const line = lines[displayingLine];
    const characters = line.split('');

    clearTimeout(this.nextTimeout);

    if (displayingCharactersUpTo < characters.length - 1) {
      this.setState({displayingCharactersUpTo: characters.length - 1});
    } else if (displayingLine < lines.length - 1) {
      this.setState({displayingLine: displayingLine + 1});
      this.startTyping();
    } else {
      this.setState({displayingLine: 0});
      endDialog();
    }
  }

  render() {
    const { lines } = this.props;
    const { displayingLine, displayingCharactersUpTo } = this.state;

    const makeCharacterSpan = (character, i) => {
      let visible = i <= displayingCharactersUpTo;
      return <span
        className={visible ? styles.visibleCharacter : styles.hiddenCharacter }
      >
        {character}
      </span>;
    };

    const line = lines[displayingLine];
    const characters = line.split('');

    return (
      <div
        className={styles.root}
        onClick={this.advance}
      >
        <div className={styles.dialog}>
          {characters.map(makeCharacterSpan)}
        </div>
      </div>
    );
  }

}
