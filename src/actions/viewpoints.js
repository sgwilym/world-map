// Viewpoint constants
export const CREATE_VIEWPOINT = 'CREATE_VIEWPOINT';
export const CONNECT_SCENE_TO_VIEWPOINT = 'CONNECT_SCENE_TO_VIEWPOINT';
export const DISCONNECT_SCENE_FROM_VIEWPOINT = 'DISCONNECT_SCENE_FROM_VIEWPOINT';
export const EDIT_DISPLAY_SETTING = 'EDIT_DISPLAY_SETTING';
export const REORDER_VIEWPOINT_SCENES = 'REORDER_VIEWPOINT_SCENES';
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

export function editDisplaySetting(viewpointID, sceneIndex, seenSubsceneIndexOrConstant) {
  return { type: EDIT_DISPLAY_SETTING, viewpointID, sceneIndex, seenSubsceneIndexOrConstant};
}

export function reorderViewpointScenes(viewpointID, sceneIndex, newSceneIndex) {
  return { type: REORDER_VIEWPOINT_SCENES, viewpointID, sceneIndex, newSceneIndex};
}

export function deleteViewpoint(viewpointID) {
  return { type: DELETE_VIEWPOINT, viewpointID };
}

export function loadViewpoints(loadedViewpoints) {
  return { type: LOAD_VIEWPOINTS, loadedViewpoints };
}
