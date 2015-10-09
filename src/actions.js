// World constants
export const ADD_COLUMN = 'ADD_COLUMN';
export const ADD_ROW = 'ADD_ROW';
export const CHANGE_CELL = 'CHANGE_CELL';
export const LOAD_WORLD = 'LOAD_WORLD';

// Tile control constants
export const SELECT_TILE = 'SELECT_TILE';
export const CHANGE_TILE_SIZE = 'CHANGE_TILE_SIZE';

// Viewpoint constants
export const CREATE_VIEWPOINT = 'CREATE_VIEWPOINT';
export const CONNECT_SCENE_TO_VIEWPOINT = 'CONNECT_SCENE_TO_VIEWPOINT';
export const DISCONNECT_SCENE_FROM_VIEWPOINT = 'DISCONNECT_SCENE_FROM_VIEWPOINT';
export const SET_VIEWPOINT_SCENE_TO_DISPLAY = 'SET_VIEWPOINT_SCENE_TO_DISPLAY';
export const REMOVE_VIEWPOINT_SCENE_TO_DISPLAY = 'REMOVE_VIEWPOINT_SCENE_TO_DISPLAY';
export const DELETE_VIEWPOINT = 'DELETE_VIEWPOINT';
export const LOAD_VIEWPOINTS = 'LOAD_VIEWPOINTS';

// Scene constants;
export const CREATE_SCENE = 'CREATE_SCENE';
export const RENAME_SCENE = 'RENAME_SCENE';
export const DELETE_SCENE = 'DELETE SCENE';
export const CHANGE_SCENE_ENTRY_SUBSCENE = 'CHANGE_SCENE_ENTRY_SUBSCENE';
export const CREATE_SUBSCENE = 'CREATE_SUBSCENE';
export const CHANGE_SUBSCENE_IMAGE = 'CHANGE_SUBSCENE_IMAGE';
export const DELETE_SUBSCENE = 'DELETE_SUBSCENE';
export const CHANGE_SUBSCENE_DIALOG_TYPE = 'CHANGE_SUBSCENE_DIALOG_TYPE';
export const ADD_DIALOG_LINE = 'ADD_DIALOG_LINE';
export const EDIT_DIALOG_LINE = 'EDIT_DIALOG_LINE';
export const DELETE_DIALOG_LINE = 'DELETE_DIALOG_LINE';
export const CONNECT_DIALOG = 'CONNECT_DIALOG';
export const ADD_DIALOG_CHOICE= 'ADD_DIALOG_CHOICE';
export const EDIT_DIALOG_CHOICE = 'EDIT_DIALOG_CHOICE';
export const CONNECT_DIALOG_CHOICE = 'CONNECT_DIALOG_CHOICE';
export const DELETE_DIALOG_CHOICE = 'DELETE_DIALOG_CHOICE';
export const LOAD_SCENES = 'LOAD_SCENES';

// UI Constants
export const OPEN_VIEWPOINT_EDITOR = 'OPEN_VIEWPOINT_EDITOR';
export const CLOSE_VIEWPOINT_EDITOR = 'CLOSE_VIEWPOINT_EDITOR';

// World actions
export function addColumn(append) {
  return { type: ADD_COLUMN, append };
}

export function addRow(append) {
  return { type: ADD_ROW, append };
}

export function changeCell(twoDimensionalIndex, tileId) {
  return { type: CHANGE_CELL, twoDimensionalIndex, tileId };
}

export function loadWorld(loadedWorld) {
  return { type: LOAD_WORLD, loadedWorld };
}

// Tile control actions
export function selectTile(tileId) {
  return { type: SELECT_TILE, tileId };
}

export function changeTileSize(tileSize) {
  return { type: CHANGE_TILE_SIZE, tileSize };
}

// Viewpoint actions
export function createViewpoint(location) {
  return { type: CREATE_VIEWPOINT, location };
}

export function connectSceneToViewpoint(viewpointID, sceneID) {
  return { type: CONNECT_SCENE_TO_VIEWPOINT, viewpointID, sceneID };
}

export function disconnectSceneFromViewpoint(viewpointID, sceneID) {
  return { type: DISCONNECT_SCENE_FROM_VIEWPOINT, viewpointID, sceneID };
}

export function setSceneToDisplayOnViewpoint(viewpointID, seenSceneIDOrConstant, sceneToDisplayID) {
  return { type: SET_VIEWPOINT_SCENE_TO_DISPLAY, viewpointID, seenSceneIDOrConstant, sceneToDisplayID };
}

export function removeSceneToDisplayOnViewpoint(viewpointID, seenSceneIDOrConstant) {
  return { type: REMOVE_VIEWPOINT_SCENE_TO_DISPLAY, viewpointID, seenSceneIDOrConstant };
}

export function deleteViewpoint(viewpointID) {
  return { type: DELETE_VIEWPOINT, viewpointID };
}

export function loadViewpoints(loadedViewpoints) {
  return { type: LOAD_VIEWPOINTS, loadedViewpoints };
}

// Scene actions
export function createScene() {
  return { type: CREATE_SCENE };
}

export function renameScene(sceneID, newName) {
  return { type: RENAME_SCENE, sceneID, newName };
}

export function deleteScene(sceneID) {
  return { type: DELETE_SCENE, sceneID };
}

export function addNewSubsceneToScene(sceneID) {
  return { type: CREATE_SUBSCENE, sceneID };
}

export function changeSceneEntrySubscene(sceneID, subsceneID) {
  return { type: CHANGE_SCENE_ENTRY_SUBSCENE, sceneID, subsceneID };
}

export function removeSubsceneFromScene(subsceneID, sceneID) {
  return { type: DELETE_SUBSCENE, subsceneID, sceneID };
}

export function changeSceneSubsceneImage(sceneID, subsceneID, imageIndex) {
  return { type: CHANGE_SUBSCENE_IMAGE, sceneID, subsceneID, imageIndex };
}

export function changeSceneSubsceneDialogType(sceneID, subsceneID, dialogType) {
  return { type: CHANGE_SUBSCENE_DIALOG_TYPE, sceneID, subsceneID, dialogType };
}

export function connectSceneSubsceneDialog(sceneID, subsceneID, subsceneIDorConstant) {
  return { type: CONNECT_DIALOG, sceneID, subsceneID, subsceneIDorConstant };
}

export function addLineToSceneSubsceneDialog(sceneID, subsceneID) {
  return { type: ADD_DIALOG_LINE, sceneID, subsceneID };
}

export function editLineForSceneSubsceneDialog(sceneID, subsceneID, lineIndex, lineString) {
  return { type: EDIT_DIALOG_LINE, sceneID, subsceneID, lineIndex, lineString };
}

export function deleteLineForSceneSubsceneDialog(sceneID, subsceneID, lineIndex) {
  return { type: DELETE_DIALOG_LINE, sceneID, subsceneID, lineIndex };
}

export function addSceneSubsceneDialogChoice(sceneID, subsceneID) {
  return { type: ADD_DIALOG_CHOICE, sceneID, subsceneID };
}

export function editSceneSubsceneDialogChoiceText(sceneID, subsceneID, choiceIndex, choiceString ) {
  return { type: EDIT_DIALOG_CHOICE, sceneID, subsceneID, choiceIndex, choiceString };
}

export function connectSceneSubsceneDialogChoice(sceneID, subsceneID, choiceIndex, subsceneIDorConstant ) {
  return { type: CONNECT_DIALOG_CHOICE, sceneID, subsceneID, choiceIndex, subsceneIDorConstant };
}

export function deleteSceneSubsceneDialogChoice(sceneID, subsceneID, choiceIndex) {
  return { type: DELETE_DIALOG_CHOICE, sceneID, subsceneID, choiceIndex };
}

// UI actions
export function openViewpointEditor(viewpointID) {
  return { type: OPEN_VIEWPOINT_EDITOR, viewpointID };
}

export function closeViewpointEditor() {
  return { type: CLOSE_VIEWPOINT_EDITOR };
}

export function loadScenes(loadedScenes) {
  return { type: LOAD_SCENES, loadedScenes };
}

// Multi actions!!!

export function createSceneAndConnectToViewpoint(viewpointID, sceneID) {
  return [
    createScene(),
    connectSceneToViewpoint(viewpointID, sceneID)
  ];
}

export function deleteSceneAndDisconnectFromViewpoint(viewpointID, sceneID) {
  return [
    disconnectSceneFromViewpoint(viewpointID, sceneID),
    deleteScene(sceneID)
  ];
}

export function deleteViewpointAndCloseViewpointEditor(viewpointID) {
  return [
    closeViewpointEditor(),
    deleteViewpoint(viewpointID)
  ];
}

export function changeViewpointDisplaySettings(viewpointID, previousSeenSceneIDorConstant, seenSceneIDOrConstant, sceneID) {
  return [
    removeSceneToDisplayOnViewpoint(viewpointID, previousSeenSceneIDorConstant),
    setSceneToDisplayOnViewpoint(viewpointID, seenSceneIDOrConstant, sceneID)
  ];
}

export function loadAppData(loadedScenes, loadedViewpoints, loadedWorld) {
  return [
    loadScenes(loadedScenes),
    loadViewpoints(loadedViewpoints),
    loadWorld(loadedWorld)
  ]
}
