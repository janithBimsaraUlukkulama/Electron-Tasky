const electron = require('electron');
const path = require('path');
const TimerTray = require('./app/timer_tray');

const {app, BrowserWindow} = electron;

let mainWindow, tray;

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        // webPreferences: {nodeIntegration: true, contextIsolation: false},
        height: 500,
        width: 300,
        frame: false,
        resizable: false,
        show: false
    });

    // hide app icon from task menu
    process.platform === 'win32' ? mainWindow.setSkipTaskbar(true) : app.dock.hide();

    mainWindow.loadURL(`file://${__dirname}/src/index.html`);
    // hide app when un focus
    mainWindow.on('blur', () => {
        mainWindow.hide();
    });

    const iconName = process.platform === 'win32' ? 'windows-icon.png' : 'iconTemplate.png';
    const iconPath = path.join(__dirname, `./src/assets/${iconName}`);
    tray = new TimerTray(iconPath, mainWindow);

});