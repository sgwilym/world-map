import update from 'react-addons-update';
import * as ActionTypes from '../actions/world';

const t = 'TILE0000';
const initialState = [
  [t,t,t,t,t],
  [t,t,t,t,t],
  [t,t,t,t,t],
  [t,t,t,t,t],
  [t,t,t,t,t]
];

export default function world(state = initialState, action) {
  switch (action.type) {
  case ActionTypes.ADD_ROW:
    var maxXValue = Math.max.apply(null, (state.map(row => {
      return row.length;
    })));
    var arrayToAdd = [Array.from(new Array(maxXValue), () => t)];

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
        newRow.push(t);
        return newRow;
      });
    } else {
      return state.map((row) => {
        let newRow = row.slice();
        newRow.unshift(t);
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
    const nextState = state.slice();
    if (action.pop) {
      nextState.pop();
      return nextState;
    } else {
      nextState.shift();
      return nextState;
    }
  case ActionTypes.FILL_WORLD:
    return state.map((row) => {
      return row.map((cell) => {
        return action.tileID;
      });
    });
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
