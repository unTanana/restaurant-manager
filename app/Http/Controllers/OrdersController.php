<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\OrderStatus;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class OrdersController extends Controller
{
    public function index(): Response
    {
        $orders = Order::with(['table', 'orderItems.product'])
            ->orderBy('created_at', 'desc')
            ->get()
            ->groupBy('status');

        return Inertia::render('orders/index', [
            'orders' => [
                'new' => $orders->get(OrderStatus::New->value, collect()),
                'in_process' => $orders->get(OrderStatus::InProcess->value, collect()),
                'ready' => $orders->get(OrderStatus::Ready->value, collect()),
                'served' => $orders->get(OrderStatus::Served->value, collect()),
                'done' => $orders->get(OrderStatus::Done->value, collect()),
            ],
        ]);
    }

    public function updateStatus(Order $order, Request $request): RedirectResponse
    {
        $request->validate([
            'status' => ['required', Rule::enum(OrderStatus::class)],
        ]);

        $order->update([
            'status' => $request->status,
        ]);

        return redirect()->back();
    }
}
