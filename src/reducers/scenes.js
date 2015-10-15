import makeUpdate from '../SceneState';
import * as ActionTypes from '../actions/scenes';

export default function scenes(state = {}, action) {
  const update = makeUpdate(state);
  switch (action.type) {
  case ActionTypes.CREATE_SCENE:
    return update.addNewScene();
  case ActionTypes.RENAME_SCENE:
    return update.renameScene(action.sceneID, action.newName);
  case ActionTypes.DELETE_SCENE:
    return update.removeScene(action.sceneID);
  case ActionTypes.CREATE_SUBSCENE:
    return update.addNewSubsceneToScene(action.sceneID);
  case ActionTypes.CHANGE_SUBSCENE_DIALOG_TYPE:
    return update.changeSceneSubsceneDialogType(action.sceneID, action.subsceneID, action.dialogType);
  case ActionTypes.CHANGE_SUBSCENE_IMAGE:
    return update.changeSceneSubsceneImage(action.sceneID, action.subsceneID, action.imageIndex);
  case ActionTypes.CONNECT_DIALOG:
    return update.connectSceneSubsceneDialog(action.sceneID, action.subsceneID, action.subsceneIDorConstant);
  case ActionTypes.ADD_DIALOG_LINE:
    return update.addLineToSceneSubsceneDialog(action.sceneID, action.subsceneID);
  case ActionTypes.EDIT_DIALOG_LINE:
    return update.editLineForSceneSubsceneDialog(action.sceneID, action.subsceneID, action.lineIndex, action.lineString);
  case ActionTypes.DELETE_DIALOG_LINE:
    return update.deleteLineForSceneSubsceneDialog(action.sceneID, action.subsceneID, action.lineIndex);
  case ActionTypes.ADD_DIALOG_CHOICE:
    return update.addSceneSubsceneDialogChoice(action.sceneID, action.subsceneID);
  case ActionTypes.EDIT_DIALOG_CHOICE:
    return update.editSceneSubsceneDialogChoiceText(action.sceneID, action.subsceneID, action.choiceIndex, action.choiceString);
  case ActionTypes.CONNECT_DIALOG_CHOICE:
    return update.connectSceneSubsceneDialogChoice(action.sceneID, action.subsceneID, action.choiceIndex, action.subsceneIDorConstant);
  case ActionTypes.DELETE_DIALOG_CHOICE:
    return update.deleteSceneSubsceneDialogChoice(action.sceneID, action.subsceneID, action.choiceIndex);
  case ActionTypes.DELETE_SUBSCENE:
    return update.removeSubsceneFromScene(action.sceneID, action.subsceneID);
  case ActionTypes.CHANGE_SCENE_ENTRY_SUBSCENE:
    return update.changeSceneEntrySubscene(action.sceneID, action.subsceneID);
  case ActionTypes.LOAD_SCENES:
    return action.loadedScenes;
  default:
    return state;
  }
}
