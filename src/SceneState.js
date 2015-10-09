import update from 'react-addons-update';

export const STATIC_DIALOG = 'STATIC_DIALOG';
export const INTERACTIVE_DIALOG = 'INTERACTIVE_DIALOG';
export const CONNECT_END = 'CONNECT_END';

export function newID(objectWithIDKeyedObjects) {

  var ids = [];
  for (let id in objectWithIDKeyedObjects) {
    ids.push(id);
  }

  for (let i = 0; i <=  ids.length; i++) {
    if (i !== parseInt(ids[i])) {
      return i;
    }
  }
};

export default function(sceneState) {

  return {

    addNewScene() {
      return update(sceneState, {
        [newID(sceneState)]: { $set: {
          name: `Scene ${newID(sceneState)}`,
          subscenes: {},
          entrySubscene: null
        }}
      });
    },

    renameScene(sceneID, newName) {
      return update(sceneState, {
        [sceneID]: {
          name: { $set: newName }
        }
      });
    },

    changeSceneEntrySubscene(scenedID, subsceneID) {
      return update(sceneState, {
        [sceneID]: {
          entrySubscene: { $set: subsceneID }
        }
      });
    },

    removeScene(sceneID) {
      var nextSceneState = Object.assign({}, sceneState);
      delete nextSceneState[sceneID];
      return nextSceneState;
    },

    addNewSubsceneToScene(sceneID) {
      const selectedScene = sceneState[sceneID];
      const freshSubScene = {
        image: null,
        dialog: {
          type: STATIC_DIALOG,
          elements: {
            lines: [],
            connectsTo: CONNECT_END,
            choices: []
          }
        }
      };
      const nextState = update(sceneState, {
        [sceneID]: {
          subscenes: {
            [newID(selectedScene.subscenes)]: { $set: freshSubScene }
          }
        }
      });
      if (sceneState[sceneID].subscenes.length > 0) {
        return nextState;
      } else {
        return update(nextState, {
          [sceneID]: {
            entrySubscene: { $set: newID(selectedScene.subscenes)}
          }
        });
      }
    },

    removeSubsceneFromScene(subsceneID, sceneID) {
      var nextSceneState = Object.assign({}, sceneState);
      delete nextSceneState[sceneID].subscenes[subsceneID];
      return nextSceneState;
    },

    changeSceneSubsceneImage(sceneID, subsceneID, image) {
      return update(sceneState, {
        [sceneID]: {
          subscenes: {
            [subsceneID]: {
              image: { $set: image }
            }
          }
        }
      });
    },

    changeSceneSubsceneDialogType(sceneID, subsceneID, dialogType) {
      return update(sceneState, {
        [sceneID]: {
          subscenes: {
            [subsceneID]: {
              dialog: {
                type: { $set: dialogType }
              }
            }
          }
        }
      });
    },

    connectSceneSubsceneDialog(sceneID, subsceneID, subsceneIDorConstant) {
      return update(sceneState, {
        [sceneID]: {
          subscenes: {
            [subsceneID]: {
              dialog: {
                elements: {
                  connectsTo: { $set: subsceneIDorConstant }
                }
              }
            }
          }
        }
      });
    },

    addLineToSceneSubsceneDialog(sceneID, subsceneID) {
      return update(sceneState, {
        [sceneID]: {
          subscenes: { [subsceneID] : {
            dialog: { elements: {
              lines: { $push: [''] }
            }}
          }}
        }
      });
    },

    editLineForSceneSubsceneDialog(sceneID, subsceneID, lineIndex, lineString) {
      return update(sceneState, {
        [sceneID]: {
          subscenes: { [subsceneID]: {
            dialog: { elements: {
              lines: {
                [lineIndex]: { $set: lineString }
              }
            }}
          }}
        }
      });
    },

    deleteLineForSceneSubsceneDialog(sceneID, subsceneID, lineIndex) {
      return update(sceneState, {
        [sceneID]: {
          subscenes: { [subsceneID]: {
            dialog: { elements: {
              lines: { $splice: [[lineIndex, 1]] }
            }}
          }}
        }
      });
    },

    addSceneSubsceneDialogChoice(sceneID, subsceneID) {
      return update(sceneState, {
        [sceneID]: {
          subscenes: { [subsceneID]: {
            dialog: { elements: {
              choices: { $push: [{
                text: '',
                connectsTo: CONNECT_END
              }]}
            }}
          }}
        }
      });
    },

    editSceneSubsceneDialogChoiceText(sceneID, subsceneID, choiceIndex, choiceString) {
      return update(sceneState, {
        [sceneID]: {
          subscenes: { [subsceneID] : {
            dialog: { elements: {
              choices: {
                [choiceIndex]: {
                  text: { $set: choiceString }
                }
              }
            }}
          }}
        }
      });
    },

    connectSceneSubsceneDialogChoice(sceneID, subsceneID, choiceIndex, subsceneIDorConstant) {
      return update(sceneState, {
        [sceneID]: {
          subscenes: { [subsceneID] : {
            dialog: { elements: {
              choices: {
                [choiceIndex]: {
                  connectsTo: { $set: subsceneIDorConstant }
                }
              }
            }}
          }}
        }
      });
    },

    deleteSceneSubsceneDialogChoice(sceneID, subsceneID, choiceIndex) {
      return update(sceneState, {
        [sceneID]: {
          subscenes: { [subsceneID] : {
            dialog: { elements: {
              choices: {
                $splice: [[choiceIndex, 1]]
              }
            }}
          }}
        }
      });
    }

  };

}
