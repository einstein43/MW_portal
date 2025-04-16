#!/bin/sh
set -e

# Wait for MySQL to be ready
echo "Waiting for MySQL to be ready..."
sleep 10

# Run Prisma migrations
echo "Running Prisma migrations..."
npx prisma migrate deploy

# Initialize the database
echo "Initializing database..."
npx ts-node src/scripts/db-init.ts

# Start the application
echo "Starting the application..."
exec "$@"