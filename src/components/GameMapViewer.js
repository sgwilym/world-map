import React, { Component } from 'react';

import GameTileMap from './GameTileMap';
import ZoomControl from './ZoomControl';

import styles from './GameMapViewer.css';

export default class GameMapViewer extends Component {

  constructor(props) {
    super(props);

    this.state = {
      momentum: {
        x: 0,
        y: 0
      }
    };

    this.draggingStarted = this.draggingStarted.bind(this);
    this.draggingStopped = this.draggingStopped.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.handleMomentum = this.handleMomentum.bind(this);
    this.onWheel = this.onWheel.bind(this);
  }

  draggingStarted(e) {
    const node = this.refs.root;

    this.setState({
      dragging: true,
      draggedFrom: {
        x: e.screenX,
        y: e.screenY
      },
      scrollPosition: {
        x: node.scrollLeft,
        y: node.scrollTop
      }
    });
  }

  draggingStopped(e) {
    const { dragging, momentum} = this.state;
    if (dragging) {
      this.handleMomentum(momentum);
      this.setState({dragging: false});
    }
    e.stopPropagation();
  }

  handleMomentum(momentum) {
    const node = this.refs.root;

    node.scrollLeft -= Math.round(momentum.x);
    node.scrollTop -= Math.round(momentum.y);

    const reducedMomentum = {
      x: momentum.x / 1.1,
      y: momentum.y / 1.1,
    };

    const stillHasMomentum = (Math.abs(reducedMomentum.x) >= 1 || Math.abs(reducedMomentum.y) >= 1);

    if (stillHasMomentum) {
      requestAnimationFrame(this.handleMomentum.bind(this, reducedMomentum));
    } else {
      this.setState({
        momentum: {
          x: 0,
          y: 0
        }
      });
    }
  }

  onMouseMove(e) {
    const { dragging, draggedFrom, scrollPosition } = this.state;

    if (dragging) {
      const node = this.refs.root;
      const xDifference = draggedFrom.x - e.screenX;
      const yDifference = draggedFrom.y - e.screenY;
      const newScrollLeft = scrollPosition.x + xDifference;
      const newScrollTop = scrollPosition.y + yDifference;

      this.setState({
        momentum: {
          x: node.scrollLeft - newScrollLeft,
          y: node.scrollTop - newScrollTop
        }
      });

      node.scrollLeft = newScrollLeft;
      node.scrollTop = newScrollTop;
    }
  }

  onWheel(e) {

    const { tileSize, changeTileSize } = this.props;
    e.preventDefault();
    const { deltaY, clientX, clientY } = e;
    const delta = deltaY / 3;
    const nextSize = Math.round(tileSize + delta);
    const nextScale = nextSize / tileSize;

    if (nextSize >= 50 && nextSize <= 350 && nextScale !== 1) {
      const node = this.refs.root;
      const cursorPosition = {
        x: node.scrollLeft + clientX,
        y: node.scrollTop + clientY
      };

      const nextCursorPosition = {
        x: cursorPosition.x * nextScale,
        y: cursorPosition.y * nextScale
      };

      const nextScrollPosition = {
        x: nextCursorPosition.x - clientX,
        y: nextCursorPosition.y - clientY
      };
      node.scrollLeft = nextScrollPosition.x;
      node.scrollTop = nextScrollPosition.y;
      changeTileSize(nextSize);
    }
  }

  render() {

    const { world, tiles, changeTileSize, tileSize, beginScene } = this.props;
    const { dragging } = this.state;

    return (
      <div
        ref="root"
        className={dragging ? styles.rootGrabbing : styles.root}
        onMouseDown={this.draggingStarted}
        onMouseMove={this.onMouseMove}
        onMouseUp={this.draggingStopped}
        onWheel={this.onWheel}
      >
        <GameTileMap
          tiles={tiles}
          world={world}
          tileSize={tileSize}
          beginScene={beginScene}
        />
      </div>
    );
  }
}
