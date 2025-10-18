<?php

use App\Http\Controllers\OrdersController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', fn() => Inertia::render('welcome'))->name('home');

Route::middleware(['auth', 'verified'])->group(function (): void {
    Route::get('dashboard', [OrdersController::class, 'index'])->name('dashboard');
    Route::get('orders', [OrdersController::class, 'index'])->name('orders.index');
    Route::patch('orders/{order}/status', [OrdersController::class, 'updateStatus'])->name('orders.updateStatus');
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
