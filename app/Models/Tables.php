<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @method static \Database\Factories\TablesFactory factory($count = null, $state = [])
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Tables newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Tables newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Tables query()
 *
 * @property int $id
 * @property string $name
 * @property string $qr_code
 * @property int|null $capacity
 * @property int $is_active
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 *
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Tables whereCapacity($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Tables whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Tables whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Tables whereIsActive($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Tables whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Tables whereQrCode($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Tables whereUpdatedAt($value)
 *
 * @mixin \Eloquent
 */
class Tables extends Model
{
    /** @use HasFactory<\Database\Factories\TablesFactory> */
    use HasFactory;
}
