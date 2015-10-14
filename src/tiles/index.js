const tileRequire = require.context('./', false, /.*\.(png)/);

const tilePaths = tileRequire.keys();

var tiles = {};

for (let tilePath of tilePaths) {
  const key = tilePath.replace('./', '').replace('.png', '');
  tiles[key] = require(`${tilePath}`);
}

export default tiles;
