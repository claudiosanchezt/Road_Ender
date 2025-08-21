param(
    [string]$BackupDir = "./backups",
    [string]$PgContainer = "tourist_guides_app-postgres-1",
    [string]$MongoContainer = "tourist_guides_app-mongodb-1"
)

Write-Output "Preparing local backup directories..."
if (-not (Test-Path $BackupDir)) { New-Item -ItemType Directory -Path $BackupDir | Out-Null }
if (-not (Test-Path "$BackupDir/postgres")) { New-Item -ItemType Directory -Path "$BackupDir/postgres" | Out-Null }
if (-not (Test-Path "$BackupDir/mongodb")) { New-Item -ItemType Directory -Path "$BackupDir/mongodb" | Out-Null }
if (-not (Test-Path "$BackupDir/code")) { New-Item -ItemType Directory -Path "$BackupDir/code" | Out-Null }

$ts = Get-Date -Format "yyyyMMdd_HHmmss"

Write-Output "Dumping PostgreSQL database from container '$PgContainer'..."
docker exec $PgContainer pg_dump -U postgres -Fc -f /tmp/tourist_guides_db.dump tourist_guides_db | Out-Null
docker cp "$($PgContainer):/tmp/tourist_guides_db.dump" "$BackupDir/postgres/tourist_guides_db_$ts.dump" 2>$null
if ($LASTEXITCODE -eq 0) { Write-Output "Postgres dump saved to $BackupDir/postgres/tourist_guides_db_$ts.dump" } else { Write-Output "Postgres dump failed" }

Write-Output "Dumping MongoDB (archive) from container '$MongoContainer'..."
try {
    docker exec $MongoContainer bash -lc "mongodump --archive=/tmp/tourist_guides_datamart.archive --db tourist_guides_datamart --gzip --username admin --password password --authenticationDatabase admin" | Out-Null
    docker cp "$($MongoContainer):/tmp/tourist_guides_datamart.archive" "$BackupDir/mongodb/tourist_guides_datamart_$ts.archive" 2>$null
    if ($LASTEXITCODE -eq 0) { Write-Output "Mongo dump saved to $BackupDir/mongodb/tourist_guides_datamart_$ts.archive" } else { Write-Output "Mongo dump failed" }
} catch { Write-Output "Mongo dump encountered an error: $_" }

Write-Output "Zipping backend code..."
$paths = @('.\src\api','.\src\lib','.\src\services','package.json','package-lock.json','Dockerfile.api','docker-compose.api.yml')
$existing = $paths | Where-Object { Test-Path $_ }
$zip = "$BackupDir/code/backend-backup-$ts.zip"
if ($existing.Count -gt 0) { Compress-Archive -Path $existing -DestinationPath $zip -Force; Write-Output "Created code backup: $zip" } else { Write-Output "No backend paths found to zip" }

Write-Output "Backup complete. Files written to $BackupDir"
