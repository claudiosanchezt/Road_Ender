#!/bin/bash
# 🚀 Tourist Guides App - Deployment Script
# Automated deployment for production environment

set -e

echo "🚀 Starting Tourist Guides App Deployment..."
echo "=========================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Functions
log_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

log_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

log_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

log_error() {
    echo -e "${RED}❌ $1${NC}"
}

# Check if docker and docker-compose are installed
check_dependencies() {
    log_info "Checking dependencies..."
    
    if ! command -v docker &> /dev/null; then
        log_error "Docker is not installed. Please install Docker first."
        exit 1
    fi
    
    if ! command -v docker-compose &> /dev/null; then
        log_error "Docker Compose is not installed. Please install Docker Compose first."
        exit 1
    fi
    
    log_success "Dependencies check passed"
}

# Setup environment variables
setup_environment() {
    log_info "Setting up environment variables..."
    
    if [ ! -f ".env" ]; then
        if [ -f ".env.template" ]; then
            cp .env.template .env
            log_warning "Created .env file from template. Please update the values!"
            log_warning "Edit .env file with your configuration before continuing."
            read -p "Press Enter after updating .env file..."
        else
            log_error ".env.template file not found!"
            exit 1
        fi
    fi
    
    log_success "Environment variables configured"
}

# Initialize databases
init_databases() {
    log_info "Initializing databases..."
    
    # Start only database services first
    docker-compose -f docker-compose-complete.yml up -d postgres mongodb redis
    
    # Wait for databases to be ready
    log_info "Waiting for databases to be ready..."
    sleep 30
    
    # Check database health
    if docker-compose -f docker-compose-complete.yml ps postgres | grep -q "healthy"; then
        log_success "PostgreSQL is ready"
    else
        log_error "PostgreSQL failed to start"
        exit 1
    fi
    
    if docker-compose -f docker-compose-complete.yml ps mongodb | grep -q "healthy"; then
        log_success "MongoDB is ready"
    else
        log_error "MongoDB failed to start"
        exit 1
    fi
    
    log_success "Databases initialized successfully"
}

# Build and deploy services
deploy_services() {
    log_info "Building and deploying services..."
    
    # Build images
    log_info "Building Docker images..."
    docker-compose -f docker-compose-complete.yml build --no-cache
    
    # Start all services
    log_info "Starting all services..."
    docker-compose -f docker-compose-complete.yml up -d
    
    # Wait for services to be ready
    log_info "Waiting for services to be ready..."
    sleep 60
    
    # Check service health
    check_service_health
    
    log_success "Services deployed successfully"
}

# Check service health
check_service_health() {
    log_info "Checking service health..."
    
    # Check API health
    if curl -f -s http://localhost:3001/health > /dev/null; then
        log_success "API service is healthy"
    else
        log_error "API service is not responding"
        show_logs "api"
        exit 1
    fi
    
    # Check Frontend (if available)
    if curl -f -s http://localhost:3000 > /dev/null; then
        log_success "Frontend service is healthy"
    else
        log_warning "Frontend service is not responding (this might be expected)"
    fi
}

# Show service logs
show_logs() {
    local service=$1
    log_info "Showing logs for $service:"
    docker-compose -f docker-compose-complete.yml logs --tail=50 $service
}

# Cleanup old containers and images
cleanup() {
    log_info "Cleaning up old containers and images..."
    
    # Remove unused containers
    docker container prune -f
    
    # Remove unused images
    docker image prune -f
    
    log_success "Cleanup completed"
}

# Setup monitoring (optional)
setup_monitoring() {
    read -p "Do you want to setup monitoring (Prometheus + Grafana)? (y/n): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        log_info "Setting up monitoring..."
        docker-compose -f docker-compose-complete.yml --profile monitoring up -d
        log_success "Monitoring setup completed"
        log_info "Grafana available at: http://localhost:3030 (admin/admin123)"
        log_info "Prometheus available at: http://localhost:9090"
    fi
}

# Backup function
backup_data() {
    log_info "Creating data backup..."
    
    BACKUP_DIR="./backups/$(date +%Y%m%d_%H%M%S)"
    mkdir -p $BACKUP_DIR
    
    # Backup PostgreSQL
    docker exec tourist_guides_postgres pg_dump -U postgres tourist_guides_db > $BACKUP_DIR/postgres_backup.sql
    
    # Backup MongoDB
    docker exec tourist_guides_mongodb mongodump --host localhost --port 27017 --out /tmp/mongodb_backup
    docker cp tourist_guides_mongodb:/tmp/mongodb_backup $BACKUP_DIR/
    
    log_success "Backup created at: $BACKUP_DIR"
}

# Main deployment function
deploy() {
    echo
    log_info "Tourist Guides App - Production Deployment"
    echo "=========================================="
    
    check_dependencies
    setup_environment
    cleanup
    init_databases
    deploy_services
    setup_monitoring
    
    echo
    log_success "🎉 DEPLOYMENT COMPLETED SUCCESSFULLY!"
    echo "=========================================="
    log_info "Services Status:"
    docker-compose -f docker-compose-complete.yml ps
    echo
    log_info "Available Services:"
    echo "• API: http://localhost:3001"
    echo "• Frontend: http://localhost:3000"
    echo "• Health Check: http://localhost:3001/health"
    echo "• API Documentation: http://localhost:3001/api"
    echo
    log_info "Database Services:"
    echo "• PostgreSQL: localhost:5432"
    echo "• MongoDB: localhost:27017"
    echo "• Redis: localhost:6379"
    echo
}

# Handle script arguments
case "${1:-deploy}" in
    "deploy")
        deploy
        ;;
    "stop")
        log_info "Stopping all services..."
        docker-compose -f docker-compose-complete.yml down
        log_success "All services stopped"
        ;;
    "restart")
        log_info "Restarting all services..."
        docker-compose -f docker-compose-complete.yml down
        deploy
        ;;
    "logs")
        service=${2:-api}
        show_logs $service
        ;;
    "backup")
        backup_data
        ;;
    "cleanup")
        cleanup
        ;;
    "health")
        check_service_health
        ;;
    *)
        echo "Usage: $0 {deploy|stop|restart|logs [service]|backup|cleanup|health}"
        echo "  deploy  - Full deployment (default)"
        echo "  stop    - Stop all services"
        echo "  restart - Restart all services"
        echo "  logs    - Show service logs"
        echo "  backup  - Create data backup"
        echo "  cleanup - Clean unused containers/images"
        echo "  health  - Check service health"
        exit 1
        ;;
esac
