<?php

namespace App\Observers;

use App\Models\Property;

class PropertyObserver
{
    /**
     * Handle the Property "created" event.
     */
    public function created(Property $property)
    {
        // Optional: Add indexing logic here later
    }

    /**
     * Handle the Property "updated" event.
     */
    public function updated(Property $property)
    {
        // Optional: Add indexing logic here later
    }

    /**
     * Handle the Property "deleted" event.
     */
    public function deleted(Property $property)
    {
        // Optional: Add indexing logic here later
    }
}
