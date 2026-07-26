const { app, BrowserWindow, ipcMain, screen } = require('electron');
const path = require('path');

let window;
function createWindow() {
  const display = screen.getPrimaryDisplay().workArea;
  window = new BrowserWindow({
    width: 390, height: 690,
    x: display.x + display.width - 420,
    y: display.y + display.height - 720,
    transparent: true, frame: false, resizable: false,
    alwaysOnTop: true, hasShadow: false, skipTaskbar: true,
    webPreferences: { preload: path.join(__dirname, 'preload.cjs'), contextIsolation: true }
  });
  window.loadFile(path.join(__dirname, '..', 'dist', 'index.html')).catch(() => window.loadFile(path.join(__dirname, '..', 'index.html')));
}
app.whenReady().then(createWindow);
ipcMain.on('pet:minimize', () => window?.minimize());
ipcMain.on('pet:close', () => app.quit());
ipcMain.on('pet:drag', (_event, { dx, dy }) => {
  if (!window) return;
  const [x, y] = window.getPosition();
  window.setPosition(Math.round(x + dx), Math.round(y + dy));
});
app.on('window-all-closed', () => app.quit());
