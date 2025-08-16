# Script de desarrollo para Tourist Guides App en Windows
# Ejecutar con: .\dev-setup.ps1

Write-Host "🚀 Configurando entorno de desarrollo para Tourist Guides App" -ForegroundColor Cyan

# Función para imprimir con colores
function Write-Success {
    param($Message)
    Write-Host "✅ $Message" -ForegroundColor Green
}

function Write-Warning {
    param($Message)
    Write-Host "⚠️  $Message" -ForegroundColor Yellow
}

function Write-Error {
    param($Message)
    Write-Host "❌ $Message" -ForegroundColor Red
}

function Write-Info {
    param($Message)
    Write-Host "ℹ️  $Message" -ForegroundColor Blue
}

# Verificar si Docker está instalado
if (-not (Get-Command docker -ErrorAction SilentlyContinue)) {
    Write-Error "Docker no está instalado. Por favor instala Docker Desktop."
    exit 1
}

# Verificar si Docker Compose está disponible
if (-not (Get-Command docker-compose -ErrorAction SilentlyContinue)) {
    Write-Error "Docker Compose no está disponible."
    exit 1
}

# Verificar si Node.js está instalado
if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
    Write-Error "Node.js no está instalado. Por favor instala Node.js 18+."
    exit 1
}

# Verificar si npm está instalado
if (-not (Get-Command npm -ErrorAction SilentlyContinue)) {
    Write-Error "npm no está instalado."
    exit 1
}

Write-Info "Verificando versiones..."
Write-Host "Node.js: $(node --version)"
Write-Host "npm: $(npm --version)"
Write-Host "Docker: $(docker --version)"
Write-Host "Docker Compose: $(docker-compose --version)"

# Crear archivo .env si no existe
if (-not (Test-Path .env)) {
    Write-Info "Creando archivo .env desde .env.example"
    Copy-Item .env.example .env
    Write-Warning "Por favor configura las variables de entorno en el archivo .env"
}

# Opciones de desarrollo
Write-Host ""
Write-Info "Opciones de desarrollo disponibles:"
Write-Host "1. Desarrollo con Docker (Recomendado)"
Write-Host "2. Desarrollo local con Node.js"
Write-Host "3. Solo bases de datos con Docker"

$option = Read-Host "Selecciona una opción (1-3)"

switch ($option) {
    "1" {
        Write-Info "Iniciando entorno completo con Docker..."
        docker-compose down
        docker-compose up --build -d
        Write-Success "Servicios iniciados:"
        Write-Host "  - Aplicación web: http://localhost:3000"
        Write-Host "  - Adminer (DB Admin): http://localhost:8080"
        Write-Host "  - MongoDB: localhost:27017"
        Write-Host "  - PostgreSQL: localhost:5432"
        Write-Host "  - Redis: localhost:6379"
    }
    "2" {
        Write-Info "Iniciando solo bases de datos con Docker..."
        docker-compose up -d mongodb postgres redis
        Write-Info "Instalando dependencias de Node.js..."
        npm install
        Write-Info "Iniciando aplicación en modo desarrollo..."
        Start-Process -NoNewWindow npm -ArgumentList "run", "dev"
        Write-Success "Servicios iniciados:"
        Write-Host "  - Aplicación web: http://localhost:3000"
        Write-Host "  - MongoDB: localhost:27017"
        Write-Host "  - PostgreSQL: localhost:5432"
        Write-Host "  - Redis: localhost:6379"
    }
    "3" {
        Write-Info "Iniciando solo bases de datos..."
        docker-compose up -d mongodb postgres redis adminer
        Write-Success "Bases de datos iniciadas:"
        Write-Host "  - Adminer (DB Admin): http://localhost:8080"
        Write-Host "  - MongoDB: localhost:27017"
        Write-Host "  - PostgreSQL: localhost:5432"
        Write-Host "  - Redis: localhost:6379"
    }
    default {
        Write-Error "Opción inválida"
        exit 1
    }
}

Write-Host ""
Write-Success "Entorno de desarrollo configurado correctamente!"

# Mostrar comandos útiles
Write-Host ""
Write-Info "Comandos útiles:"
Write-Host "  docker-compose logs -f          # Ver logs de todos los servicios"
Write-Host "  docker-compose logs -f web      # Ver logs de la aplicación web"
Write-Host "  docker-compose down             # Detener todos los servicios"
Write-Host "  docker-compose restart          # Reiniciar servicios"
Write-Host "  npm run dev                     # Ejecutar app en modo desarrollo"
Write-Host "  npm run build                   # Construir para producción"
Write-Host "  npm run lint                    # Ejecutar linter"

Write-Host ""
Write-Info "Para conectar a las bases de datos:"
Write-Host "  MongoDB: mongodb://admin:password@localhost:27017/tourist_guides_datamart"
Write-Host "  PostgreSQL: postgresql://postgres:password@localhost:5432/tourist_guides_db"

Write-Host ""
Write-Warning "Nota: Asegúrate de configurar las variables de entorno en .env antes de usar APIs externas"
