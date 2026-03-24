<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ListingTypesController extends Controller
{
    /**
     * Get all listing types and their configuration
     */
    public function index()
    {
        $listings = config('listings');

        return response()->json([
            'success' => true,
            'data' => $listings
        ]);
    }

    /**
     * Get specific listing type configuration
     */
    public function show($type)
    {
        $listings = config('listings');
        
        if (!isset($listings['types'][$type])) {
            return response()->json([
                'success' => false,
                'message' => 'Listing type not found'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $listings['types'][$type]
        ]);
    }

    /**
     * Get car makes
     */
    public function carMakes()
    {
        $makes = config('listings.car_makes');

        return response()->json([
            'success' => true,
            'data' => $makes
        ]);
    }

    /**
     * Get models for a specific car make
     */
    public function carModels($make)
    {
        $makes = config('listings.car_makes');
        
        // Check if the make exists in the config
        if (!isset($makes[$make])) {
            return response()->json([
                'success' => false,
                'message' => 'Car make not found'
            ], 404);
        }

        // Get models from the make's array
        $models = $makes[$make]['models'] ?? [];

        return response()->json([
            'success' => true,
            'data' => $models
        ]);
    }

    /**
     * Get electronics categories
     */
    public function electronicsTypes()
    {
        $types = config('listings.electronics_types');

        return response()->json([
            'success' => true,
            'data' => $types
        ]);
    }

    /**
     * Get item condition options (for electronics, mobile, etc.)
     */
    public function itemCondition()
    {
        $conditions = config('listings.item_condition');

        return response()->json([
            'success' => true,
            'data' => $conditions
        ]);
    }

    /**
     * Get mobile brands
     */
    public function mobileBrands()
    {
        $brands = config('listings.mobile_brands');

        return response()->json([
            'success' => true,
            'data' => $brands
        ]);
    }

    /**
     * Get models for a specific mobile brand
     */
    public function mobileModels($brand)
    {
        $models = config('listings.mobile_models');
        
        if (!isset($models[$brand])) {
            return response()->json([
                'success' => false,
                'message' => 'Mobile brand not found'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $models[$brand]
        ]);
    }

    /**
     * Get job types
     */
    public function jobTypes()
    {
        $types = config('listings.job_types');

        return response()->json([
            'success' => true,
            'data' => $types
        ]);
    }

    /**
     * Get job work types (full-time, part-time, etc.)
     */
    public function jobWorkTypes()
    {
        $types = config('listings.job_work_type');

        return response()->json([
            'success' => true,
            'data' => $types
        ]);
    }

    /**
     * Get job location types (on-site, remote, hybrid)
     */
    public function jobLocationTypes()
    {
        $types = config('listings.job_location_type');

        return response()->json([
            'success' => true,
            'data' => $types
        ]);
    }

    /**
     * Get vehicle booking types
     */
    public function vehicleTypes()
    {
        $types = config('listings.vehicle_types');

        return response()->json([
            'success' => true,
            'data' => $types
        ]);
    }

    /**
     * Get vehicle rental options (with driver, self-drive)
     */
    public function vehicleRentalOptions()
    {
        $options = config('listings.vehicle_rental_options');

        return response()->json([
            'success' => true,
            'data' => $options
        ]);
    }

    /**
     * Get doctor specialties
     */
    public function doctorSpecialties()
    {
        $specialties = config('listings.doctor_specialties');

        return response()->json([
            'success' => true,
            'data' => $specialties
        ]);
    }

    /**
     * Get booking types for doctors
     */
    public function bookingTypes()
    {
        $types = config('listings.booking_types');

        return response()->json([
            'success' => true,
            'data' => $types
        ]);
    }
}
