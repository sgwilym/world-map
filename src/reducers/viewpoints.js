import makeUpdate from '../ViewpointState';
import * as ActionTypes from '../actions/viewpoints';

export default function viewpoints(state = {}, action) {
  const update = makeUpdate(state);
  switch(action.type) {
  case ActionTypes.CREATE_VIEWPOINT:
    return update.addNewViewpoint(action.location);
  case ActionTypes.CONNECT_SCENE_TO_VIEWPOINT:
    return update.connectSceneToViewpoint(action.viewpointID, action.sceneID);
  case ActionTypes.DISCONNECT_SCENE_FROM_VIEWPOINT:
    return update.disconnectSceneFromViewpoint(action.viewpointID, action.sceneID);
  case ActionTypes.EDIT_DISPLAY_SETTING:
    return update.editDisplaySetting(action.viewpointID, action.sceneIndex, action.seenSubsceneIndexOrConstant);
  case ActionTypes.REORDER_VIEWPOINT_SCENES:
    return update.reorderViewpointScenes(action.viewpointID, action.sceneIndex, action.newSceneIndex);
  case ActionTypes.DELETE_VIEWPOINT:
    return update.deleteViewpoint(action.viewpointID);
  case ActionTypes.LOAD_VIEWPOINTS:
    return action.loadedViewpoints;
  case ActionTypes.TRANSLATE_VIEWPOINTS:
    return update.translateViewpoints(action.translationDirection);
  default:
    return state;
  }
}
