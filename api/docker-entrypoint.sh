#!/bin/sh
set -e

# Wait for MySQL to be ready
echo "Waiting for MySQL to be ready..."
while ! nc -z mysql 3306; do
  echo "MySQL is not ready yet... waiting"
  sleep 2
done
echo "MySQL is ready!"

# Wait a bit more to ensure MySQL is fully initialized
sleep 3

# Generate Prisma client
echo "Generating Prisma client..."
npx prisma generate

# Check if Prisma client was generated
if [ $? -ne 0 ]; then
  echo "ERROR: Prisma client generation failed"
  exit 1
fi

# Push schema to database (safer than migrations for development)
echo "Pushing schema to database..."
npx prisma db push --accept-data-loss

# Optional: Run seeds if needed
# echo "Running seeds..."
# npx prisma db seed

echo "Database setup complete!"

# Start the application
echo "Starting the application..."
exec "$@"