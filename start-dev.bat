@echo off
echo Starting MW Portal development environment...

REM Build the Docker containers
docker-compose build

REM Run the Docker containers in detached mode
docker-compose up -d

echo.
echo ===========================================
echo MW Portal Development Environment is running!
echo ===========================================
echo.
echo Services available at:
echo - Web Application: http://localhost:3000
echo - API: http://localhost:3002
echo - MySQL Database: localhost:3306
echo.
echo To view logs: docker-compose logs -f
echo To stop environment: docker-compose down
echo.