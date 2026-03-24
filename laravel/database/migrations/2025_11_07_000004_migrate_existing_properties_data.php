<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        // Ensure Egypt exists in countries table
        $egyptId = DB::table('countries')->where('code', 'EG')->value('id');
        
        if (!$egyptId) {
            // Insert Egypt if it doesn't exist
            $egyptId = DB::table('countries')->insertGetId([
                'name_en' => 'Egypt',
                'name_ar' => 'مصر',
                'code' => 'EG',
                'phone_code' => '+20',
                'currency_code' => 'EGP',
                'currency_symbol' => 'ج.م',
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
        
        // Set default country (Egypt) for all existing properties
        DB::table('properties')
            ->whereNull('listing_type')
            ->orWhereNull('country_id')
            ->update([
                'listing_type' => 'property',
                'country_id' => $egyptId,
            ]);
    }

    public function down(): void
    {
        // No need to revert
    }
};
