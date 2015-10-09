// World constants
export const ADD_COLUMN = 'ADD_COLUMN';
export const ADD_ROW = 'ADD_ROW';
export const DELETE_COLUMN = 'DELETE_COLUMN';
export const DELETE_ROW = 'DELETE_ROW';
export const CHANGE_CELL = 'CHANGE_CELL';
export const LOAD_WORLD = 'LOAD_WORLD';

// World actions
export function addColumn(append) {
  return { type: ADD_COLUMN, append };
}

export function addRow(append) {
  return { type: ADD_ROW, append };
}

export function deleteColumn(pop) {
  return { type: DELETE_COLUMN, pop };
}

export function deleteRow(pop) {
  return { type: DELETE_ROW, pop };
}

export function changeCell(twoDimensionalIndex, tileId) {
  return { type: CHANGE_CELL, twoDimensionalIndex, tileId };
}

export function loadWorld(loadedWorld) {
  return { type: LOAD_WORLD, loadedWorld };
}
