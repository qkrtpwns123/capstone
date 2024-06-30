const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const log = require('electron-log');
require('electron-reload')(__dirname, { electron : require(`${__dirname}/node_modules/electron`) })

log.initialize();
log.info('');

let mainWindow;
let activated = false;

const createWindow = () => {
  if (activated) {
    windowOptions = {
      width: 1280,
      height: 720,
      minWidth: 1280,
      minHeight: 720,
      maxWidth: 1280,
      maxHeight: 720,
      icon: path.join(__dirname, 'img/see.png'),
      webPreferences: {
        preload: path.join(__dirname, 'js/preload.js'),
        contextIsolation: this,
        nodeIntegration: true,
      }
    };
    mainWindow = new BrowserWindow(windowOptions);
    mainWindow.setMenuBarVisibility(false);
    mainWindow.loadFile('html/main.html');
  } else {
    windowOptions = {
      width: 400,
      height: 700,
      minWidth: 400,
      minHeight: 700,
      maxWidth: 400,
      maxHeight: 700,
      icon: path.join(__dirname, 'img/see.png'),
      webPreferences: {
        preload: path.join(__dirname, 'js/preload.js'),
        contextIsolation: true,
        nodeIntegration: true,
      }
    },
    mainWindow = new BrowserWindow(windowOptions);
    mainWindow.setMenuBarVisibility(false);
    mainWindow.loadFile('html/login.html');
  }
};

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) ;
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

winT = true

ipcMain.on('login-success', () => {
  activated = true;
  if (winT ==true){
    mainWindow.close();
    createWindow();
    winT = false
  }
});
