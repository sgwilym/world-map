import update from 'react-addons-update';
import { newID } from './Scenes';

export const DEFAULT_VIEWPORT_SCENE = 'DEFAULT_VIEWPORT_SCENE';

export default function(viewpointsState) {

  return {

    addNewViewpoint(location) {
      return update(viewpointsState, {
        [newID(viewpointsState)]: {
          $set: {
            location,
            scenes: [],
            displayScene: {}
          }
        }
      });
    },

    connectSceneToViewpoint(viewpointID, sceneID) {
      const nextState = update(viewpointsState, {
        [viewpointID]: {
          scenes: { $push: [sceneID] }
        }
      });
      if (viewpointsState[viewpointID].scenes.length > 0) {
        return nextState;
      } else {
        return update(nextState, {
          [viewpointID]: {
            displayScene: {
              DEFAULT_VIEWPORT_SCENE: { $set: sceneID }
            }
          }
        });
      }
    },

    disconnectSceneFromViewpoint(viewpointID, sceneID) {
      const sceneIndex = viewpointsState[viewpointID].scenes.indexOf(sceneID);
      return update(viewpointsState, {
        [viewpointID]: {
          scenes: { $splice: [[sceneIndex, 1]] }
        }
      });
    },

    setSceneToDisplay(viewpointID, seenSceneIDOrConstant, sceneToDisplayID) {
      return update(viewpointsState, {
        [viewpointID]: {
          displayScene: {
            [seenSceneIDOrConstant]: { $set: sceneToDisplayID }
          }
        }
      });
    },

    removeSceneToDisplay(viewpointID, seenSceneIDOrConstant) {
      var nextViewpointsState = Object.assign({}, viewpointsState);

        delete nextViewpointsState[viewpointID].displayScene[seenSceneIDOrConstant];
      return nextViewpointsState;
    },

    deleteViewpoint(viewpointID) {
      var nextViewpointsState = Object.assign({}, viewpointsState);
      delete nextViewpointsState[viewpointID];
      return nextViewpointsState;
    }

  };

}
