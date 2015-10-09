import update from 'react-addons-update';
import * as ActionTypes from '../actions/world';

export default function world(state = [], action) {
  switch (action.type) {
  case ActionTypes.ADD_ROW:
    var maxXValue = Math.max.apply(null, (state.map(row => {
      return row.length;
    })));
    var arrayToAdd = [Array.from(new Array(maxXValue), () => 0)];

    if (action.append) {
      return update(state, {
        $push: arrayToAdd
      });
    } else {
      return update(state, {
        $unshift: arrayToAdd
      });
    }
  case ActionTypes.ADD_COLUMN:
    if (action.append) {
      return state.map((row) => {
        let newRow = row.slice();
        newRow.push(0);
        return newRow;
      });
    } else {
      return state.map((row) => {
        let newRow = row.slice();
        newRow.unshift(0);
        return newRow;
      });
    }
  case ActionTypes.DELETE_COLUMN:
    if (action.pop) {
      return state.map((row) => {
        let newRow = row.slice();
        newRow.pop();
        return newRow;
      });
    } else {
      return state.map((row) => {
        let newRow = row.slice();
        newRow.shift();
        return newRow;
      });
    }
  case ActionTypes.DELETE_ROW:
    let nextState = state.slice();
    if (action.pop) {
      nextState.pop();
      return nextState;
    } else {
      nextState.shift();
      return nextState;
    }
  case ActionTypes.LOAD_WORLD:
    return action.loadedWorld;
  case ActionTypes.CHANGE_CELL:
    let newState = state.map((row) => {
      return row.slice();
    });
    let { twoDimensionalIndex, tileId } = action;
    newState[twoDimensionalIndex[0]][twoDimensionalIndex[1]] = tileId;
    return newState;
  default:
    return state;
  }
}
