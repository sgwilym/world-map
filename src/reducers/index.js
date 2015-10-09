import { combineReducers } from 'redux';

import world from './world';
import { selectedTile, tileSize, editingViewpoint } from './interface';
import viewpoints from './viewpoints';
import scenes from './scenes';

export default combineReducers({
  world,
  tileSize,
  selectedTile,
  viewpoints,
  editingViewpoint,
  scenes
});
