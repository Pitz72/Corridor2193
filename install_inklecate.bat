@echo off
echo =========================================
echo   INSTALLAZIONE AUTOMATICA INKLECATE
echo   Per Corridor 2193 - The Last Run
echo =========================================
echo.

REM Crea directory per Inklecate
if not exist "C:\Tools\Ink" (
    echo Creazione directory C:\Tools\Ink...
    mkdir "C:\Tools\Ink"
)

REM Download dell'ultima versione di Inklecate
echo Scaricamento Inklecate...
powershell -Command "& {$url = 'https://github.com/inkle/ink/releases/latest/download/ink-windows.zip'; $output = 'C:\Tools\Ink\ink-windows.zip'; Invoke-WebRequest -Uri $url -OutFile $output; echo 'Download completato!'}"

REM Estrazione
echo Estrazione file...
powershell -Command "& {Expand-Archive -Path 'C:\Tools\Ink\ink-windows.zip' -DestinationPath 'C:\Tools\Ink' -Force; echo 'Estrazione completata!'}"

REM Pulizia file zip
del "C:\Tools\Ink\ink-windows.zip"

REM Aggiunta al PATH (per la sessione corrente)
echo Aggiunta al PATH...
set PATH=%PATH%;C:\Tools\Ink

REM Verifica installazione
echo.
echo Verifica installazione...
C:\Tools\Ink\inklecate.exe --version

echo.
echo =========================================
echo   INSTALLAZIONE COMPLETATA!
echo =========================================
echo.
echo Inklecate e' stato installato in C:\Tools\Ink
echo.
echo Per aggiungere permanentemente al PATH:
echo 1. Apri Pannello di Controllo ^> Sistema
echo 2. Impostazioni di sistema avanzate
echo 3. Variabili d'ambiente
echo 4. Modifica la variabile PATH
echo 5. Aggiungi: C:\Tools\Ink
echo.
echo Oppure esegui questo comando come Amministratore:
echo setx PATH "%%PATH%%;C:\Tools\Ink" /M
echo.
echo Ora puoi compilare il tuo progetto con:
echo inklecate -o Corridor2193.json Corridor2193.ink
echo.
pause
