import { createScene, deleteScene, loadScenes } from './scenes';
import { connectSceneToViewpoint, disconnectSceneFromViewpoint, deleteViewpoint, removeSceneToDisplayOnViewpoint, setSceneToDisplayOnViewpoint, loadViewpoints } from './viewpoints';
import { closeViewpointEditor } from './interface';
import { loadWorld } from './world';

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
  ];
}
