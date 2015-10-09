import * as ActionTypes from '../actions/interface';

export function selectedTile(state = 0, action) {
  switch(action.type) {
  case ActionTypes.SELECT_TILE:
    return action.tileId;
  default:
    return state;
  }
}

export function tileSize(state = 50, action) {
  switch(action.type) {
  case ActionTypes.CHANGE_TILE_SIZE:
    return action.tileSize;
  default:
    return state;
  }
}

export function editingViewpoint(state = null, action) {
  switch (action.type) {
  case ActionTypes.OPEN_VIEWPOINT_EDITOR:
    return action.viewpointID;
  case ActionTypes.CLOSE_VIEWPOINT_EDITOR:
    return null;
  default:
    return state;
  }
}
