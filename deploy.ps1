# 🚀 Tourist Guides App - PowerShell Deployment Script
# Automated deployment for Windows environments

param(
    [Parameter(Position=0)]
    [ValidateSet("deploy", "stop", "restart", "logs", "backup", "cleanup", "health")]
    [string]$Action = "deploy",
    
    [Parameter(Position=1)]
    [string]$Service = "api"
)

# Colors for output
$Red = [System.ConsoleColor]::Red
$Green = [System.ConsoleColor]::Green
$Yellow = [System.ConsoleColor]::Yellow
$Blue = [System.ConsoleColor]::Blue
$White = [System.ConsoleColor]::White

function Write-Log {
    param(
        [string]$Message,
        [System.ConsoleColor]$Color = $White,
        [string]$Icon = "ℹ️"
    )
    Write-Host "$Icon $Message" -ForegroundColor $Color
}

function Write-Info { param([string]$Message) Write-Log $Message $Blue "ℹ️" }
function Write-Success { param([string]$Message) Write-Log $Message $Green "✅" }
function Write-Warning { param([string]$Message) Write-Log $Message $Yellow "⚠️" }
function Write-Error { param([string]$Message) Write-Log $Message $Red "❌" }

function Test-Dependencies {
    Write-Info "Checking dependencies..."
    
    if (!(Get-Command docker -ErrorAction SilentlyContinue)) {
        Write-Error "Docker is not installed. Please install Docker Desktop first."
        exit 1
    }
    
    if (!(Get-Command docker-compose -ErrorAction SilentlyContinue)) {
        Write-Error "Docker Compose is not installed. Please install Docker Compose first."
        exit 1
    }
    
    Write-Success "Dependencies check passed"
}

function Initialize-Environment {
    Write-Info "Setting up environment variables..."
    
    if (!(Test-Path ".env")) {
        if (Test-Path ".env.template") {
            Copy-Item ".env.template" ".env"
            Write-Warning "Created .env file from template. Please update the values!"
            Write-Warning "Edit .env file with your configuration before continuing."
            Read-Host "Press Enter after updating .env file"
        } else {
            Write-Error ".env.template file not found!"
            exit 1
        }
    }
    
    Write-Success "Environment variables configured"
}

function Initialize-Databases {
    Write-Info "Initializing databases..."
    
    # Start only database services first
    docker-compose -f docker-compose-complete.yml up -d postgres mongodb redis
    
    # Wait for databases to be ready
    Write-Info "Waiting for databases to be ready..."
    Start-Sleep -Seconds 30
    
    # Check database health
    $postgresStatus = docker-compose -f docker-compose-complete.yml ps postgres
    if ($postgresStatus -match "healthy") {
        Write-Success "PostgreSQL is ready"
    } else {
        Write-Error "PostgreSQL failed to start"
        exit 1
    }
    
    $mongoStatus = docker-compose -f docker-compose-complete.yml ps mongodb
    if ($mongoStatus -match "healthy") {
        Write-Success "MongoDB is ready"
    } else {
        Write-Error "MongoDB failed to start"
        exit 1
    }
    
    Write-Success "Databases initialized successfully"
}

function Deploy-Services {
    Write-Info "Building and deploying services..."
    
    # Build images
    Write-Info "Building Docker images..."
    docker-compose -f docker-compose-complete.yml build --no-cache
    
    # Start all services
    Write-Info "Starting all services..."
    docker-compose -f docker-compose-complete.yml up -d
    
    # Wait for services to be ready
    Write-Info "Waiting for services to be ready..."
    Start-Sleep -Seconds 60
    
    # Check service health
    Test-ServiceHealth
    
    Write-Success "Services deployed successfully"
}

function Test-ServiceHealth {
    Write-Info "Checking service health..."
    
    try {
        # Check API health
        $response = Invoke-WebRequest -Uri "http://localhost:3001/health" -UseBasicParsing -TimeoutSec 10
        if ($response.StatusCode -eq 200) {
            Write-Success "API service is healthy"
        } else {
            Write-Error "API service returned status code: $($response.StatusCode)"
            Show-ServiceLogs "api"
            exit 1
        }
    } catch {
        Write-Error "API service is not responding: $($_.Exception.Message)"
        Show-ServiceLogs "api"
        exit 1
    }
    
    try {
        # Check Frontend (if available)
        $response = Invoke-WebRequest -Uri "http://localhost:3000" -UseBasicParsing -TimeoutSec 10
        if ($response.StatusCode -eq 200) {
            Write-Success "Frontend service is healthy"
        }
    } catch {
        Write-Warning "Frontend service is not responding (this might be expected)"
    }
}

function Show-ServiceLogs {
    param([string]$ServiceName)
    Write-Info "Showing logs for $ServiceName:"
    docker-compose -f docker-compose-complete.yml logs --tail=50 $ServiceName
}

function Invoke-Cleanup {
    Write-Info "Cleaning up old containers and images..."
    
    # Remove unused containers
    docker container prune -f
    
    # Remove unused images
    docker image prune -f
    
    Write-Success "Cleanup completed"
}

function Initialize-Monitoring {
    $response = Read-Host "Do you want to setup monitoring (Prometheus + Grafana)? (y/n)"
    if ($response -eq 'y' -or $response -eq 'Y') {
        Write-Info "Setting up monitoring..."
        docker-compose -f docker-compose-complete.yml --profile monitoring up -d
        Write-Success "Monitoring setup completed"
        Write-Info "Grafana available at: http://localhost:3030 (admin/admin123)"
        Write-Info "Prometheus available at: http://localhost:9090"
    }
}

function Backup-Data {
    Write-Info "Creating data backup..."
    
    $backupDir = "./backups/$(Get-Date -Format 'yyyyMMdd_HHmmss')"
    New-Item -ItemType Directory -Path $backupDir -Force | Out-Null
    
    # Backup PostgreSQL
    docker exec tourist_guides_postgres pg_dump -U postgres tourist_guides_db > "$backupDir/postgres_backup.sql"
    
    # Backup MongoDB
    docker exec tourist_guides_mongodb mongodump --host localhost --port 27017 --out /tmp/mongodb_backup
    docker cp tourist_guides_mongodb:/tmp/mongodb_backup "$backupDir/"
    
    Write-Success "Backup created at: $backupDir"
}

function Start-Deployment {
    Write-Host ""
    Write-Info "Tourist Guides App - Production Deployment"
    Write-Host "=========================================="
    
    Test-Dependencies
    Initialize-Environment
    Invoke-Cleanup
    Initialize-Databases
    Deploy-Services
    Initialize-Monitoring
    
    Write-Host ""
    Write-Success "🎉 DEPLOYMENT COMPLETED SUCCESSFULLY!"
    Write-Host "=========================================="
    Write-Info "Services Status:"
    docker-compose -f docker-compose-complete.yml ps
    Write-Host ""
    Write-Info "Available Services:"
    Write-Host "• API: http://localhost:3001"
    Write-Host "• Frontend: http://localhost:3000"
    Write-Host "• Health Check: http://localhost:3001/health"
    Write-Host "• API Documentation: http://localhost:3001/api"
    Write-Host ""
    Write-Info "Database Services:"
    Write-Host "• PostgreSQL: localhost:5432"
    Write-Host "• MongoDB: localhost:27017"
    Write-Host "• Redis: localhost:6379"
    Write-Host ""
}

function Stop-Services {
    Write-Info "Stopping all services..."
    docker-compose -f docker-compose-complete.yml down
    Write-Success "All services stopped"
}

function Restart-Services {
    Write-Info "Restarting all services..."
    docker-compose -f docker-compose-complete.yml down
    Start-Deployment
}

# Main script execution
switch ($Action) {
    "deploy" {
        Start-Deployment
    }
    "stop" {
        Stop-Services
    }
    "restart" {
        Restart-Services
    }
    "logs" {
        Show-ServiceLogs $Service
    }
    "backup" {
        Backup-Data
    }
    "cleanup" {
        Invoke-Cleanup
    }
    "health" {
        Test-ServiceHealth
    }
    default {
        Write-Host "Usage: .\deploy.ps1 {deploy|stop|restart|logs [service]|backup|cleanup|health}"
        Write-Host "  deploy  - Full deployment (default)"
        Write-Host "  stop    - Stop all services"
        Write-Host "  restart - Restart all services"
        Write-Host "  logs    - Show service logs"
        Write-Host "  backup  - Create data backup"
        Write-Host "  cleanup - Clean unused containers/images"
        Write-Host "  health  - Check service health"
        exit 1
    }
}
