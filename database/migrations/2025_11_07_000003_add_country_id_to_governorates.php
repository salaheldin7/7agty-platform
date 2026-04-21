<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (!Schema::hasColumn('governorates', 'country_id')) {
            Schema::table('governorates', function (Blueprint $table) {
                $table->foreignId('country_id')->after('id')->default(1)->constrained('countries')->onDelete('cascade');
                $table->index('country_id');
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
    }
};
