jest.dontMock('../src/Scenes');

const { newID, STATIC_DIALOG, INTERACTIVE_DIALOG, CONNECT_END } = require('../src/Scenes');
const makeSceneUpdater = require('../src/Scenes').default;

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
};;

describe('newID', function() {

  it('creates a new ID key from an empty object', function() {
    const scenes = {};
    expect(newID(scenes)).toEqual(0);
  });

  it('create a new ID key from an object with IDs already', function() {
    const scenes = {
      0: {},
      1: {},
    };
    expect(newID(scenes)).toEqual(2);
  });

  it('creates a new ID from an object with non-sequential IDs', function() {
    const scenes = {
      0: {},
      1: {},
      3: {}
    };
    expect(newID(scenes)).toEqual(2);
  });

});

describe('addNewScene', function() {

  it('adds a new scene object to a scenes object', function() {
    const scenes = {};
    const sceneUpdate = makeSceneUpdater(scenes);
    const expected = {
      0: {
        name: 'New Scene',
        subscenes: {}
      }
    };
    expect(sceneUpdate.addNewScene()).toEqual(expected);
  });

  it('add a new scene to an object with existing scenes', function() {
    const scenes = {
      1: {
        name: 'New Scene',
        subscenes: {}
      }
    };
    const sceneUpdate = makeSceneUpdater(scenes);
    const expected = {
      0: {
        name: 'New Scene',
        subscenes: {}
      },
      1: {
        name: 'New Scene',
        subscenes: {}
      }
    };
    expect(sceneUpdate.addNewScene()).toEqual(expected);
  });

});

describe('renameScene', function() {
  it('edits the name property for a scene of a given ID', function() {
    const scenes = {
      1: {
        name: 'New Scene',
        subscenes: {}
      }
    };
    const updateScene = makeSceneUpdater(scenes);
    const expected = {
      1: {
        name: 'The Scary One',
        subscenes: {}
      }
    };
    expect(updateScene.renameScene(1, 'The Scary One')).toEqual(expected);
  });
});

describe('removeScene', function() {
  it('removes a scene by a given ID', function() {
    const scenes = {
      0: { subscenes: {} },
      1: { subscenes: {} }
    };
    const sceneUpdate = makeSceneUpdater(scenes);
    const expected = {
      0: { subscenes: {} }
    };
    expect(sceneUpdate.removeScene(1)).toEqual(expected);
  });
});

describe('addSubsceneToScene', function() {
  it('adds a new subscene to a scene with a given ID', function() {
    const scenes = {
      0: { subscenes: {} },
      3: { subscenes: {} }
    };
    const sceneUpdate = makeSceneUpdater(scenes);
    const expected = {
      0: { subscenes: {} },
      3: { subscenes: {
        0: freshSubScene
      }}
    };
    expect(sceneUpdate.addNewSubsceneToScene(3)).toEqual(expected);
  });
});

describe('removeSubsceneFromScene', function() {
  it ('removes a subscene with given ID from a scene with given ID', function() {
    const scenes = {
      0: { subscenes: {} },
      3: { subscenes: {
        0: freshSubScene
      }}
    };
    const sceneUpdate = makeSceneUpdater(scenes);
    const expected = {
      0: { subscenes: {} },
      3: { subscenes: {} }
    };
    expect(sceneUpdate.removeSubsceneFromScene(0, 3)).toEqual(expected);
  });
});

describe('changeSceneSubsceneImage', function() {
  it('changes the image property of a subscene of given ID of a scene of given ID', function() {
    const scenes = {
      3: {
        subscenes: {
          1: freshSubScene
        }
      }
    };
    const sceneUpdate = makeSceneUpdater(scenes);
    const expected = {
      3: {
        subscenes: {
          1: {
            image: 'myCoolImage',
            dialog: {
              type: STATIC_DIALOG,
              elements: {
                lines: [],
                connectsTo: CONNECT_END,
                choices: []
              }
            }
          }
        }
      }
    };
    expect(sceneUpdate.changeSceneSubsceneImage(3, 1, 'myCoolImage')).toEqual(expected);
  });
});

describe('changeSceneSubsceneDialogType', function() {
  it('changes the dialog type of a subscene with a given ID of a scene of a given ID', function() {
    const scenes = {
      5: {
        subscenes: {
          2: freshSubScene
        }
      }
    };
    const sceneUpdate = makeSceneUpdater(scenes);
    const expected = {
      5: {
        subscenes: {
          2: {
            image: null,
            dialog: {
              type: INTERACTIVE_DIALOG,
              elements: {
                lines: [],
                connectsTo: CONNECT_END,
                choices: []
              }
            }
          }
        }
      }
    };
    expect(sceneUpdate.changeSceneSubsceneDialogType(5, 2, INTERACTIVE_DIALOG)).toEqual(expected);
  });
});

describe('connectSceneSubsceneDialog', function() {
  it('changes the connectsTo attribute of the dialog of a subscene of a given ID of a scene of a given ID', function() {
    const scenes = {
      6: {
        subscenes: {
          1: freshSubScene
        }
      }
    };
    const sceneUpdate = makeSceneUpdater(scenes);
    const expected = {
      6: {
        subscenes: {
          1: {
            image: null,
            dialog: {
              type: STATIC_DIALOG,
              elements: {
                lines: [],
                connectsTo: 2,
                choices: []
              }
            }
          }
        }
      }
    };
    expect(sceneUpdate.connectSceneSubsceneDialog(6, 1, 2)).toEqual(expected);
  });
});

describe('addLineToSceneSubsceneDialog', function() {
  it('appends an empty string to the lines property of the dialog of a subscene with a given ID of a scene with a given ID', function() {
    const scenes = {
      3: {
        subscenes: {
          0: freshSubScene
        }
      }
    };
    const sceneUpdate = makeSceneUpdater(scenes);
    const expected = {
      3: {
        subscenes: {
          0: {
            image: null,
            dialog: {
              type: STATIC_DIALOG,
              elements: {
                lines: [''],
                connectsTo: CONNECT_END,
                choices: []
              }
            }
          }
        }
      }
    };
    expect(sceneUpdate.addLineToSceneSubsceneDialog(3, 0)).toEqual(expected);
  });
});

describe('editLineForSceneSubsceneDialog', function() {
  it('edits a line at a given index for the dialog of a subscen of a given ID for a scene of a given ID', function() {
    const scenes = {
      7: {
        subscenes: {
          1: {
            image: null,
            dialog: {
              type: STATIC_DIALOG,
              elements: {
                lines: ['I will never reveal the secret of these hallowed halls.', 'Not even if you ask really nicely!', 'Seriously, go away!'],
                connectsTo: CONNECT_END,
                choices: []
              }
            }
          }
        }
      }
    };
    const updateScene = makeSceneUpdater(scenes);
    const expected = {
      7: {
        subscenes: {
          1: {
            image: null,
            dialog: {
              type: STATIC_DIALOG,
              elements: {
                lines: ['I will never reveal the secret of these hallowed halls.', 'Not even if you ask really nicely!', 'Oh, all right then.'],
                connectsTo: CONNECT_END,
                choices: []
              }
            }
          }
        }
      }
    };
    expect(updateScene.editLineForSceneSubsceneDialog(7, 1, 2, 'Oh, all right then.')).toEqual(expected);
  });
});

describe('deleteLineForSceneSubsceneDialog', function() {
  it('deletes a line at a given index for the dialog of a subscene of a given ID for a scene of a given ID', function() {
    const scenes = {
      7: {
        subscenes: {
          1: {
            image: null,
            dialog: {
              type: STATIC_DIALOG,
              elements: {
                lines: ['You stink!', 'I wish there was some way to take back what I’d said'],
                connectsTo: CONNECT_END,
                choices: []
              }
            }
          }
        }
      }
    };
    const updateScene = makeSceneUpdater(scenes);
    const expected = {
      7: {
        subscenes: {
          1: {
            image: null,
            dialog: {
              type: STATIC_DIALOG,
              elements: {
                lines: ['I wish there was some way to take back what I’d said'],
                connectsTo: CONNECT_END,
                choices: []
              }
            }
          }
        }
      }
    };
    expect(updateScene.deleteLineForSceneSubsceneDialog(7, 1, 0)).toEqual(expected);
  });
});

describe('addSceneSubsceneDialogChoice', function() {
  it('adds a interactive choice to the dialog of a subscene for a given ID of a scene of a given ID', function() {
    const scenes = {
      0: {
        subscenes: {
          1: {
            image: null,
            dialog: {
              type: INTERACTIVE_DIALOG,
              elements: {
                lines: [],
                connectsTo: CONNECT_END,
                choices: []
              }
            }
          }
        }
      }
    };
    const updateScene = makeSceneUpdater(scenes);
    const expected = {
      0: {
        subscenes: {
          1: {
            image: null,
            dialog: {
              type: INTERACTIVE_DIALOG,
              elements: {
                lines: [],
                connectsTo: CONNECT_END,
                choices: [{
                  text: '',
                  connectsTo: CONNECT_END
                }]
              }
            }
          }
        }
      }
    };
    expect(updateScene.addSceneSubsceneDialogChoice(0, 1)).toEqual(expected);
  });
});

describe('editSceneSubsceneDialogChoiceText', function() {
  it('edits the text of a choice of a given index a dialog for a subscene of a given ID of a scene of a given ID', function() {
    const scenes = {
      0: {
        subscenes: {
          1: {
            image: null,
            dialog: {
              type: INTERACTIVE_DIALOG,
              elements: {
                lines: [],
                connectsTo: CONNECT_END,
                choices: [{
                  text: 'Yep',
                  connectsTo: CONNECT_END
                }, {
                  text: 'Nope',
                  connectsTo: CONNECT_END
                }]
              }
            }
          }
        }
      }
    };
    const updateScene = makeSceneUpdater(scenes);
    const expected = {
      0: {
        subscenes: {
          1: {
            image: null,
            dialog: {
              type: INTERACTIVE_DIALOG,
              elements: {
                lines: [],
                connectsTo: CONNECT_END,
                choices: [{
                  text: 'Yep',
                  connectsTo: CONNECT_END
                }, {
                  text: 'Maybe...',
                  connectsTo: CONNECT_END
                }]
              }
            }
          }
        }
      }
    };
    expect(updateScene.editSceneSubsceneDialogChoiceText(0, 1, 1, 'Maybe...')).toEqual(expected);
  });
});

describe('connectSceneSubsceneDialogChoice', function() {
  it('edits the connectsTo property of a choice of a given index a dialog for a subscene of a given ID of a scene of a given ID', function() {
    const scenes = {
      0: {
        subscenes: {
          1: {
            image: null,
            dialog: {
              type: INTERACTIVE_DIALOG,
              elements: {
                lines: [],
                connectsTo: CONNECT_END,
                choices: [{
                  text: 'Yep',
                  connectsTo: CONNECT_END
                }, {
                  text: 'Nope',
                  connectsTo: CONNECT_END
                }]
              }
            }
          }
        }
      }
    };
    const updateScene = makeSceneUpdater(scenes);
    const expected = {
      0: {
        subscenes: {
          1: {
            image: null,
            dialog: {
              type: INTERACTIVE_DIALOG,
              elements: {
                lines: [],
                connectsTo: CONNECT_END,
                choices: [{
                  text: 'Yep',
                  connectsTo: 2
                }, {
                  text: 'Nope',
                  connectsTo: CONNECT_END
                }]
              }
            }
          }
        }
      }
    };
    expect(updateScene.connectSceneSubsceneDialogChoice(0, 1, 0, 2)).toEqual(expected);
  });
});

describe('deleteDialogChoice', function() {
  it('deletes a choice of a given index a dialog for a subscene of a given ID of a scene of a given ID', function() {
    const scenes = {
      0: {
        subscenes: {
          1: {
            image: null,
            dialog: {
              type: INTERACTIVE_DIALOG,
              elements: {
                lines: [],
                connectsTo: CONNECT_END,
                choices: [{
                  text: 'Yep',
                  connectsTo: CONNECT_END
                }, {
                  text: 'Nope',
                  connectsTo: CONNECT_END
                }]
              }
            }
          }
        }
      }
    };
    const updateScene = makeSceneUpdater(scenes);
    const expected = {
      0: {
        subscenes: {
          1: {
            image: null,
            dialog: {
              type: INTERACTIVE_DIALOG,
              elements: {
                lines: [],
                connectsTo: CONNECT_END,
                choices: [{
                  text: 'Yep',
                  connectsTo: CONNECT_END
                }]
              }
            }
          }
        }
      }
    };
    expect(updateScene.deleteDialogChoice(0, 1, 1)).toEqual(expected);
  });
});
