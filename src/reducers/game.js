import update from 'react-addons-update';
import * as ActionTypes from '../actions/game';

const initialState = {
  seenSubscenes: []
};

export default function game(state = initialState, action) {
  switch (action.type) {
  case ActionTypes.SUBSCENE_SEEN:
    return update(state, {
      seenSubscenes: { $push: [action.sceneSubsceneIndex] }
    });
  case ActionTypes.RESET_SEEN_SUBSCENES:
    return update(state, {
      seenSubscenes: { $set: [] }
    });
  default:
    return state;
  }
}
