$ErrorActionPreference = 'Stop'
$projectDirectory = Split-Path $PSScriptRoot -Parent
$mediaDirectory = Join-Path $projectDirectory 'public/media'
$sourceFile = Join-Path $PSScriptRoot 'video-sources.json'
$sources = Get-Content -LiteralPath $sourceFile -Raw | ConvertFrom-Json
$assetPaths = @($sources.video + $sources.poster) | Sort-Object -Unique
New-Item -ItemType Directory -Path $mediaDirectory -Force | Out-Null
foreach ($assetPath in $assetPaths) {
    if ($assetPath -notmatch '^_assets/video/[a-f0-9]+\.(mp4|jpg)$') {
        throw "Unexpected source path: $assetPath"
    }
    $destination = Join-Path $mediaDirectory (Split-Path $assetPath -Leaf)
    if ((Test-Path -LiteralPath $destination) -and (Get-Item -LiteralPath $destination).Length -gt 0) {
        continue
    }
    Invoke-WebRequest -Uri ('https://bethugcontent.my.canva.site/bethanyugc-portfolio/' + $assetPath) -OutFile $destination
    Write-Output "Downloaded $(Split-Path $destination -Leaf)"
}
