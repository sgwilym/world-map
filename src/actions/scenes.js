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

export function loadScenes(loadedScenes) {
  return { type: LOAD_SCENES, loadedScenes };
}
