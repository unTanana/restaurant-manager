<?php

namespace Database\Factories;

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
            'table_id' => \App\Models\Table::factory(),
            'status' => $this->faker->randomElement(['new', 'in_process', 'ready', 'served', 'done']),
            'total_amount' => $this->faker->randomFloat(2, 15, 150),
            'notes' => $this->faker->optional(0.3)->sentence(),
        ];
    }

    public function newOrder(): static
    {
        return $this->state(fn(array $attributes) => [
            'status' => 'new',
        ]);
    }

    public function inProcess(): static
    {
        return $this->state(fn(array $attributes) => [
            'status' => 'in_process',
        ]);
    }

    public function ready(): static
    {
        return $this->state(fn(array $attributes) => [
            'status' => 'ready',
        ]);
    }

    public function served(): static
    {
        return $this->state(fn(array $attributes) => [
            'status' => 'served',
        ]);
    }

    public function done(): static
    {
        return $this->state(fn(array $attributes) => [
            'status' => 'done',
        ]);
    }
}
