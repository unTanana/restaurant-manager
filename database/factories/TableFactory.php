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
        static $tableNumber = 1;

        return [
            'name' => 'Table '.$tableNumber++,
            'qr_code' => 'TBL-'.str_pad($tableNumber - 1, 3, '0', STR_PAD_LEFT),
            'capacity' => $this->faker->numberBetween(2, 8),
        ];
    }
}