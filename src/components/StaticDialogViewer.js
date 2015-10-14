import React, { Component } from 'react';

export default class StaticDialogViewer extends Component {

  constructor(props) {
    super(props);

    this.state = {
      displayingLine: 0
    };

    this.advance = this.advance.bind(this);
  }

  advance() {
    const { endDialog, lines } = this.props;
    const { displayingLine } = this.state;

    if (displayingLine < lines.length - 1) {
      this.setState({displayingLine: displayingLine + 1});
    } else {
      this.setState({displayingLine: 0});
      endDialog();
    }
  }

  render() {
    const { lines } = this.props;
    const { displayingLine } = this.state;

    return (
      <div>
        <div>{lines[displayingLine]}</div>
        <button onClick={this.advance}>Advance</button>
      </div>
    );
  }

}
