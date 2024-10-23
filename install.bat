@echo off

:: Define installation directory
set INSTALL_DIR=%ProgramFiles%\MyTodo

:: Create the directory if it doesn't exist
if not exist "%INSTALL_DIR%" (
    mkdir "%INSTALL_DIR%"
)

:: Copy the todo.jar file
copy todo-jar-with-dependencies.jar "%INSTALL_DIR%\"

:: Create the .bat file in a folder that's in the system PATH (e.g., C:\Windows\System32)
echo @echo off > %SystemRoot%\System32\todo.bat
echo java -jar "%INSTALL_DIR%\todo-jar-with-dependencies.jar" %%* >> %SystemRoot%\System32\todo.bat

echo Installation complete. You can now use 'todo -h' in any command prompt.

pause
