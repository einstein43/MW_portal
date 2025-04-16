@echo off
echo Starting development servers...

:: Kill any existing processes on ports 3000 and 3002 (if any)
FOR /F "tokens=5" %%P IN ('netstat -ano ^| findstr :3000') DO (
  taskkill /PID %%P /F >nul 2>&1
)
FOR /F "tokens=5" %%P IN ('netstat -ano ^| findstr :3002') DO (
  taskkill /PID %%P /F >nul 2>&1
)

:: Start the API server on port 3002
start cmd /k "cd api && set PORT=3002 && npm run dev"

:: Wait a moment before starting the frontend
timeout /t 2 > nul

:: Start the frontend on port 3000
start cmd /k "cd web && npm run dev"

echo Both servers started.
echo API running on http://localhost:3002
echo Web running on http://localhost:3000