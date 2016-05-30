'use strict'


/**
 * Main process
 */

const electron = require('electron');

const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const ipcMain = electron.ipcMain;

let mainWindow;
let insertWindow;

function createMainWindow(){
    mainWindow = new BrowserWindow({
        width: 1024,
        height: 720
    });
    
    mainWindow.loadURL('file://' + __dirname + '/View/main/main.html');
    mainWindow.webContents.openDevTools();
    
    mainWindow.on('closed', function(){
        mainWindow = null;
    });
}

app.on('ready', function(){
    createMainWindow();
});

app.on('window-all-closed', function(){
    app.quit();
});

app.on('activate', function(){
    if(mainWindow == null){
        createMainWindow();
    }
});