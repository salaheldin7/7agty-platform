<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class GenerateSitemap extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'sitemap:generate 
                            {--clear-cache : Clear sitemap cache before generating}
                            {--ping : Ping search engines after generation}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Generate all sitemap files (index, main, properties, users) in multiple languages';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->info('🗺️  Starting unified sitemap generation...');
        $this->newLine();

        $startTime = microtime(true);

        try {
            // Clear cache if requested
            if ($this->option('clear-cache')) {
                $this->info('🧹 Clearing sitemap cache...');
                Cache::forget('sitemap_unified');
                Cache::forget('sitemap_main');
                Cache::forget('sitemap_properties_en');
                Cache::forget('sitemap_properties_ar');
                Cache::forget('sitemap_users_en');
                Cache::forget('sitemap_users_ar');
                $this->info('✅ Cache cleared');
                $this->newLine();
            }

            // Generate unified sitemap file
            $this->info('📝 Generating unified sitemap.xml (all URLs in one file)...');
            
            $controller = app(\App\Http\Controllers\SitemapController::class);
            
            // Generate single sitemap.xml with all URLs
            $this->task('Generating sitemap.xml', function () use ($controller) {
                $indexXml = $controller->index()->getContent();
                $indexPath = public_path('sitemap.xml');
                file_put_contents($indexPath, $indexXml);
                return file_exists($indexPath);
            });

            $this->newLine();
            
            // Display file info
            $this->info('📊 Generated file:');
            $path = public_path('sitemap.xml');
            if (file_exists($path)) {
                $size = filesize($path);
                $this->line("  ✓ sitemap.xml: " . $this->formatBytes($size));
                
                // Count URLs in the sitemap
                $content = file_get_contents($path);
                $urlCount = substr_count($content, '<url>');
                $this->line("  ✓ Total URLs: " . number_format($urlCount));
            }
            
            $this->newLine();

            // Ping search engines if requested
            if ($this->option('ping')) {
                $this->info('📡 Pinging search engines...');
                
                $sitemapUrl = url('/sitemap.xml');
                
                // Ping Google
                $this->task('Pinging Google', function () use ($sitemapUrl) {
                    try {
                        $pingUrl = 'https://www.google.com/ping?sitemap=' . urlencode($sitemapUrl);
                        Http::timeout(10)->get($pingUrl);
                        return true;
                    } catch (\Exception $e) {
                        $this->error('Failed: ' . $e->getMessage());
                        return false;
                    }
                });
                
                // Ping Bing
                $this->task('Pinging Bing', function () use ($sitemapUrl) {
                    try {
                        $pingUrl = 'https://www.bing.com/ping?sitemap=' . urlencode($sitemapUrl);
                        Http::timeout(10)->get($pingUrl);
                        return true;
                    } catch (\Exception $e) {
                        $this->error('Failed: ' . $e->getMessage());
                        return false;
                    }
                });
                
                $this->newLine();
            }

            $endTime = microtime(true);
            $duration = round($endTime - $startTime, 2);

            $this->info("✅ Unified sitemap generation completed successfully in {$duration}s");
            $this->newLine();
            $this->info('📍 Sitemap URL: ' . url('/sitemap.xml'));
            $this->info('🔍 Submit to Google Search Console: https://search.google.com/search-console');
            $this->info('💡 All URLs (static pages, properties, users) are now in a single sitemap.xml file');
            
            Log::info('Unified sitemap generated via console command', [
                'duration' => $duration,
                'url_count' => $urlCount ?? 0,
            ]);

            return Command::SUCCESS;

        } catch (\Exception $e) {
            $this->error('❌ Sitemap generation failed: ' . $e->getMessage());
            Log::error('Sitemap generation command failed: ' . $e->getMessage());
            return Command::FAILURE;
        }
    }

    /**
     * Format bytes to human readable format
     */
    private function formatBytes($bytes)
    {
        if ($bytes >= 1048576) {
            return number_format($bytes / 1048576, 2) . ' MB';
        } elseif ($bytes >= 1024) {
            return number_format($bytes / 1024, 2) . ' KB';
        }
        return $bytes . ' B';
    }
}
