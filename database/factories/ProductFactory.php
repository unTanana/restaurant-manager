<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $categories = ['Beverages', 'Appetizers', 'Main Course', 'Desserts', 'Sides'];
        $beverages = ['Apa', 'Cola', 'Fresh Orange Juice', 'Coffee', 'Tea', 'Mineral Water'];
        $appetizers = ['Caesar Salad', 'Bruschetta', 'Soup of the Day', 'Garlic Bread'];
        $mainCourse = ['Snitel pui', 'Cartofi prajiti', 'Pizza Margherita', 'Pasta Carbonara', 'Grilled Salmon', 'Beef Steak'];
        $desserts = ['Tiramisu', 'Chocolate Cake', 'Ice Cream', 'Cheesecake'];
        $sides = ['French Fries', 'Mashed Potatoes', 'Rice', 'Vegetables'];

        $category = $this->faker->randomElement($categories);
        $names = match ($category) {
            'Beverages' => $beverages,
            'Appetizers' => $appetizers,
            'Main Course' => $mainCourse,
            'Desserts' => $desserts,
            'Sides' => $sides,
            default => $mainCourse,
        };

        return [
            'name' => $this->faker->randomElement($names),
            'description' => $this->faker->optional(0.7)->sentence(),
            'price' => $this->faker->randomFloat(2, 8, 45),
            'category' => $category,
            'image_url' => $this->faker->optional(0.3)->imageUrl(400, 300, 'food'),
            'is_available' => $this->faker->boolean(90), // 90% chance of being available
        ];
    }
}
