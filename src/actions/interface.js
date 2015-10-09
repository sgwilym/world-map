// Interface constants
export const SELECT_TILE = 'SELECT_TILE';
export const CHANGE_TILE_SIZE = 'CHANGE_TILE_SIZE';
export const OPEN_VIEWPOINT_EDITOR = 'OPEN_VIEWPOINT_EDITOR';
export const CLOSE_VIEWPOINT_EDITOR = 'CLOSE_VIEWPOINT_EDITOR';

export function selectTile(tileId) {
  return { type: SELECT_TILE, tileId };
}

export function changeTileSize(tileSize) {
  return { type: CHANGE_TILE_SIZE, tileSize };
}

export function openViewpointEditor(viewpointID) {
  return { type: OPEN_VIEWPOINT_EDITOR, viewpointID };
}

export function closeViewpointEditor() {
  return { type: CLOSE_VIEWPOINT_EDITOR };
}
