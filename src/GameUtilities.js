import { DEFAULT_VIEWPOINT_SCENE } from './ViewpointState';

export function subsceneSeen(sceneIndex, seenScenesIndexes) {
  const seenSceneIndex = seenScenesIndexes.find((seenSceneIndex) => {
    return seenSceneIndex[0] == sceneIndex[0] && seenSceneIndex[1] == sceneIndex[1];
  });
  return seenSceneIndex ? true : false;
}

export function createGameWorld(world, viewpoints, scenes, seenScenesIndexes) {

  var availableScenes = {};
  for (let i = 0; i < world.length; i++) {
    availableScenes[i] = {};
    for (let c = 0; c < world[i].length; c++) {
      availableScenes[i][c] = null;
    }
  }

  for (let viewpointID in viewpoints) {
    let viewpoint = viewpoints[viewpointID];

    var sceneToDisplay = null;
    for (let scene of viewpoint.scenes) {
      if (scene.displaySetting == DEFAULT_VIEWPOINT_SCENE) {
        sceneToDisplay = scene.id;
        console.log('showing default');
        break;
      } else if (scene.displaySetting.match(/\d\,\d/)) {
        let sceneIndex = scene.displaySetting.split(',');
        console.log('scene qualified');
        if (subsceneSeen(sceneIndex, seenScenesIndexes)) {
          sceneToDisplay = scene.id;
          break;
        }
      }
    }
    availableScenes[viewpoint.location.y][viewpoint.location.x] = sceneToDisplay;
  }

  return world.map((worldRow, rowIndex) => {
    return worldRow.map((worldCell, cellIndex) => {
      return ({
        tile: worldCell,
        scene: availableScenes[rowIndex][cellIndex]
      });
    });
  });

}
