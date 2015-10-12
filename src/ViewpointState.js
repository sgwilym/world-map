import update from 'react-addons-update';
import { newID } from './SceneState';

export const DEFAULT_VIEWPOINT_SCENE = 'DEFAULT_VIEWPOINT_SCENE';
export const NO_VIEWPOINT_DISPLAY_SETTING = 'NO_VIEWPOINT_DISPLAY_SETTING';

export default function(viewpointsState) {

  return {

    addNewViewpoint(location) {
      return update(viewpointsState, {
        [newID(viewpointsState)]: {
          $set: {
            location,
            scenes: []
          }
        }
      });
    },

    connectSceneToViewpoint(viewpointID, sceneID) {
      const setting = viewpointsState[viewpointID].scenes.length > 0 ? NO_VIEWPOINT_DISPLAY_SETTING : DEFAULT_VIEWPOINT_SCENE;

      return update(viewpointsState, {
        [viewpointID]: {
          scenes: { $push: [{
            id: sceneID,
            displaySetting: setting
          }] }
        }
      });
    },

    disconnectSceneFromViewpoint(viewpointID, sceneID) {
      const sceneIndex = viewpointsState[viewpointID].scenes.findIndex((scene) => {
        return scene.id == sceneID;
      });

      console.log(sceneIndex);
      return update(viewpointsState, {
        [viewpointID]: {
          scenes: { $splice: [[sceneIndex, 1]] }
        }
      });
    },

    editDisplaySetting(viewpointID, sceneIndex, seenSubsceneIndexOrConstant) {
      return update(viewpointsState, {
        [viewpointID]: {
          scenes: {
            [sceneIndex]: {
              displaySetting: { $set: seenSubsceneIndexOrConstant }
            }
          }
        }
      });
    },

    reorderViewpointScenes(viewpointID, sceneIndex, newSceneIndex) {
      var { scenes } = viewpointsState[viewpointID];
      scenes.splice(newSceneIndex, 0, scenes.splice(sceneIndex, 1)[0]);

      console.log(scenes);

      return update(viewpointsState, {
        [viewpointID]: {
          scenes: { $set: scenes }
        }
      });
    },

    deleteViewpoint(viewpointID) {
      var nextViewpointsState = Object.assign({}, viewpointsState);
      delete nextViewpointsState[viewpointID];
      return nextViewpointsState;
    }

  };

}
