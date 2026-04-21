#!/usr/bin/env sh
set -eu

if [ ! -f .env ] && [ -f .env.example ]; then
  cp .env.example .env
fi

php artisan config:clear || true
php artisan route:clear || true

# Force remove and recreate symlink every boot
rm -rf /var/www/html/public/storage
php artisan storage:link

if [ "${RUN_MIGRATIONS:-false}" = "true" ]; then
  php artisan migrate --force
fi

php-fpm -D

sed -i "s/listen 10000/listen ${PORT:-10000}/" /etc/nginx/sites-available/default

exec nginx -g "daemon off;"