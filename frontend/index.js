const { app, BrowserWindow, ipcMain } = require('electron')
const {fs} = require('fs');
// include the Node.js 'path' module at the top of your file
const path = require('node:path')

// modify your existing createWindow() function
const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        autoHideMenuBar: true,
        webPreferences: {
            nodeIntegration: true,  // Enable Node integration
            contextIsolation: true, // Disable context isolation
            preload: path.join(__dirname, 'preload.js')
        }
})
win.loadFile('index.html')
}
app.whenReady().then(() => {
    createWindow()

})
ipcMain.handle('getHome', () => app.getPath("home"));


app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})
