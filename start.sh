#!/usr/bin/env sh
set -eu

if [ ! -f .env ] && [ -f .env.example ]; then
  cp .env.example .env
fi

php artisan config:clear || true
php artisan route:clear || true
php artisan storage:link || true

if [ "${RUN_MIGRATIONS:-false}" = "true" ]; then
  php artisan migrate --force
fi

# Start php-fpm in background
php-fpm -D

# Replace PORT in nginx config (Render uses dynamic port)
sed -i "s/listen 10000/listen ${PORT:-10000}/" /etc/nginx/sites-available/default
php artisan storage:link || echo "Storage link already exists"
# Start nginx in foreground (keeps container alive)
exec nginx -g "daemon off;"