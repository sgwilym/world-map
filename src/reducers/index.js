import { combineReducers } from 'redux';
import undoable from 'redux-undo';

import world from './world';
import { selectedTile, tileSize, editingViewpoint } from './interface';
import viewpoints from './viewpoints';
import scenes from './scenes';

export default combineReducers({
  world: undoable(world),
  tileSize,
  selectedTile,
  viewpoints: viewpoints,
  editingViewpoint,
  scenes
});
