<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
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
                'new' => $orders->get('new', collect()),
                'in_process' => $orders->get('in_process', collect()),
                'ready' => $orders->get('ready', collect()),
                'served' => $orders->get('served', collect()),
                'done' => $orders->get('done', collect()),
            ],
        ]);
    }

    public function updateStatus(Order $order, Request $request): RedirectResponse
    {
        $request->validate([
            'status' => ['required', Rule::in(['new', 'in_process', 'ready', 'served', 'done'])],
        ]);

        $order->update([
            'status' => $request->status,
        ]);

        return redirect()->back();
    }
}
