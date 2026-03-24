<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckBannedUser
{
    public function handle(Request $request, Closure $next): Response
    {
        $user = $request->user();
        
        if ($user && $user->banned) {
            // Revoke all tokens
            $user->tokens()->delete();
            
            return response()->json([
                'success' => false,
                'message' => 'Your account has been banned',
                'banned' => true
            ], 403);
        }

        return $next($request);
    }
}