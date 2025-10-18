<?php

namespace Database\Factories;

use App\OrderStatus;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Order>
 */
class OrderFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'table_id' => \App\Models\Table::inRandomOrder()->first()->id,
            'status' => $this->faker->randomElement([
                OrderStatus::New->value,
                OrderStatus::InProcess->value,
                OrderStatus::Ready->value,
                OrderStatus::Served->value,
                OrderStatus::Done->value,
            ]),
            'total_amount' => $this->faker->randomFloat(2, 15, 150),
            'notes' => $this->faker->optional(0.3)->sentence(),
        ];
    }

    public function newOrder(): static
    {
        return $this->state(fn(array $attributes) => [
            'status' => OrderStatus::New->value,
        ]);
    }

    public function inProcess(): static
    {
        return $this->state(fn(array $attributes) => [
            'status' => OrderStatus::InProcess->value,
        ]);
    }

    public function ready(): static
    {
        return $this->state(fn(array $attributes) => [
            'status' => OrderStatus::Ready->value,
        ]);
    }

    public function served(): static
    {
        return $this->state(fn(array $attributes) => [
            'status' => OrderStatus::Served->value,
        ]);
    }

    public function done(): static
    {
        return $this->state(fn(array $attributes) => [
            'status' => OrderStatus::Done->value,
        ]);
    }
}
