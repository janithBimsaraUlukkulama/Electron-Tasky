const electron = require('electron');
const path = require('path');
const TimerTray = require('./app/timer_tray');
const MainWindow = require('./app/main_window');

const {app} = electron;

let mainWindow, tray;

app.on('ready', () => {
    mainWindow = new MainWindow(`file://${__dirname}/src/index.html`);

    // hide app icon from task menu
    process.platform === 'win32' ? mainWindow.setSkipTaskbar(true) : app.dock.hide();

    const iconName = process.platform === 'win32' ? 'windows-icon.png' : 'iconTemplate.png';
    const iconPath = path.join(__dirname, `./src/assets/${iconName}`);
    tray = new TimerTray(iconPath, mainWindow);

});