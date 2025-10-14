<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Table>
 */
class TableFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => 'Table ' . $this->faker->numberBetween(1, 20),
            'qr_code' => 'QR-' . $this->faker->unique()->numberBetween(1000, 9999),
            'capacity' => $this->faker->numberBetween(2, 8),
            'is_active' => $this->faker->boolean(85), // 85% chance of being active
        ];
    }
}
