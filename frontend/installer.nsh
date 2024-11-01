!include "Logic.nsh"
!include "WinMessages.nsh"
!include "EnvVar.nsh"

!macro customInstall
    SetOutPath "$INSTDIR"

    ; Create the bin directory
    StrCpy $R1 "$INSTDIR\bin"
    IfFileExists "$R1" 0 +2
    CreateDirectory "$R1"

    ; Create the batch file
    FileOpen $0 "$R1\todo.bat" w
    FileWrite $0 "@echo off\r\n"
    FileWrite $0 "echo Running Todo CLI...\r\n" ; Example command
    FileClose $0

    ; Add the bin directory to the PATH
    ${GetEnvVar} "PATH" $2
    StrCpy $3 "$R1"
    StrCpy $4 "$2"
    StrCpy $5 "$3;$4"

    ; Check if the path is already in PATH
    StrCpy $6 "$2"
    StrCpy $7 "$3"
    StrCpy $8 "$6;$7"

    ; If $2 does not equal $8, append the new path
    If $2 != "$8"
        ; Set the new PATH
        ${SetEnvVar} "PATH" "$5"
    !endif

    ; Notify user of successful installation
    MessageBox MB_OK "Todo CLI installed successfully. You can now use the command 'todo' to get started."
!macroend