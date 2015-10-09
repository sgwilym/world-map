module.exports = {

  appDataAsDataURI(scenes, viewpoints, world) {
    const exportData = {
      scenes,
      viewpoints,
      world
    };

    return `data:text/json;charset=utf-8,${escape(JSON.stringify(exportData))}`;
  },

  validateAppSaveFile(saveFile) {
    const reader = new FileReader();

    const promise = new Promise((resolve, reject) => {
      reader.onload = (e) => {
        const saveData = JSON.parse(e.target.result);
        if ('world' in saveData && 'scenes' in saveData && 'viewpoints' in saveData) {
          resolve(saveData);
        } else {
          reject();
        }
      };
    });

    reader.readAsText(saveFile);
    return promise;
  }

};
