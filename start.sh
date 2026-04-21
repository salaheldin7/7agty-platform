#!/usr/bin/env sh
set -eu

# 1. Create storage directories FIRST, before anything else
mkdir -p storage/framework/sessions \
         storage/framework/views \
         storage/framework/cache/data \
         storage/logs \
         bootstrap/cache

chmod -R 775 storage bootstrap/cache

# 2. Setup .env
if [ ! -f .env ] && [ -f .env.example ]; then
  cp .env.example .env
fi

# 3. Clear caches
php artisan config:clear || true
php artisan route:clear || true
php artisan cache:clear || true
php artisan view:clear || true

# 4. Storage symlink
rm -rf /var/www/html/public/storage
php artisan storage:link

# 5. Migrations (if enabled)
if [ "${RUN_MIGRATIONS:-false}" = "true" ]; then
  php artisan migrate --force
fi

# 6. Configure nginx port
sed -i "s/listen 10000/listen ${PORT:-10000}/" /etc/nginx/sites-available/default

# 7. Start php-fpm in background, then nginx in foreground (exec must be LAST)
php-fpm -D
exec nginx -g "daemon off;"