const { contextBridge, ipcRenderer } = require('electron');
contextBridge.exposeInMainWorld('desktopPet', {
  minimize: () => ipcRenderer.send('pet:minimize'),
  close: () => ipcRenderer.send('pet:close'),
  drag: (dx, dy) => ipcRenderer.send('pet:drag', { dx, dy })
});
