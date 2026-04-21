#!/usr/bin/env sh
set -eu

if [ ! -f .env ] && [ -f .env.example ]; then
  cp .env.example .env
fi

php artisan config:clear || true
php artisan route:clear || true
php artisan view:clear || true
php artisan storage:link || true

if [ "${RUN_MIGRATIONS:-false}" = "true" ]; then
  php artisan migrate --force
else
  echo "Skipping migrations (set RUN_MIGRATIONS=true to enable)."
fi

if [ "${RUN_DB_SEED:-false}" = "true" ]; then
  php artisan db:seed --force
fi

: "${PORT:=10000}"
exec php artisan serve --host=0.0.0.0 --port="${PORT}"
