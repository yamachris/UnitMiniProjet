@echo off
setlocal enabledelayedexpansion

set "repertoire=./svg_test" 

for %%F in ("%repertoire%\*.*") do (
    set "nomFichier=%%~nF"
    set "extension=%%~xF"
    
    if not "!nomFichier:~2,1!"=="" (
        set "nouveauNom=!nomFichier:~0,2!!extension!"
        ren "%%F" "!nouveauNom!"
    )
)

endlocal
pause