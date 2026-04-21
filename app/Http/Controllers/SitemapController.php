<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Cache;
use App\Models\Property;
use App\Models\User;
use Carbon\Carbon;

class SitemapController extends Controller
{
    /**
     * Generate single unified sitemap with ALL URLs (static pages, properties, users)
     */
    public function index()
    {
        // Disable session for this request (prevents cookies)
        config(['session.driver' => 'array']);
        
        return Cache::remember('sitemap_unified', 600, function () {
            try {
                $xml = '<?xml version="1.0" encoding="UTF-8"?>' . "\n";
                $xml .= '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" ';
                $xml .= 'xmlns:xhtml="http://www.w3.org/1999/xhtml">' . "\n";
                
                $baseUrl = url('/');
                
                // 1. STATIC PAGES - High Priority
                $staticPages = [
                    // Main pages
                    ['url' => '/', 'priority' => '1.0', 'changefreq' => 'daily'],
                    ['url' => '/marketplace', 'priority' => '1.0', 'changefreq' => 'daily'],
                    
                    // SEO KEYWORDS - بيع مجانا (Sell for Free) - HIGH PRIORITY
                    // Arabic with مجانا
                    ['url' => '/marketplace?search=' . urlencode('بيع مجانا'), 'priority' => '0.95', 'changefreq' => 'daily'],
                    ['url' => '/marketplace?search=' . urlencode('بيع سيارة مجانا'), 'priority' => '0.95', 'changefreq' => 'daily'],
                    ['url' => '/marketplace?search=' . urlencode('بيع عربية مجانا'), 'priority' => '0.95', 'changefreq' => 'daily'],
                    ['url' => '/marketplace?search=' . urlencode('بيع شقة مجانا'), 'priority' => '0.95', 'changefreq' => 'daily'],
                    ['url' => '/marketplace?search=' . urlencode('بيع فيلا مجانا'), 'priority' => '0.95', 'changefreq' => 'daily'],
                    ['url' => '/marketplace?search=' . urlencode('بيع قصر مجانا'), 'priority' => '0.95', 'changefreq' => 'daily'],
                    ['url' => '/marketplace?search=' . urlencode('بيع تليفون مجانا'), 'priority' => '0.95', 'changefreq' => 'daily'],
                    ['url' => '/marketplace?search=' . urlencode('بيع تلفون مجانا'), 'priority' => '0.95', 'changefreq' => 'daily'],
                    ['url' => '/marketplace?search=' . urlencode('بيع موبايل مجانا'), 'priority' => '0.95', 'changefreq' => 'daily'],
                    ['url' => '/marketplace?search=' . urlencode('الكترونيات مجانا'), 'priority' => '0.95', 'changefreq' => 'daily'],
                    
                    // Arabic without مجانا
                    ['url' => '/marketplace?search=' . urlencode('بيع سيارة'), 'priority' => '0.85', 'changefreq' => 'daily'],
                    ['url' => '/marketplace?search=' . urlencode('بيع عربية'), 'priority' => '0.85', 'changefreq' => 'daily'],
                    ['url' => '/marketplace?search=' . urlencode('بيع شقة'), 'priority' => '0.85', 'changefreq' => 'daily'],
                    ['url' => '/marketplace?search=' . urlencode('بيع فيلا'), 'priority' => '0.85', 'changefreq' => 'daily'],
                    ['url' => '/marketplace?search=' . urlencode('بيع قصر'), 'priority' => '0.85', 'changefreq' => 'daily'],
                    ['url' => '/marketplace?search=' . urlencode('بيع تليفون'), 'priority' => '0.85', 'changefreq' => 'daily'],
                    ['url' => '/marketplace?search=' . urlencode('الكترونيات'), 'priority' => '0.85', 'changefreq' => 'daily'],
                    
                    // English keywords - Sell for Free
                    ['url' => '/marketplace?search=sell+for+free', 'priority' => '0.95', 'changefreq' => 'daily'],
                    ['url' => '/marketplace?search=sell+car+free', 'priority' => '0.95', 'changefreq' => 'daily'],
                    ['url' => '/marketplace?search=sell+apartment+free', 'priority' => '0.95', 'changefreq' => 'daily'],
                    ['url' => '/marketplace?search=sell+villa+free', 'priority' => '0.95', 'changefreq' => 'daily'],
                    ['url' => '/marketplace?search=sell+phone+free', 'priority' => '0.95', 'changefreq' => 'daily'],
                    ['url' => '/marketplace?search=sell+mobile+free', 'priority' => '0.95', 'changefreq' => 'daily'],
                    ['url' => '/marketplace?search=free+marketplace', 'priority' => '0.95', 'changefreq' => 'daily'],
                    ['url' => '/marketplace?search=free+classifieds', 'priority' => '0.95', 'changefreq' => 'daily'],
                    
                    // Brand variations
                    ['url' => '/marketplace?search=7agty', 'priority' => '0.9', 'changefreq' => 'daily'],
                    ['url' => '/marketplace?search=' . urlencode('حاجتي'), 'priority' => '0.9', 'changefreq' => 'daily'],
                    ['url' => '/marketplace?search=hagty', 'priority' => '0.9', 'changefreq' => 'daily'],
                    ['url' => '/marketplace?search=' . urlencode('حاجاتي'), 'priority' => '0.9', 'changefreq' => 'daily'],
                    
                    // Listing type pages
                    ['url' => '/marketplace?listing_type=car', 'priority' => '0.9', 'changefreq' => 'daily'],
                    ['url' => '/marketplace?listing_type=electronics', 'priority' => '0.9', 'changefreq' => 'daily'],
                    ['url' => '/marketplace?listing_type=mobile', 'priority' => '0.9', 'changefreq' => 'daily'],
                    ['url' => '/marketplace?listing_type=job', 'priority' => '0.9', 'changefreq' => 'daily'],
                    ['url' => '/marketplace?listing_type=vehicle_booking', 'priority' => '0.8', 'changefreq' => 'daily'],
                    ['url' => '/marketplace?listing_type=doctor_booking', 'priority' => '0.8', 'changefreq' => 'daily'],
                    
                    // Info pages
                    ['url' => '/about', 'priority' => '0.6', 'changefreq' => 'monthly'],
                    ['url' => '/contact', 'priority' => '0.6', 'changefreq' => 'monthly'],
                    ['url' => '/blog', 'priority' => '0.7', 'changefreq' => 'weekly'],
                    
                    // Auth pages
                    ['url' => '/login', 'priority' => '0.4', 'changefreq' => 'monthly'],
                    ['url' => '/register', 'priority' => '0.4', 'changefreq' => 'monthly'],
                    ['url' => '/forgot-password', 'priority' => '0.3', 'changefreq' => 'monthly'],
                ];
                
                foreach ($staticPages as $page) {
                    $xml .= "  <url>\n";
                    // Properly escape XML special characters - use ENT_XML1 for proper & encoding
                    $fullUrl = $baseUrl . $page['url'];
                    $xml .= '    <loc>' . htmlspecialchars($fullUrl, ENT_XML1 | ENT_QUOTES, 'UTF-8') . "</loc>\n";
                    
                    // Add alternate language versions for better multilingual SEO
                    // Prefer a clean /ar/ homepage URL when available, otherwise use ?lang=ar
                    $separator = strpos($page['url'], '?') !== false ? '&' : '?';
                    if ($page['url'] === '/') {
                        $arUrl = $baseUrl . '/ar/';
                        $enUrl = $baseUrl . '/';
                    } else {
                        $arUrl = $baseUrl . $page['url'] . $separator . 'lang=ar';
                        $enUrl = $baseUrl . $page['url'] . $separator . 'lang=en';
                    }
                    $xml .= '    <xhtml:link rel="alternate" hreflang="ar" href="' . htmlspecialchars($arUrl, ENT_XML1 | ENT_QUOTES, 'UTF-8') . '" />' . "\n";
                    $xml .= '    <xhtml:link rel="alternate" hreflang="en" href="' . htmlspecialchars($enUrl, ENT_XML1 | ENT_QUOTES, 'UTF-8') . '" />' . "\n";
                    $xml .= '    <xhtml:link rel="alternate" hreflang="x-default" href="' . htmlspecialchars($fullUrl, ENT_XML1 | ENT_QUOTES, 'UTF-8') . '" />' . "\n";
                    
                    $xml .= '    <lastmod>' . Carbon::now()->toAtomString() . "</lastmod>\n";
                    $xml .= '    <changefreq>' . $page['changefreq'] . "</changefreq>\n";
                    $xml .= '    <priority>' . $page['priority'] . "</priority>\n";
                    $xml .= "  </url>\n";
                }
                
                // 2. PROPERTIES - Get approved properties
                $properties = Property::where('status', 'approved')
                    ->select('id', 'slug', 'updated_at')
                    ->orderBy('updated_at', 'desc')
                    ->limit(1000) // Limit to 1000 most recent
                    ->get();
                
                foreach ($properties as $property) {
                    $xml .= "  <url>\n";
                    $propertyUrl = $baseUrl . '/property/' . $property->id;
                    $xml .= '    <loc>' . htmlspecialchars($propertyUrl, ENT_XML1 | ENT_QUOTES, 'UTF-8') . "</loc>\n";
                    $xml .= '    <lastmod>' . Carbon::parse($property->updated_at)->toAtomString() . "</lastmod>\n";
                    $xml .= "    <changefreq>weekly</changefreq>\n";
                    $xml .= "    <priority>0.8</priority>\n";
                    $xml .= "  </url>\n";
                }
                
                // 3. USERS - Get active, non-banned users
                $users = User::where(function ($query) {
                        $query->where('banned', 0)
                              ->orWhereNull('banned');
                    })
                    ->whereNotNull('username')
                    ->select('id', 'username', 'updated_at')
                    ->orderBy('updated_at', 'desc')
                    ->limit(500) // Limit to 500 most recent users
                    ->get();
                
                foreach ($users as $user) {
                    $xml .= "  <url>\n";
                    $userUrl = $baseUrl . '/profile/' . $user->id;
                    $xml .= '    <loc>' . htmlspecialchars($userUrl, ENT_XML1 | ENT_QUOTES, 'UTF-8') . "</loc>\n";
                    $xml .= '    <lastmod>' . Carbon::parse($user->updated_at)->toAtomString() . "</lastmod>\n";
                    $xml .= "    <changefreq>monthly</changefreq>\n";
                    $xml .= "    <priority>0.6</priority>\n";
                    $xml .= "  </url>\n";
                }
                
                $xml .= '</urlset>';
                
                return response($xml, 200)
                    ->header('Content-Type', 'text/xml; charset=utf-8')
                    ->header('Cache-Control', 'public, max-age=600');
                    
            } catch (\Exception $e) {
                Log::error('Sitemap generation failed: ' . $e->getMessage());
                
                // Return minimal sitemap on error
                $xml = '<?xml version="1.0" encoding="UTF-8"?>' . "\n";
                $xml .= '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' . "\n";
                $xml .= "  <url>\n";
                $xml .= '    <loc>' . url('/') . "</loc>\n";
                $xml .= '    <lastmod>' . Carbon::now()->toAtomString() . "</lastmod>\n";
                $xml .= "    <changefreq>daily</changefreq>\n";
                $xml .= "    <priority>1.0</priority>\n";
                $xml .= "  </url>\n";
                $xml .= '</urlset>';
                
                return response($xml, 200)
                    ->header('Content-Type', 'text/xml; charset=utf-8');
            }
        });
    }
    
    /**
     * DEPRECATED - Keeping for backward compatibility
     * Generate sitemap index (main sitemap that links to all sub-sitemaps)
     */
    public function indexOld()
    {
        // Disable session for this request (prevents cookies)
        config(['session.driver' => 'array']);
        
        try {
            $xml = '<?xml version="1.0" encoding="UTF-8"?>';
            $xml .= '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';
            
            // Main sitemap (static pages)
            $xml .= '<sitemap>';
            $xml .= '<loc>' . url('/sitemap-main.xml') . '</loc>';
            $xml .= '<lastmod>' . Carbon::now()->toAtomString() . '</lastmod>';
            $xml .= '</sitemap>';
            
            // Properties sitemap - English
            $xml .= '<sitemap>';
            $xml .= '<loc>' . url('/sitemap-properties-en.xml') . '</loc>';
            $xml .= '<lastmod>' . Carbon::now()->toAtomString() . '</lastmod>';
            $xml .= '</sitemap>';
            
            // Properties sitemap - Arabic
            $xml .= '<sitemap>';
            $xml .= '<loc>' . url('/sitemap-properties-ar.xml') . '</loc>';
            $xml .= '<lastmod>' . Carbon::now()->toAtomString() . '</lastmod>';
            $xml .= '</sitemap>';
            
            // User profiles sitemap - English
            $xml .= '<sitemap>';
            $xml .= '<loc>' . url('/sitemap-users-en.xml') . '</loc>';
            $xml .= '<lastmod>' . Carbon::now()->toAtomString() . '</lastmod>';
            $xml .= '</sitemap>';
            
            // User profiles sitemap - Arabic
            $xml .= '<sitemap>';
            $xml .= '<loc>' . url('/sitemap-users-ar.xml') . '</loc>';
            $xml .= '<lastmod>' . Carbon::now()->toAtomString() . '</lastmod>';
            $xml .= '</sitemap>';
            
            $xml .= '</sitemapindex>';

            return response($xml, 200, [
                'Content-Type' => 'application/xml; charset=utf-8',
                'Cache-Control' => 'public, max-age=3600', // Cache for 1 hour
            ]);

        } catch (\Exception $e) {
            Log::error('Sitemap index generation failed: ' . $e->getMessage());
            return response($this->errorXml($e->getMessage()), 500, [
                'Content-Type' => 'application/xml; charset=utf-8',
            ]);
        }
    }

    /**
     * Generate main sitemap with static pages
     */
    public function main()
    {
        config(['session.driver' => 'array']);
        
        try {
            // Cache for 10 minutes (reduced for more frequent updates)
            $xml = Cache::remember('sitemap_main', 600, function () {
                $xml = '<?xml version="1.0" encoding="UTF-8"?>';
                $xml .= '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" ';
                $xml .= 'xmlns:xhtml="http://www.w3.org/1999/xhtml" ';
                $xml .= 'xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">';

                $baseUrl = config('app.url', 'https://7agty.com');

                // Static pages with multilingual support
                $staticPages = [
                    // Homepage
                    ['url' => '/', 'priority' => '1.0', 'changefreq' => 'daily'],
                    
                    // Main sections
                    ['url' => '/marketplace', 'priority' => '0.9', 'changefreq' => 'hourly'],
                    ['url' => '/properties', 'priority' => '0.9', 'changefreq' => 'hourly'],
                    
                    // Informational pages
                    ['url' => '/about', 'priority' => '0.8', 'changefreq' => 'monthly'],
                    ['url' => '/contact', 'priority' => '0.8', 'changefreq' => 'monthly'],
                    ['url' => '/blog', 'priority' => '0.8', 'changefreq' => 'weekly'],
                    
                    // Listing Type Pages
                    ['url' => '/marketplace?type=property', 'priority' => '0.9', 'changefreq' => 'hourly'],
                    ['url' => '/marketplace?type=car', 'priority' => '0.9', 'changefreq' => 'hourly'],
                    ['url' => '/marketplace?type=electronics', 'priority' => '0.9', 'changefreq' => 'hourly'],
                    ['url' => '/marketplace?type=mobile', 'priority' => '0.9', 'changefreq' => 'hourly'],
                    ['url' => '/marketplace?type=job', 'priority' => '0.9', 'changefreq' => 'hourly'],
                    ['url' => '/marketplace?type=vehicle_booking', 'priority' => '0.9', 'changefreq' => 'hourly'],
                    ['url' => '/marketplace?type=doctor_booking', 'priority' => '0.9', 'changefreq' => 'hourly'],
                    
                    // Auth pages
                    ['url' => '/login', 'priority' => '0.6', 'changefreq' => 'yearly'],
                    ['url' => '/register', 'priority' => '0.6', 'changefreq' => 'yearly'],
                    ['url' => '/forgot-password', 'priority' => '0.5', 'changefreq' => 'yearly'],
                ];

                foreach ($staticPages as $page) {
                    $xml .= '<url>';
                    $xml .= '<loc>' . $baseUrl . $page['url'] . '</loc>';
                    
                    // Add alternate language versions (prefer clean /ar/ for homepage)
                    if ($page['url'] === '/') {
                        $xml .= '<xhtml:link rel="alternate" hreflang="en" href="' . $baseUrl . '/" />';
                        $xml .= '<xhtml:link rel="alternate" hreflang="ar" href="' . $baseUrl . '/ar/' . '" />';
                        $xml .= '<xhtml:link rel="alternate" hreflang="x-default" href="' . $baseUrl . '/" />';
                    } else {
                        $xml .= '<xhtml:link rel="alternate" hreflang="en" href="' . $baseUrl . $page['url'] . '?lang=en" />';
                        $xml .= '<xhtml:link rel="alternate" hreflang="ar" href="' . $baseUrl . $page['url'] . '?lang=ar" />';
                        $xml .= '<xhtml:link rel="alternate" hreflang="x-default" href="' . $baseUrl . $page['url'] . '" />';
                    }
                    
                    // Add logo image for homepage
                    if ($page['url'] === '/') {
                        $xml .= '<image:image>';
                        $xml .= '<image:loc>' . $baseUrl . '/logo.png</image:loc>';
                        $xml .= '<image:title>7agty - حاجتي Logo</image:title>';
                        $xml .= '<image:caption>7agty Egyptian Marketplace - حاجتي</image:caption>';
                        $xml .= '</image:image>';
                    }
                    
                    $xml .= '<lastmod>' . Carbon::now()->toAtomString() . '</lastmod>';
                    $xml .= '<changefreq>' . $page['changefreq'] . '</changefreq>';
                    $xml .= '<priority>' . $page['priority'] . '</priority>';
                    $xml .= '</url>';
                }

                $xml .= '</urlset>';
                return $xml;
            });

            return response($xml, 200, [
                'Content-Type' => 'application/xml; charset=utf-8',
                'Cache-Control' => 'public, max-age=600', // 10 minutes
            ]);

        } catch (\Exception $e) {
            Log::error('Main sitemap generation failed: ' . $e->getMessage());
            return response($this->errorXml($e->getMessage()), 500, [
                'Content-Type' => 'application/xml; charset=utf-8',
            ]);
        }
    }


    /**
     * Generate properties sitemap for specific language
     */
    public function properties($lang = 'en')
    {
        config(['session.driver' => 'array']);
        
        try {
            // Cache for 5 minutes per language (reduced for frequent updates)
            $xml = Cache::remember("sitemap_properties_{$lang}", 300, function () use ($lang) {
                $xml = '<?xml version="1.0" encoding="UTF-8"?>';
                $xml .= '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" ';
                $xml .= 'xmlns:xhtml="http://www.w3.org/1999/xhtml" ';
                $xml .= 'xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">';

                $baseUrl = config('app.url', 'https://7agty.com');

                // Get approved properties with their relations
                $properties = Property::with(['city', 'governorate', 'country', 'user'])
                    ->where('status', 'approved')
                    ->where('is_active', true)
                    ->orderBy('updated_at', 'desc')
                    ->get();

                foreach ($properties as $property) {
                    $propertyUrl = $baseUrl . '/property/' . $property->id;
                    
                    $xml .= '<url>';
                    $xml .= '<loc>' . $propertyUrl . '?lang=' . $lang . '</loc>';
                    
                    // Add alternate language versions
                    $xml .= '<xhtml:link rel="alternate" hreflang="en" href="' . $propertyUrl . '?lang=en" />';
                    $xml .= '<xhtml:link rel="alternate" hreflang="ar" href="' . $propertyUrl . '?lang=ar" />';
                    $xml .= '<xhtml:link rel="alternate" hreflang="x-default" href="' . $propertyUrl . '" />';
                    
                    // Add property images
                    if ($property->images && count($property->images) > 0) {
                        foreach (array_slice($property->images, 0, 5) as $image) { // Max 5 images per property
                            $xml .= '<image:image>';
                            $xml .= '<image:loc>' . $baseUrl . '/storage/' . $image . '</image:loc>';
                            $xml .= '<image:title>' . htmlspecialchars($property->title) . '</image:title>';
                            if ($property->description) {
                                $xml .= '<image:caption>' . htmlspecialchars(substr($property->description, 0, 200)) . '</image:caption>';
                            }
                            $xml .= '</image:image>';
                        }
                    }
                    
                    $xml .= '<lastmod>' . $property->updated_at->toAtomString() . '</lastmod>';
                    $xml .= '<changefreq>daily</changefreq>';
                    $xml .= '<priority>' . ($property->is_featured ? '0.9' : '0.8') . '</priority>';
                    $xml .= '</url>';
                }

                $xml .= '</urlset>';
                return $xml;
            });

            return response($xml, 200, [
                'Content-Type' => 'application/xml; charset=utf-8',
                'Cache-Control' => 'public, max-age=300', // 5 minutes
            ]);

        } catch (\Exception $e) {
            Log::error("Properties sitemap ({$lang}) generation failed: " . $e->getMessage());
            return response($this->errorXml($e->getMessage()), 500, [
                'Content-Type' => 'application/xml; charset=utf-8',
            ]);
        }
    }

    /**
     * Generate user profiles sitemap for specific language
     */
    public function users($lang = 'en')
    {
        config(['session.driver' => 'array']);
        
        try {
            // Cache for 30 minutes per language
            $xml = Cache::remember("sitemap_users_{$lang}", 1800, function () use ($lang) {
                $xml = '<?xml version="1.0" encoding="UTF-8"?>';
                $xml .= '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" ';
                $xml .= 'xmlns:xhtml="http://www.w3.org/1999/xhtml">';

                $baseUrl = config('app.url', 'https://7agty.com');

                // Get active sellers and users with properties - check both banned fields
                $users = User::where(function($query) {
                        $query->where('banned', false)
                              ->orWhereNull('banned');
                    })
                    ->where(function($query) {
                        $query->where('is_banned', false)
                              ->orWhereNull('is_banned');
                    })
                    ->where(function ($query) {
                        $query->where('is_seller', true)
                              ->orWhereHas('properties', function ($q) {
                                  $q->where('status', 'approved');
                              });
                    })
                    ->orderBy('updated_at', 'desc')
                    ->get();

                foreach ($users as $user) {
                    // Support both /user/{id} and /user/{username} formats
                    $profileUrl = $baseUrl . '/user/' . $user->username;
                    
                    $xml .= '<url>';
                    $xml .= '<loc>' . $profileUrl . '?lang=' . $lang . '</loc>';
                    
                    // Add alternate language versions
                    $xml .= '<xhtml:link rel="alternate" hreflang="en" href="' . $profileUrl . '?lang=en" />';
                    $xml .= '<xhtml:link rel="alternate" hreflang="ar" href="' . $profileUrl . '?lang=ar" />';
                    $xml .= '<xhtml:link rel="alternate" hreflang="x-default" href="' . $profileUrl . '" />';
                    
                    $xml .= '<lastmod>' . $user->updated_at->toAtomString() . '</lastmod>';
                    $xml .= '<changefreq>weekly</changefreq>';
                    $xml .= '<priority>' . ($user->is_seller ? '0.7' : '0.5') . '</priority>';
                    $xml .= '</url>';
                }

                $xml .= '</urlset>';
                return $xml;
            });

            return response($xml, 200, [
                'Content-Type' => 'application/xml; charset=utf-8',
                'Cache-Control' => 'public, max-age=1800', // 30 minutes
            ]);

        } catch (\Exception $e) {
            Log::error("Users sitemap ({$lang}) generation failed: " . $e->getMessage());
            return response($this->errorXml($e->getMessage()), 500, [
                'Content-Type' => 'application/xml; charset=utf-8',
            ]);
        }
    }

    /**
     * Test endpoint to check if controller is working
     */
    public function test()
    {
        $propertiesCount = 0;
        $usersCount = 0;
        
        try {
            $propertiesCount = Property::where('status', 'approved')->count();
            $usersCount = User::where('is_banned', false)->count();
        } catch (\Exception $e) {
            // Tables might not exist yet
        }

        return response()->json([
            'status' => 'working',
            'message' => 'SitemapController is accessible',
            'sitemaps' => [
                'index' => url('/sitemap.xml'),
                'main' => url('/sitemap-main.xml'),
                'properties_en' => url('/sitemap-properties-en.xml'),
                'properties_ar' => url('/sitemap-properties-ar.xml'),
                'users_en' => url('/sitemap-users-en.xml'),
                'users_ar' => url('/sitemap-users-ar.xml'),
            ],
            'counts' => [
                'properties' => $propertiesCount,
                'users' => $usersCount,
            ],
            'timestamp' => now()
        ]);
    }

    /**
     * Generate and save unified sitemap (single file with all URLs)
     */
    public function generate()
    {
        try {
            $files = [];
            
            // Generate single unified sitemap with all URLs
            $indexXml = $this->index()->getContent();
            $indexPath = public_path('sitemap.xml');
            file_put_contents($indexPath, $indexXml);
            $files['sitemap.xml'] = filesize($indexPath);
            
            // Clear sitemap cache
            $this->clearCache();
            
            // Ping search engines
            $pingResults = $this->pingSearchEngines();
            
            return response()->json([
                'success' => true,
                'message' => 'Unified sitemap generated, saved, and search engines notified',
                'files' => array_map(fn($size) => number_format($size) . ' bytes', $files),
                'urls' => [
                    'sitemap' => url('sitemap.xml'),
                ],
                'ping_results' => $pingResults,
                'timestamp' => now(),
                'note' => 'All URLs (static pages, properties, users) are now in a single sitemap.xml file'
            ]);
            
        } catch (\Exception $e) {
            Log::error('Sitemap generation failed: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Clear all sitemap caches
     */
    public function clearCache()
    {
        try {
            Cache::forget('sitemap_unified');
            Cache::forget('sitemap_main');
            Cache::forget('sitemap_properties_en');
            Cache::forget('sitemap_properties_ar');
            Cache::forget('sitemap_users_en');
            Cache::forget('sitemap_users_ar');
            
            Log::info('Sitemap caches cleared');
            
            return response()->json([
                'success' => true,
                'message' => 'All sitemap caches cleared',
                'timestamp' => now()
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Ping search engines about sitemap update
     */
    private function pingSearchEngines()
    {
        $results = [];
        $sitemapUrl = url('/sitemap.xml');
        
        // Ping Google
        try {
            $googlePing = 'https://www.google.com/ping?sitemap=' . urlencode($sitemapUrl);
            @file_get_contents($googlePing);
            $results['google'] = 'success';
            Log::info('Google pinged about sitemap update');
        } catch (\Exception $e) {
            $results['google'] = 'failed: ' . $e->getMessage();
            Log::warning('Failed to ping Google: ' . $e->getMessage());
        }
        
        // Ping Bing
        try {
            $bingPing = 'https://www.bing.com/ping?sitemap=' . urlencode($sitemapUrl);
            @file_get_contents($bingPing);
            $results['bing'] = 'success';
            Log::info('Bing pinged about sitemap update');
        } catch (\Exception $e) {
            $results['bing'] = 'failed: ' . $e->getMessage();
            Log::warning('Failed to ping Bing: ' . $e->getMessage());
        }
        
        return $results;
    }

    /**
     * Generate error XML response
     */
    private function errorXml($message)
    {
        $xml = '<?xml version="1.0" encoding="UTF-8"?>';
        $xml .= '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';
        $xml .= '<!-- Error: ' . htmlspecialchars($message) . ' -->';
        $xml .= '<url>';
        $xml .= '<loc>' . url('/') . '</loc>';
        $xml .= '<lastmod>' . Carbon::now()->toAtomString() . '</lastmod>';
        $xml .= '<changefreq>daily</changefreq>';
        $xml .= '<priority>1.0</priority>';
        $xml .= '</url>';
        $xml .= '</urlset>';
        return $xml;
    }
}