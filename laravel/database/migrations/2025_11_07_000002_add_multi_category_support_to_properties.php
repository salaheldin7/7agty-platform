<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // Modify properties table to support multiple listing types
        Schema::table('properties', function (Blueprint $table) {
            // Add country support
            $table->foreignId('country_id')->nullable()->after('user_id')->constrained('countries')->onDelete('cascade');
            
            // Change category to support new types
            $table->dropColumn('category');
            $table->string('listing_type')->after('rent_or_buy'); // property, car, electronics, mobile, job, vehicle_booking, doctor_booking
            $table->string('category')->nullable()->after('listing_type'); // Sub-category based on listing_type
            
            // Make rent_or_buy nullable (not needed for all types)
            $table->string('rent_or_buy')->nullable()->change();
            
            // Car specific fields
            $table->string('car_make')->nullable()->after('category');
            $table->string('car_model')->nullable()->after('car_make');
            $table->integer('car_year')->nullable()->after('car_model');
            $table->string('car_condition')->nullable()->after('car_year'); // new, used
            $table->integer('car_mileage')->nullable()->after('car_condition');
            $table->string('car_transmission')->nullable()->after('car_mileage'); // automatic, manual
            $table->string('car_fuel_type')->nullable()->after('car_transmission'); // petrol, diesel, electric, hybrid
            
            // Electronics specific
            $table->string('electronics_type')->nullable()->after('car_fuel_type'); // fridge, tv, washing_machine, etc.
            $table->string('electronics_brand')->nullable()->after('electronics_type');
            $table->string('electronics_condition')->nullable()->after('electronics_brand'); // new, used, refurbished
            $table->string('electronics_warranty')->nullable()->after('electronics_condition'); // yes, no
            
            // Mobile/Tablet specific
            $table->string('mobile_brand')->nullable()->after('electronics_warranty'); // apple, samsung, etc.
            $table->string('mobile_model')->nullable()->after('mobile_brand');
            $table->string('mobile_storage')->nullable()->after('mobile_model'); // 64GB, 128GB, etc.
            $table->string('mobile_color')->nullable()->after('mobile_storage');
            $table->string('mobile_condition')->nullable()->after('mobile_color'); // new, used, refurbished
            
            // Job specific
            $table->string('job_type')->nullable()->after('mobile_condition'); // engineering, accounting, etc.
            $table->string('job_experience_level')->nullable()->after('job_type'); // entry, mid, senior
            $table->string('job_employment_type')->nullable()->after('job_experience_level'); // full-time, part-time, contract
            $table->decimal('job_salary_min', 15, 2)->nullable()->after('job_employment_type');
            $table->decimal('job_salary_max', 15, 2)->nullable()->after('job_salary_min');
            
            // Vehicle Booking specific
            $table->string('vehicle_type')->nullable()->after('job_salary_max'); // suv, sedan, bus, truck
            $table->boolean('vehicle_with_driver')->default(false)->after('vehicle_type');
            $table->string('vehicle_rental_duration')->nullable()->after('vehicle_with_driver'); // hourly, daily, weekly, monthly
            
            // Doctor Booking specific
            $table->string('booking_type')->nullable()->after('vehicle_rental_duration'); // appointment, consultation
            $table->string('doctor_specialty')->nullable()->after('booking_type'); // neurology, cardiology, etc.
            $table->string('doctor_name')->nullable()->after('doctor_specialty');
            $table->string('clinic_hospital_name')->nullable()->after('doctor_name');
            $table->json('available_days')->nullable()->after('clinic_hospital_name');
            $table->json('available_hours')->nullable()->after('available_days');
            
            // Add indexes for new fields
            $table->index(['listing_type', 'status']);
            $table->index(['country_id', 'governorate_id', 'city_id']);
        });
    }

    public function down(): void
    {
        Schema::table('properties', function (Blueprint $table) {
            // Remove foreign key
            $table->dropForeign(['country_id']);
            
            // Drop new columns
            $table->dropColumn([
                'country_id',
                'listing_type',
                'car_make',
                'car_model',
                'car_year',
                'car_condition',
                'car_mileage',
                'car_transmission',
                'car_fuel_type',
                'electronics_type',
                'electronics_brand',
                'electronics_condition',
                'electronics_warranty',
                'mobile_brand',
                'mobile_model',
                'mobile_storage',
                'mobile_color',
                'mobile_condition',
                'job_type',
                'job_experience_level',
                'job_employment_type',
                'job_salary_min',
                'job_salary_max',
                'vehicle_type',
                'vehicle_with_driver',
                'vehicle_rental_duration',
                'booking_type',
                'doctor_specialty',
                'doctor_name',
                'clinic_hospital_name',
                'available_days',
                'available_hours',
            ]);
            
            // Restore original category
            $table->enum('category', ['villa', 'apartment', 'townhouse', 'land', 'building', 'commercial'])->after('rent_or_buy');
            $table->enum('rent_or_buy', ['rent', 'buy'])->change();
        });
    }
};
