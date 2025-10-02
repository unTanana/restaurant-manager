<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @method static \Database\Factories\OrderItemsFactory factory($count = null, $state = [])
 * @method static \Illuminate\Database\Eloquent\Builder<static>|OrderItems newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|OrderItems newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|OrderItems query()
 *
 * @property int $id
 * @property int $order_id
 * @property int $product_id
 * @property int $quantity
 * @property string $unit_price
 * @property string $subtotal
 * @property string|null $special_instructions
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 *
 * @method static \Illuminate\Database\Eloquent\Builder<static>|OrderItems whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|OrderItems whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|OrderItems whereOrderId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|OrderItems whereProductId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|OrderItems whereQuantity($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|OrderItems whereSpecialInstructions($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|OrderItems whereSubtotal($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|OrderItems whereUnitPrice($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|OrderItems whereUpdatedAt($value)
 *
 * @mixin \Eloquent
 */
class OrderItems extends Model
{
    /** @use HasFactory<\Database\Factories\OrderItemsFactory> */
    use HasFactory;
}
