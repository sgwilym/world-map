export const ADD_COLUMN = 'ADD_COLUMN';
export const ADD_ROW = 'ADD_ROW';
export const CHANGE_CELL = 'CHANGE_CELL';

export const SELECT_TILE = 'SELECT_TILE';

export const CHANGE_TILE_SIZE = 'CHANGE_TILE_SIZE';

export function addColumn(append) {
  return { type: ADD_COLUMN, append };
}

export function addRow(append) {
  return { type: ADD_ROW, append };
}

export function changeCell(twoDimensionalIndex, tileId) {
  return { type: CHANGE_CELL, twoDimensionalIndex, tileId };
}

export function selectTile(tileId) {
  return { type: SELECT_TILE, tileId };
}

export function changeTileSize(tileSize) {
  return { type: CHANGE_TILE_SIZE, tileSize };
}
