const tileRequire = require.context('./', false, /.*\.(png)/);

const tilePaths = tileRequire.keys();

var tiles = {};

for (let i = 0; i < tilePaths.length; i++) {
  tiles[i] = require(`${tilePaths[i]}`);
}

export default tiles;
