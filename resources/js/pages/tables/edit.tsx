import { Head, Link } from '@inertiajs/react';
import AppHeaderLayout from '@/layouts/app/app-header-layout';
import { type BreadcrumbItem, type Table } from '@/types';
import { Button } from '@/components/ui/button';
import { TableForm } from '@/components/tables/table-form';
import { DeleteTableModal } from '@/components/tables/delete-table-modal';
import { index as tablesIndex, update } from '@/routes/tables';
import { ArrowLeft, Trash2 } from 'lucide-react';
import { useState } from 'react';

interface EditTableProps {
    table: Table;
}

export default function EditTable({ table }: EditTableProps) {
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Tables',
            href: tablesIndex().url,
        },
        {
            title: table.name,
            href: `/tables/${table.id}/edit`,
        },
    ];

    const handleDelete = () => {
        setShowDeleteModal(true);
    };

    return (
        <AppHeaderLayout breadcrumbs={breadcrumbs}>
            <Head title={`Edit ${table.name}`} />

            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href={tablesIndex().url}>
                            <Button variant="outline" size="icon">
                                <ArrowLeft className="size-4" />
                            </Button>
                        </Link>
                        <div>
                            <h1 className="font-sans text-3xl font-semibold tracking-tight">Edit Table</h1>
                            <p className="text-muted-foreground mt-1">Update table information</p>
                        </div>
                    </div>

                    <Button
                        variant="destructive"
                        onClick={handleDelete}
                        className="px-18"
                    >
                        <Trash2 className="size-4" />
                        Delete Table
                    </Button>
                </div>

                {table.active_orders_count > 0 && (
                    <div className="bg-yellow-50 dark:bg-yellow-950 max-w-2xl rounded-lg border border-yellow-200 dark:border-yellow-800 p-4">
                        <p className="text-sm text-yellow-900 dark:text-yellow-100">
                            <strong>Warning:</strong> This table has {table.active_orders_count} active order
                            {table.active_orders_count > 1 ? 's' : ''}. Complete or cancel all orders before
                            deleting this table.
                        </p>
                    </div>
                )}

                {/* Form */}
                <div className="max-w-2xl">
                    <TableForm
                        action={update({ table: table.id }).url}
                        method="patch"
                        table={table}
                        submitText="Save Edit"
                        cancelUrl={tablesIndex().url}
                        isCreate={false}
                    />
                </div>
            </div>

            <DeleteTableModal
                table={table}
                isOpen={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
            />
        </AppHeaderLayout>
    );
}
