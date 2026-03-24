<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // Create countries table only if it doesn't exist
        if (!Schema::hasTable('countries')) {
            Schema::create('countries', function (Blueprint $table) {
                $table->id();
                $table->string('name_en');
                $table->string('name_ar');
                $table->string('code', 3)->unique(); // ISO 3166-1 alpha-2
                $table->string('phone_code', 10);
                $table->string('currency_code', 3)->nullable();
                $table->string('currency_symbol', 10)->nullable();
                $table->boolean('is_active')->default(true);
                $table->timestamps();
                
                $table->index('code');
                $table->index('is_active');
            });
        } else {
            // Table exists, ensure it has all required columns
            Schema::table('countries', function (Blueprint $table) {
                if (!Schema::hasColumn('countries', 'currency_code')) {
                    $table->string('currency_code', 3)->nullable()->after('phone_code');
                }
                if (!Schema::hasColumn('countries', 'currency_symbol')) {
                    $table->string('currency_symbol', 10)->nullable()->after('currency_code');
                }
            });
        }
        
        // Add country_id to governorates table (only if doesn't exist)
        if (!Schema::hasColumn('governorates', 'country_id')) {
            Schema::table('governorates', function (Blueprint $table) {
                $table->foreignId('country_id')->nullable()->after('id')->constrained('countries')->onDelete('cascade');
            });
        }
    }

    public function down(): void
    {
        if (Schema::hasColumn('governorates', 'country_id')) {
            Schema::table('governorates', function (Blueprint $table) {
                $table->dropForeign(['country_id']);
                $table->dropColumn('country_id');
            });
        }
        
        Schema::dropIfExists('countries');
    }
};
