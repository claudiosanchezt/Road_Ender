param(
    [string]$PgDump = "./backups/postgres/tourist_guides_db.dump",
    [string]$TmpContainer = "tmp-pg-restore"
)

if (-not (Test-Path $PgDump)) { Write-Error "Dump file not found: $PgDump"; exit 1 }

Write-Output "Starting temporary Postgres container for restore..."
docker run --name $TmpContainer -e POSTGRES_PASSWORD=password -d postgres:15-alpine
Start-Sleep -Seconds 6

Write-Output "Copying dump into container..."
docker cp $PgDump "$TmpContainer:/tmp/restore.dump"

Write-Output "Restoring dump..."
docker exec -u postgres $TmpContainer pg_restore -d postgres /tmp/restore.dump; docker exec -u postgres $TmpContainer pg_restore -d tourist_guides_db /tmp/restore.dump

Write-Output "Restore command completed. Inspect container logs if needed." 

# Note: container remains running for manual inspection; user may stop/remove it later.
