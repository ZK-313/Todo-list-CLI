// const { contextBridge, ipcRenderer } = require('electron');
// console.log("I am here")
//
// contextBridge.exposeInMainWorld('electronAPI', {
//     getit: async () => await ipcRenderer.invoke('getHome')
// });




const { contextBridge, ipcRenderer } = require('electron');
const fs = require('fs');
const path = require('path');
const PowerShell = require("powershell");

contextBridge.exposeInMainWorld('electronAPI', {
    getHomePath: () => ipcRenderer.invoke('getHome'), // Get the home path
    readFile: (filePath, encoding) => new Promise((resolve, reject) => {
        fs.readFile(filePath, encoding, (err, data) => {
            if (err) reject(err);
            else resolve(data);
        });
    }),
    writeFile: (filePath, data) => new Promise((resolve, reject) => {
        fs.writeFile(filePath, data, (err) => {
            if (err) reject(err);
            else resolve();
        });
    }),
    getPath: (...segments) => path.join(...segments),
    runPowerShell: (command) => new PowerShell(command)
});


