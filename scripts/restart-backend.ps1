Write-Output "[restart-backend] Deteniendo procesos node locales (si existen)..."
Get-Process node -ErrorAction SilentlyContinue | ForEach-Object {
    if ($_.Id) {
        Write-Output ("Stopping PID {0}" -f $_.Id)
        try { Stop-Process -Id $_.Id -Force -ErrorAction SilentlyContinue } catch { }
    }
}

Write-Output "[restart-backend] Levantando servicios de datos con docker-compose (sin web)..."
docker-compose up -d mongodb postgres redis adminer | Out-Null

Write-Output "[restart-backend] Esperando 4 segundos para que los contenedores inicien..."
Start-Sleep -Seconds 4

Write-Output "[restart-backend] Exportando variables de entorno para el proceso local del API..."
$env:POSTGRES_URI = 'postgresql://postgres:password@localhost:5432/tourist_guides_db'
$env:MONGO_URI = 'mongodb://admin:password@localhost:27017/tourist_guides_datamart?authSource=admin'

Write-Output "[restart-backend] Iniciando servidor API en background (logs -> server.out.log / server.err.log)..."
#usar la raíz del repositorio como directorio de trabajo (evitar resolver rutas desde scripts/)
$repoRoot = Split-Path $PSScriptRoot -Parent
$outPath = Join-Path $repoRoot 'server.out.log'
$errPath = Join-Path $repoRoot 'server.err.log'

Write-Output "[restart-backend] Preparando logs y rotando archivos antiguos si existen..."

function Rotate-Log($path) {
    if (-not (Test-Path $path)) { return }
    $ts = Get-Date -Format "yyyyMMdd_HHmmss"
    $dir = Split-Path $path -Parent
    $name = Split-Path $path -Leaf
    $newName = "$name.$ts"
    $newPath = Join-Path $dir $newName
    try {
        Move-Item -Path $path -Destination $newPath -Force -ErrorAction Stop
        Write-Output "[restart-backend] Log rotado: $path -> $newPath"
    } catch {
        Write-Output ("[restart-backend] No se pudo renombrar {0} (posible archivo en uso): {1}" -f $path, $_)
        Write-Output ("[restart-backend] Intentando copiar {0} a {1} como fallback..." -f $path, $newPath)
        try {
            Copy-Item -Path $path -Destination $newPath -ErrorAction Stop
            Write-Output ("[restart-backend] Copia realizada: {0} -> {1}" -f $path, $newPath)
        } catch {
            Write-Output ("[restart-backend] No se pudo rotar ni copiar {0}: {1}" -f $path, $_)
        }
    }
}

Rotate-Log $outPath
Rotate-Log $errPath

Write-Output "[restart-backend] Iniciando servidor API en background con Start-Process (npx tsx)..."
Write-Output "[restart-backend] Sitúo el directorio de trabajo en: $repoRoot"
Set-Location $repoRoot

Write-Output "[restart-backend] Verificando si el puerto 4000 ya está en uso..."
$portInUse = $false
try {
    $net = Test-NetConnection -ComputerName 'localhost' -Port 4000 -WarningAction SilentlyContinue
    if ($net.TcpTestSucceeded) { $portInUse = $true }
} catch {
    # Test-NetConnection puede no estar presente en algunas plataformas, ignorar
}

if ($portInUse) {
    Write-Output "[restart-backend] Puerto 4000 en uso, no iniciar nuevo proceso API."
} else {
    Write-Output "[restart-backend] Iniciando servidor API en background usando cmd.exe /c start..."
    # Construir comando start vacío para evitar que el primer parámetro se interprete como título
    # Usar concatenación para insertar rutas sin problemas de escape
    $inner = 'start "" /b npx tsx src/api/server.ts > "' + $outPath + '" 2> "' + $errPath + '"'
    try {
        # intentar identificar y terminar procesos node que escuchen en 4000 (Windows) - heurístico
        try {
            $listeners = Get-NetTCPConnection -LocalPort 4000 -ErrorAction SilentlyContinue
            if ($listeners) {
                foreach ($l in $listeners) {
                    if ($l.OwningProcess) {
                        Write-Output ("[restart-backend] Matando proceso que usa el puerto 4000: PID {0}" -f $l.OwningProcess)
                        Stop-Process -Id $l.OwningProcess -Force -ErrorAction SilentlyContinue
                    }
                }
            }
        } catch {
            # Get-NetTCPConnection puede no existir; ignorar
        }
        $startInfo = Start-Process -FilePath 'cmd.exe' -ArgumentList '/c', $inner -WorkingDirectory $repoRoot -WindowStyle Hidden -PassThru
        Write-Output "[restart-backend] Proceso API iniciado (PID: $($startInfo.Id))"
    } catch {
        Write-Output "[restart-backend] Error iniciando cmd.exe: $_"
    }
}


Write-Output "[restart-backend] Esperando a que se creen los logs (server.out.log / server.err.log) hasta 12s..."
$logReady = $false
$logStart = Get-Date
while (((Get-Date) - $logStart).TotalSeconds -lt 12) {
    if ((Test-Path $outPath) -and (Test-Path $errPath)) { $logReady = $true; break }
    Start-Sleep -Seconds 1
}
if (-not $logReady) { Write-Output "[restart-backend] Aviso: los logs no se crearon en 12s, continuando (puede que el proceso haya fallado)." }
function Test-TcpConnection($hostAddr, $port, $timeoutMs = 1000) {
    try {
        $tcp = New-Object System.Net.Sockets.TcpClient
        $async = $tcp.BeginConnect($hostAddr, $port, $null, $null)
        $ok = $async.AsyncWaitHandle.WaitOne($timeoutMs)
        if ($ok) {
            $tcp.EndConnect($async)
            $tcp.Close()
            return $true
        } else {
            $tcp.Close()
            return $false
        }
    } catch {
        return $false
    }
}

Write-Output "[restart-backend] Esperando a que el puerto TCP 4000 esté abierto (timeout 120s)..."
$portOpen = $false
$tstart = Get-Date
while (((Get-Date) - $tstart).TotalSeconds -lt 120) {
    if (Test-TcpConnection '127.0.0.1' 4000 1000) { $portOpen = $true; break }
    if (Test-TcpConnection '::1' 4000 1000) { $portOpen = $true; break }
    Start-Sleep -Seconds 1
}
if (-not $portOpen) { Write-Output "[restart-backend] Advertencia: puerto 4000 no abierto en 120s." }

# Prepare sentinel file (server.ready) wait
$readyPath = Join-Path $repoRoot 'server.ready'
try { if (Test-Path $readyPath) { Remove-Item $readyPath -Force -ErrorAction SilentlyContinue } } catch { }

Write-Output "[restart-backend] Esperando sentinel server.ready (timeout 120s)..."
$ready = $false
$rstart = Get-Date
while (((Get-Date) - $rstart).TotalSeconds -lt 120) {
    if (Test-Path $readyPath) { $ready = $true; break }
    Start-Sleep -Seconds 1
}
if ($ready) { Write-Output "[restart-backend] Sentinel encontrado: $readyPath" } else { Write-Output "[restart-backend] Advertencia: server.ready no apareció en 120s, procediendo de todos modos..." }

Write-Output "[restart-backend] Esperando a que el endpoint /api/zones responda (timeout 60s)..."
$started = $false
$tstart2 = Get-Date
while (((Get-Date) - $tstart2).TotalSeconds -lt 60) {
    try {
        $resp = Invoke-WebRequest -Uri 'http://127.0.0.1:4000/api/zones' -UseBasicParsing -TimeoutSec 3 -ErrorAction Stop
        if ($resp -and $resp.StatusCode -eq 200) { $started = $true; break }
    } catch {
        Start-Sleep -Seconds 1
    }
}
if (-not $started) { Write-Output "[restart-backend] Advertencia: /api/zones no respondió en 60s, procediendo de todos modos..." }

Write-Output "[restart-backend] Ejecutando smoke-test HTTP (scripts/http-smoke-test.js)..."
$smokePath = Join-Path $repoRoot 'scripts\http-smoke-test.js'
if (Test-Path $smokePath) {
    try {
        Write-Output "[restart-backend] Ejecutando: node $smokePath"
        & node $smokePath
    } catch {
        Write-Output "[restart-backend] Error ejecutando smoke-test: $_"
    }
} else {
    Write-Output "[restart-backend] No se encontró $smokePath, saltando smoke-test."
}

Write-Output "[restart-backend] Comprobando /api-docs (Swagger UI)..."
try {
    $r = Invoke-WebRequest -Uri http://localhost:4000/api-docs -UseBasicParsing -TimeoutSec 10 -ErrorAction Stop
    Write-Output "API-DOCS-STATUS: $($r.StatusCode)"
} catch {
    Write-Output "API-DOCS-STATUS: no-response or 404"
}

Write-Output "[restart-backend] Mostrando salida del smoke-test (scripts/http-smoke-out.json):"
if (Test-Path scripts/http-smoke-out.json) { Get-Content scripts/http-smoke-out.json -Raw } else { Write-Output 'No se encontró scripts/http-smoke-out.json' }

Write-Output "[restart-backend] Últimas líneas de server.out.log / server.err.log"
if (Test-Path server.out.log) { Write-Output '--- server.out.log ---'; Get-Content server.out.log -Tail 200 } else { Write-Output 'no server.out.log' }
if (Test-Path server.err.log) { Write-Output '--- server.err.log ---'; Get-Content server.err.log -Tail 200 } else { Write-Output 'no server.err.log' }

Write-Output "[restart-backend] Comprobando persistencia en Postgres (conteo en zones)..."
try {
    psql "postgresql://postgres:password@localhost:5432/tourist_guides_db" -c "SELECT count(*) FROM zones;"
} catch {
    Write-Output "No se pudo ejecutar psql (no disponible en PATH) o falla la conexión"
}

Write-Output "[restart-backend] Hecho."
