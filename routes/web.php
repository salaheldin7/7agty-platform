<?php

// web.php

use Illuminate\Support\Facades\Route;
use Spatie\Sitemap\Sitemap;
use Spatie\Sitemap\Tags\Url;
use App\Models\Property;
use App\Http\Controllers\SitemapController;

Route::get('/robots.txt', function() {
    $content = "User-agent: *
Allow: /

Disallow: /api/
Disallow: /admin/
Disallow: /seller-panel/
Disallow: /my-ads/
Disallow: /profile/

User-agent: Googlebot
Allow: /

User-agent: AhrefsBot
Disallow: /

User-agent: SemrushBot
Disallow: /

Sitemap: https://7agty.com/sitemap.xml";

    return response($content, 200)
        ->header('Content-Type', 'text/plain');
});

// Sitemap routes - Dynamic multilingual sitemap generation
Route::withoutMiddleware(['web'])->group(function () {
    // Main sitemap index (links to all sub-sitemaps)
    Route::get('sitemap.xml', [SitemapController::class, 'index'])->name('sitemap.index');
    
    // Static pages sitemap
    Route::get('sitemap-main.xml', [SitemapController::class, 'main'])->name('sitemap.main');
    
    // Properties sitemaps (English and Arabic)
    Route::get('sitemap-properties-en.xml', function () {
        return app(SitemapController::class)->properties('en');
    })->name('sitemap.properties.en');
    
    Route::get('sitemap-properties-ar.xml', function () {
        return app(SitemapController::class)->properties('ar');
    })->name('sitemap.properties.ar');
    
    // User profiles sitemaps (English and Arabic)
    Route::get('sitemap-users-en.xml', function () {
        return app(SitemapController::class)->users('en');
    })->name('sitemap.users.en');
    
    Route::get('sitemap-users-ar.xml', function () {
        return app(SitemapController::class)->users('ar');
    })->name('sitemap.users.ar');
    
    // Test endpoint
    Route::get('sitemap-test', [SitemapController::class, 'test'])->name('sitemap.test');
    
    // Manual generation endpoint (protected - you can add auth middleware)
    Route::get('generate-sitemap', [SitemapController::class, 'generate'])->name('sitemap.generate');
    
    // Clear sitemap cache endpoint
    Route::get('clear-sitemap-cache', [SitemapController::class, 'clearCache'])->name('sitemap.clear-cache');
});