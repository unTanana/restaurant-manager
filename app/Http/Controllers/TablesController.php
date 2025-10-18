<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTableRequest;
use App\Http\Requests\UpdateTableRequest;
use App\Models\Table;
use BaconQrCode\Renderer\Image\SvgImageBackEnd;
use BaconQrCode\Renderer\ImageRenderer;
use BaconQrCode\Renderer\RendererStyle\RendererStyle;
use BaconQrCode\Writer;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class TablesController extends Controller
{
    public function index(Request $request): Response
    {
        $query = Table::query()->withCount('activeOrders');

        // Search functionality
        if ($search = $request->input('search')) {
            $query->search($search);
        }

        $tables = $query->orderBy('id')->paginate(12)->withQueryString();

        return Inertia::render('tables/index', [
            'tables' => $tables,
            'filters' => [
                'search' => $search,
            ],
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('tables/create');
    }

    public function store(StoreTableRequest $request): RedirectResponse
    {
        $validated = $request->validated();

        // Generate sequential table name and QR code
        $nextNumber = Table::count() + 1;
        $validated['name'] = 'Table ' . $nextNumber;
        $validated['qr_code'] = $this->generateUniqueQrCode();

        Table::create($validated);

        return redirect()
            ->route('tables.index')
            ->with('success', 'Table created successfully.');
    }

    public function edit(Table $table): Response
    {
        return Inertia::render('tables/edit', [
            'table' => $table,
        ]);
    }

    public function update(UpdateTableRequest $request, Table $table): RedirectResponse
    {
        $table->update($request->validated());

        return redirect()
            ->route('tables.index')
            ->with('success', 'Table updated successfully.');
    }

    public function destroy(Table $table): RedirectResponse
    {
        // Check if table has active orders
        if ($table->hasActiveOrders()) {
            return redirect()
                ->back()
                ->with('error', 'Cannot delete table with active orders.');
        }

        $table->delete();

        return redirect()
            ->route('tables.index')
            ->with('success', 'Table deleted successfully.');
    }

    public function qrCode(Table $table): JsonResponse
    {
        $url = url("/menu/{$table->qr_code}");

        $renderer = new ImageRenderer(
            new RendererStyle(300),
            new SvgImageBackEnd
        );

        $writer = new Writer($renderer);
        $qrCode = $writer->writeString($url);

        return response()->json([
            'qr_code' => $qrCode,
            'url' => $url,
            'table' => $table->only(['id', 'name', 'qr_code']),
        ]);
    }

    /**
     * Generate a unique QR code for the table.
     */
    private function generateUniqueQrCode(): string
    {
        // Get the next sequential number
        $nextNumber = Table::count() + 1;
        $qrCode = 'TBL-' . str_pad($nextNumber, 3, '0', STR_PAD_LEFT);

        // Ensure it's unique (in case of concurrent requests)
        while (Table::where('qr_code', $qrCode)->exists()) {
            $nextNumber++;
            $qrCode = 'TBL-' . str_pad($nextNumber, 3, '0', STR_PAD_LEFT);
        }

        return $qrCode;
    }
}
