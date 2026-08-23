@echo off
setlocal
cd /d "%~dp0"

where npm.cmd >nul 2>&1
if errorlevel 1 goto no_node

if not exist "node_modules\." (
  echo Installing dependencies for the first launch...
  call npm.cmd install
  if errorlevel 1 goto install_failed
)

if "%META4PRO_LAUNCHER_TEST%"=="1" (
  echo LAUNCHER_OK
  exit /b 0
)

echo Starting META4PRO interactive preview...
start "META4PRO Preview - close this window to stop" cmd.exe /k "cd /d ""%~dp0"" && call npm.cmd run dev -- --port 4174 --strictPort"

powershell.exe -NoProfile -Command "$u='http://127.0.0.1:4174/meta4pro-redesign/'; $ok=$false; for($i=0;$i -lt 80;$i++){try{$r=Invoke-WebRequest -UseBasicParsing -Uri $u -TimeoutSec 1;if($r.StatusCode -eq 200 -and $r.Content -match 'META4PRO'){$ok=$true;break}}catch{};Start-Sleep -Milliseconds 250};if($ok){Start-Process $u;exit 0};exit 1"
if errorlevel 1 goto server_failed

exit /b 0

:no_node
echo Node.js was not found. Install Node.js LTS and run this file again.
pause
exit /b 1

:install_failed
echo npm install failed.
pause
exit /b 1

:server_failed
echo The preview server did not start. Check the META4PRO Preview window.
pause
exit /b 1
