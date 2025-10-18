<?php

namespace Database\Seeders;

use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use App\Models\Table;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create test user
        User::firstOrCreate(
            ['email' => 'test@example.com'],
            [
                'name' => 'Test User',
                'password' => Hash::make('password'),
                'email_verified_at' => now(),
            ]
        );

        // Create tables (12 tables)
        $tables = Table::factory(12)->create();

        // Create products (50 products across different categories)
        $products = Product::factory(50)->create();

        // Create orders with different statuses
        $orders = collect();

        // Create 8 new orders
        $orders = $orders->merge(Order::factory(8)->newOrder()->create());

        // Create 3 in_process orders
        $orders = $orders->merge(Order::factory(3)->inProcess()->create());

        // Create 2 ready orders
        $orders = $orders->merge(Order::factory(2)->ready()->create());

        // Create 2 served orders
        $orders = $orders->merge(Order::factory(2)->served()->create());

        // Create 5 done orders
        $orders = $orders->merge(Order::factory(5)->done()->create());

        // Create order items for each order (2-5 items per order)
        $orders->each(function (Order $order) use ($products) {
            $orderItems = $products->random(rand(2, 5));
            $totalAmount = 0;

            $orderItems->each(function (Product $product) use ($order, &$totalAmount) {
                $quantity = rand(1, 3);
                $unitPrice = (float) $product->price;
                $subtotal = $quantity * $unitPrice;
                $totalAmount += $subtotal;

                OrderItem::factory()->create([
                    'order_id' => $order->id,
                    'product_id' => $product->id,
                    'quantity' => $quantity,
                    'unit_price' => $unitPrice,
                    'subtotal' => $subtotal,
                ]);
            });

            // Update order total
            $order->update(['total_amount' => $totalAmount]);
        });
    }
}
