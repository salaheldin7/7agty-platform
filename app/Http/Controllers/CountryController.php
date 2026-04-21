<?php

namespace App\Http\Controllers;

use App\Models\Country;
use Illuminate\Http\Request;

class CountryController extends Controller
{
    /**
     * Get all active countries
     */
    public function index()
    {
        $countries = Country::where('is_active', true)
            ->orderBy('name_en')
            ->get(['id', 'name_en', 'name_ar', 'code', 'phone_code', 'currency_code', 'currency_symbol']);

        return response()->json([
            'success' => true,
            'data' => $countries
        ]);
    }

    /**
     * Get a specific country with governorates
     */
    public function show($id)
    {
        $country = Country::with(['governorates' => function ($query) {
            $query->where('is_active', true)->orderBy('name_en');
        }])->findOrFail($id);

        return response()->json([
            'success' => true,
            'data' => $country
        ]);
    }

    /**
     * Get governorates for a specific country
     */
    public function governorates($id)
    {
        $governorates = Country::findOrFail($id)
            ->governorates()
            ->where('is_active', true)
            ->orderBy('name_en')
            ->get(['id', 'name_en', 'name_ar', 'code']);

        return response()->json([
            'success' => true,
            'data' => $governorates
        ]);
    }
}
