<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Property;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class UserController extends Controller
{
    /**
     * Get user profile by ID
     */
    public function show($id): JsonResponse
    {
        try {
            Log::info('Fetching user profile', ['user_id' => $id]);
            
            $user = User::find($id);
            
            if (!$user) {
                Log::warning('User not found', ['user_id' => $id]);
                return response()->json([
                    'success' => false,
                    'message' => 'User not found'
                ], 404);
            }
            
            // Count user's approved properties
            $propertiesCount = Property::where('user_id', $id)
                ->where('status', 'approved')
                ->where('is_active', true)
                ->count();

            Log::info('User profile retrieved successfully', ['user_id' => $id, 'properties_count' => $propertiesCount]);

            return response()->json([
                'success' => true,
                'data' => [
                    'id' => $user->id,
                    'name' => $user->name,
                    'username' => $user->username ?? null,
                    'email' => $user->email,
                    'phone' => $user->phone ?? null,
                    'role' => $user->role ?? 'user',
                    'created_at' => $user->created_at->toISOString(),
                    'properties_count' => $propertiesCount,
                ],
                'message' => 'User profile retrieved successfully'
            ]);

        } catch (\Exception $e) {
            Log::error('Error fetching user profile', [
                'user_id' => $id,
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve user profile',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get user profile by username
     */
    public function showByUsername($username): JsonResponse
    {
        try {
            Log::info('Fetching user profile by username', ['username' => $username]);
            
            $user = User::where('username', $username)->first();
            
            if (!$user) {
                Log::warning('User not found by username', ['username' => $username]);
                return response()->json([
                    'success' => false,
                    'message' => 'User not found'
                ], 404);
            }
            
            // Count user's approved properties
            $propertiesCount = Property::where('user_id', $user->id)
                ->where('status', 'approved')
                ->where('is_active', true)
                ->count();

            Log::info('User profile retrieved successfully', ['username' => $username, 'properties_count' => $propertiesCount]);

            return response()->json([
                'success' => true,
                'data' => [
                    'id' => $user->id,
                    'name' => $user->name,
                    'username' => $user->username ?? null,
                    'email' => $user->email,
                    'phone' => $user->phone ?? null,
                    'role' => $user->role ?? 'user',
                    'created_at' => $user->created_at->toISOString(),
                    'properties_count' => $propertiesCount,
                ],
                'message' => 'User profile retrieved successfully'
            ]);

        } catch (\Exception $e) {
            Log::error('Error fetching user profile by username', [
                'username' => $username,
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve user profile',
                'error' => $e->getMessage()
            ], 500);
        }
    }
/**
 * Search users globally
 */
public function search(Request $request): JsonResponse
{
    try {
        $query = $request->get('query', '');
        
        if (empty($query)) {
            return response()->json([
                'success' => true,
                'users' => [],
                'message' => 'Please provide a search query'
            ]);
        }

        $currentUser = Auth::user();
        
        // Search users by name, username, email, or phone
        $users = User::where('id', '!=', $currentUser->id)
            ->where(function($q) use ($query) {
                $q->where('name', 'like', "%{$query}%")
                  ->orWhere('username', 'like', "%{$query}%")
                  ->orWhere('email', 'like', "%{$query}%")
                  ->orWhere('phone', 'like', "%{$query}%");
            })
            ->limit(50) // Limit results to 50 users
            ->get()
            ->map(function ($user) {
                // Check if user is online (last activity within 5 minutes)
                $isOnline = $user->is_online && 
                            $user->last_activity_at && 
                            $user->last_activity_at->diffInMinutes(now()) < 5;

                return [
                    'id' => $user->id,
                    'name' => $user->name,
                    'username' => $user->username,
                    'email' => $user->email,
                    'phone' => $user->phone,
                    'avatar' => $user->avatar,
                    'is_admin' => $user->is_admin ?? false,
                    'is_founder' => $user->is_founder ?? false,
                    'is_online' => $isOnline,
                    'last_activity_at' => $user->last_activity_at ? $user->last_activity_at->toISOString() : null,
                    'last_seen_at' => $user->last_seen_at ? $user->last_seen_at->toISOString() : null,
                ];
            });

        return response()->json([
            'success' => true,
            'users' => $users,
            'total' => $users->count(),
        ]);

    } catch (\Exception $e) {
        \Log::error('User search error', [
            'error' => $e->getMessage(),
            'query' => $request->get('query'),
        ]);

        return response()->json([
            'success' => false,
            'message' => 'Failed to search users',
            'error' => $e->getMessage(),
            'users' => [],
        ], 500);
    }
}
    /**
     * Get all properties for a specific user by username
     */
    public function getUserPropertiesByUsername($username, Request $request): JsonResponse
    {
        try {
            Log::info('Fetching user properties by username', ['username' => $username]);
            
            $user = User::where('username', $username)->first();
            
            if (!$user) {
                Log::warning('User not found for properties', ['username' => $username]);
                return response()->json([
                    'success' => false,
                    'message' => 'User not found'
                ], 404);
            }
            
            return $this->getUserProperties($user->id, $request);

        } catch (\Exception $e) {
            Log::error('Error fetching user properties by username', [
                'username' => $username,
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve user properties',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get all properties for a specific user
     */
    public function getUserProperties($id, Request $request): JsonResponse
    {
        try {
            Log::info('Fetching user properties', ['user_id' => $id]);
            
            $user = User::find($id);
            
            if (!$user) {
                Log::warning('User not found for properties', ['user_id' => $id]);
                return response()->json([
                    'success' => false,
                    'message' => 'User not found'
                ], 404);
            }
            
            // Get user's favorite property IDs if authenticated
            $favoriteIds = [];
            if (Auth::check()) {
                try {
                    $favoriteIds = Auth::user()->favorites()->pluck('property_id')->toArray();
                } catch (\Exception $e) {
                    Log::warning('Could not fetch favorites', ['error' => $e->getMessage()]);
                    $favoriteIds = [];
                }
            }
            
            // Query properties
            $query = Property::select([
                'id', 'title', 'description', 'price', 'country_id', 'governorate_id', 'city_id',
                'listing_type', 'category', 'rent_or_buy', 'status', 'bedrooms', 'bathrooms', 'area',
                'images', 'views_count', 'is_featured', 'is_active', 'user_id', 
                'furnished', 'has_parking', 'has_garden', 'has_pool', 'created_at', 'updated_at',
                // Type-specific fields
                'car_make', 'car_model', 'car_year', 'car_condition', 'car_mileage',
                'electronics_type', 'electronics_brand', 'electronics_condition',
                'mobile_brand', 'mobile_model', 'mobile_condition',
                'job_type', 'job_experience_level', 'job_employment_type',
                'vehicle_type', 'vehicle_rental_duration', 'vehicle_with_driver',
                'doctor_specialty', 'booking_type'
            ])
            ->where('user_id', $id)
            ->where('status', 'approved')
            ->where('is_active', true)
            ->whereNotIn('status', ['sold', 'rented']);

            // Try to load relationships, but continue if they fail
            try {
                $query->with([
                    'user:id,name,username,email,phone',
                    'country:id,name_en,name_ar,code',
                    'governorate:id,name_en,name_ar,country_id',
                    'city:id,name_en,name_ar,governorate_id'
                ]);
            } catch (\Exception $e) {
                Log::warning('Could not load relationships', ['error' => $e->getMessage()]);
            }

            // Apply filters
            if ($request->filled('listing_type')) {
                $query->where('listing_type', $request->listing_type);
            }

            if ($request->filled('country_id')) {
                $query->where('country_id', $request->country_id);
            }

            if ($request->filled('governorate_id')) {
                $query->where('governorate_id', $request->governorate_id);
            }

            if ($request->filled('city_id')) {
                $query->where('city_id', $request->city_id);
            }

            if ($request->filled('category')) {
                $query->where('category', $request->category);
            }

            if ($request->filled('rent_or_buy')) {
                $query->where('rent_or_buy', $request->rent_or_buy);
            }

            if ($request->filled('min_price')) {
                $query->where('price', '>=', $request->min_price);
            }

            if ($request->filled('max_price')) {
                $query->where('price', '<=', $request->max_price);
            }

            // Car-specific filters
            if ($request->filled('car_make')) {
                $query->where('car_make', $request->car_make);
            }

            if ($request->filled('car_model')) {
                $query->where('car_model', $request->car_model);
            }

            if ($request->filled('car_condition')) {
                $query->where('car_condition', $request->car_condition);
            }

            // Electronics filters
            if ($request->filled('electronics_type')) {
                $query->where('electronics_type', $request->electronics_type);
            }

            // Mobile filters
            if ($request->filled('mobile_brand')) {
                $query->where('mobile_brand', $request->mobile_brand);
            }

            if ($request->filled('mobile_model')) {
                $query->where('mobile_model', $request->mobile_model);
            }

            // Job filters
            if ($request->filled('job_type')) {
                $query->where('job_type', $request->job_type);
            }

            if ($request->filled('job_employment_type')) {
                $query->where('job_employment_type', $request->job_employment_type);
            }

            // Vehicle booking filters
            if ($request->filled('vehicle_type')) {
                $query->where('vehicle_type', $request->vehicle_type);
            }

            // Doctor booking filters
            if ($request->filled('doctor_specialty')) {
                $query->where('doctor_specialty', $request->doctor_specialty);
            }

            if ($request->filled('search')) {
                $search = $request->search;
                $query->where(function ($q) use ($search) {
                    $q->where('title', 'like', "%{$search}%")
                      ->orWhere('description', 'like', "%{$search}%");
                });
            }

            // Sorting
            $sortBy = $request->get('sort_by', 'created_at');
            $sortOrder = $request->get('sort_order', 'desc');

            switch ($sortBy) {
                case 'price_low_high':
                    $query->orderBy('price', 'asc');
                    break;
                case 'price_high_low':
                    $query->orderBy('price', 'desc');
                    break;
                case 'date_old_new':
                    $query->orderBy('created_at', 'asc');
                    break;
                case 'date_new_old':
                    $query->orderBy('created_at', 'desc');
                    break;
                default:
                    $query->orderBy($sortBy, $sortOrder);
            }

            // Pagination
            $perPage = $request->get('per_page', 12);
            $properties = $query->paginate($perPage);

            Log::info('Properties retrieved', ['count' => $properties->count()]);

            // Transform the data
            $properties->getCollection()->transform(function ($property) use ($favoriteIds) {
                return $this->transformProperty($property, false, $favoriteIds);
            });

            return response()->json([
                'success' => true,
                'data' => $properties,
                'message' => 'User properties retrieved successfully'
            ]);

        } catch (\Exception $e) {
            Log::error('Error fetching user properties', [
                'user_id' => $id,
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve user properties',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Transform property data for API response
     */
    private function transformProperty($property, $detailed = false, $favoriteIds = []): array
    {
        try {
            // Convert relative image paths to full URLs
            $images = $property->images ?? [];
            $baseUrl = config('app.url');
            
            $fullImageUrls = array_map(function($imagePath) use ($baseUrl) {
                if (str_starts_with($imagePath, 'http://') || str_starts_with($imagePath, 'https://')) {
                    return $imagePath;
                }
                return $baseUrl . $imagePath;
            }, $images);

            // Safely get related data
            $country = null;
            $governorate = null;
            $city = null;
            $user = null;
            
            try {
                $country = $property->country;
            } catch (\Exception $e) {
                Log::debug('Could not load country', ['error' => $e->getMessage()]);
            }
            
            try {
                $governorate = $property->governorate;
            } catch (\Exception $e) {
                Log::debug('Could not load governorate', ['error' => $e->getMessage()]);
            }
            
            try {
                $city = $property->city;
            } catch (\Exception $e) {
                Log::debug('Could not load city', ['error' => $e->getMessage()]);
            }
            
            try {
                $user = $property->user;
            } catch (\Exception $e) {
                Log::debug('Could not load user', ['error' => $e->getMessage()]);
            }

            $data = [
                'id' => $property->id,
                'slug' => $property->slug ?? '',
                'title' => $property->title,
                'description' => $property->description,
                'price' => $property->price,
                'formatted_price' => number_format($property->price),
                'listing_type' => $property->listing_type ?? 'property',
                'category' => $property->category,
                'rent_or_buy' => $property->rent_or_buy,
                'bedrooms' => $property->bedrooms,
                'bathrooms' => $property->bathrooms,
                'area' => $property->area,
                'main_image' => !empty($fullImageUrls) ? $fullImageUrls[0] : null,
                'images' => $fullImageUrls,
                'images_count' => count($fullImageUrls),
                'location' => $property->location ?? '',
                'location_country' => $country ? $country->name_en : '',
                'location_governorate' => $governorate ? $governorate->name_en : '',
                'location_city' => $city ? $city->name_en : '',
                'country' => $country ? [
                    'id' => $country->id,
                    'name' => $country->name_en,
                ] : null,
                'governorate' => $governorate ? [
                    'id' => $governorate->id,
                    'name' => $governorate->name_en,
                ] : null,
                'city' => $city ? [
                    'id' => $city->id,
                    'name' => $city->name_en,
                ] : null,
                'status' => $property->status,
                'is_featured' => $property->is_featured ?? false,
                'is_active' => $property->is_active ?? true,
                'views_count' => $property->views_count ?? 0,
                'created_at' => $property->created_at ? $property->created_at->toISOString() : null,
                'updated_at' => $property->updated_at ? $property->updated_at->toISOString() : null,
                'user' => $user ? [
                    'id' => $user->id,
                    'name' => $user->name,
                    'username' => $user->username ?? null,
                    'phone' => $user->phone ?? '',
                ] : null,
                'user_name' => $user ? $user->name : 'Unknown',
                'username' => $user ? ($user->username ?? '') : '',
                'user_id' => $user ? $user->id : 0,
                'user_phone' => $user ? ($user->phone ?? '') : '',
                'is_favorited' => in_array($property->id, $favoriteIds),
                // Type-specific fields
                'car_make' => $property->car_make ?? null,
                'car_model' => $property->car_model ?? null,
                'car_year' => $property->car_year ?? null,
                'car_condition' => $property->car_condition ?? null,
                'car_mileage' => $property->car_mileage ?? null,
                'electronics_type' => $property->electronics_type ?? null,
                'electronics_brand' => $property->electronics_brand ?? null,
                'electronics_condition' => $property->electronics_condition ?? null,
                'item_condition' => $property->electronics_condition ?? $property->mobile_condition ?? null,
                'mobile_brand' => $property->mobile_brand ?? null,
                'mobile_model' => $property->mobile_model ?? null,
                'job_type' => $property->job_type ?? null,
                'job_work_type' => $property->job_employment_type ?? null,
                'job_employment_type' => $property->job_employment_type ?? null,
                'job_location_type' => $property->job_experience_level ?? null,
                'job_experience_level' => $property->job_experience_level ?? null,
                'vehicle_type' => $property->vehicle_type ?? null,
                'vehicle_rental_option' => $property->vehicle_rental_duration ?? null,
                'vehicle_with_driver' => $property->vehicle_with_driver ?? false,
                'doctor_specialty' => $property->doctor_specialty ?? null,
                'booking_type' => $property->booking_type ?? null,
            ];

            return $data;
            
        } catch (\Exception $e) {
            Log::error('Error transforming property', [
                'property_id' => $property->id ?? 'unknown',
                'error' => $e->getMessage()
            ]);
            
            // Return minimal data if transformation fails
            return [
                'id' => $property->id ?? 0,
                'title' => $property->title ?? 'Unknown',
                'error' => 'Failed to load property details'
            ];
        }
    }
}