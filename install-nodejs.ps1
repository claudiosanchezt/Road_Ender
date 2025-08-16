# Script para instalar Node.js en Windows
# Ejecutar como Administrador

Write-Host "🚀 Instalando Node.js para Tourist Guides App" -ForegroundColor Cyan

function Write-Success {
    param($Message)
    Write-Host "✅ $Message" -ForegroundColor Green
}

function Write-Info {
    param($Message)
    Write-Host "ℹ️  $Message" -ForegroundColor Blue
}

function Write-Warning {
    param($Message)
    Write-Host "⚠️  $Message" -ForegroundColor Yellow
}

Write-Info "Verificando permisos de administrador..."
if (-NOT ([Security.Principal.WindowsPrincipal] [Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole] "Administrator")) {
    Write-Warning "Este script debe ejecutarse como Administrador."
    Write-Host "Por favor, ejecuta PowerShell como Administrador y vuelve a ejecutar este script."
    Read-Host "Presiona Enter para continuar..."
    exit 1
}

Write-Info "Intentando instalar Node.js usando winget..."

try {
    # Verificar si winget está disponible
    $wingetVersion = winget --version
    Write-Success "winget encontrado: $wingetVersion"
    
    # Instalar Node.js LTS
    Write-Info "Instalando Node.js LTS..."
    winget install --id OpenJS.NodeJS.LTS --accept-package-agreements --accept-source-agreements --silent
    
    Write-Success "Node.js instalado correctamente"
} catch {
    Write-Warning "No se pudo instalar con winget. Intentando método alternativo..."
    
    # Método alternativo: descargar directamente
    $nodeVersion = "18.20.4"
    $nodeUrl = "https://nodejs.org/dist/v$nodeVersion/node-v$nodeVersion-x64.msi"
    $tempPath = "$env:TEMP\nodejs-installer.msi"
    
    Write-Info "Descargando Node.js v$nodeVersion..."
    Invoke-WebRequest -Uri $nodeUrl -OutFile $tempPath
    
    Write-Info "Instalando Node.js..."
    Start-Process msiexec.exe -Wait -ArgumentList "/i $tempPath /quiet /norestart"
    
    Remove-Item $tempPath -Force
    Write-Success "Node.js instalado correctamente"
}

Write-Info "Actualizando variables de entorno..."
$env:PATH = [System.Environment]::GetEnvironmentVariable("PATH", "Machine") + ";" + [System.Environment]::GetEnvironmentVariable("PATH", "User")

Write-Info "Verificando instalación..."
try {
    $nodeVersion = node --version
    $npmVersion = npm --version
    
    Write-Success "✅ Node.js instalado: $nodeVersion"
    Write-Success "✅ npm instalado: $npmVersion"
} catch {
    Write-Warning "Reinicia PowerShell para que los cambios tomen efecto"
}

Write-Host ""
Write-Info "Próximos pasos:"
Write-Host "1. Reinicia PowerShell o abre una nueva ventana"
Write-Host "2. Navega al directorio del proyecto: cd c:\GitHub\Road_Ender"
Write-Host "3. Instala las dependencias: npm install"
Write-Host "4. Ejecuta el proyecto: npm run dev"

Read-Host "Presiona Enter para continuar..."
