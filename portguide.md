# Port Configuration Guide

## Docker Service Ports

### MySQL Database
- **Internal Port:** 3306 (default MySQL port)
- **External Port:** 3307
- **Connection String (Docker):** `mysql:3306`
- **Host Access:** `localhost:3307`

### API Service
- **Internal Port:** 3002
- **External Port:** 3003
- **Container Name:** mw-portal-api
- **Docker Network URL:** `http://api:3002`
- **Host Access:** `http://localhost:3003`

### Web Frontend
- **Internal Port:** 3000 (default Next.js port)
- **External Port:** 3001
- **Container Name:** mw-portal-web
- **Host Access:** `http://localhost:3001`

## Port Mappings (Host:Container)
- MySQL: `3307:3306`
- API: `3003:3002`
- Web: `3001:3000`

## Internal Communication (Docker Network: mw-network)
- Frontend to API: `http://api:3002/api`
- API to MySQL: `mysql://mysql:3306`

## External Access (Host Machine)
- Frontend: `http://localhost:3001`
- API: `http://localhost:3003`
- MySQL: `localhost:3307`

## Network Configuration
- Network Name: mw-network
- Network Type: bridge
- All services can communicate using their service names as hostnames