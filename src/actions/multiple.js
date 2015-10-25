import { createScene, deleteScene, loadScenes } from './scenes';
import { connectSceneToViewpoint, disconnectSceneFromViewpoint, deleteViewpoint, removeSceneToDisplayOnViewpoint, setSceneToDisplayOnViewpoint, loadViewpoints, translateViewpoints } from './viewpoints';
import { closeViewpointEditor } from './interface';
import { addColumn, addRow, deleteColumn, deleteRow, loadWorld, DIRECTION_NORTH, DIRECTION_EAST, DIRECTION_SOUTH, DIRECTION_WEST } from './world';

// Multi actions!!!

export function expandMap(direction) {
  switch (direction) {
  case DIRECTION_NORTH:
    return [
      addRow(false),
      translateViewpoints(DIRECTION_SOUTH)
    ];
  case DIRECTION_SOUTH:
    return [
      addRow(true)
    ];
  case DIRECTION_WEST:
    return [
      addColumn(false),
      translateViewpoints(DIRECTION_EAST)
    ];
  case DIRECTION_EAST:
    return [
      addColumn(true)
    ];
  default:
    return [];
  }
}

export function shrinkMap(direction) {
  switch (direction) {
  case DIRECTION_NORTH:
    return [
      deleteRow(false),
      translateViewpoints(DIRECTION_NORTH)
    ];
  case DIRECTION_SOUTH:
    return [
      deleteRow(true)
    ];
  case DIRECTION_WEST:
    return [
      deleteColumn(false),
      translateViewpoints(DIRECTION_WEST)
    ];
  case DIRECTION_EAST:
    return [
      deleteColumn(true)
    ];
  default:
    return [];
  }
}

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
