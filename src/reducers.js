import { combineReducers } from 'redux';
import update from 'react-addons-update';
import { ADD_ROW, ADD_COLUMN, CHANGE_CELL, SELECT_TILE, CHANGE_TILE_SIZE } from './actions';

function world(state = [], action) {
  switch (action.type) {
  case ADD_ROW:
    var maxXValue = Math.max.apply(null, (state.map(row => {
      return row.length
    })));
    var arrayToAdd = [Array.from(new Array(maxXValue), () => 0)];

    if (action.append) {
      return update(state, {
        $push: arrayToAdd
      })
    } else {
      return update(state, {
        $unshift: arrayToAdd
      })
    }
  case ADD_COLUMN:
    if (action.append) {
      // Append 0 to every array in world
      return state.map((row) => {
        let newRow = row.slice()
        newRow.push(0);
        return newRow;
      })
    } else {
      // prepend 0 to every array in world
      return state.map((row) => {
        let newRow = row.slice()
        newRow.unshift(0);
        return newRow;
      })
    }
  case CHANGE_CELL:
    // Change the cell at the two dimensional index in world’s id to the given TileId

    let newState = state.map((row) => {
      return row.slice();
    })

    let { twoDimensionalIndex, tileId } = action;

    newState[twoDimensionalIndex[0]][twoDimensionalIndex[1]] = tileId;

    return newState;
  default:
    return state;
  }
}

function selectedTile(state = 0, action) {
  switch(action.type) {
  case SELECT_TILE:
    return action.tileId;
  default:
    return state;
  }
}

function tiles(state = {}, action) {
  return state;
}

function tileSize(state = 50, action) {
  switch(action.type) {
  case CHANGE_TILE_SIZE:
    return action.tileSize;
  default:
    return state;
  }
}

export default combineReducers({world, tiles, tileSize, selectedTile});
