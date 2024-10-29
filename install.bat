@echo off
setlocal

set "INSTALL_DIR=%USERPROFILE%\todo-cli"
set "BIN_DIR=%USERPROFILE%\bin"

:: Create the installation directory if it doesn't exist
if not exist "%INSTALL_DIR%" (
    mkdir "%INSTALL_DIR%"
)

:: Copy the JAR file to the installation directory
copy /Y "todo-jar-with-dependencies.jar" "%INSTALL_DIR%\todo-jar-with-dependencies.jar"

:: Create the bin directory if it doesn't exist
if not exist "%BIN_DIR%" (
    mkdir "%BIN_DIR%"
)

:: Create the executable script
(
    echo @echo off
    echo java -jar "%INSTALL_DIR%\todo-jar-with-dependencies.jar" %%*
) > "%BIN_DIR%\todo.bat"

:: Check if the BIN_DIR is already in the PATH
powershell -Command "if ($env:PATH -notlike '*%BIN_DIR%*') { $newPath = $env:PATH + ';%BIN_DIR%'; [Environment]::SetEnvironmentVariable('PATH', $newPath, 'User') }"

:: Enable ANSI color code support in PowerShell
echo Enabling ANSI color code support in PowerShell...
powershell -Command "if (!(Test-Path $PROFILE)) { New-Item -ItemType File -Path $PROFILE -Force }"
powershell -Command "Add-Content -Path $PROFILE -Value 'if ($PSVersionTable.PSVersion.Major -ge 6) { [Console]::OutputEncoding = [System.Text.Encoding]::UTF8; Clear-Host }'"

echo Todo CLI installed successfully.
echo You can now use the command 'todo -h' to get started.

pause

endlocal