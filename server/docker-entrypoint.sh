#!/bin/sh
set -e

echo "Waiting for PostgreSQL to be ready..."
until nc -z -v -w30 db 5432 2>/dev/null || nc -z -v -w30 postgres 5432 2>/dev/null; do
  echo "PostgreSQL is unavailable - sleeping 2 seconds"
  sleep 2
done

echo "PostgreSQL is up and running!"

echo "Running Prisma migrations/db push..."
npx prisma db push --skip-generate

echo "Generating Prisma Client..."
npx prisma generate

echo "Seeding initial data..."
npm run prisma:seed || echo "Seed already applied or skipped"

echo "Starting Amrita Cyber AI Server..."
exec "$@"

