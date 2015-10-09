import React, { Component } from 'react';
import { connect } from 'react-redux';

import { addRow, addColumn, changeCell, loadAppData, selectTile, changeTileSize, createViewpoint, openViewpointEditor, closeViewpointEditor, createSceneAndConnectToViewpoint, renameScene, deleteSceneAndDisconnectFromViewpoint, deleteViewpointAndCloseViewpointEditor, addNewSubsceneToScene, changeSceneSubsceneDialogType, changeSceneSubsceneImage, connectSceneSubsceneDialog, addLineToSceneSubsceneDialog, editLineForSceneSubsceneDialog, deleteLineForSceneSubsceneDialog, addSceneSubsceneDialogChoice, editSceneSubsceneDialogChoiceText, connectSceneSubsceneDialogChoice, deleteSceneSubsceneDialogChoice, removeSubsceneFromScene, changeSceneEntrySubscene, changeViewpointDisplaySettings, removeSceneToDisplayOnViewpoint } from './actions';
import { newID } from './Scenes';
import TilePalette from './TilePalette';
import MapViewer from './MapViewer';
import DataControl from './DataControl';
import ViewpointEditor from './ViewpointEditor';
import tiles from './Tiles.js';

import styles from './App.css';

class App extends Component {
  render() {
    const { dispatch, selectedTile, world, viewpoints, editingViewpoint, scenes } = this.props;

    return (
      <div className={styles.root}>

        { editingViewpoint ?
          <ViewpointEditor

            viewpoint={
              Object.assign({}, viewpoints[editingViewpoint], {id: editingViewpoint})
            }

            closeViewpointEditor={() => {
              dispatch(closeViewpointEditor());
            }}

            viewpointTile={tiles[world[viewpoints[editingViewpoint].location.y][viewpoints[editingViewpoint].location.x]]}

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

            changeViewpointDisplaySettings={(previousSeenSceneIDorConstant, seenSceneIDOrConstant, sceneToDisplayID) => {
              dispatch(changeViewpointDisplaySettings(editingViewpoint, previousSeenSceneIDorConstant, seenSceneIDOrConstant, sceneToDisplayID));
            }}

            removeSceneToDisplay={(seenSceneIDOrConstant) => {
              dispatch(removeSceneToDisplayOnViewpoint(editingViewpoint, seenSceneIDOrConstant));
            }}
          />

          :

          [<div className={styles.controls}>
            <DataControl
              world={world}
              scenes={scenes}
              viewpoints={viewpoints}
              loadAppData={(loadedScenes, loadedViewpoints, loadedWorld) => {
                dispatch(loadAppData(loadedScenes, loadedViewpoints, loadedWorld));
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
          <MapViewer
            changeTileSize={(tileSize) => {
              dispatch(changeTileSize(tileSize));
            }}
            changeCell={(twoDimensionalIndex, tileId) => {
              dispatch(changeCell(twoDimensionalIndex, tileId));
            }}
            addRow={(append) => {
              dispatch(addRow(append));
            }}
            addColumn={(append) => {
              dispatch(addColumn(append));
            }}
            createViewpoint={(location) => {
              dispatch(createViewpoint(location));
            }}
            editViewpoint={(viewpointID) => {
              dispatch(openViewpointEditor(viewpointID));
            }}
            tiles={tiles}
            {...this.props}
          />]
        }
      </div>
    );
  }
}

function select(state) {
  return state;
}

export default connect(select)(App);
