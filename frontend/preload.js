// window.addEventListener('DOMContentLoaded', () => {
//     const fs = require('fs');
//     const path = require('path');
//
//
//     const batchFilePath = path.join(installDir, 'todo.bat');
//     const jarFilePath = path.join(installDir, 'todo-jar-with-dependencies.jar');
//
//     const batchFileContent = `@echo off\njava -jar "${jarFilePath}" %*`;
//
//
//     if (!fs.existsSync(batchFilePath)) {
//         // Write the batch file only if it doesn't exist
//         fs.writeFileSync(batchFilePath, batchFileContent);
//         console.log('Batch file created successfully.');
//     } else {
//         console.log('Batch file already exists. No action taken.');
//     }
//   })
import path from "path";
import fs from "fs";
import {exec} from "child_process";

window.addEventListener('DOMContentLoaded', () => {
    const fs = require('fs');
    const path = require('path');
    const { exec } = require('child_process');

// Define your installation directory
    const installDir = './'; // Replace with the actual path to your install directory

// Define paths for the batch file and jar file
    const batchFilePath = path.join(installDir, 'todo.bat');
    console.log(batchFilePath)
    const jarFilePath = path.join(installDir, 'todo-jar-with-dependencies.jar');

// Content for the batch file
    const batchFileContent = `@echo off\njava -jar "${jarFilePath}" %*`;

// Check if the .bat file already exists
    if (!fs.existsSync(batchFilePath)) {
        // Write the batch file only if it doesn't exist
        fs.writeFileSync(batchFilePath, batchFileContent);
        console.log('Batch file created successfully.');
    } else {
        console.log('Batch file already exists. No action taken.');
    }

// Function to add the directory to the user's PATH
//     const addToPath = (dir) => {
//         // Check if the directory is already in PATH
//         exec(`echo %PATH%`, (error, stdout) => {
//             if (stdout.includes(dir)) {
//                 console.log('Directory is already in PATH.');
//                 return;
//             }
// //powershell -Command "if ($env:PATH -notlike '*%BIN_DIR%*') { $newPath = $env:PATH + ';%BIN_DIR%'; [Environment]::SetEnvironmentVariable('PATH', $newPath, 'User') }"
//             // Add the directory to PATH using setx
//             const command = `setx PATH "%PATH%;${dir}"`;
//
//             exec(command, (err) => {
//                 if (err) {
//                     console.error('Failed to add to PATH:', err);
//                 } else {
//                     console.log('Directory added to PATH successfully.');
//                 }
//             });
//         });
//     };

// Call the function to add the batch file's directory to the PATH
    //addToPath(installDir);
})


