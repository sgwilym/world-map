import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import TileMap from './TileMap';
import ZoomControl from './ZoomControl';

import styles from './MapViewer.css';

export default class MapViewer extends Component {

  constructor(props) {
    super(props);

    this.state = {
      canDrag: false,
      dragging: false,
      momentum: {
        x: 0,
        y: 0
      }
    }

    this.onKeyDown = this.onKeyDown.bind(this);
    this.onKeyUp = this.onKeyUp.bind(this);
    this.draggingStarted = this.draggingStarted.bind(this);
    this.draggingStopped = this.draggingStopped.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.handleMomentum = this.handleMomentum.bind(this);
  }

  componentWillMount() {
    document.addEventListener('keydown', this.onKeyDown, false);
    document.addEventListener('keyup', this.onKeyUp, false);
  }

  componentWillUnmount() {
    document.removeEventListen('keydown', this.onKeyDown, false);
    document.removeEventListen('keyup', this.onKeyUp, false);
  }

  onKeyDown(e) {
    if(e.keyCode == 32 && !this.state.canDrag) {
      this.setState({canDrag: true})
    }
  }

  onKeyUp(e) {
    if(e.keyCode == 32) {
      this.setState({canDrag: false})
    }
  }

  draggingStarted(e) {
    if (this.state.canDrag) {
      const node = ReactDOM.findDOMNode(this);

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
    const node = ReactDOM.findDOMNode(this);

    node.scrollLeft -= Math.round(momentum.x);
    node.scrollTop -= Math.round(momentum.y);

    const reducedMomentum = {
      x: momentum.x / 1.1,
      y: momentum.y / 1.1,
    }

    const stillHasMomentum = (Math.abs(reducedMomentum.x) >= 1 || Math.abs(reducedMomentum.y) >= 1);

    if (stillHasMomentum) {
      requestAnimationFrame(this.handleMomentum.bind(this, reducedMomentum));
    } else {
      this.setState({
        momentum: {
          x: 0,
          y: 0
        }
      })
    }
  }

  onMouseMove(e) {
    const { dragging, draggedFrom, scrollPosition } = this.state;

    if (dragging) {
      const node = ReactDOM.findDOMNode(this);
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

  render() {

    const { width, height, tiles, tileSize, world, changeCell, selectedTile, addColumn, addRow, changeTileSize } = this.props;
    const { canDrag, dragging } = this.state;

    var rootStyle = styles.root;
    if (canDrag && !dragging) {
      rootStyle = styles.canGrabRoot;
    } else if (canDrag && dragging) {
      rootStyle = styles.grabbingRoot;
    }

    return (
      <div
        className={styles.root}
        onMouseDown={this.draggingStarted}
        onMouseMove={this.onMouseMove}
        onMouseUp={this.draggingStopped}
      >
        <ZoomControl
          changeTileSize={changeTileSize}
          zoomLevel={tileSize}
        />
        <TileMap
          tiles={tiles}
          tileSize={tileSize}
          world={world}
          changeCell={changeCell}
          selectedTile={selectedTile}
          addColumn={addColumn}
          addRow={addRow}
          dragging={canDrag}
        />
      </div>
    )

  }

}
