import React, { Component } from 'react';
import createFragment from 'react-addons-create-fragment';
import { connect } from 'react-redux';

import { ActionCreators } from 'redux-undo';
import { selectTile, changeTileSize, openViewpointEditor, closeViewpointEditor} from '../actions/interface';
import { addColumn, addRow, deleteColumn, deleteRow, changeCell, loadWorld, fillWorld } from '../actions/world';
import { createViewpoint, connectSceneToViewpoint, editDisplaySetting, reorderViewpointScenes, deleteViewpoint, loadViewpoints } from '../actions/viewpoints';
import { createScene, renameScene, deleteScene, addNewSubsceneToScene, changeSceneEntrySubscene, removeSubsceneFromScene, changeSceneSubsceneImage, changeSceneSubsceneDialogType, connectSceneSubsceneDialog, addLineToSceneSubsceneDialog, editLineForSceneSubsceneDialog, deleteLineForSceneSubsceneDialog, addSceneSubsceneDialogChoice, editSceneSubsceneDialogChoiceText, connectSceneSubsceneDialogChoice, deleteSceneSubsceneDialogChoice } from '../actions/scenes';
import { createSceneAndConnectToViewpoint, deleteSceneAndDisconnectFromViewpoint, deleteViewpointAndCloseViewpointEditor, changeViewpointDisplaySettings, loadAppData, expandMap, shrinkMap } from '../actions/multiple';
import { seenSubscene, resetSeenSubscenes } from '../actions/game';

import { newID } from '../SceneState';
import tiles from '../tiles';
import TilePalette from './TilePalette';
import MapViewer from './MapViewer';
import DataControl from './DataControl';
import AppControls from './AppControls';
import ViewpointEditor from './ViewpointEditor';
import MapGame from './MapGame';

import styles from './App.css';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      playing: false
    };
  }

  render() {
    const { dispatch, selectedTile, world, viewpoints, editingViewpoint, scenes, tileSize, game } = this.props;
    const { playing } = this.state;

    const mapEditor = createFragment(
      {controls:<div className={styles.controls}>
        <button
          className={styles.playButton}
          onClick={() => {
            this.setState({playing: true});
          }}
        >Play</button>
        <DataControl
          world={world.present}
          scenes={scenes}
          viewpoints={viewpoints.present}
          loadAppData={(loadedScenes, loadedViewpoints, loadedWorld) => {
            dispatch(loadAppData(loadedScenes, loadedViewpoints, loadedWorld));
          }}
        />
        <AppControls
          undo={() => {
            dispatch(ActionCreators.undo());
          }}
          redo={() => {
            dispatch(ActionCreators.redo());
          }}
          clearWorld={() => {
            dispatch(fillWorld(Object.keys(tiles)[0]));
          }}
        />
        <TilePalette
          tiles={tiles}
          selectedTile={selectedTile}
          selectTile={(tile) => {
            dispatch(selectTile(tile));
          }}
        />
      </div>,
      map: <MapViewer
        {...this.props}
        changeTileSize={(tileSize) => {
          dispatch(changeTileSize(tileSize));
        }}
        changeCell={(twoDimensionalIndex, tileId) => {
          dispatch(changeCell(twoDimensionalIndex, tileId));
        }}
        expandMap={(direction) => {
          dispatch(expandMap(direction));
        }}
        shrinkMap={(direction) => {
          dispatch(shrinkMap(direction));
        }}
        createViewpoint={(location) => {
          dispatch(createViewpoint(location));
        }}
        editViewpoint={(viewpointID) => {
          dispatch(openViewpointEditor(viewpointID));
        }}
        viewpoints={viewpoints.present}
        tiles={tiles}
        world={world.present}
      />}
    );

    var viewpointEditor;
    if (editingViewpoint) {
      viewpointEditor = <ViewpointEditor

        viewpoint={
          Object.assign({}, viewpoints.present[editingViewpoint], {id: editingViewpoint})
        }

        closeViewpointEditor={() => {
          dispatch(closeViewpointEditor());
        }}

        viewpointTile={tiles[world.present[viewpoints.present[editingViewpoint].location.y][viewpoints.present[editingViewpoint].location.x]]}

        scenes={scenes}

        createScene={() => {
          dispatch(createSceneAndConnectToViewpoint(editingViewpoint, newID(scenes)));
        }}

        renameScene={(sceneID, newName) => {
          dispatch(renameScene(sceneID, newName));
        }}

        deleteScene={(sceneID) => {
          dispatch(deleteSceneAndDisconnectFromViewpoint(editingViewpoint, sceneID));
        }}

        deleteViewpoint={() => {
          dispatch(deleteViewpointAndCloseViewpointEditor(editingViewpoint));
        }}

        addNewSubsceneToScene={(sceneID) => {
          dispatch(addNewSubsceneToScene(sceneID));
        }}

        changeSceneSubsceneDialogType={(sceneID, subsceneID, dialogType) => {
          dispatch(changeSceneSubsceneDialogType(sceneID, subsceneID, dialogType));
        }}

        changeSceneSubsceneImage={(sceneID, subsceneID, imageIndex) => {
          dispatch(changeSceneSubsceneImage(sceneID, subsceneID, imageIndex));
        }}

        connectSceneSubsceneDialog={(sceneID, subsceneID, subsceneIDorConstant) => {
          dispatch(connectSceneSubsceneDialog(sceneID, subsceneID, subsceneIDorConstant));
        }}

        addLineToSceneSubsceneDialog={(sceneID, subsceneID) => {
          dispatch(addLineToSceneSubsceneDialog(sceneID, subsceneID));
        }}

        editLineForSceneSubsceneDialog={(sceneID, subsceneID, lineIndex, lineString) => {
          dispatch(editLineForSceneSubsceneDialog(sceneID, subsceneID, lineIndex, lineString));
        }}

        deleteLineForSceneSubsceneDialog={(sceneID, subsceneID, lineIndex) => {
          dispatch(deleteLineForSceneSubsceneDialog(sceneID, subsceneID, lineIndex));
        }}

        addSceneSubsceneDialogChoice={(sceneID, subsceneID) => {
          dispatch(addSceneSubsceneDialogChoice(sceneID, subsceneID));
        }}

        editSceneSubsceneDialogChoiceText={(sceneID, subsceneID, choiceIndex, choiceString) => {
          dispatch(editSceneSubsceneDialogChoiceText(sceneID, subsceneID, choiceIndex, choiceString));
        }}

        deleteSceneSubsceneDialogChoice={(sceneID, subsceneID, choiceIndex) => {
          dispatch(deleteSceneSubsceneDialogChoice(sceneID, subsceneID, choiceIndex));
        }}

        connectSceneSubsceneDialogChoice={(sceneID, subsceneID, choiceIndex, subsceneIDorConstant) => {
          dispatch(connectSceneSubsceneDialogChoice(sceneID, subsceneID, choiceIndex, subsceneIDorConstant));
        }}

        removeSubsceneFromScene={(sceneID, subsceneID) => {
          dispatch(removeSubsceneFromScene(sceneID, subsceneID));
        }}

        changeSceneEntrySubscene={(sceneID, subsceneID) => {
          dispatch(changeSceneEntrySubscene(sceneID, subsceneID));
        }}

        editDisplaySetting={(sceneIndex, seenSubsceneIndexOrConstant) => {
          dispatch(editDisplaySetting(editingViewpoint, sceneIndex, seenSubsceneIndexOrConstant));
        }}

        reorderScenes={(sceneIndex, newSceneIndex) => {
          dispatch(reorderViewpointScenes(editingViewpoint, sceneIndex, newSceneIndex));
        }}
      />;
    }

    const editor = editingViewpoint ? viewpointEditor : mapEditor;
    const gamePlayer = createFragment({
      resumeEdit: <button
        className={styles.editButton}
        onClick={() => {
          this.setState({playing: false});
          dispatch(resetSeenSubscenes());
        }}
      >Edit</button>,
      game: <MapGame
        tiles={tiles}
        tileSize={tileSize}
        world={world.present}
        viewpoints={viewpoints.present}
        scenes={scenes}
        changeTileSize={(tileSize) => {
          dispatch(changeTileSize(tileSize));
        }}
        seenSubscene={(sceneSubsceneIndex) => {
          dispatch(seenSubscene(sceneSubsceneIndex));
        }}
        seenSubscenes={game.seenSubscenes}
      />
    });

    return (
      <div className={styles.root}>
        { playing ? gamePlayer : editor }
      </div>
    );
  }
}

function select(state) {
  return state;
}

export default connect(select)(App);
