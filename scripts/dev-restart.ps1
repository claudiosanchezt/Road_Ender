# Reinicio limpio en modo dev para Road_Ender
param(
  [switch]$InstallDeps
)

Write-Host "Parando procesos node (si existen)..."
try {
  taskkill /F /IM node.exe /T | Out-Null
} catch {
  Write-Host "No se encontraron procesos node o no se pudo finalizar."
}

Write-Host "Bajando contenedores y limpiando..."
docker compose down --volumes --remove-orphans

Write-Host "Levantando infra (Postgres, Mongo)..."
docker compose up -d postgres mongodb

Write-Host "Construyendo y levantando API..."
docker compose up -d --build api

if ($InstallDeps) {
  Write-Host "Instalando dependencias npm (esto puede tardar)..."
  Push-Location "$(Split-Path -Parent $MyInvocation.MyCommand.Definition)\.."
  Set-Location -Path "C:\GitHub\Road_Ender"
  npm install
  Pop-Location
}

Write-Host "Comprobando health del API (http://localhost:4000/api/health)..."
try {
  Start-Sleep -Seconds 3
  $r = Invoke-WebRequest -UseBasicParsing http://localhost:4000/api/health -TimeoutSec 10
  Write-Host "API status:" $r.StatusCode
} catch {
  Write-Host "No responde todavía el API. Esperá unos segundos y volvé a probar."
}

Write-Host "LISTO. Para arrancar frontend en hot-reload en otra terminal ejecutá:" 
Write-Host "  cd C:\GitHub\Road_Ender"
Write-Host "  npx next dev"

Write-Host "Si querés que el script también instale dependencias, ejecutalo así (PowerShell con privilegios):"
Write-Host "  .\scripts\dev-restart.ps1 -InstallDeps"
