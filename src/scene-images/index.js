const sceneImageRequire = require.context('./', false, /.*\.(png)/);

const sceneImagePaths = sceneImageRequire.keys();

export default sceneImagePaths.map((path) => {
  return require(`${path}`);
});
