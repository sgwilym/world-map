import { combineReducers } from 'redux';
import update from 'react-addons-update';
import makeViewpointUpdate from './Viewpoints';
import makeSceneUpdate from './Scenes';
import { ADD_ROW, ADD_COLUMN, CHANGE_CELL, LOAD_WORLD, SELECT_TILE, CHANGE_TILE_SIZE, CREATE_VIEWPOINT, CONNECT_SCENE_TO_VIEWPOINT, DISCONNECT_SCENE_FROM_VIEWPOINT, SET_VIEWPOINT_SCENE_TO_DISPLAY, REMOVE_VIEWPOINT_SCENE_TO_DISPLAY, DELETE_VIEWPOINT, OPEN_VIEWPOINT_EDITOR, CLOSE_VIEWPOINT_EDITOR, CREATE_SCENE, RENAME_SCENE, DELETE_SCENE, CREATE_SUBSCENE, CHANGE_SUBSCENE_DIALOG_TYPE, CHANGE_SUBSCENE_IMAGE, CONNECT_DIALOG, ADD_DIALOG_LINE, EDIT_DIALOG_LINE, DELETE_DIALOG_LINE, ADD_DIALOG_CHOICE, EDIT_DIALOG_CHOICE, CONNECT_DIALOG_CHOICE, DELETE_DIALOG_CHOICE, DELETE_SUBSCENE, CHANGE_SCENE_ENTRY_SUBSCENE, LOAD_SCENES, LOAD_VIEWPOINTS } from './actions';

function world(state = [], action) {
  switch (action.type) {
  case ADD_ROW:
    var maxXValue = Math.max.apply(null, (state.map(row => {
      return row.length;
    })));
    var arrayToAdd = [Array.from(new Array(maxXValue), () => 0)];

    if (action.append) {
      return update(state, {
        $push: arrayToAdd
      });
    } else {
      return update(state, {
        $unshift: arrayToAdd
      });
    }
  case ADD_COLUMN:
    if (action.append) {
      return state.map((row) => {
        let newRow = row.slice();
        newRow.push(0);
        return newRow;
      });
    } else {
      return state.map((row) => {
        let newRow = row.slice();
        newRow.unshift(0);
        return newRow;
      });
    }
  case LOAD_WORLD:
    return action.loadedWorld;
  case CHANGE_CELL:
    let newState = state.map((row) => {
      return row.slice();
    });
    let { twoDimensionalIndex, tileId } = action;
    newState[twoDimensionalIndex[0]][twoDimensionalIndex[1]] = tileId;
    return newState;
  default:
    return state;
  }
}

function selectedTile(state = 0, action) {
  switch(action.type) {
  case SELECT_TILE:
    return action.tileId;
  default:
    return state;
  }
}

function tileSize(state = 50, action) {
  switch(action.type) {
  case CHANGE_TILE_SIZE:
    return action.tileSize;
  default:
    return state;
  }
}

function viewpoints(state = {}, action) {
  const update = makeViewpointUpdate(state);
  switch(action.type) {
  case CREATE_VIEWPOINT:
    return update.addNewViewpoint(action.location);
  case CONNECT_SCENE_TO_VIEWPOINT:
    return update.connectSceneToViewpoint(action.viewpointID, action.sceneID);
  case DISCONNECT_SCENE_FROM_VIEWPOINT:
    return update.disconnectSceneFromViewpoint(action.viewpointID, action.sceneID);
  case SET_VIEWPOINT_SCENE_TO_DISPLAY:
    return update.setSceneToDisplay(action.viewpointID, action.seenSceneIDOrConstant, action.sceneToDisplayID);
  case REMOVE_VIEWPOINT_SCENE_TO_DISPLAY:
    return update.removeSceneToDisplay(action.viewpointID, action.seenSceneIDOrConstant);
  case DELETE_VIEWPOINT:
    return update.deleteViewpoint(action.viewpointID);
  case LOAD_VIEWPOINTS:
    return action.loadedViewpoints;
  default:
    return state;
  }
}

function editingViewpoint(state = null, action) {
  switch (action.type) {
  case OPEN_VIEWPOINT_EDITOR:
    return action.viewpointID;
  case CLOSE_VIEWPOINT_EDITOR:
    return null;
  default:
    return state;
  }
}

function scenes(state = {}, action) {
  const update = makeSceneUpdate(state);
  switch (action.type) {
  case CREATE_SCENE:
    return update.addNewScene();
  case RENAME_SCENE:
    return update.renameScene(action.sceneID, action.newName);
  case DELETE_SCENE:
    return update.removeScene(action.sceneID);
  case CREATE_SUBSCENE:
    return update.addNewSubsceneToScene(action.sceneID);
  case CHANGE_SUBSCENE_DIALOG_TYPE:
    return update.changeSceneSubsceneDialogType(action.sceneID, action.subsceneID, action.dialogType);
  case CHANGE_SUBSCENE_IMAGE:
    return update.changeSceneSubsceneImage(action.sceneID, action.subsceneID, action.imageIndex);
  case CONNECT_DIALOG:
    return update.connectSceneSubsceneDialog(action.sceneID, action.subsceneID, action.subsceneIDorConstant);
  case ADD_DIALOG_LINE:
    return update.addLineToSceneSubsceneDialog(action.sceneID, action.subsceneID);
  case EDIT_DIALOG_LINE:
    return update.editLineForSceneSubsceneDialog(action.sceneID, action.subsceneID, action.lineIndex, action.lineString);
  case DELETE_DIALOG_LINE:
    return update.deleteLineForSceneSubsceneDialog(action.sceneID, action.subsceneID, action.lineIndex);
  case ADD_DIALOG_CHOICE:
    return update.addSceneSubsceneDialogChoice(action.sceneID, action.subsceneID);
  case EDIT_DIALOG_CHOICE:
    return update.editSceneSubsceneDialogChoiceText(action.sceneID, action.subsceneID, action.choiceIndex, action.choiceString);
  case CONNECT_DIALOG_CHOICE:
    return update.connectSceneSubsceneDialogChoice(action.sceneID, action.subsceneID, action.choiceIndex, action.subsceneIDorConstant);
  case DELETE_DIALOG_CHOICE:
    return update.deleteSceneSubsceneDialogChoice(action.sceneID, action.subsceneID, action.choiceIndex);
  case DELETE_SUBSCENE:
    return update.removeSubsceneFromScene(action.sceneID, action.subsceneID);
  case CHANGE_SCENE_ENTRY_SUBSCENE:
    return update.changeSceneSubsceneImage(action.sceneID, action.subsceneID);
  case LOAD_SCENES:
    return action.loadedScenes;
  default:
    return state;
  }
}

export default combineReducers({world, tileSize, selectedTile, viewpoints, editingViewpoint, scenes});
