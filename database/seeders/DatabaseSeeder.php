<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Seed countries first so governorates/cities can reference valid country_id values.
        $this->call([
            CountriesSeeder::class,
            GovernorateSeeder::class,
            CitySeeder::class,
            UserSeeder::class, // Add users (founder, admin, sellers)
        ]);
    }
}
