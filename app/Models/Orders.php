<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @method static \Database\Factories\OrdersFactory factory($count = null, $state = [])
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Orders newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Orders newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Orders query()
 *
 * @property int $id
 * @property int $table_id
 * @property string $status
 * @property string $total_amount
 * @property string|null $customer_name
 * @property string|null $notes
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 *
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Orders whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Orders whereCustomerName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Orders whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Orders whereNotes($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Orders whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Orders whereTableId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Orders whereTotalAmount($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Orders whereUpdatedAt($value)
 *
 * @mixin \Eloquent
 */
class Orders extends Model
{
    /** @use HasFactory<\Database\Factories\OrdersFactory> */
    use HasFactory;
}
