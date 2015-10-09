// Viewpoint constants
export const CREATE_VIEWPOINT = 'CREATE_VIEWPOINT';
export const CONNECT_SCENE_TO_VIEWPOINT = 'CONNECT_SCENE_TO_VIEWPOINT';
export const DISCONNECT_SCENE_FROM_VIEWPOINT = 'DISCONNECT_SCENE_FROM_VIEWPOINT';
export const SET_VIEWPOINT_SCENE_TO_DISPLAY = 'SET_VIEWPOINT_SCENE_TO_DISPLAY';
export const REMOVE_VIEWPOINT_SCENE_TO_DISPLAY = 'REMOVE_VIEWPOINT_SCENE_TO_DISPLAY';
export const DELETE_VIEWPOINT = 'DELETE_VIEWPOINT';
export const LOAD_VIEWPOINTS = 'LOAD_VIEWPOINTS';

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
