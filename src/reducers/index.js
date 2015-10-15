import { combineReducers } from 'redux';
import undoable, { ifAction } from 'redux-undo';

import { CREATE_VIEWPOINT } from '../actions/viewpoints';

import world from './world';
import { selectedTile, tileSize, editingViewpoint } from './interface';
import viewpoints from './viewpoints';
import scenes from './scenes';
import game from './game';

export default combineReducers({
  world: undoable(world),
  tileSize,
  selectedTile,
  viewpoints: undoable(viewpoints, {
    filter: ifAction(CREATE_VIEWPOINT)
  }),
  editingViewpoint,
  scenes,
  game
});
