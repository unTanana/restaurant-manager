import { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { PlusCircle, Search } from 'lucide-react';
import AppHeaderLayout from '@/layouts/app/app-header-layout';
import { type BreadcrumbItem, type Table } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { TableCard } from '@/components/tables/table-card';
import { QrCodeDisplay } from '@/components/tables/qr-code-display';
import { create, index as tablesIndex } from '@/routes/tables';

interface PaginatedTables {
    data: Table[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
}

interface TablesIndexProps {
    tables: PaginatedTables;
    filters: {
        search?: string;
    };
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Tables',
        href: tablesIndex().url,
    },
];

export default function TablesIndex({ tables, filters }: TablesIndexProps) {
    const [search, setSearch] = useState(filters.search || '');
    const [selectedTable, setSelectedTable] = useState<Table | null>(null);
    const [showQrModal, setShowQrModal] = useState(false);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get(tablesIndex().url, { search }, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    return (
        <AppHeaderLayout breadcrumbs={breadcrumbs}>
            <Head title="Tables Management" />

            <div className="flex h-full flex-1 flex-col">
                {/* Toolbar */}
                <div className="border-b border-gray-200 dark:border-gray-700 p-4 flex items-center justify-between gap-4">
                    <form onSubmit={handleSearch} className="flex items-center gap-2 flex-1">
                        <div className="relative max-w-md">
                            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                                type="text"
                                placeholder="Search tables..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="pl-9 h-9"
                            />
                        </div>
                    </form>
                    
                    <Link href={create().url}>
                        <Button className='px-16'>
                            <PlusCircle className="size-4" />
                            Add Table
                        </Button>
                    </Link>
                </div>

                {/* Tables Grid */}
                {tables.data.length === 0 ? (
                    <div className="flex flex-1 items-center justify-center p-12">
                        <div className="text-center">
                            <h3 className="text-lg font-semibold">No tables found</h3>
                            <p className="text-muted-foreground mt-1 text-sm">
                                {filters.search
                                    ? 'Try adjusting your search'
                                    : 'Get started by creating your first table'}
                            </p>
                            {!filters.search && (
                                <Link href={create().url} className="mt-4 inline-block">
                                    <Button>
                                        <PlusCircle className="size-4" />
                                        Add Table
                                    </Button>
                                </Link>
                            )}
                        </div>
                    </div>
                ) : (
                    <div className="flex-1 p-4">
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                            {tables.data.map((table) => (
                                <TableCard
                                    key={table.id}
                                    table={table}
                                    onViewQr={(table) => {
                                        setSelectedTable(table);
                                        setShowQrModal(true);
                                    }}
                                />
                            ))}
                        </div>

                        {/* Pagination */}
                        {tables.last_page > 1 && (
                            <div className="flex items-center justify-center gap-2 mt-6">
                                {Array.from({ length: tables.last_page }, (_, i) => i + 1).map((page) => (
                                    <Link
                                        key={page}
                                        href={`${tablesIndex().url}?page=${page}`}
                                        preserveState
                                        preserveScroll
                                    >
                                        <Button
                                            variant={page === tables.current_page ? 'default' : 'outline'}
                                        >
                                            {page}
                                        </Button>
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>

            <QrCodeDisplay
                table={selectedTable}
                isOpen={showQrModal}
                onClose={() => {
                    setShowQrModal(false);
                    setSelectedTable(null);
                }}
            />
        </AppHeaderLayout>
    );
}

