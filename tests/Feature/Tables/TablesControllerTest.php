<?php

use App\Models\Table;
use App\Models\User;

use function Pest\Laravel\actingAs;
use function Pest\Laravel\assertDatabaseHas;
use function Pest\Laravel\assertDatabaseMissing;
use function Pest\Laravel\delete;
use function Pest\Laravel\get;
use function Pest\Laravel\post;
use function Pest\Laravel\put;

beforeEach(function (): void {
    $this->user = User::factory()->create();
    actingAs($this->user);
});

test('guests are redirected to login', function (): void {
    auth()->logout();

    get(route('tables.index'))->assertRedirect(route('login'));
});

test('authenticated users can view tables index', function (): void {
    $tables = Table::factory()->count(3)->create();

    get(route('tables.index'))
        ->assertOk()
        ->assertInertia(
            fn ($page) => $page
                ->component('tables/index')
                ->has('tables.data', 3)
        );
});

test('tables can be searched by name', function (): void {
    Table::factory()->create(['name' => 'Table 1']);
    Table::factory()->create(['name' => 'VIP Room']);

    get(route('tables.index', ['search' => 'VIP']))
        ->assertOk()
        ->assertInertia(
            fn ($page) => $page
                ->has('tables.data', 1)
                ->where('tables.data.0.name', 'VIP Room')
        );
});

test('tables can be filtered by active status', function (): void {
    Table::factory()->create(['is_active' => true]);
    Table::factory()->create(['is_active' => false]);

    get(route('tables.index', ['status' => 'active']))
        ->assertOk()
        ->assertInertia(
            fn ($page) => $page
                ->has('tables.data', 1)
                ->where('tables.data.0.is_active', true)
        );
});

test('authenticated users can view create table page', function (): void {
    get(route('tables.create'))
        ->assertOk()
        ->assertInertia(fn ($page) => $page->component('tables/create'));
});

test('a table can be created with valid data', function (): void {
    $data = [
        'name' => 'Table 1',
        'capacity' => 4,
        'is_active' => true,
    ];

    post(route('tables.store'), $data)
        ->assertRedirect(route('tables.index'));

    assertDatabaseHas('tables', [
        'name' => 'Table 1',
        'capacity' => 4,
        'is_active' => true,
    ]);

    // QR code should be auto-generated
    expect(Table::where('name', 'Table 1')->first()->qr_code)->toStartWith('TBL-');
});

test('table name is required', function (): void {
    post(route('tables.store'), [
        'capacity' => 4,
    ])->assertInvalid(['name']);
});

test('table name must be unique', function (): void {
    Table::factory()->create(['name' => 'Table 1']);

    post(route('tables.store'), [
        'name' => 'Table 1',
    ])->assertInvalid(['name']);
});

test('capacity must be numeric', function (): void {
    post(route('tables.store'), [
        'name' => 'Table 1',
        'capacity' => 'invalid',
    ])->assertInvalid(['capacity']);
});

test('capacity must be between 1 and 50', function ($capacity): void {
    post(route('tables.store'), [
        'name' => 'Table 1',
        'capacity' => $capacity,
    ])->assertInvalid(['capacity']);
})->with([0, 51, -1, 100]);

test('authenticated users can view edit table page', function (): void {
    $table = Table::factory()->create();

    get(route('tables.edit', $table))
        ->assertOk()
        ->assertInertia(
            fn ($page) => $page
                ->component('tables/edit')
                ->where('table.id', $table->id)
        );
});

test('a table can be updated with valid data', function (): void {
    $table = Table::factory()->create(['name' => 'Old Name']);

    put(route('tables.update', $table), [
        'name' => 'New Name',
        'capacity' => 6,
        'is_active' => false,
    ])->assertRedirect(route('tables.index'));

    assertDatabaseHas('tables', [
        'id' => $table->id,
        'name' => 'New Name',
        'capacity' => 6,
        'is_active' => false,
    ]);
});

test('table name must be unique when updating except for itself', function (): void {
    $table1 = Table::factory()->create(['name' => 'Table 1']);
    $table2 = Table::factory()->create(['name' => 'Table 2']);

    // Should allow keeping the same name
    put(route('tables.update', $table1), [
        'name' => 'Table 1',
    ])->assertRedirect();

    // Should not allow using another table's name
    put(route('tables.update', $table1), [
        'name' => 'Table 2',
    ])->assertInvalid(['name']);
});

test('a table can be deleted', function (): void {
    $table = Table::factory()->create();

    delete(route('tables.destroy', $table))
        ->assertRedirect(route('tables.index'));

    assertDatabaseMissing('tables', ['id' => $table->id]);
});

test('a table with active orders cannot be deleted', function (): void {
    $table = Table::factory()
        ->has(\App\Models\Order::factory()->state(['status' => \App\OrderStatus::New]))
        ->create();

    delete(route('tables.destroy', $table))
        ->assertRedirect();

    assertDatabaseHas('tables', ['id' => $table->id]);
});

test('table status can be toggled', function (): void {
    $table = Table::factory()->create(['is_active' => true]);

    post(route('tables.toggleStatus', $table))
        ->assertOk()
        ->assertJson([
            'success' => true,
            'is_active' => false,
        ]);

    expect($table->fresh()->is_active)->toBeFalse();
});

test('qr code can be retrieved', function (): void {
    $table = Table::factory()->create();

    get(route('tables.qrCode', $table))
        ->assertOk()
        ->assertJsonStructure([
            'qr_code',
            'url',
            'table' => ['id', 'name', 'qr_code'],
        ]);
});

test('active scope filters active tables', function (): void {
    Table::factory()->create(['is_active' => true]);
    Table::factory()->create(['is_active' => true]);
    Table::factory()->create(['is_active' => false]);

    $activeTables = Table::active()->get();

    expect($activeTables)->toHaveCount(2);
    expect($activeTables->pluck('is_active')->unique()->toArray())->toBe([true]);
});

test('inactive scope filters inactive tables', function (): void {
    Table::factory()->create(['is_active' => true]);
    Table::factory()->create(['is_active' => false]);
    Table::factory()->create(['is_active' => false]);

    $inactiveTables = Table::inactive()->get();

    expect($inactiveTables)->toHaveCount(2);
    expect($inactiveTables->pluck('is_active')->unique()->toArray())->toBe([false]);
});
