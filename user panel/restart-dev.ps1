# PowerShell script to restart development server with optimized settings

Write-Host "🧹 Cleaning up cache..." -ForegroundColor Cyan
Remove-Item -Path ".vite_cache" -Recurse -Force -ErrorAction SilentlyContinue
Remove-Item -Path "node_modules/.vite" -Recurse -Force -ErrorAction SilentlyContinue

Write-Host "🚀 Starting development server with optimized settings..." -ForegroundColor Green
npm run dev:clean
