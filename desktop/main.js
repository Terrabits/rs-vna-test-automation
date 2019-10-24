'use strict';
const {app, BrowserWindow} = require('electron');
const path                 = require('path');
const ServerProcess        = require('./src/server-process');
const url                  = require('url');
const waitOn               = require('wait-on');

// start the http server
let serverProcess = new ServerProcess();

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

function createWindow() {
  console.log('createWindow()');

  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1024, height: 768,
    show: false,
    webPreferences: {
      // nodeIntegration: true
    }
  });

  // Don't show until we are ready and loaded
  mainWindow.once('ready-to-show', () => {
    console.log('ready to show');
    mainWindow.show();
    // Open the DevTools automatically if developing
    if (process.argv.find((i) => { return i === '--open-devtools'; })) {
      mainWindow.webContents.openDevTools();
    }
  });

  // Emitted when the window is closed.
  mainWindow.on('closed', function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });

  // and load the index.html of the app.
  const indexPath = 'http://localhost:8080/index.html';
  serverProcess.available().then(() => {
    mainWindow.loadURL(indexPath);
  }).catch(() => {
    mainWindow.destroy();
    mainWindow = null;
    console.log('The server is down!');
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('will-quit', () => {
  serverProcess.kill();
});

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});
