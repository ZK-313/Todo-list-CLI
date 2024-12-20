@echo off
setlocal

set "INSTALL_DIR=%USERPROFILE%\todo-cli"
set "BIN_DIR=%USERPROFILE%\bin"

if not exist "%INSTALL_DIR%" (
    mkdir "%INSTALL_DIR%"
)

:: Copy the JAR file to the installation directory
copy /Y "todo-jar-with-dependencies.jar" "%INSTALL_DIR%\todo-jar-with-dependencies.jar"
copy /Y "todo_list.json" "%INSTALL_DIR%\todo_list.json"
copy /Y "todo_list.ser" "%INSTALL_DIR%\todo_list.ser"


if not exist "%BIN_DIR%" (
    mkdir "%BIN_DIR%"
)

(
    echo @echo off
    echo java -jar "%INSTALL_DIR%\todo-jar-with-dependencies.jar" %%*
) > "%BIN_DIR%\todo.bat"

:: Check if the BIN_DIR is already in the PATH
powershell -Command "if ($env:PATH -notlike '*%BIN_DIR%*') { $newPath = $env:PATH + ';%BIN_DIR%'; [Environment]::SetEnvironmentVariable('PATH', $newPath, 'User') }"


echo Todo CLI installed successfully.
echo You can now use the command 'todo -h' to get started.

pause

endlocal
