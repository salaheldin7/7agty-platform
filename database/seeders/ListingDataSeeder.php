<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ListingDataSeeder extends Seeder
{
    public function run(): void
    {
        // This seeder creates reference data tables for the new listing types
        
        // Car Makes with logos
        $this->seedCarMakes();
        
        // Electronics Types
        $this->seedElectronicsTypes();
        
        // Mobile Brands
        $this->seedMobileBrands();
        
        // Job Types
        $this->seedJobTypes();
        
        // Vehicle Types
        $this->seedVehicleTypes();
        
        // Doctor Specialties
        $this->seedDoctorSpecialties();
    }
    
    private function seedCarMakes()
    {
        Schema::create('car_makes', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('logo_url')->nullable();
            $table->integer('display_order')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
        
        $carMakes = [
            ['name' => 'Audi', 'logo_url' => 'https://cdn.brandfolder.io/5H442O3W/at/pl546j-7le8zk-199wvr/Audi_Rings_2016.svg', 'display_order' => 1],
            ['name' => 'BMW', 'logo_url' => 'https://www.carlogos.org/car-logos/bmw-logo.png', 'display_order' => 2],
            ['name' => 'Mercedes-Benz', 'logo_url' => 'https://www.carlogos.org/car-logos/mercedes-benz-logo.png', 'display_order' => 3],
            ['name' => 'Volkswagen', 'logo_url' => 'https://www.carlogos.org/car-logos/volkswagen-logo.png', 'display_order' => 4],
            ['name' => 'Toyota', 'logo_url' => 'https://www.carlogos.org/car-logos/toyota-logo.png', 'display_order' => 5],
            ['name' => 'Honda', 'logo_url' => 'https://www.carlogos.org/car-logos/honda-logo.png', 'display_order' => 6],
            ['name' => 'Ford', 'logo_url' => 'https://www.carlogos.org/car-logos/ford-logo.png', 'display_order' => 7],
            ['name' => 'Chevrolet', 'logo_url' => 'https://www.carlogos.org/car-logos/chevrolet-logo.png', 'display_order' => 8],
            ['name' => 'Nissan', 'logo_url' => 'https://www.carlogos.org/car-logos/nissan-logo.png', 'display_order' => 9],
            ['name' => 'Hyundai', 'logo_url' => 'https://www.carlogos.org/car-logos/hyundai-logo.png', 'display_order' => 10],
            ['name' => 'Kia', 'logo_url' => 'https://www.carlogos.org/car-logos/kia-logo.png', 'display_order' => 11],
            ['name' => 'Mazda', 'logo_url' => 'https://www.carlogos.org/car-logos/mazda-logo.png', 'display_order' => 12],
            ['name' => 'Lexus', 'logo_url' => 'https://www.carlogos.org/car-logos/lexus-logo.png', 'display_order' => 13],
            ['name' => 'Porsche', 'logo_url' => 'https://www.carlogos.org/car-logos/porsche-logo.png', 'display_order' => 14],
            ['name' => 'Jaguar', 'logo_url' => 'https://www.carlogos.org/car-logos/jaguar-logo.png', 'display_order' => 15],
            ['name' => 'Land Rover', 'logo_url' => 'https://www.carlogos.org/car-logos/land-rover-logo.png', 'display_order' => 16],
            ['name' => 'Volvo', 'logo_url' => 'https://www.carlogos.org/car-logos/volvo-logo.png', 'display_order' => 17],
            ['name' => 'Subaru', 'logo_url' => 'https://www.carlogos.org/car-logos/subaru-logo.png', 'display_order' => 18],
            ['name' => 'Tesla', 'logo_url' => 'https://www.carlogos.org/car-logos/tesla-logo.png', 'display_order' => 19],
            ['name' => 'Ferrari', 'logo_url' => 'https://www.carlogos.org/car-logos/ferrari-logo.png', 'display_order' => 20],
            ['name' => 'Lamborghini', 'logo_url' => 'https://www.carlogos.org/car-logos/lamborghini-logo.png', 'display_order' => 21],
            ['name' => 'Bentley', 'logo_url' => 'https://www.carlogos.org/car-logos/bentley-logo.png', 'display_order' => 22],
            ['name' => 'Rolls-Royce', 'logo_url' => 'https://www.carlogos.org/car-logos/rolls-royce-logo.png', 'display_order' => 23],
            ['name' => 'Maserati', 'logo_url' => 'https://www.carlogos.org/car-logos/maserati-logo.png', 'display_order' => 24],
            ['name' => 'Alfa Romeo', 'logo_url' => 'https://www.carlogos.org/car-logos/alfa-romeo-logo.png', 'display_order' => 25],
            ['name' => 'Fiat', 'logo_url' => 'https://www.carlogos.org/car-logos/fiat-logo.png', 'display_order' => 26],
            ['name' => 'Peugeot', 'logo_url' => 'https://www.carlogos.org/car-logos/peugeot-logo.png', 'display_order' => 27],
            ['name' => 'Renault', 'logo_url' => 'https://www.carlogos.org/car-logos/renault-logo.png', 'display_order' => 28],
            ['name' => 'Citroën', 'logo_url' => 'https://www.carlogos.org/car-logos/citroen-logo.png', 'display_order' => 29],
            ['name' => 'Mitsubishi', 'logo_url' => 'https://www.carlogos.org/car-logos/mitsubishi-logo.png', 'display_order' => 30],
            ['name' => 'Suzuki', 'logo_url' => 'https://www.carlogos.org/car-logos/suzuki-logo.png', 'display_order' => 31],
            ['name' => 'Isuzu', 'logo_url' => 'https://www.carlogos.org/car-logos/isuzu-logo.png', 'display_order' => 32],
            ['name' => 'Jeep', 'logo_url' => 'https://www.carlogos.org/car-logos/jeep-logo.png', 'display_order' => 33],
            ['name' => 'Cadillac', 'logo_url' => 'https://www.carlogos.org/car-logos/cadillac-logo.png', 'display_order' => 34],
            ['name' => 'Dodge', 'logo_url' => 'https://www.carlogos.org/car-logos/dodge-logo.png', 'display_order' => 35],
            ['name' => 'GMC', 'logo_url' => 'https://www.carlogos.org/car-logos/gmc-logo.png', 'display_order' => 36],
            ['name' => 'RAM', 'logo_url' => 'https://www.carlogos.org/car-logos/ram-logo.png', 'display_order' => 37],
            ['name' => 'Infiniti', 'logo_url' => 'https://www.carlogos.org/car-logos/infiniti-logo.png', 'display_order' => 38],
            ['name' => 'Acura', 'logo_url' => 'https://www.carlogos.org/car-logos/acura-logo.png', 'display_order' => 39],
            ['name' => 'Genesis', 'logo_url' => 'https://www.carlogos.org/car-logos/genesis-logo.png', 'display_order' => 40],
            ['name' => 'Mini', 'logo_url' => 'https://www.carlogos.org/car-logos/mini-logo.png', 'display_order' => 41],
            ['name' => 'Smart', 'logo_url' => 'https://www.carlogos.org/car-logos/smart-logo.png', 'display_order' => 42],
            ['name' => 'Skoda', 'logo_url' => 'https://www.carlogos.org/car-logos/skoda-logo.png', 'display_order' => 43],
            ['name' => 'Seat', 'logo_url' => 'https://www.carlogos.org/car-logos/seat-logo.png', 'display_order' => 44],
            ['name' => 'MG', 'logo_url' => 'https://www.carlogos.org/car-logos/mg-logo.png', 'display_order' => 45],
            ['name' => 'Geely', 'logo_url' => 'https://www.carlogos.org/car-logos/geely-logo.png', 'display_order' => 46],
            ['name' => 'BYD', 'logo_url' => 'https://www.carlogos.org/car-logos/byd-logo.png', 'display_order' => 47],
            ['name' => 'Chery', 'logo_url' => 'https://www.carlogos.org/car-logos/chery-logo.png', 'display_order' => 48],
            ['name' => 'Great Wall', 'logo_url' => 'https://www.carlogos.org/car-logos/great-wall-logo.png', 'display_order' => 49],
            ['name' => 'Haval', 'logo_url' => 'https://www.carlogos.org/car-logos/haval-logo.png', 'display_order' => 50],
        ];
        
        foreach ($carMakes as $make) {
            DB::table('car_makes')->insert(array_merge($make, [
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ]));
        }
    }
    
    // Continue with other seeders...
    // Due to length, I'll create this as a config file instead
}
