#!/bin/sh
set -e

# Wait for MySQL to be ready
echo "Waiting for MySQL to be ready..."
sleep 15  # Increased wait time to ensure MySQL is fully ready

# Run Prisma migrations
echo "Running Prisma migrations..."
npx prisma migrate deploy

# Ensure Prisma client is properly generated
echo "Ensuring Prisma client is properly generated..."
npx prisma generate

# Allow some time for the Prisma client to be fully initialized
echo "Allowing time for Prisma client initialization..."
sleep 2

# Initialize the database
echo "Initializing database..."
npx ts-node src/scripts/db-init.ts

# Start the application
echo "Starting the application..."
exec "$@"