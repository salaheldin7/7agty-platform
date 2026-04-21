# 7agty Deployment Runbook (Frontend + Backend + Neon)

This project is a monorepo with:
- React frontend (Vite)
- Laravel backend (API)

Environment templates added in this repo:
- `.env.vercel.example` for Vercel frontend variables
- `.env.render.example` for Render backend variables
- `render.yaml` for one-click Render blueprint deployment

Neon note:
- `neonctl init` does not accept a PostgreSQL connection string argument directly.
- Use Neon Dashboard credentials (Host/DB/User/Password) as Render environment variables.

## 0) Sync these local changes to GitHub (`salaheldin7/7agty-platform`)

If your local folder is not a Git repo, run these commands in PowerShell:

```powershell
Set-Location E:\
git clone https://github.com/salaheldin7/7agty-platform.git .\7agty-platform-sync

$source = 'E:\7agty'
$dest = 'E:\7agty-platform-sync'
$files = @(
   'src/App.tsx',
   'config/cors.php',
   'config/database.php',
   'database/migrations/2025_01_21_000001_create_governorates_table.php',
   'database/migrations/2025_11_07_000003_add_country_id_to_governorates.php',
   'database/seeders/DatabaseSeeder.php',
   'database/seeders/GovernorateSeeder.php',
   'database/seeders/CitySeeder.php',
   '.env.example',
   '.env.render.example',
   '.env.vercel.example',
   '.gitignore',
   'vercel.json',
   'render.yaml',
   'DEPLOY_VERCEL_RENDER_NEON.md'
)

foreach ($f in $files) {
   $targetDir = Split-Path -Parent (Join-Path $dest $f)
   New-Item -ItemType Directory -Path $targetDir -Force | Out-Null
   Copy-Item -Path (Join-Path $source $f) -Destination (Join-Path $dest $f) -Force
}

Set-Location $dest
git add .
git commit -m "Deploy prep: Vercel frontend + Render/Neon backend configs"
git push origin main
```

If `git push` asks for authentication, sign in using your GitHub account `salaheldin7`.

## 1) Frontend deploy to Vercel

### One-time setup
1. Push this project to GitHub.
2. In Vercel, create a new project from this repo.
3. Keep root as repository root.
4. Framework preset: `Vite`.
5. Build command: `npm run build`.
6. Output directory: `dist`.

The file `vercel.json` is already added for SPA routing.

### Frontend environment variable (Vercel)
Add in Vercel Project Settings -> Environment Variables:
- `VITE_API_URL=https://YOUR-RENDER-BACKEND.onrender.com`

Redeploy after adding env vars.

## 2) Backend deploy to Render (Laravel API)

Create a new Render Web Service from the same GitHub repo.

### Preferred path: Blueprint deploy
If your GitHub repo contains `render.yaml`, in Render choose **New +** -> **Blueprint** and select the repo.
Render will create `7agty-api` service and prompt only for secret values (`sync: false` vars).

### Render settings
- Runtime: `Docker`
- `render.yaml` now uses `runtime: docker` and builds from `./Dockerfile`.
- Container startup is handled by `start.sh` (migrations run automatically).
- Optional first-deploy seed: set `RUN_DB_SEED=true` in Render environment variables.

### Backend environment variables (Render)
Set these in Render:

```env
APP_NAME=7agty
APP_ENV=production
APP_DEBUG=false
APP_URL=https://YOUR-RENDER-BACKEND.onrender.com
APP_KEY=base64:GENERATE_NEW_KEY

DB_CONNECTION=pgsql
DB_HOST=ep-delicate-frog-abfsr7wr-pooler.eu-west-2.aws.neon.tech
DB_PORT=5432
DB_DATABASE=neondb
DB_USERNAME=neondb_owner
DB_PASSWORD=YOUR_NEON_PASSWORD
DB_SSLMODE=require

CACHE_STORE=database
SESSION_DRIVER=database
QUEUE_CONNECTION=database
FILESYSTEM_DISK=local

CORS_ALLOWED_ORIGINS=https://YOUR-VERCEL-APP.vercel.app
FRONTEND_URL=https://YOUR-VERCEL-APP.vercel.app
SANCTUM_STATEFUL_DOMAINS=YOUR-VERCEL-APP.vercel.app
```

## 3) Neon database notes (IMPORTANT for `7agty.sql`)

`7agty.sql` is a MySQL/MariaDB dump from phpMyAdmin.
Neon is PostgreSQL, so direct import will fail.

### Fastest working path for demo
Use Laravel migrations + seeders on Neon:
- `php artisan migrate --force`
- `php artisan db:seed --force` (or set `RUN_DB_SEED=true` on Render for one deploy)

Migrations are included in `start.sh` for Docker runtime.

### If you must keep old MySQL data from `7agty.sql`
You need conversion before Neon import. Options:
1. Import `7agty.sql` into a temporary MySQL instance, then migrate MySQL -> PostgreSQL with `pgloader`.
2. Keep backend on a MySQL host for now (faster if exact old data is required immediately).

## 4) Connect frontend to backend

After Render is live:
1. Set `VITE_API_URL` in Vercel to your Render URL.
2. Redeploy Vercel.
3. Verify:
   - `https://YOUR-RENDER-BACKEND.onrender.com/api/properties`
   - Frontend homepage loads and fetches listings.

## 5) First admin login for demo

Seeder creates demo users:
- Username: `founder`
- Password: `Founder@123`

Change demo passwords after company review.

## 6) Security checklist before sharing with company

1. Rotate any old production credentials and API secrets.
2. Use fresh `APP_KEY` for the Render environment.
3. Confirm CORS includes only your Vercel URL.
4. Keep `.env` files out of Git.

## 7) Local CLI shortcut for frontend deploy

If you prefer CLI deploy from local machine:

```bash
npx vercel login
npx vercel --prod
```

Then add `VITE_API_URL` in Vercel dashboard and redeploy.
