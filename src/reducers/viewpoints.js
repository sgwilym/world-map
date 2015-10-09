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
  case ActionTypes.SET_VIEWPOINT_SCENE_TO_DISPLAY:
    return update.setSceneToDisplay(action.viewpointID, action.seenSceneIDOrConstant, action.sceneToDisplayID);
  case ActionTypes.REMOVE_VIEWPOINT_SCENE_TO_DISPLAY:
    return update.removeSceneToDisplay(action.viewpointID, action.seenSceneIDOrConstant);
  case ActionTypes.DELETE_VIEWPOINT:
    return update.deleteViewpoint(action.viewpointID);
  case ActionTypes.LOAD_VIEWPOINTS:
    return action.loadedViewpoints;
  default:
    return state;
  }
}
