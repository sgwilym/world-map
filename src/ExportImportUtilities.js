module.exports = {

  worldAsDataURI(world) {
    const exportData = {
      world
    };

    return `data:text/json;charset=utf-8,${escape(JSON.stringify(exportData))}`
  },

  validateUploadedWorldFile(worldFile) {
    const reader = new FileReader();

    const promise = new Promise((resolve, reject) => {
      reader.onload = (e) => {
        const loadedWorld = JSON.parse(e.target.result);
        if ('world' in loadedWorld) {
          resolve(loadedWorld);
        } else {
          reject();
        }
      }
    })

    reader.readAsText(worldFile);
    return promise;
  }

}
