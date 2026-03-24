# 7agty (حاجتي) - Property Listing Platform

A complete property listing and real estate platform built with Laravel 12 and vanilla JavaScript.

## Screenshots

### Homepage & Listings
![Homepage 1](screenshots/7agty%201.1.png)
![Homepage 2](screenshots/7agty%201.2.png)
![Listings View](screenshots/7agty%201.3.png)
![Property Details](screenshots/7agty%201.4.png)
![Search & Filters](screenshots/7agty%201.5.png)

### Additional Features
![Feature 1](screenshots/7agty%202.png)
![Feature 2](screenshots/7agty%203.png)
![Feature 3](screenshots/7agty%204.png)
![Feature 4](screenshots/7agty%205.png)

## Features

- 🏠 Property Listings with multiple categories
- 💬 Real-time Chat System
- ⭐ Favorites/Bookmarks
- 🔔 Notifications
- 👤 User Authentication & Profiles
- 📧 Email Verification
- 🌍 Multi-location Support (Countries, Governorates, Cities)
- 📱 Responsive Design

## Tech Stack

### Backend
- Laravel 12
- PHP 8.2+
- MySQL Database
- Laravel Sanctum (API Authentication)
- Laravel Socialite

### Frontend
- HTML5/CSS3/JavaScript
- Responsive Design

## Installation

### Prerequisites
- PHP 8.2 or higher
- Composer
- MySQL Database
- Node.js & NPM (optional, for asset compilation)

### Setup Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/7agty.git
   cd 7agty
   ```

2. **Install Laravel dependencies**
   ```bash
   cd laravel
   composer install
   ```

3. **Configure environment**
   ```bash
   cp .env.example .env
   ```

   Edit `.env` and set your:
   - Database credentials
   - Mail server settings
   - App URL
   - Sanctum domains

4. **Generate application key**
   ```bash
   php artisan key:generate
   ```

5. **Run migrations**
   ```bash
   php artisan migrate
   ```

6. **Create storage link**
   ```bash
   php artisan storage:link
   ```

7. **Start the development server**
   ```bash
   php artisan serve
   ```

## Database

The project uses MySQL in production. For local development, you can also use SQLite.

**Database Schema includes:**
- Users (with roles: admin, seller, user)
- Properties (with soft deletes and approval system)
- Chats & Messages
- Favorites
- Notifications
- Countries, Governorates, Cities
- Contact Requests

## API Endpoints

The Laravel backend provides RESTful API endpoints for:
- User authentication & registration
- Property CRUD operations
- Chat functionality
- Favorites management
- Notifications
- Location data

See API documentation in `/laravel/routes/api.php`

## Security Notes

- Never commit `.env` file to version control
- Keep your database credentials secure
- Use HTTPS in production
- Configure CORS properly for your frontend domain

## Production Deployment

1. Set `APP_ENV=production` in `.env`
2. Set `APP_DEBUG=false`
3. Configure your web server (Apache/Nginx)
4. Set proper file permissions
5. Enable HTTPS
6. Configure session & cache drivers appropriately
7. Set up queue workers for background jobs

## License

MIT License

## Support

For issues and questions, please open an issue on GitHub.
