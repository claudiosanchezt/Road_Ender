#!/bin/bash

# Script de desarrollo para Tourist Guides App
# Ejecutar con: ./dev-setup.sh

echo "🚀 Configurando entorno de desarrollo para Tourist Guides App"

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Función para imprimir con color
print_status() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

print_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

# Verificar si Docker está instalado
if ! command -v docker &> /dev/null; then
    print_error "Docker no está instalado. Por favor instala Docker Desktop."
    exit 1
fi

# Verificar si Docker Compose está disponible
if ! command -v docker-compose &> /dev/null; then
    print_error "Docker Compose no está disponible."
    exit 1
fi

# Verificar si Node.js está instalado
if ! command -v node &> /dev/null; then
    print_error "Node.js no está instalado. Por favor instala Node.js 18+."
    exit 1
fi

# Verificar si npm está instalado
if ! command -v npm &> /dev/null; then
    print_error "npm no está instalado."
    exit 1
fi

print_info "Verificando versiones..."
echo "Node.js: $(node --version)"
echo "npm: $(npm --version)"
echo "Docker: $(docker --version)"
echo "Docker Compose: $(docker-compose --version)"

# Crear archivo .env si no existe
if [ ! -f .env ]; then
    print_info "Creando archivo .env desde .env.example"
    cp .env.example .env
    print_warning "Por favor configura las variables de entorno en el archivo .env"
fi

# Opción 1: Desarrollo con Docker (Recomendado)
echo ""
print_info "Opciones de desarrollo disponibles:"
echo "1. Desarrollo con Docker (Recomendado)"
echo "2. Desarrollo local con Node.js"
echo "3. Solo bases de datos con Docker"

read -p "Selecciona una opción (1-3): " option

case $option in
    1)
        print_info "Iniciando entorno completo con Docker..."
        docker-compose down
        docker-compose up --build -d
        print_status "Servicios iniciados:"
        echo "  - Aplicación web: http://localhost:3000"
        echo "  - Adminer (DB Admin): http://localhost:8080"
        echo "  - MongoDB: localhost:27017"
        echo "  - PostgreSQL: localhost:5432"
        echo "  - Redis: localhost:6379"
        ;;
    2)
        print_info "Iniciando solo bases de datos con Docker..."
        docker-compose up -d mongodb postgres redis
        print_info "Instalando dependencias de Node.js..."
        npm install
        print_info "Iniciando aplicación en modo desarrollo..."
        npm run dev &
        print_status "Servicios iniciados:"
        echo "  - Aplicación web: http://localhost:3000"
        echo "  - MongoDB: localhost:27017"
        echo "  - PostgreSQL: localhost:5432"
        echo "  - Redis: localhost:6379"
        ;;
    3)
        print_info "Iniciando solo bases de datos..."
        docker-compose up -d mongodb postgres redis adminer
        print_status "Bases de datos iniciadas:"
        echo "  - Adminer (DB Admin): http://localhost:8080"
        echo "  - MongoDB: localhost:27017"
        echo "  - PostgreSQL: localhost:5432"
        echo "  - Redis: localhost:6379"
        ;;
    *)
        print_error "Opción inválida"
        exit 1
        ;;
esac

echo ""
print_status "Entorno de desarrollo configurado correctamente!"

# Mostrar comandos útiles
echo ""
print_info "Comandos útiles:"
echo "  docker-compose logs -f          # Ver logs de todos los servicios"
echo "  docker-compose logs -f web      # Ver logs de la aplicación web"
echo "  docker-compose down             # Detener todos los servicios"
echo "  docker-compose restart          # Reiniciar servicios"
echo "  npm run dev                     # Ejecutar app en modo desarrollo"
echo "  npm run build                   # Construir para producción"
echo "  npm run lint                    # Ejecutar linter"

echo ""
print_info "Para conectar a las bases de datos:"
echo "  MongoDB: mongodb://admin:password@localhost:27017/tourist_guides_datamart"
echo "  PostgreSQL: postgresql://postgres:password@localhost:5432/tourist_guides_db"

echo ""
print_warning "Nota: Asegúrate de configurar las variables de entorno en .env antes de usar APIs externas"
