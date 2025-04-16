#!/bin/sh
set -e

# Wait for MySQL to be ready
echo "Waiting for MySQL to be ready..."
while ! nc -z mysql 3306; do
  sleep 1
done
echo "MySQL is ready"

# Run Prisma migrations
echo "Running Prisma migrations..."
npx prisma migrate deploy

# Generate Prisma client - ensure it's properly generated with verbose output
echo "Generating Prisma client..."
npx prisma generate --schema=./prisma/schema.prisma

# Verify the Prisma client was created
if [ -d "./node_modules/.prisma/client" ]; then
  echo "Prisma client generated successfully"
else
  echo "ERROR: Prisma client generation failed. Directory not found."
  exit 1
fi

# Start the application
echo "Starting the application..."
exec "$@"