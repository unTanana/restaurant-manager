<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @method static \Database\Factories\ProductsFactory factory($count = null, $state = [])
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Products newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Products newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Products query()
 *
 * @property int $id
 * @property string $name
 * @property string|null $description
 * @property string $price
 * @property string $category
 * @property string|null $image_url
 * @property int $is_available
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 *
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Products whereCategory($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Products whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Products whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Products whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Products whereImageUrl($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Products whereIsAvailable($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Products whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Products wherePrice($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Products whereUpdatedAt($value)
 *
 * @mixin \Eloquent
 */
class Products extends Model
{
    /** @use HasFactory<\Database\Factories\ProductsFactory> */
    use HasFactory;
}
